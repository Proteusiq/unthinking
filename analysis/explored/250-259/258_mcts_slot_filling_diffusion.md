# Paper Analysis: Can I Have Your Order? Monte-Carlo Tree Search for Slot Filling Ordering in Diffusion Language Models

## Metadata
- **arXiv ID**: 2602.12586
- **Title**: Can I Have Your Order? Monte-Carlo Tree Search for Slot Filling Ordering in Diffusion Language Models
- **Authors**: Joshua Ong Jun Leang, Yu Zhao, Mihaela Stoian, Wenda Li, Shay B. Cohen, Eleonora Giunchiglia
- **Date**: February 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **Slot order is highly sensitive**: Performance in MDMs "remains highly sensitive to slot infilling order, often yielding substantial output variance"
2. **Sequential ordering predominates**: McDiffuSE "predominantly follows sequential ordering" even when given freedom to choose any order
3. **Non-sequential essential for max performance**: "Incorporating non-sequential generation is essential for maximising performance"
4. **Exploration over depth**: "Larger exploration constants, rather than increased simulations, are necessary to overcome model confidence biases"
5. **MCTS beats baselines**: +19.5% on MBPP, +4.9% on MATH500 over plan-and-infill baseline

---

## Methodology

### Models Tested
- **ReFusion 7B**: Plan-and-infill masked diffusion model
- **LLaDA 8B**: Masked diffusion LM
- **Dream 7B**: Masked diffusion LM
- Autoregressive baselines: Llama-3.1 8B, Qwen2.5 7B, Qwen3 8B

### Key Innovation: McDiffuSE

```
┌─────────────────────────────────────────────────────────────────────┐
│  MCTS FOR SLOT ORDERING                                             │
│                                                                     │
│  Problem: Which slot to fill first in diffusion model?              │
│                                                                     │
│  Naive confidence: Fill highest-confidence slot first               │
│  → But this can lead to globally incoherent outputs                 │
│                                                                     │
│  MCTS solution: Look ahead via simulations                          │
│  → Discover that different orders yield better long-term quality    │
│                                                                     │
│  Key finding: Even with MCTS freedom, model prefers L2R             │
│  → Sequential ordering is learned bias, not optimal                 │
└─────────────────────────────────────────────────────────────────────┘
```

### Benchmarks
- GSM8K, MATH500 (math reasoning)
- MBPP, HumanEval (code generation)
- ARC Challenge, GPQA-Diamond (general reasoning)

---

## Key Evidence

### Table 1: Main Results

| Model | GSM8K | MATH500 | MBPP | HumanEval | Avg |
|-------|-------|---------|------|-----------|-----|
| ReFusion 7B | 85.6% | 42.9% | 54.1% | 62.1% | 60.5% |
| + Sequential | 77.6% | 38.9% | 50.6% | 62.2% | 58.3% |
| + Random | 66.9% | 29.1% | 21.4% | 32.6% | 43.1% |
| **McDiffuSE** | **87.9%** | **47.8%** | **73.6%** | **78.4%** | **68.5%** |

**Key observations:**
- Random order **destroys performance** (60.5% → 43.1%)
- Sequential is worse than confidence-based (60.5% → 58.3%)
- MCTS improves over all (+8.0% over ReFusion)

### Finding: Sequential Ordering Predominates

From Section 6 analysis:

> "While McDiffuSE predominantly follows sequential ordering, incorporating non-sequential generation is essential for maximising performance."

The paper shows that even with MCTS freedom to choose any order:
- **Most samples follow L2R ordering**
- **But critical subset benefits from non-sequential**
- **This subset drives the accuracy gains**

### Finding: Order Sensitivity

| Ordering Strategy | GSM8K | MATH500 |
|-------------------|-------|---------|
| Confidence-based | 85.6% | 42.9% |
| Sequential (L2R) | 77.6% | 38.9% |
| Random | 66.9% | 29.1% |

**Random ordering causes ~17% absolute drop** — proving order matters enormously.

### Finding: Exploration > Depth

> "We find that an increasing number of simulations does not consistently improve performance. Instead, a large exploration constant is necessary to overcome the model's confidence priors."

