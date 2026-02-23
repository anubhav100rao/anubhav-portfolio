---
title: "Raft Consensus in 15 Minutes: Building a Visualizer to Finally Get It"
date: "2024-12-10"
tags: ["Go", "Distributed Systems", "Raft", "React", "WebSockets"]
description: "Raft is beautiful once you visualize it. I built Rafty — a real-time 5-node Raft cluster simulator with deterministic fault injection — to deeply understand leader election, log replication, and network partitions."
readTime: "10 min"
---

Raft is one of those algorithms that looks simple on paper but has surprising depth. After reading the original paper ("In Search of an Understandable Consensus Algorithm") three times, I still felt like I was missing something. So I built **Rafty** — a real-time visualizer of a 5-node Raft cluster — and everything clicked.

This post explains Raft's three core mechanisms and how I implemented them.

## What Problem Does Raft Solve?

In a distributed system, you have multiple servers that need to agree on a sequence of values — the **replicated log**. This log might represent database writes, configuration changes, or any state machine transitions.

The challenge: **any server might crash or become unreachable at any time**. How do you ensure all surviving servers agree on the same log, without a central coordinator?

Raft's answer: elect one leader that serializes all writes, then replicate them to followers.

## The Three Sub-Problems

Raft decomposes consensus into three independent mechanisms:

| Problem | Raft's Solution |
|---------|----------------|
| Leader Election | Randomized timeouts + majority vote |
| Log Replication | Leader appends, followers confirm |
| Safety | Only committed entries applied; leaders have all committed entries |

## Leader Election

Every server starts as a **Follower**. If a follower doesn't hear from a leader within its **election timeout** (randomized between 150-300ms), it becomes a **Candidate** and starts an election.

```go
type RaftNode struct {
    id          int
    state       State  // Follower, Candidate, Leader
    currentTerm uint64
    votedFor    int    // -1 if not voted
    log         []LogEntry

    electionTimeout  time.Duration
    heartbeatTimeout time.Duration

    votes    map[int]bool
    peers    []*Peer
}

func (r *RaftNode) startElection() {
    r.state = Candidate
    r.currentTerm++
    r.votedFor = r.id  // vote for self
    r.votes = map[int]bool{r.id: true}

    r.resetElectionTimer()

    // Broadcast RequestVote to all peers
    for _, peer := range r.peers {
        go r.requestVote(peer)
    }
}
```

### Vote Granting Rules

A server grants a vote only if:
1. The candidate's **term** is ≥ its own current term
2. It hasn't already voted in this term for someone else
3. The candidate's log is **at least as up-to-date** as its own (critical for safety!)

```go
func (r *RaftNode) HandleRequestVote(req *VoteRequest) *VoteResponse {
    r.mu.Lock()
    defer r.mu.Unlock()

    // Reject if candidate is behind
    if req.Term < r.currentTerm {
        return &VoteResponse{Term: r.currentTerm, Granted: false}
    }

    // Update term if candidate is ahead
    if req.Term > r.currentTerm {
        r.becomeFollower(req.Term)
    }

    alreadyVoted := r.votedFor != -1 && r.votedFor != req.CandidateID
    logUpToDate := r.isCandidateLogUpToDate(req.LastLogIndex, req.LastLogTerm)

    if !alreadyVoted && logUpToDate {
        r.votedFor = req.CandidateID
        return &VoteResponse{Granted: true}
    }
    return &VoteResponse{Granted: false}
}
```

The **randomized timeout** is the elegant solution to split votes. If all servers had the same timeout, they'd all start elections simultaneously and nobody would win. Randomization ensures one server almost always wins the race.

## Log Replication

Once elected, the leader accepts client requests and replicates them to followers via **AppendEntries** RPCs (also used as heartbeats when empty).

```go
type LogEntry struct {
    Term    uint64
    Index   uint64
    Command []byte
}

func (r *RaftNode) AppendToLog(cmd []byte) (uint64, error) {
    if r.state != Leader {
        return 0, ErrNotLeader
    }

    entry := LogEntry{
        Term:    r.currentTerm,
        Index:   uint64(len(r.log)),
        Command: cmd,
    }

    r.log = append(r.log, entry)

    // Replicate to all followers concurrently
    successCh := make(chan bool, len(r.peers))
    for _, peer := range r.peers {
        go func(p *Peer) {
            successCh <- r.replicateTo(p, entry)
        }(peer)
    }

    // Wait for majority acknowledgment
    successes := 1 // count self
    for range r.peers {
        if <-successCh {
            successes++
        }
        if successes > (len(r.peers)+1)/2 {
            // Majority reached — commit!
            r.commitIndex = entry.Index
            return entry.Index, nil
        }
    }
    return 0, ErrReplicationFailed
}
```

