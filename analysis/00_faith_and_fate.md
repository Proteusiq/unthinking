# Paper Analysis: Faith and Fate

## Metadata
- **arXiv ID**: 2305.18654
- **Title**: Faith and Fate: Limits of Transformers on Compositionality
- **Authors**: Dziri et al. (Allen AI, UW, USC, UChicago)
- **Date**: May 2023
- **Venue**: NeurIPS 2023
- **Stance**: AGAINST genuine reasoning (FOUNDATIONAL)
- **Role**: Provides theoretical mechanism for pattern-matching hypothesis

---

## Why This Paper Matters

This is the **theoretical foundation** that GSM-Symbolic and many "against" papers build upon. It provides:
1. The **computation graph framework** for analyzing reasoning
2. **Proof of exponential error accumulation** in compositional tasks
3. The **"linearized subgraph matching"** hypothesis — the core mechanism

---

## Core Claims

1. **Transformers solve compositional tasks by reducing multi-step reasoning into linearized subgraph matching** — NOT by learning systematic problem-solving
2. **Error propagation is exponential** — small per-step errors compound to near-certain failure at scale
3. **High in-distribution accuracy masks fundamental limitations** — models fail catastrophically OOD
4. **Scratchpads/CoT don't fix the problem** — even with explicit reasoning steps, OOD generalization fails

---

## Methodology

### Computation Graph Framework
- Represent algorithms as **directed acyclic graphs (DAGs)**
- Nodes = intermediate values
- Edges = function applications
- Enables systematic complexity measurement:
  - **Reasoning depth**: longest path from input to output
  - **Reasoning width**: max parallel computations
  - **Average parallelism**: |V| / depth

### Three Compositional Tasks
| Task | What It Tests | Primitives |
|------|---------------|------------|
| **Multi-digit multiplication** | Procedural arithmetic | 1-digit mult, sum, mod 10, carry |
| **Einstein's puzzle** | Constraint satisfaction | Elimination function |
| **Dynamic programming** | Recursive composition | max, sum, indicators |

### Experimental Setup
- Models: GPT-3, ChatGPT, GPT-4
- Settings: Zero-shot, few-shot, fine-tuning
- With and without scratchpads (explicit reasoning steps)
- Train on all instances up to size N, test on larger sizes

---

## Key Evidence

### Finding 1: Catastrophic OOD Failure
| Setting | In-Distribution | Out-of-Distribution |
|---------|-----------------|---------------------|
| Fine-tuned with scratchpad | ~100% | ~0% |
| Few-shot GPT-4 | High | Rapid decay |

**Critical**: Even exhaustive training on ALL instances up to size N fails on N+1.

### Finding 2: Subgraph Matching Mechanism
They directly measured: "How often do correct predictions require computation subgraphs seen in training?"

**Result**: Correct predictions have **significantly higher frequency** of matching training subgraphs than incorrect predictions.

> "Models' success can be attributed, in part, to their exposure to training examples sub-graphs that involve the same computations required for solving test examples"

### Finding 3: Error Type Analysis
For each node in computation graph:
- **Fully correct**: Node and all ancestors correct
- **Local error**: Parents correct, but node computation wrong (1-hop failure)
- **Propagation error**: Node computation correct, but inherited wrong values
- **Restoration error**: Correct value despite wrong computation (memorization!)

**Results**:
- Fully correct ratio: ~100% at layer 1, drops to ~0% at deeper layers
- Propagation errors dominate over local errors
- Restoration errors indicate memorization

### Finding 4: Grokking Doesn't Help
- Trained GPT-3 for 60 epochs (420K steps, $50K cost)
- No OOD generalization emerged even with extended training
- Grokking may require simpler tasks

---

## Theoretical Results (Critical)

### Proposition 4.1: Parallel Error Accumulation (Width)
If an algorithm requires n independent applications of function g, and each has error probability ε > 0:

```
P(final error) → 1 exponentially as n increases
```

Even if ε is small (e.g., 1%), with n=100 parallel applications: P(all correct) ≈ 0.37

### Proposition 4.2: Sequential Error Accumulation (Depth)
If an algorithm requires n iterated applications of g:

```
P(final error) ≥ 1 - (1-ε-c)^(n-1) · (1 - ε - c/(c+ε))
```

Where c = probability of "recovering" from an error by chance.

**Key insight**: If c << ε (recovery rare), then P(error) → 1 exponentially.

### Why This Matters
These propositions prove that **any estimator** (including transformers) will fail at compositional tasks as complexity grows, unless it achieves ε = 0 (perfect single-step accuracy).

---

## Limitations & Issues

### Methodological Concerns

1. **Task Selection Bias**
   - Only 3 tasks, all highly structured/algorithmic
   - May not represent "reasoning" in natural domains

2. **Definition of Correct**
   - Binary correctness may be too strict
   - Doesn't capture "approximately correct" reasoning

3. **Scratchpad Limitations**
   - Their scratchpad is a specific linearization
   - Other reasoning formats not tested

4. **Model Vintage**
   - GPT-3/4 in 2023
   - Newer models (o1, DeepSeek-R1) may differ

