# Paper Analysis: How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad

## Metadata
- **arXiv ID**: 2406.06467
- **Title**: How Far Can Transformers Reason? The Globality Barrier and Inductive Scratchpad
- **Authors**: Emmanuel Abbe, Samy Bengio, Aryo Lotfi, Colin Sandon, Omid Saremi (EPFL, Apple)
- **Date**: June 2024
- **Venue**: arXiv preprint

---

## Core Claims

1. **Globality degree determines learnability**: Minimum tokens needed to correlate with target determines sample complexity.

2. **High globality → exponential complexity**: Tasks requiring attention to many tokens simultaneously cannot be efficiently learned.

3. **Agnostic scratchpads cannot break barrier**: Polynomial-size memory without supervision doesn't help.

4. **Educated scratchpads work**: Supervised intermediate steps break the barrier.

---

## Methodology

### Theoretical Framework
Complexity measure relating learnability to NC⁰ circuits

### Benchmark
Cycle task—determining if two vertices are connected in a graph

### Experiments
GPT2-style Transformers (10M, 25M, 85M parameters)

### Scratchpad Variants
| Type | Can Break Globality? | OOD Generalization? |
|------|---------------------|---------------------|
| Agnostic | No | N/A |
| Educated (DFS) | Yes | No |
| Inductive | Yes | Yes (6x length) |

```
┌─────────────────────────────────────────────────────────────────────┐
│  GLOBALITY CONJECTURE                                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Transformers can efficiently weak-learn a distribution             │
│  IFF its globality degree is constant (O(1))                        │
│                                                                     │
│  High globality → Exponential sample complexity                     │
│  Low globality  → Polynomial sample complexity                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

### Cycle Task Results
- **Globality degree**: n (must examine n edges to determine connectivity)
- **Learning complexity**: Exponential in n
  - 10M model: Fails for n ≥ 7 after 100k iterations
  - 25M model: Fails for n ≥ 9
  - 85M model: Fails for n ≥ 10
- **Theorem 1**: Proves this mathematically under technical assumptions

### Agnostic Scratchpad Failure
- Adding polynomial-size memory doesn't help if not supervised
- Theorem 2: Formal proof that agnostic scratchpads cannot break globality barrier
- Model can't discover intermediate steps on its own

### Expressivity vs Learnability
```
Expressivity (what Transformers CAN compute):  TC¹ (includes connectivity)
Learnability (what Transformers CAN learn):    Correlates with NC⁰

The gap explains why reasoning benchmarks are hard
```

---

## Relationship to Other Papers

### Supports
- **#1 Faith and Fate** (2305.18654): Both show compositional reasoning limits
- **#307 Expressiveness Hierarchy** (2602.01763): Both prove architectural constraints

### Related
- **#308 BAPO Bounds** (2602.02909): Both establish theoretical foundations
- **#10 Transformer Reasoning**: Both analyze architectural limitations

---

## REBUTTALS

### This Paper Provides Foundation For
- Why CoT works: it reduces autoregressive globality to O(1) per step
- Why unsupervised reasoning fails: models can't discover intermediate steps
- Why scaling doesn't solve global reasoning: exponential sample complexity

### Limitations (Authors Acknowledge)
1. Theorem 1 requires specific technical assumptions
2. Cycle task is synthetic—unclear how results map to natural language
3. Globality measure requires knowing ground truth correlations

---

## Key Quotes

> "Efficient weak learning is achievable by a regular Transformer IFF globality degree is constant."

> "Agnostic scratchpads cannot break the globality barrier."

> "The fact that agnostic scratchpad doesn't help means that the model cannot discover the intermediate steps on its own."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  Claimed: LLMs "reason" via Chain-of-Thought                        │
│  Reality: Without supervised CoT, globality barrier blocks learning │
│                                                                     │
│  CoT works because it:                                              │
│  1. Reduces autoregressive globality to O(1) per step               │
│  2. Provides the "how to reason" externally                         │
│  3. Model learns to pattern-match reasoning templates               │
└─────────────────────────────────────────────────────────────────────┘
```

**STRONGLY SUPPORTS** the thesis:

1. **Formal limitation**: Proves Transformers cannot learn certain reasoning tasks regardless of scale
2. **Pattern matching bound**: Globality captures the "must see all relevant evidence at once" requirement
3. **Scratchpad revelation**: Models can't discover reasoning steps—they must be taught

**Stance**: SUPPORTS

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
