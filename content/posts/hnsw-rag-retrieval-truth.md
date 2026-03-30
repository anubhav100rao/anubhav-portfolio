---
title: "HNSW: The Algorithm Quietly Deciding What Your LLM Sees as 'Truth'"
date: "2026-03-30"
tags: ["HNSW", "RAG", "Vector Search", "ANN", "LLMs", "Systems"]
description: "A practical deep dive into how HNSW powers vector retrieval for RAG systems, why it dominates ANN search, and how poor recall can silently degrade LLM answers."
readTime: "8 min"
---

**GitHub Repository:** [View HNSW Simulator](https://github.com/anubhav100rao/HNSW-simulation)

Every time your RAG pipeline retrieves context, an algorithm you probably did not explicitly choose is deciding what your LLM treats as ground truth.

That algorithm is **HNSW**: **Hierarchical Navigable Small World**. It is the default indexing strategy behind a large part of the vector search ecosystem, including systems like Pinecone, Milvus, Qdrant, and Weaviate.

I have been spending time understanding how it works under the hood, and the biggest takeaway for me is this: retrieval quality is not just a database concern. It directly shapes model behavior.

## The Problem HNSW Solves

Suppose your RAG system has embedded **10 million documents**. A user asks a question, the query gets converted into a high-dimensional vector, often **1,536 dimensions or more**, and now the system needs to find the closest vectors in that space.

The brute-force baseline is exact k-nearest neighbors:

- Compare the query against every vector
- Compute a distance metric in all dimensions
- Return the closest matches

That is **O(N x d)** work per query. With 10 million vectors at 1,536 dimensions, you are suddenly doing roughly **15 billion floating-point operations** for a single lookup.

That is fine for a toy benchmark. It is not fine for a production retrieval path that needs low latency and predictable throughput.

## The Trade-Off: Approximate Nearest Neighbors

This is where **Approximate Nearest Neighbor (ANN)** algorithms come in.

Instead of checking every vector exhaustively, ANN methods accept a small and controlled loss in accuracy in exchange for a dramatic gain in speed. The goal is not to find the mathematically perfect answer every time. The goal is to find results that are close enough, fast enough, to serve real systems.

HNSW has become the dominant ANN approach because it balances this trade-off extremely well. Conceptually, it combines two ideas:

- A **Navigable Small World graph**, where vectors are connected to nearby vectors like nodes in a social network
- A **skip-list-like hierarchy**, where these graphs are stacked into layers of different density

The result is an index that can move quickly across large distances at the top and do fine-grained local search near the bottom.

## How Search Works: A Layered Descent

The intuition I like is a map.

When you travel to a specific address, you do not scan every road in the country. You zoom in:

- State
- City
- Neighborhood
- Street

HNSW does something very similar.

The query starts at the **top layer**, which is extremely sparse and contains only a small number of well-connected routing nodes. From there, the algorithm greedily hops to whichever neighbor is closest to the target vector.

Once it reaches a point where none of the neighbors are closer than the current node, it stops descending within that layer. Then it drops to the **same node in the denser layer below** and repeats the process.

By the time the search reaches **Layer 0**, which contains every vector, it is already in roughly the right neighborhood. The algorithm then explores candidates there and returns the final top-K results.

This is the core reason HNSW works so well: it does not try to solve the entire search problem at full resolution from the beginning. It first gets you close, then gets you precise.

## How Insertions Work: Building the Graph

Insertion is where the structure becomes especially elegant.

When a new embedding is added, HNSW assigns it a maximum layer **probabilistically**, much like a skip list. Most nodes only exist at **Layer 0**. Fewer appear in higher layers. A tiny fraction become long-range connectors near the top.

Insertion then happens in two phases:

1. From the top layer down to the node's assigned maximum layer, the algorithm performs greedy search to find a good entry point.
2. From that assigned layer down to Layer 0, it searches for neighbors and connects the new node to up to **M** of them at each level.

One detail I especially like is how HNSW prunes connections.

When a node has too many neighbors, it does **not** simply keep the nearest ones and discard the rest. Instead, it uses a heuristic that favors **diversity of direction**. In practice, that means it tries to preserve edges that help the graph remain globally navigable, rather than allowing every local region to collapse into a dense clique.

That subtle choice is a big part of why the graph stays useful as it grows.

## Where Things Quietly Go Wrong

This is the part I think more teams should pay attention to.

HNSW can fail **silently**.

Your index can return results very quickly, your pipeline can look healthy, and your LLM can still be answering from mediocre retrieval. Nothing necessarily crashes. Nothing necessarily emits an alert. You simply get context that is good enough to sound plausible, but not good enough to be correct.

And once weak context enters the prompt, the LLM treats it as truth-shaped input.

In most systems, the issue comes down to parameter tuning. Two knobs matter a lot:

- **M**: the maximum number of connections per node. Higher values improve graph connectivity and often improve recall, but they also consume more memory and make indexing slower.
- **ef_search**: the candidate list size used during query-time exploration. If it is too small, search can get trapped in local minima and miss better neighbors. If it is too large, latency rises.

Many teams ship the defaults and never actually measure whether the index is retrieving well enough for their workload.

That is risky.

## The Metric That Matters: Recall@K

If I had to pick one metric to watch for ANN quality, it would be **Recall@K**.

It answers a simple question:

> Of the true nearest neighbors, how many did the ANN index actually return?

Suppose exact k-NN says the true top 10 neighbors are `{A, B, C, D, E, F, G, H, I, J}`.

If your HNSW search returns only 7 of those 10 in its top-10 results, then your **Recall@10 = 0.7**.

That missing 30% is not abstract. It is context your LLM never saw.

And in a RAG system, missing the right chunk can easily matter more than subtle prompt tuning ever will.

## The Honest Trade-Offs

HNSW is powerful, but there is no free lunch.

- It is **memory-heavy**. Multi-layer graphs with adjacency lists and routing structure consume far more RAM than more compressed approaches like IVF-PQ.
- Recall can **degrade silently over time**. As your corpus shifts, your query patterns evolve, or your domain broadens, an index tuned for last month may not behave the same way today.
- It requires **measurement discipline**. The only honest way to know whether your vector retrieval still works is to benchmark Recall@K against brute-force search on a representative sample.

That last point is the one I care about most. Treating the vector database as a black box is tempting, especially when the default settings seem good enough. But in my experience, retrieval tuning is just as important as prompt tuning.

## Final Thought

We talk a lot about model quality, prompting, and orchestration in LLM systems. But before the model answers anything, something upstream decides what evidence it gets to see.

In many modern RAG stacks, that something is HNSW.

If you have not measured your recall, you do not really know what your LLM is reasoning over. You only know what the retrieval layer happened to surface.

That is why I think HNSW is one of the most important and least-discussed algorithms in practical AI systems today.

Curious to hear how others approach this in production:

- What Recall@K target do you aim for before shipping?
- How often do you re-evaluate as your corpus grows?
- Have you seen retrieval regressions show up before model regressions?
