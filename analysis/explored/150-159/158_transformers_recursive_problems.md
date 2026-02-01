# Paper Analysis: Can Transformers Learn to Solve Problems Recursively?

## Metadata
- **arXiv ID**: 2305.14699
- **Title**: Can Transformers Learn to Solve Problems Recursively?
- **Authors**: Shizhuo Dylan Zhang, Curt Tigges, Stella Biderman, Maxim Raginsky, Talia Ringer
- **Affiliations**: EleutherAI, UIUC
- **Date**: May 2023 (revised June 2023)
- **Venue**: arXiv preprint

---

## Core Claims

1. **Transformers learn "shortcut" algorithms instead of true recursion**: Models approximate structurally recursive functions but don't actually implement recursive computation.

2. **Predictable failures from reconstructed algorithms**: By mechanistically interpreting the learned algorithms, the authors can correctly predict 91% of failure cases.

3. **Structural recursion is fundamentally hard for transformers**: The architecture struggles with tasks requiring genuine recursive decomposition — the exact tasks where symbolic tools excel.

4. **Memorization vs reasoning distinction**: Models learn to emulate input-output behavior but don't capture the underlying recursive structure.

---

## Methodology

### Tasks Evaluated
- **Structurally recursive functions** on formal data types
- Tasks relevant to programs and formal verification proofs
- Functions with well-defined recursive structure

### Analysis Approach
1. **Mechanistic interpretability**: Examining internal model behavior
2. **Algorithm reconstruction**: Identifying what the model actually computes
3. **Failure prediction**: Using reconstructed algorithms to predict errors
4. **Comparison with symbolic tools**: Testing where neural models underperform

### Key Insight
The authors reconstruct the actual algorithms transformers learn (which are NOT the intended recursive algorithms) and use these reconstructions to predict failures.

---

## Key Evidence

### 91% Failure Prediction
- By reconstructing the "shortcut" algorithms models learn
- Failures predictable from deviation between intended and learned algorithm
- Demonstrates models don't learn true recursive structure

### Shortcut Algorithms
- Models learn approximations that work on training distribution
- Shortcuts break on novel combinations
- Same pattern as compositional generalization failures

### Symbolic Tools Outperform
- Tasks requiring genuine recursion favor symbolic approaches
- Neural models fail exactly where recursion is essential
- Validates neuro-symbolic approaches

---

## Key Quotes

> "By reconstructing these algorithms, we are able to correctly predict 91 percent of failure cases."

> "Neural networks have in recent years shown promise for helping software engineers write programs and even formally verify them. While semantic information plays a crucial part in these processes, it remains unclear to what degree popular neural architectures like transformers are capable of modeling that information."

> "Our work provides a new foundation for understanding the behavior of neural networks that fail to solve the very tasks they are trained for."

---

## Relationship to Thesis

### STRONGLY SUPPORTS thesis that LLM reasoning is pattern matching

**Key connections**:

1. **Faith and Fate (Paper F1)**: Both show transformers use shortcuts instead of true algorithms — "linearized subgraph matching" = shortcut algorithms

2. **Beyond Memorization (Paper 5/102)**: Both show models learn patterns that break on unseen cases — same mechanism, different domain

3. **Grokked Transformers (Paper 143)**: Both examine implicit reasoning in transformers; this paper shows recursion-specific failures

4. **CoT Expressivity (Paper 152)**: Merrill shows CoT adds computational power theoretically, but this paper shows in practice transformers learn shortcuts, not algorithms

5. **Planning Gap (Paper 71)**: Both show ID success doesn't transfer to novel cases — 82.9% ID → 0% OOD parallels recursive function failure patterns

---

## Limitations (Authors Acknowledge)

1. Focus on specific structurally recursive functions
2. Limited to transformer architecture
3. Doesn't address if training interventions could help

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"Models can learn recursion with enough data"**: Physics of LLMs 2.1 (Paper 42) shows length generalization possible in narrow domains
2. **"CoT could enable true recursion"**: But Paper 152 shows even with CoT, complexity bounds remain

### Why Rebuttals Are Limited
- 91% prediction accuracy is strong empirical evidence
- Mechanistic interpretability provides causal understanding
- Results consistent with broader pattern matching literature

---

## Implications for Thesis

1. **Recursion requires genuine reasoning**: And transformers don't do genuine reasoning
2. **Shortcut algorithms = pattern matching**: Models learn surface-level correlations
3. **Failure prediction = no robustness**: If failures are predictable from surface patterns, robustness is impossible
4. **Symbolic tools have a role**: Neuro-symbolic approaches justified

---

## Status
- [x] Read complete (abstract version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
