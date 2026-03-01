---
title: "Building a Collaborative Editor with CRDTs from Scratch"
date: "2026-03-01"
tags: ["TypeScript", "Distributed Systems", "CRDTs", "React", "WebSockets"]
description: "How I built a real-time collaborative document editor using Conflict-free Replicated Data Types — implementing the RGA algorithm, tombstone deletion, and out-of-order operation handling with zero external CRDT libraries."
readTime: "14 min"
---

**GitHub Repository:** [View Source Code](https://github.com/anubhav100rao/crdts_docs)

Google Docs makes real-time collaboration look effortless. Multiple cursors, simultaneous edits, no conflicts. But underneath that simplicity lies one of the hardest problems in distributed systems: **how do you let multiple users edit the same document concurrently without a central lock or coordination server?**

The traditional answer is **Operational Transformation (OT)** — the approach Google Docs actually uses. But OT requires a central server to serialize operations, and correctness proofs are notoriously tricky. The modern alternative is **CRDTs (Conflict-free Replicated Data Types)** — data structures that are *mathematically guaranteed* to converge, regardless of operation order.

I built a collaborative document editor using CRDTs from scratch to deeply understand how they work. No external CRDT libraries. Just TypeScript, WebSockets, and the RGA algorithm.

## What Are CRDTs?

A CRDT is a data structure where:
1. Every replica can be modified independently (no locks, no coordination)
2. Replicas can sync in any order, at any time
3. All replicas are **guaranteed to converge** to the same state

This isn't eventual consistency with "hope" — it's eventual consistency with a **mathematical proof**. The data structure's merge operation is designed to be commutative, associative, and idempotent.

For text editing, the challenge is representing a *sequence* as a CRDT. You can't just use array indices — if User A inserts at position 5 and User B deletes position 3, User A's index is now wrong. We need position identifiers that are **stable across concurrent edits**.

## The RGA Algorithm

I chose **RGA (Replicated Growable Array)** as my sequence CRDT. The core idea: every character gets a globally unique ID, and insertions reference their *parent character* rather than an array index.

### Character Identity

Each character in the document is represented as:

```typescript
interface CharId {
  siteId: string;   // unique per user session
  clock: number;    // logical clock, increments on each operation
}

interface CRDTChar {
  id: CharId;
  value: string;        // the actual character
  tombstone: boolean;   // true = deleted (but not removed)
  parentId: CharId | null; // what character this was inserted after
}
```

The `siteId` is generated randomly when a user joins. Combined with the monotonically increasing `clock`, every character across all users has a unique identity that never collides.

### Why Parent Pointers?

This is the key insight that makes CRDTs work for text. Instead of saying "insert 'a' at position 5", we say "insert 'a' after character X". Since character X has a stable unique ID, this operation means the same thing regardless of what other edits have happened concurrently.

```typescript
// Bad: index-based (breaks under concurrent edits)
{ type: 'insert', index: 5, value: 'a' }

// Good: parent-based (stable regardless of concurrent edits)
{ type: 'insert', id: { siteId: '0.34f', clock: 7 }, value: 'a', parentId: { siteId: '0.89b', clock: 3 } }
```

## The Core Algorithm: Inserting Characters

The trickiest part of RGA is handling **concurrent insertions at the same position**. If two users both insert a character after the same parent, we need a deterministic rule to order them.

```typescript
remoteInsert(op: InsertOp, events: RemoteOperationEvent[]): void {
  const char: CRDTChar = {
    id: op.id,
    value: op.value,
    tombstone: false,
    parentId: op.parentId,
  };

  // Find where the parent is in our sequence
  const parentIndex = op.parentId === null
    ? -1
    : this.findCharIndex(op.parentId);

  // If parent hasn't arrived yet, buffer this operation
  if (op.parentId !== null && parentIndex === -1) {
    this.insertBacklog.push(op);
    return;
  }

  // Find the correct insertion point among siblings
  let insertIndex = parentIndex + 1;
  while (insertIndex < this.sequence.length) {
    const current = this.sequence[insertIndex];
    const currentParentIndex = this.findCharIndex(current.parentId);

    // Stop if we've passed all siblings of this parent
    if (currentParentIndex < parentIndex) break;

    // Among siblings, use deterministic tie-breaking
    if (currentParentIndex === parentIndex) {
      if (op.id.siteId > current.id.siteId) break;
      if (op.id.siteId === current.id.siteId &&
          op.id.clock > current.id.clock) break;
    }

    insertIndex++;
  }

  this.sequence.splice(insertIndex, 0, char);
}
```

### Deterministic Tie-Breaking

When two characters share the same parent, they're "siblings" competing for the same position. We break ties by comparing:

1. **siteId** (lexicographic order)
2. **clock** (numeric order) if same siteId

This is deterministic — every replica applies the same rule, so every replica places siblings in the same order. No coordination needed.

## Deletion: Tombstones, Not Removal

Deleting a character doesn't remove it from the sequence. Instead, we mark it as a **tombstone**:

```typescript
remoteDelete(op: DeleteOp, events: RemoteOperationEvent[]): void {
  const index = this.findCharIndex(op.id);

  if (index === -1) {
    // Delete arrived before the insert — cache it
    this.tombstoneCache.add(charIdToString(op.id));
    return;
  }

  if (!this.sequence[index].tombstone) {
    this.sequence[index].tombstone = true;

    // Calculate visible position for the editor
    let visibleIndex = 0;
    for (let i = 0; i < index; i++) {
      if (!this.sequence[i].tombstone) visibleIndex++;
    }
    events.push({ type: 'delete', index: visibleIndex });
  }
}
```

Why tombstones? Because other characters might reference a deleted character as their parent. If we removed it entirely, those parent pointers would break. Tombstones preserve the structure while hiding the character from the visible text.

## Handling Out-of-Order Operations

Network packets don't arrive in order. A character might arrive before its parent, or a delete might arrive before the corresponding insert. I handle both cases with two complementary mechanisms.

### Insert Backlog

When an insert arrives but its parent hasn't been seen yet, we queue it:

```typescript
private insertBacklog: InsertOp[] = [];

// After every successful insert, check if queued operations can now be applied
private processBacklog(events: RemoteOperationEvent[]): void {
  let progress = true;
  while (progress) {
    progress = false;
    const remaining: InsertOp[] = [];

    for (const pending of this.insertBacklog) {
      const parentIndex = pending.parentId === null
        ? -1
        : this.findCharIndex(pending.parentId);

      if (parentIndex !== -1 || pending.parentId === null) {
        this.remoteInsert(pending, events);
        progress = true;  // might unblock more operations
      } else {
        remaining.push(pending);
      }
    }

    this.insertBacklog = remaining;
  }
}
```

The loop keeps running until no more progress is made — handling cascading dependencies where operation C depends on B which depends on A.

### Tombstone Cache

When a delete arrives before the insert it targets:

```typescript
private tombstoneCache: Set<string> = new Set();

// During insert, check if this character was already "deleted"
if (this.tombstoneCache.has(charIdToString(char.id))) {
  char.tombstone = true;  // born dead
  this.tombstoneCache.delete(charIdToString(char.id));
} else {
  events.push({ type: 'insert', index: visibleIndex });
}
```

Without the tombstone cache, you'd see a character briefly appear and then disappear — a visible flicker in the editor. With the cache, it's inserted already tombstoned, so the user never sees it.

## Architecture: Monorepo with npm Workspaces

The project is structured as three independent packages:

```
packages/
├── crdt-core/     # Pure CRDT algorithm (zero dependencies)
│   ├── rga.ts     # RGA implementation
│   ├── char.ts    # Character types
│   └── operation.ts
├── server/        # Express + WebSocket relay
│   ├── room.ts    # Document room management
│   └── storage.ts # SQLite persistence
└── client/        # React + Monaco Editor
    ├── Editor.tsx
    └── hooks/
        ├── useCrdt.ts
        └── useWebSocket.ts
```

The `crdt-core` package has **zero framework dependencies** — it's pure algorithm code that can be tested in isolation. This was a deliberate design choice: the CRDT logic shouldn't know or care about React, WebSockets, or databases.

## Bridging CRDT Operations to Monaco Editor

The trickiest integration challenge: converting between CRDT operations (which use unique character IDs) and Monaco Editor operations (which use line/column positions).

The `useCrdt` hook manages this translation:

```typescript
function useCrdt(siteId: string) {
  const rgaRef = useRef(new RGA(siteId));

  const localInsert = (index: number, char: string): InsertOp => {
    return rgaRef.current.localInsert(index, char);
  };

  const applyRemote = (op: Operation): RemoteOperationEvent[] => {
    const events: RemoteOperationEvent[] = [];
    if (op.type === 'insert') {
      rgaRef.current.remoteInsert(op, events);
    } else {
      rgaRef.current.remoteDelete(op, events);
    }
    return events;
  };

  const getText = (): string => rgaRef.current.getText();

  return { localInsert, localDelete, applyRemote, getText };
}
```

Remote operations return `RemoteOperationEvent` objects with visible indices, which are then converted to Monaco's `IIdentifiedSingleEditOperation` format and applied via `executeEdits()` — surgically updating the editor without disrupting the local user's cursor position.

## WebSocket Relay and Document Rooms

The server is intentionally simple — it's a relay, not an authority:

```typescript
// When a client sends an operation
ws.on('message', (data) => {
  const message = JSON.parse(data);

  if (message.type === 'operation') {
    // Apply to server's RGA (for persistence)
    room.rga.applyRemote(message.op);

    // Broadcast to all OTHER clients in the room
    room.broadcast(message, ws);

    // Persist to SQLite
    room.storage.saveOperation(roomId, message.op);
  }
});

// When a new client joins, send the full document state
ws.on('connection', () => {
  ws.send(JSON.stringify({
    type: 'sync',
    sequence: room.rga.getSequence()
  }));
});
```

The server maintains its own RGA replica for two reasons:
1. **Persistence**: new clients need the full document state when they join
2. **Storage**: SQLite stores the document so it survives server restarts

But the server is *not* an authority — it doesn't resolve conflicts or serialize operations. Every client independently resolves conflicts using the same deterministic CRDT rules.

## Testing Convergence

The most important property to test: **two replicas applying the same operations in different orders must produce identical text**.

```typescript
test('concurrent inserts at same position converge', () => {
  const rga1 = new RGA('site1');
  const rga2 = new RGA('site2');

  // Both users insert after the same parent
  const op1 = rga1.localInsert(0, 'A');  // site1 inserts 'A'
  const op2 = rga2.localInsert(0, 'B');  // site2 inserts 'B'

  // Apply in different orders
  rga1.remoteInsert(op2, []);  // rga1: applies op2 second
  rga2.remoteInsert(op1, []);  // rga2: applies op1 second

  // Both must converge to the same text
  expect(rga1.getText()).toBe(rga2.getText());
});
```

The test suite covers concurrent inserts, concurrent deletes, insert-delete conflicts, multi-replica convergence with shuffled operation orders, out-of-order dependencies, and ghost deletes (delete before insert arrives).

## Why CRDTs Over Operational Transformation?

| | CRDTs | OT |
|---|---|---|
| **Central server** | Not required | Required for serialization |
| **Offline support** | Native — merge whenever | Complex — must queue and transform |
| **Correctness** | Mathematical proof | Implementation-dependent |
| **Complexity** | In the data structure | In the transformation functions |
| **Space overhead** | Higher (tombstones, IDs) | Lower |

CRDTs trade space for simplicity and correctness. Every character carries metadata (unique ID, parent pointer, tombstone flag), which adds overhead. But in return, you get a system where correctness is guaranteed by construction, not by careful implementation of transformation functions.

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **RGA over OT** | Correctness by construction; no central authority needed |
| **Logical clocks + siteId** | Deterministic tie-breaking ensures all replicas converge |
| **Tombstoning over deletion** | Preserves parent references for concurrent operations |
| **Insert backlog** | Gracefully handles out-of-order network delivery |
| **Tombstone cache** | Prevents visible flicker from out-of-order deletes |
| **npm workspaces monorepo** | Clean separation: algorithm, server, and UI are independent |
| **Monaco Editor** | Rich editor with decoration API for remote cursors |
| **SQLite persistence** | Zero-config; documents survive server restarts |

## What I Learned

Building CRDTs from scratch taught me things no paper or tutorial could:

1. **The elegance of parent pointers**: Relative references are the key insight that makes sequence CRDTs work. They're immune to concurrent index shifts.
2. **Tombstones are a feature, not a bug**: They feel wasteful until you realize they're what make the system correct under concurrent operations.
3. **Out-of-order handling is non-trivial**: The insert backlog and tombstone cache were features I didn't anticipate needing until I tested with real network latency.
4. **CRDTs embed truth in the data structure**: Unlike OT where correctness depends on the transformation algorithm, CRDTs are correct because of how the data is structured. Once you get the data structure right, everything else follows.

The complete source code — CRDT core, server, and client — is available on [GitHub](https://github.com/anubhav100rao/crdts_docs).

## Further Reading

- [A comprehensive study of CRDTs (Shapiro et al., 2011)](https://hal.inria.fr/inria-00555588/document)
- [Replicated Growable Array (Roh et al., 2011)](https://pages.lip6.fr/Marc.Shapiro/papers/rgasplit-group2016-11.pdf)
- [Yjs](https://github.com/yjs/yjs) — production CRDT framework for JavaScript
- [Automerge](https://github.com/automerge/automerge) — CRDT library for JSON documents
- [Martin Kleppmann's CRDTs talk](https://www.youtube.com/watch?v=x7drE24geUw) — excellent visual introduction
