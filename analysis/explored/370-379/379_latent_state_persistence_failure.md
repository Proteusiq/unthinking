# Paper Analysis: On the Failure of Latent State Persistence in LLMs

## Metadata
- **arXiv ID**: 2505.10571
- **Title**: On the Failure of Latent State Persistence in Large Language Models
- **Authors**: Jen-tse Huang, Kaiser Sun, Wenxuan Wang, Mark Dredze
- **Date**: May 2025
- **Venue**: ICML
- **Code**: [github.com/penguinnnnn/LLM-Working-Memory](https://github.com/penguinnnnn/LLM-Working-Memory)
- **Stance**: Supports thesis - LLMs cannot maintain persistent internal states (working memory), function as "reactive post-hoc reasoners" rather than proactive planners

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  LLMs cannot instantiate, maintain, or manipulate latent states.   │
│  They generate responses based on statistical likelihood within    │
│  dialogue patterns - not by grounding in a stable internal state.  │
│                                                                     │
│  KEY EVIDENCE: Empirical State Mass (ESM) = 0 for most models      │
│  (theory predicts ESM = 1.0 for a persistent agent)                │
└─────────────────────────────────────────────────────────────────────┘
```

**The "False Promise" Problem**: When an LLM says "I have thought of a number," it has committed to nothing. There is no number stored internally - only a statistical tendency to respond to subsequent queries in ways that match the conversational pattern.

---

## Why This Paper Matters

This paper provides **direct experimental evidence** that LLMs lack working memory - a fundamental requirement for genuine reasoning. Three converging experiments demonstrate:

1. **Probability violations**: LLMs break basic axioms (sum of probabilities ≠ 1)
2. **Inevitable self-contradiction**: 100% failure rate given enough queries
3. **State-tracking failure**: Cannot maintain invariants through transformations

The findings directly challenge claims that scaling or reasoning traces (o1, DeepSeek-R1) solve fundamental architectural limitations.

---

## Methodology

### Experiment 1: Number Guessing Game
- **Tests**: Whether LLMs can commit to a hidden number
- **Metric**: Empirical State Mass (ESM) - sum of "Yes" probabilities should equal 1.0
- **Setup**: 200 trials per query, 17 frontier models, state space n ∈ {2,3,5,7,9,10,20,30,40}

### Experiment 2: Yes-No Game
- **Tests**: Dynamic logical consistency over time
- **Metric**: Mean Steps to Contradiction (MSC), Pass Rate (PR)
- **Setup**: 60 objects across 5 physical dimensions, T=250 max queries, 200 trials

### Experiment 3: Mathematical Mentalism
- **Tests**: State evolution fidelity (tracking transformations on hidden variables)
- **Metric**: Invariant Success Rate (ISR)
- **Setup**: Josephus problem variant, 150 trials, 17 models + 5 LRMs

---

## Key Evidence

### Finding 1: LLMs Violate Basic Probability Axioms

| Model | ESM (n=10) | Expected | Interpretation |
|-------|------------|----------|----------------|
| GPT-4o-Mini-2024-07-18 | **0** | 1.0 | Total failure |
| GPT-4o-2024-05-13 | **0** | 1.0 | Total failure |
| GPT-4o-2024-08-06 | **1.085** | 1.0 | Closest to ideal |
| GPT-4o-2024-11-20 | **0** | 1.0 | Total failure |
| o1-Mini-2024-09-12 | **0.005** | 1.0 | Near-total failure |
| o3-Mini-2025-01-31 | **0.205** | 1.0 | Severe failure |
| DeepSeek-R1 | **0.640** | 1.0 | Substantial failure |
| Qwen2.5-72B | **0** | 1.0 | Total failure |
| DeepSeek-V3 | **0** | 1.0 | Total failure |

**8/17 frontier models achieve ESM = 0** - they commit to nothing at all.

### Finding 2: Non-Monotonic Scaling

| Model | ESM | Size |
|-------|-----|------|
| LLaMA-3.1-8B | **0.980** | 8B |
| LLaMA-3.1-70B | **0.465** | 70B |
| LLaMA-3.1-405B | **1.195** | 405B |

**Smaller models outperform larger models** - LLaMA-8B (ESM=0.98) beats LLaMA-70B (ESM=0.465). Scaling does not monotonically improve state persistence.

### Finding 3: Inevitable Self-Contradiction (Yes-No Game)

| Model | MSC | Pass Rate | Failures |
|-------|-----|-----------|----------|
| GPT-4o-Mini | **41.43** | **0.0%** | 200/200 |
| GPT-4o | **74.55** | **13.5%** | 173/200 |

**GPT-4o-Mini contradicts itself within ~41 queries 100% of the time.** Even GPT-4o fails 86.5% of trials.

### Finding 4: Knowledge Doesn't Help - It Hurts

| Condition | MSC | Pass Rate |
|-----------|-----|-----------|
| Baseline | 74.55 | 13.5% |
| + Ground-truth hints | **55.34** | **3.0%** |

Providing factual knowledge **decreased** performance (MSC dropped from 74.55 to 55.34). Contradictions stem from **logical drift, not factual ignorance**.

### Finding 5: Reasoning Traces Don't Bridge the Gap

| Model | Zero-shot ISR | With CoT/LRM |
|-------|---------------|--------------|
| GPT-4o-2024-05-13 | 2.7% | 17.3% (CoT) |
| GPT-4o-2024-08-06 | 2.0% | 20.7% (CoT) |
| o1-Mini | - | 50.0% |
| o3-Mini | - | 96.7% |
| DeepSeek-R1 | - | **100%** |

CoT helps but doesn't solve the problem: 17.3% = 82.7% still fail. Long Reasoning Models (o3, R1) achieve high ISR **by externalizing state** - they transform the problem from state persistence to sequence processing.

### Finding 6: "Blue-Seven" Phenomenon

| Model | Probability of Saying "Yes" to 7 |
|-------|----------------------------------|
| All models | **60-90%** |
| o1-mini correct predictions | **66.7%** involving 7 |
| o4-mini correct predictions | **68.5%** involving 7 |

Models collapse to human-centric priors (blue-seven bias) rather than maintaining uniform state distributions.

---

## Theoretical Framework

The paper formalizes **Latent State Persistence (LSP)**:

```
┌─────────────────────────────────────────────────────────────────────┐
│  LSP DEFINITION                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  An agent has LSP if it can:                                        │
│  1. INSTANTIATE: Choose and commit to a hidden variable             │
│  2. MAINTAIN: Preserve that commitment across interactions          │
│  3. MANIPULATE: Update the state based on external operations       │
│                                                                     │
│  LLMs fail at ALL THREE.                                            │
└─────────────────────────────────────────────────────────────────────┘
```

### Why Scratchpads Don't Solve LSP

The paper argues that CoT, scratchpads, and LRMs are **engineering bypasses**, not solutions:

> "They transform an internal state problem into a sequence-processing problem."

The model doesn't "know" a hidden variable - it predicts what a persistent agent would say based on statistical likelihood.

---

## Limitations

1. **Architecture scope**: Study evaluates autoregressive Transformers; alternatives (SSMs, RNNs) may differ
2. **Mechanistic gap**: No interpretability analysis of why scaling fails
3. **Sample stability**: Figure 6 shows estimates stabilize after ~150 runs

---

## Relevance to Thesis

### Direct Support for "Reasoning is Predictive, Not Generative"

This paper provides the **strongest empirical evidence** that LLMs cannot maintain working memory:

1. **Probability violations** → LLMs don't commit to states
2. **Inevitable contradiction** → Cannot maintain consistency across reasoning chains
3. **Human priors dominate** → Statistical shortcuts, not computation
4. **Knowledge hurts** → Logical drift is the problem, not factual gaps
5. **Externalization required** → Reasoning traces are crutches, not capabilities

### Key Quote

> "LLMs function as reactive post-hoc solvers rather than proactive planners with LSP... they do not 'know' a hidden variable; they predict what a persistent agent would say based on statistical likelihood."

---

## Graph Links

### Builds On
- **Working Memory Capacity of ChatGPT** (2305.03731) - extends WM findings to state persistence
- **Faith and Fate** (2305.18654) - same linearized subgraph matching mechanism

### Related Findings
- **Two-Hop Curse** (2411.16353) - compositional failures from separate facts
- **Illusion of Thinking** (2506.06941) - LRMs don't reason, they search

### Strengthens
- **30 Cognitive Biases in LLMs** (2410.15413) - blue-seven is another bias
- **Not Strong Abstract Reasoners** (2305.19555) - same architectural limitation

---

## Key Quotes

> "The results reveal a persistent inability of LLMs to instantiate a consistent internal state, even with extended reasoning chains."

> "Even modern reasoning-enhanced LLMs, such as o1 and DeepSeek-R1, exhibit significant shortcomings in LSP."

> "We propose that LLMs function as reactive post-hoc solvers rather than proactive planners with LSP."

---

## Status
- [x] Read
- [x] Analyzed
- [x] Evidence extracted
- [x] Graph links identified
- [x] Cross-referenced with corpus
