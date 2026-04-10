# Paper Analysis: Tree of Thoughts: Deliberate Problem Solving with Large Language Models

## Metadata
- **arXiv ID**: 2305.10601
- **Title**: Tree of Thoughts: Deliberate Problem Solving with Large Language Models
- **Authors**: Shunyu Yao, Dian Yu, Jeffrey Zhao, Izhak Shafran, Thomas L. Griffiths, Yuan Cao, Karthik Narasimhan (Princeton University, Google DeepMind)
- **Date**: May 2023
- **Venue**: NeurIPS 2023

---

## Core Claims

1. **LLMs are "System 1"**: The authors explicitly characterize LLM token-level choices as "reminiscent of 'System 1'" (associative, automatic).

2. **ToT adds external "System 2"**: Tree of Thoughts provides deliberate search scaffolding (BFS/DFS) on top of LLM generation.

3. **60% fail at first step**: Around 60% of CoT samples fail after the first three words, indicating fundamental generation quality issues.

4. **Generation bottleneck**: Performance is limited by thought generation quality, not evaluation—GPT-4 gen + GPT-3.5 eval outperforms GPT-3.5 gen + GPT-4 eval.

---

## Methodology

### Tasks Tested
- **Game of 24**: Combinatorial arithmetic (4% → 74% with ToT)
- **Creative Writing**: Subjective evaluation by GPT-4
- **Mini Crosswords**: Constraint satisfaction (60% word completion)

### ToT Framework
1. Generate candidate "thoughts" (intermediate steps)
2. Evaluate candidates (sure/maybe/impossible)
3. Search via BFS or DFS with backtracking
4. Prune unpromising branches

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY INSIGHT: ToT SUPPORTS the pattern-matching thesis             │
│                                                                     │
│  Authors explicitly call LLM "System 1" (associative)              │
│  ToT adds classical search (BFS/DFS) on top                        │
│  60% of CoT samples fail at FIRST STEP (first 3 words!)            │
│  The bottleneck is GENERATION quality, not evaluation              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Quantitative | Context |
|---------|--------------|---------|
| CoT failure rate | 60% fail at first 3 words | Game of 24 |
| Generation dominates | GPT-4 gen = 64%; GPT-3.5 gen = 31% | Same eval quality |
| Performance ceiling | 74% on Game of 24 | Not 100% on well-defined task |
| Compute cost | 5-100× more tokens | Search overhead |
| Marginal gain when CoT works | GSM8K: 86%→90% | ToT adds little when patterns suffice |

---

## Relationship to Other Papers

### Supports
- **#295 Test-Time Compute Overestimation** (2603.15377): Both show search has limits
- **#296 RLVR Structural Convergence** (2602.11792): Both show models surface cached patterns
- **#298 Self-MoA** (2502.00674): Both show quality > diversity in sampling

### Extends
- **#300 Graph of Thoughts** (2308.09687): GoT extends ToT with graph structure

### Provides Context For
- **#302 Scaling Test-Time Compute** (2408.03314): ToT is a form of test-time compute scaling

---

## REBUTTALS

### Known Rebuttals
None directly rebutting ToT, but the paper itself acknowledges limitations.

### Limitations (Authors Acknowledge)
1. Only three "relatively simple" tasks tested
2. Task-specific engineering required for each domain
3. 5-100× compute cost overhead
4. Model capability dependent (GPT-3.5+ToT = 19% vs GPT-4+ToT = 74%)

---

## Key Quotes

> "The simple associative token-level choices of LMs are also reminiscent of 'System 1', and thus might benefit from augmentation by a more deliberate 'System 2' planning process."

> "Notably, around 60% of CoT samples already failed the task after generating the first step, or equivalently, the first three words."

> "The game's bottleneck is thought generation" — quality of candidates matters more than evaluation

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT ToT ACTUALLY DEMONSTRATES                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ✓ Explicit search improves performance on verifiable tasks        │
│  ✓ LMs can generate reasonable candidates (pattern completion)     │
│  ✓ LMs can provide rough heuristics (pattern recognition)          │
│  ✓ Backtracking fixes commitment errors (search, not reasoning)    │
│  ✓ Left-to-right decoding is fundamentally limited                 │
│                                                                     │
│  ✗ LMs can "think" or "reason" in any meaningful sense             │
│  ✗ ToT creates new reasoning capabilities                          │
│                                                                     │
│  ToT is evidence FOR the pattern-matching thesis, not against it.  │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

Despite being framed as enhancing "deliberate problem solving," ToT provides strong evidence for pattern matching: the authors explicitly call LLMs "System 1," improvements come from classical search algorithms, and 60% of samples fail at the first step.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
