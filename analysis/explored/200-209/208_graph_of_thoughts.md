# Paper Analysis: Graph of Thoughts: Solving Elaborate Problems with Large Language Models

## Metadata
- **arXiv ID**: 2308.09687
- **Title**: Graph of Thoughts: Solving Elaborate Problems with Large Language Models
- **Authors**: Maciej Besta, Nils Blach, Ales Kubicek, Robert Gerstenberger, Lukas Gianinazzi, Joanna Grzesiak, Tomasz Hoefler, Piotr Nyczyk, Marcin Podstawski
- **Affiliations**: ETH Zurich, Cledar, IDEAS NCBR
- **Date**: August 2023
- **Venue**: AAAI 2024

---

## Core Claims

1. **GoT generalizes CoT and ToT**: Graph of Thoughts models LLM reasoning as an arbitrary graph where nodes are "thoughts" and edges are dependencies, enabling more complex transformations than linear chains or trees.

2. **GoT enables thought aggregation**: Unlike ToT's tree structure, GoT can merge multiple thoughts into one, enabling operations like sorting sub-lists and combining them.

3. **62% improvement on sorting**: GoT achieves 62% quality improvement over ToT on sorting 128 random numbers, with 31% cost reduction.

4. **Modular framework**: GoT provides a modular architecture with Prompter, Parser, Scoring, and Controller modules for implementing different reasoning strategies.

---

## Methodology

### GoT Framework (4 Modules)

1. **Prompter**: Prepares prompts for LLM queries
2. **Parser**: Extracts information from LLM responses
3. **Scoring Module**: Validates and scores LLM thoughts
4. **Controller**: Orchestrates the entire reasoning process

### Key Innovation: Graph of Operations (GoO)

> "GoO is a static structure constructed once, **before** execution starts" (p.4)

The GoO is a **pre-defined graph** that:
- Specifies the execution plan
- Contains operation vertices (Generate, Aggregate, Improve, Score, KeepBest)
- Is constructed by the **user/system**, not the LLM

### Operations

| Operation | Description |
|-----------|-------------|
| **Generate** | Create k new thoughts from existing thoughts |
| **Aggregate** | Combine multiple thoughts into one (key differentiator) |
| **Improve** | Refine a thought using self-refinement |
| **Score** | Evaluate thought quality |
| **KeepBest** | Select best thoughts from candidates |

---

## Key Evidence

### Sorting 128 Numbers (Table 1, Figure 5)

| Method | Quality (% sorted) | Cost ($) |
|--------|-------------------|----------|
| IO | ~15% | $0.18 |
| CoT | ~45% | $0.35 |
| CoT-SC | ~50% | $0.75 |
| ToT | ~50% | $1.90 |
| **GoT** | **~75%** | **$1.30** |

**Critical observation**: Even GoT only achieves ~75% on sorting 128 numbers. A genuine reasoner would achieve 100%.

### The 62% Improvement Comes from External Algorithms

> "We select merge sort for its straightforward alignment with the graph structure of GoT" (p.6)

The improvement is **not** from LLM reasoning but from:
1. Splitting into 16-element chunks the LLM can handle
2. Applying **merge sort** externally
3. LLM just sorts small sub-arrays

### Critical Admission: LLMs Cannot Sort

> "The considered LLMs are **unable to sort** a sequence of such numbers correctly beyond a certain length" (p.6)

This is the key admission that supports the thesis.

### Cost Analysis (Table 2)

| Elements | CoT Cost | GoT Cost | GoT vs CoT |
|----------|----------|----------|------------|
| 32 | $0.3-0.4 | $0.3-0.4 | Same |
| 64 | $0.6-0.9 | $0.6-0.9 | Same |
| 128 | $1.3-1.6 | $1.0-1.5 | ~30% cheaper |

GoT is only cheaper at 128+ elements because **merge sort** has O(n log n) complexity vs brute force O(n^2).

### "Volume" Metric is Just Sampling

> "Volume, defined as the number of new thoughts that the LLM is prompted to generate per single input thought" (p.6)

Higher "volume" = more samples = more compute, not better reasoning.

### Set Operations Results (Table 3)

| Task | IO | CoT | ToT | GoT |
|------|-----|-----|-----|-----|
| Intersection (32 elements) | 32.3% | 60.9% | 67.4% | **75.7%** |
| Union (32 elements) | 56.2% | 74.2% | 80.7% | **91.2%** |

GoT shows improvement, but note:
- Best result is 91.2%, not 100%
- These are **well-defined** set operations where 100% should be achievable

### Document Merging (Human Evaluation)

| Method | Creativity | Organization | Quality |
|--------|------------|--------------|---------|
| IO | 3.21 | 2.89 | 2.93 |
| CoT | 3.58 | 3.47 | 3.62 |
| ToT | 3.78 | 3.72 | 3.96 |
| **GoT** | **4.03** | **4.26** | **4.43** |

Subjective evaluation on creative task. Does not demonstrate reasoning.

---

## Relationship to Thesis

### Classification: SUPPORTS (Does NOT Challenge)

### Why GoT Does NOT Demonstrate Genuine Reasoning

**1. GoO is Static and Pre-Constructed**

Key quote:
> "The user constructs a GoO instance, which prescribes the execution plan... GoO is a **static structure constructed once, before execution starts**" (p.4)