### Interpretive Concerns

1. **Subgraph Matching ≠ No Reasoning**
   - Humans also use pattern recognition + rules
   - The question is degree, not binary

2. **OOD Definition**
   - "Larger size" is one type of OOD
   - Models may generalize in other dimensions

3. **Grokking Timeline**
   - They stopped at 60 epochs
   - Grokking can require much longer (100K+ steps in some tasks)

4. **ε > 0 Assumption**
   - With enough training, ε might approach 0 for simple primitives
   - Their proof assumes fixed ε

---

## Graph Links to Other Papers

### Papers That BUILD ON This
| Paper | How It Uses Faith and Fate |
|-------|---------------------------|
| **GSM-Symbolic** (2410.05229) | Cites for pattern-matching hypothesis, applies to math word problems |
| **The Illusion of Thinking** (2506.06941) | Extends complexity analysis to LRMs, same theoretical frame |
| **CoT is a Mirage** (2508.01191) | Same mechanism: distribution shift breaks learned patterns |
| **Semantic Deception** (2512.20812) | Same finding: surface patterns mislead |
| **Comprehension Without Competence** (2507.10624) | Extends to architectural limits |

### Papers That CHALLENGE This
| Paper | Challenge |
|-------|-----------|
| **CoT Without Prompting** (2402.10200) | CoT exists intrinsically — suggests reasoning not just matching |
| **DeepSeek-R1** (2501.12948) | Novel behaviors emerge via RL without training patterns |
| **Tool Augmentation papers** | Same tasks succeed with tools — execution vs reasoning |
| **Algorithmic Primitives** (Oct 2025) | Finds compositional geometry enabling transfer |

### Papers With RELATED THEORY
| Paper | Theoretical Connection |
|-------|----------------------|
| **Li et al.** (1-NN) | Proves single transformer layer = 1-nearest neighbor |
| **Razeghi et al.** | Training frequency → performance (same mechanism) |
| **Schaeffer et al.** | Exponential decay with token count |

---

## Key Quotes

> "Transformer LLMs solve compositional tasks by reducing multi-step compositional reasoning into linearized subgraph matching, without necessarily developing systematic problem-solving skills."

> "Models are able to correctly perform single-step reasoning, potentially due to memorizing such single-step operations during training, but fail to plan and compose several of these steps for an overall correct reasoning."

> "These findings suggest that the autoregressive characteristic of transformers, which forces them to tackle problems sequentially, presents a fundamental challenge that cannot be resolved by instructing the model to generate a step-by-step solution."

---

## Interaction Diagram

```
                         THEORETICAL FOUNDATIONS
                    ┌─────────────────────────────────┐
                    │ • Li et al. (1-NN transformers) │
                    │ • Razeghi et al. (frequency)    │
                    │ • Schaeffer et al. (exp decay)  │
                    └──────────────┬──────────────────┘
                                   │ builds on
                                   ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     Faith and Fate (May 2023)                            │
│                     Dziri et al. · Allen AI                              │
│                                                                          │
│  PROVIDES:                                                               │
│  • Computation graph framework                                           │
│  • Subgraph matching hypothesis                                          │
│  • Exponential error accumulation proofs                                 │
│  • Empirical validation on 3 tasks                                       │
└──────────────────────────────────────────────────────────────────────────┘
           │                    │                        │
           │ directly           │ mechanism              │ challenged by
           │ extends            │ adopted by             │
           ▼                    ▼                        ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ GSM-Symbolic     │  │ • CoT is a Mirage    │  │ • CoT Without Prompting │
│ (Oct 2024)       │  │ • Illusion of        │  │   → intrinsic reasoning │
│                  │  │   Thinking           │  │ • DeepSeek-R1           │
│ Applies to       │  │ • Semantic Deception │  │   → emergent behaviors  │
│ math word        │  │                      │  │ • Tool papers           │
│ problems         │  │ Same mechanism:      │  │   → execution not       │
│                  │  │ pattern matching     │  │     reasoning           │
└──────────────────┘  │ fails OOD            │  └─────────────────────────┘
                      └──────────────────────┘
```

---

## Relevance to "Thinking Machine That Doesn't Think"

### Central Contribution
This paper provides the **mechanistic explanation** for why LLMs appear to reason but fail:
1. They match patterns from training, not apply rules
2. Errors compound exponentially with complexity
3. In-distribution success creates illusion of capability

### For Your Thesis (OLMo 3 Experiments)
If reasoning exists in base models (your claim), Faith and Fate suggests:
- It exists as **learned subgraph patterns**
- RL "surfaces" these patterns, doesn't create new reasoning
- The patterns are **predictive** (interpolation) not **generative** (extrapolation)

### Key Tension to Resolve
Faith and Fate says: "Subgraph matching, not reasoning"
But: If base models have CoT in top-k tokens (Wang & Zhou), are the subgraphs themselves a form of reasoning?

---

## Status
- [x] Read
- [x] Analyzed
- [x] Graph links identified
- [x] Interaction diagram created
- [x] Theoretical results extracted
- [ ] Cross-referenced with rebuttals