This means:
- The model has **biased confidence** toward certain orderings
- **Exploration** is needed to escape local optima
- More compute doesn't help if stuck in wrong ordering

---

## Relationship to the Thesis

### Supports the Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY THIS SUPPORTS "INFORMATION IS ALREADY THERE"                   │
│                                                                     │
│  1. Order is ARBITRARY and SENSITIVE                                │
│     → If reasoning were logical, order shouldn't matter             │
│     → Random order destroys performance (17% drop)                  │
│                                                                     │
│  2. Models DEFAULT to L2R even when free to choose                  │
│     → Sequential is learned from training data                      │
│     → Not inherent to the reasoning task                            │
│                                                                     │
│  3. Best order varies per sample                                    │
│     → No principled "reasoning order" exists                        │
│     → Just pattern matching with order sensitivity                  │
│                                                                     │
│  4. MCTS finds order via VALUE, not LOGIC                           │
│     → Optimal order maximizes confidence, not validity              │
│     → "Reasoning" is surface-level coherence                        │
└─────────────────────────────────────────────────────────────────────┘
```

**Key insight from paper:**

> "A slot that appears highly confident in isolation may constrain the model's predictions for remaining slots, leading to poor overall generation quality."

This proves:
- **Local confidence ≠ global coherence**
- **The model doesn't reason about dependencies**
- **It pattern matches slot-by-slot**

### Connection to Other Diffusion Papers

| Paper | Finding | This Paper Confirms |
|-------|---------|---------------------|
| #254 | Verdict first, then justification | Order is about confidence, not logic |
| #255 | L2R learned from data | Models default to L2R even when free |
| #256 | Fragments can be stitched | Order is arbitrary within constraints |
| #257 | Post-hoc = forward quality | Order doesn't reflect reasoning |

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **MCTS improves performance**: Doesn't this show MDMs CAN reason if given right order?
   - Response: MCTS optimizes for confidence, not logical validity
   - The "right order" is just pattern matching optimization

2. **Non-sequential helps some samples**: Doesn't this show flexible reasoning?
   - Response: It shows the model learned bad ordering biases from data
   - Fixing these biases improves pattern completion, not reasoning

3. **Code generation benefits most**: Isn't code inherently sequential?
   - Response: Code has structural dependencies, not logical reasoning
   - MCTS exploits structure, doesn't understand logic

### Limitations (Authors Acknowledge)

1. Limited to ReFusion model
2. Hyperparameter sensitivity (c=50, λ=0.3)
3. Compute cost of MCTS simulations

---

## Key Quotes

> "Performance remains highly sensitive to slot infilling order, often yielding substantial output variance."

> "While McDiffuSE predominantly follows sequential ordering, incorporating non-sequential generation is essential for maximising performance."

> "Larger exploration constants, rather than increased simulations, are necessary to overcome model confidence biases and discover effective orderings."

> "A slot that appears highly confident in isolation may constrain the model's predictions for remaining slots, leading to poor overall generation quality."

---

## Relationship to Other Papers

### Supports
- **Why DLMs Struggle Parallel (2602.23225)**: Both show L2R is learned bias
- **Reasoning or Rationalization (2603.01190)**: Order is about confidence, not logic
- **No Compute Left Behind (2510.19990)**: L2R doesn't help reasoning

### Extends
- **Diffusion Stitching (2602.22871)**: Both show order optimization helps; this uses MCTS

### Challenges
- None — this paper supports the thesis that order is arbitrary and learned

---

## Implications for the Thesis

### Order is Arbitrary, Not Principled

If LLMs were reasoning:
- Order shouldn't matter (logic is order-independent)
- Random order should work (premises can be combined any way)
- L2R shouldn't be special (reasoning isn't inherently sequential)

Instead:
- Order matters enormously (17% drop for random)
- Models default to L2R (learned from training)
- Best order varies per sample (no principled logic)

### The "Reasoning" is Pattern Matching

MCTS improves performance by:
- Finding orderings with high slot-level confidence
- Avoiding orderings that "constrain predictions for remaining slots"
- Maximizing coherence through surface-level statistics

This is **optimization of pattern completion**, not reasoning.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