The "graph" structure is **externally imposed**, not emergent from the LLM. The LLM does not construct the reasoning graph — the human/system does.

**2. Authors Admit LLMs Cannot Sort**

> "The considered LLMs are **unable to sort** a sequence of such numbers correctly beyond a certain length"

This is a fundamental admission: LLMs lack the capability for even basic algorithmic reasoning on sequences.

**3. Improvement Comes from Classical Algorithms**

The 62% improvement comes from:
- **Merge sort** (external algorithm)
- **Chunking** (break problem into pieces LLM can handle)
- **Aggregation** (combine results externally)

The LLM's role is reduced to sorting short sequences — pattern matching within capability bounds.

**4. Performance Ceiling Shows Limits**

- ~75% on sorting 128 numbers (not 100%)
- ~91% on set union (not 100%)
- Even with GoT scaffolding, perfection is not achieved on deterministic tasks

A genuine reasoner would achieve 100% on well-defined operations.

**5. GoT is External Scaffolding**

Just like ToT adds BFS/DFS search, GoT adds:
- Graph structure (predefined)
- Merge operations (external)
- Scoring and selection (external)

The "reasoning" is in the framework, not the LLM.

**6. CoT Subsumption is Not Reasoning**

> "Inherently, Graph of Thoughts subsumes both Chain-of-Thought as well as Tree of Thoughts" (p.3)

Subsuming CoT and ToT means GoT is a **more powerful scaffolding**, not that LLMs reason better.

### What GoT Actually Demonstrates

1. **Better scaffolding improves performance** on tasks requiring composition
2. **LLMs can handle small sub-problems** when chunked appropriately
3. **Classical algorithms (merge sort) still needed** for complex operations
4. **Graph structure must be externally imposed** — LLMs don't construct it
5. **Even with scaffolding, performance ceilings exist** — fundamental limits remain

---

## Relationship to Other Papers

### Extends
- **Tree of Thoughts (2305.10601)**: GoT generalizes ToT by allowing aggregation; same System 1/System 2 framing
- **Chain-of-Thought (2201.11903)**: GoT subsumes CoT as a special case
- **Self-Consistency (2203.11171)**: GoT subsumes CoT-SC; aggregation generalizes voting

### Supports
- **Faith and Fate (2305.18654)**: Both show decomposition helps but doesn't create reasoning; LLMs handle sub-problems within distribution
- **Interplay (2512.07783)**: Both show external scaffolding surfaces existing capability, doesn't create new reasoning
- **Illusion of Thinking (2506.06941)**: Both show complexity thresholds; GoT addresses by chunking, not by LLM reasoning better
- **GSM-Symbolic (2410.05229)**: Both show LLMs fail on variations; GoT works by reducing to known patterns

### Related Work
- **LLM-Modulo (Kambhampati)**: Similar philosophy — use LLM for heuristics, external systems for correctness
- **Faithful CoT (2301.13379)**: Both recognize need for external verification/execution

---

## REBUTTALS TO THIS PAPER (as Counter-Evidence)

### Why GoT Should NOT Be Cited as Evidence for LLM Reasoning

1. **GoO is pre-constructed**: The reasoning structure is designed by humans, not discovered by the LLM

2. **Authors admit LLMs can't sort**: Explicit acknowledgment of fundamental capability limits

3. **Improvement from classical algorithms**: 62% gain comes from merge sort, not LLM insight

4. **Performance ceiling**: ~75% on sorting, ~91% on set operations — genuine reasoners would be near-perfect

5. **External scaffolding dominates**: Controller, Prompter, Parser, Scoring all external to LLM

6. **No emergent graph construction**: LLMs follow predefined graph, don't construct reasoning paths

### Limitations (Authors Acknowledge)

- "Requires careful thought structure design" — human engineering required
- "Computational cost increases with graph complexity" — more scaffolding = more cost
- "Depends on LLM capability for sub-tasks" — LLM must handle atomic operations
- Limited to tasks where decomposition structure is known

---

## Key Quotes

> "The user constructs a GoO instance, which prescribes the execution plan... GoO is a **static structure constructed once, before execution starts**."

> "The considered LLMs are **unable to sort** a sequence of such numbers correctly beyond a certain length"

> "We select merge sort for its straightforward alignment with the graph structure of GoT"

> "Inherently, Graph of Thoughts subsumes both Chain-of-Thought as well as Tree of Thoughts"

> "GoT enables combining arbitrary thoughts, for example aggregating them all into one"

---

## Critical Assessment

### What This Paper Actually Contributes

1. **Modular scaffolding framework**: Clean architecture for implementing reasoning patterns
2. **Aggregation operation**: Novel contribution allowing thought merging
3. **Demonstration of classical + LLM hybrid**: Shows value of combining classical algorithms with LLM sub-routines
4. **Cost-quality tradeoffs**: Systematic analysis of compute vs performance

### For Thesis

GoT **strongly supports** the pattern matching thesis:

1. **GoO is external scaffolding** — reasoning structure is pre-defined by humans
2. **Authors admit fundamental limits** — LLMs cannot sort beyond short sequences
3. **Classical algorithms provide the gain** — merge sort, not LLM insight
4. **Performance ceilings persist** — 75%, not 100% on deterministic tasks
5. **LLM role is pattern completion** — handle small, in-distribution sub-problems

**The paper is evidence FOR the thesis, not against it.**

---

## Status
- [x] Read complete (full 63-page PDF)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
