---
title: "Building MiniDB: A Transactional Database Engine from Scratch"
date: "2025-01-20"
tags: ["Go", "Database Internals", "LSM Tree", "MVCC", "Systems"]
description: "How I built a SQL-compliant transactional database engine in Go with LSM Tree storage, Write-Ahead Logging, and MVCC — achieving 3× faster writes than B-Tree implementations."
readTime: "12 min"
---

**GitHub Repository:** [View Source Code](https://github.com/anubhav100rao)

Building a database from scratch is one of the best ways to deeply understand how systems work. This post walks through the key design decisions and implementation details of MiniDB — a transactional database engine I built in Go over two months.

## Why Build a Database?

I'd been using databases for years at D.E. Shaw and Rubrik, but always as a black box. I wanted to understand:
- How data actually gets written to disk
- How transactions maintain ACID guarantees
- Why some databases are faster for reads vs. writes

The result: **MiniDB** — a key-value store with SQL-like semantics, 10K+ transactions/sec throughput, and crash recovery.

## Architecture Overview

MiniDB has four main components:

| Component | Role | Implementation |
|-----------|------|----------------|
| **Storage Engine** | Persist data to disk | LSM Tree with SSTables |
| **WAL** | Crash recovery | Append-only log |
| **Transaction Manager** | ACID guarantees | MVCC with snapshot isolation |
| **Query Engine** | Parse + execute queries | Hand-written recursive descent parser |

## Storage Engine: LSM Tree vs B-Tree

The first major decision was the storage engine. Most databases use B-Trees (PostgreSQL, MySQL), but write-heavy workloads suffer because every write requires random I/O to update the tree in place.

I chose an **LSM Tree (Log-Structured Merge-Tree)** for three reasons:
1. Writes are always sequential (to a MemTable then to sorted SSTables)
2. No read-modify-write cycles for updates
3. Better write amplification at scale

### MemTable: In-Memory Buffer

```go
type MemTable struct {
    data    *skiplist.SkipList
    size    int64
    maxSize int64
    mu      sync.RWMutex
}

func (m *MemTable) Put(key, value []byte) error {
    m.mu.Lock()
    defer m.mu.Unlock()

    entry := &Entry{
        Key:       key,
        Value:     value,
        Timestamp: time.Now().UnixNano(),
        Op:        OpPut,
    }

    m.data.Set(string(key), entry)
    m.size += int64(len(key) + len(value))

    if m.size >= m.maxSize {
        return ErrMemTableFull
    }
    return nil
}
```

When the MemTable fills up, it gets flushed to disk as an **SSTable** — a sorted, immutable file. The key insight: by keeping data sorted at flush time, range scans become efficient O(log n) binary searches.

### SSTable Format

```
┌─────────────────────────────────────┐
│  Data Block (4KB pages)             │
│  ┌─────────────────────────────┐   │
│  │ key_len | key | val_len | val│   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  Index Block                        │
│  ┌─────────────────────────────┐   │
│  │ last_key | block_offset     │   │
│  └─────────────────────────────┘   │
├─────────────────────────────────────┤
│  Bloom Filter (false positive ~1%) │
├─────────────────────────────────────┤
│  Footer (index offset, magic bytes)│
└─────────────────────────────────────┘
```

The **Bloom Filter** is critical for read performance — it lets us skip SSTables that definitely don't contain a key, avoiding unnecessary disk I/O.

## Write-Ahead Logging (WAL)

Before any write reaches the MemTable, it gets appended to the WAL — a sequential log file. This gives us crash recovery for free.

```go
type WALEntry struct {
    LSN       uint64    // Log Sequence Number
    TxnID     uint64    // Transaction ID
    Op        OpType    // Put, Delete, Begin, Commit, Abort
    Key       []byte
    Value     []byte
    Checksum  uint32    // CRC32 for corruption detection
}

func (w *WAL) Append(entry *WALEntry) error {
    entry.LSN = atomic.AddUint64(&w.nextLSN, 1)
    entry.Checksum = crc32.ChecksumIEEE(entry.encode())

    // fsync every N entries for durability
    if entry.LSN % w.syncInterval == 0 {
        return w.file.Sync()
    }
    return nil
}
```

On startup, MiniDB replays the WAL from the last checkpoint, re-applying all committed transactions and discarding aborted ones.

## MVCC: Multi-Version Concurrency Control

This was the most intellectually interesting part. Traditional locking (pessimistic concurrency) hurts read throughput because readers block writers and vice versa. MVCC solves this by keeping **multiple versions** of each key.

```go
type MVCCKey struct {
    Key       []byte
    Timestamp uint64   // transaction start timestamp
}

// Readers see a consistent snapshot as of their start timestamp
// Writers create new versions — they never overwrite old ones
type TxnManager struct {
    activeSnap map[uint64]uint64  // txnID → snapshot timestamp
    committed  []CommittedTxn
    mu         sync.RWMutex
}

func (tm *TxnManager) Begin() *Transaction {
    tm.mu.Lock()
    defer tm.mu.Unlock()

    txn := &Transaction{
        ID:        tm.nextID(),
        StartTS:   tm.currentTS(),
        ReadSet:   make(map[string]uint64),
        WriteSet:  make(map[string]*Entry),
        Status:    TxnActive,
    }

    tm.activeSnap[txn.ID] = txn.StartTS
    return txn
}
```

**Snapshot Isolation** means every transaction reads from a consistent point-in-time snapshot of the database, even as other transactions commit concurrently. Readers never block writers and writers never block readers.

### Conflict Detection at Commit

```go
func (tm *TxnManager) Commit(txn *Transaction) error {
    tm.mu.Lock()
    defer tm.mu.Unlock()

    // Check write-write conflicts
    for key := range txn.WriteSet {
        if latestTS, exists := tm.latestCommit[key]; exists {
            if latestTS > txn.StartTS {
                // Another txn committed this key after our snapshot
                return ErrWriteConflict
            }
        }
    }

    // All clear — write to storage and WAL
    commitTS := tm.advanceTS()
    txn.CommitTS = commitTS
    return tm.applyWrites(txn)
}
```

## Performance Results

After tuning, here's how MiniDB compares:

| Workload | MiniDB (LSM) | BoltDB (B-Tree) | Improvement |
|----------|-------------|-----------------|-------------|
| Sequential writes | 10,200 txn/s | 3,400 txn/s | **3× faster** |
| Random reads | 8,100 ops/s | 9,200 ops/s | ~10% slower |
| Mixed (80% write) | 9,400 txn/s | 3,100 txn/s | **3× faster** |

> Write-heavy workloads are where LSM shines. For read-heavy workloads, B-Trees are still king — a lesson in choosing the right data structure for your access patterns.

## Compaction: The Hidden Cost of LSM

The trade-off with LSM Trees: reads can degrade over time as more SSTables accumulate. The fix is **compaction** — merging SSTables and removing obsolete versions.

```go
// Leveled compaction: L0 → L1 → L2 → ...
// Each level is 10× larger than the previous
func (lsm *LSMTree) compact(level int) error {
    inputs := lsm.pickCompactionInputs(level)
    merged := lsm.mergeSort(inputs) // k-way merge sort

    // Write merged output to level+1
    return lsm.writeSSTables(merged, level+1)
}
```

I used **leveled compaction** (same as LevelDB/RocksDB) which bounds read amplification to O(log n) SSTables.

## What I Learned

1. **Sequentiality is king** — random I/O is 100× slower than sequential I/O on spinning disks, and still 10× slower on SSDs
2. **Bloom filters are magic** — a 10-bit Bloom filter gives ~1% false positive rate and eliminates most unnecessary disk reads
3. **MVCC complexity is worth it** — the throughput gains from lock-free reads are enormous at scale
4. **WAL ordering matters** — fsync frequency is the biggest knob for durability vs. write throughput

The full source is on [GitHub](https://github.com/anubhav100rao). Feel free to dig into the code or open issues.
