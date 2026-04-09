## Summary

This paper introduces the **globality degree** as a formal measure of why certain reasoning tasks are hard for Transformers. The globality degree measures the minimum number of input tokens needed to correlate non-trivially with the target. Tasks with high globality (requiring attention to many tokens simultaneously) cannot be efficiently learned by Transformers, even with polynomial-sized scratchpads, unless the scratchpad provides explicit intermediate steps ("educated scratchpad").

## Methodology

- **Theoretical framework**: Complexity measure relating learnability to NC⁰ circuits
- **Benchmark**: Cycle task—determining if two vertices are connected in a graph
- **Experiments**: GPT2-style Transformers (10M, 25M, 85M parameters)
- **Scratchpad variants**: Agnostic, educated, inductive

## Key Findings

### The Globality Barrier
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

### Cycle Task Results
- **Globality degree**: n (must examine n edges to determine connectivity)
- **Learning complexity**: Exponential in n
  - 10M model: Fails for n ≥ 7 after 100k iterations
  - 25M model: Fails for n ≥ 9
  - 85M model: Fails for n ≥ 10
- **Theorem 1**: Proves this mathematically under technical assumptions

### Scratchpad Analysis
| Scratchpad Type | Can Break Globality? | OOD Generalization? |
|----------------|---------------------|---------------------|
| Agnostic | No | N/A |
| Educated (DFS) | Yes | No |
| Inductive | Yes | Yes (6x length) |

### Agnostic Scratchpad Failure
- Adding polynomial-size memory doesn't help if not supervised
- Theorem 2: Formal proof that agnostic scratchpads cannot break globality barrier
- Model can't discover intermediate steps on its own

### Educated vs. Inductive Scratchpads
- **Educated**: Fully supervised intermediate steps (e.g., full DFS path)
- **Inductive**: Only teaches the pattern, model must compose
- Inductive achieves length generalization: 10→18 digits (addition), 30→50-55 bits (parity)

## Critical Observations

### Why Transformers Fail on Global Reasoning
1. **Expressivity ≠ Learnability**: Transformers CAN express TC⁰/TC¹ functions (connectivity) but can't LEARN them
2. **Local attention limitation**: Each token can only correlate with O(1) other tokens efficiently
3. **No global aggregation**: Can't efficiently propagate information across n tokens

### Contrast with Expressivity Results
```
Expressivity (what Transformers CAN compute):  TC¹ (includes connectivity)
Learnability (what Transformers CAN learn):    Correlates with NC⁰

The gap explains why reasoning benchmarks are hard
```

### Parity as Canonical Hard Case
- Parity of k bits has globality = k
- Any k-1 bits are uninformative about the parity
- Matches known hardness results for neural networks

## Relevance to Thesis

**STRONGLY SUPPORTS** the thesis:

1. **Formal limitation**: Proves Transformers cannot learn certain reasoning tasks regardless of scale
2. **Pattern matching bound**: Globality captures the "must see all relevant evidence at once" requirement
3. **Scratchpad revelation**: Models can't discover reasoning steps—they must be taught

### Implications for LLM Reasoning Claims
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

## Limitations

- Theorem 1 requires specific technical assumptions
- Cycle task is synthetic—unclear how results map to natural language
- Globality measure requires knowing ground truth correlations

## Connections

- **Supports**: Paper #1 (Faith and Fate), Paper #307 (Expressiveness Hierarchy)
- **Related**: Paper #308 (BAPO Bounds), Paper #10 (Transformer Reasoning)
- **Mechanism**: Provides theoretical foundation for why CoT helps—it lowers globality