A key insight: **entries are committed once a majority of servers have stored them**. This means even if the leader crashes after committing, at least one server in any future majority will have the entry, ensuring it's never lost.

## Network Partitions: The Real Test

The most interesting scenario to visualize: a **network partition** splits the cluster into two groups. What happens?

```
Before partition:
  [S1 Leader] ←→ [S2] ←→ [S3] ←→ [S4] ←→ [S5]

After partition:
  [S1 Leader] ←→ [S2]   |   [S3] ←→ [S4] ←→ [S5]
  (minority)              (majority)
```

The minority partition (S1, S2) is stuck — S1 can still think it's leader but can't commit anything because it can't reach a majority.

Meanwhile, the majority partition (S3, S4, S5) elects a new leader (say S3) and continues operating normally. Now there are **two leaders** for a brief period!

**How Raft handles this:**
- S1 is a "stale leader" — its AppendEntries calls are ignored by S3, S4, S5 because S3 will have a higher term
- S1's uncommitted writes are rolled back when the partition heals
- S3 becomes the authoritative leader

In Rafty, I implemented this as a virtual network layer:

```go
type Network struct {
    partitions map[int]map[int]bool  // partitions[from][to] = blocked
    latency    map[int]map[int]time.Duration
    mu         sync.RWMutex
}

func (n *Network) Send(from, to int, msg Message) error {
    n.mu.RLock()
    defer n.mu.RUnlock()

    if n.partitions[from][to] {
        return ErrPartitioned
    }

    time.Sleep(n.latency[from][to]) // simulate network delay
    return n.deliver(to, msg)
}

// Inject a partition between groups
func (n *Network) Partition(groupA, groupB []int) {
    n.mu.Lock()
    defer n.mu.Unlock()
    for _, a := range groupA {
        for _, b := range groupB {
            n.partitions[a][b] = true
            n.partitions[b][a] = true
        }
    }
}
```

## Real-Time Visualization with WebSockets

The Go backend streams state changes to a React frontend over WebSockets. Every state transition emits an event:

```go
type StateEvent struct {
    NodeID    int       `json:"nodeId"`
    State     string    `json:"state"`     // "follower" | "candidate" | "leader"
    Term      uint64    `json:"term"`
    VotedFor  int       `json:"votedFor"`
    LogLength int       `json:"logLength"`
    CommitIdx uint64    `json:"commitIndex"`
    Timestamp time.Time `json:"timestamp"`
}

func (r *RaftNode) emit(event StateEvent) {
    select {
    case r.eventCh <- event:
    default: // drop if channel full — visualization can lag
    }
}
```

The React frontend renders each node as a circle with color indicating state:
- 🔵 **Blue** = Follower
- 🟡 **Yellow** = Candidate (election in progress)
- 🟢 **Green** = Leader

Edges between nodes animate when AppendEntries or RequestVote messages are in-flight, giving a real-time view of the RPC traffic.

## What Makes Raft Beautiful

After building this, I understand why Diego Ongaro called it "the understandable consensus algorithm":

1. **Strong leader**: all complexity flows through one node. Followers are dumb mirrors.
2. **Randomness as a tie-breaker**: elegant solution to the split vote problem with zero coordination
3. **Term numbers as logical clocks**: stale leaders immediately detect they've been superseded
4. **Log matching property**: if two logs have the same index and term, all preceding entries are identical — makes correctness proofs tractable

The complete source for Rafty (Go backend + React frontend) is on [GitHub](https://github.com/anubhav100rao). You can inject network partitions, kill nodes, and watch the cluster recover in real time.

## Further Reading

- [The Raft Paper (Ongaro & Ousterhout, 2014)](https://raft.github.io/raft.pdf)
- [The Raft Website with visualization](https://raft.github.io)
- [etcd](https://github.com/etcd-io/etcd) — production Raft implementation in Go
- [TiKV](https://github.com/tikv/tikv) — Raft-based distributed KV in Rust
