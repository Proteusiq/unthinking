# Paper Analysis: Two-Hop Reasoning in Context

## Metadata
- **arXiv ID**: 2502.13913
- **Title**: How Do LLMs Perform Two-Hop Reasoning in Context?
- **Authors**: Tianyu Guo, Hanlin Zhu, Ruiqi Zhang, Jiantao Jiao, Song Mei, Michael I. Jordan, Stuart Russell
- **Date**: February 2025
- **Institution**: UC Berkeley (Statistics & EECS)
- **Code**: [github.com/GuoTianYu2000/twohopIC](https://github.com/GuoTianYu2000/twohopIC)
- **Stance**: Supports thesis - pre-trained LLMs collapse to random guessing on in-context two-hop reasoning when distractors present

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  IN-CONTEXT TWO-HOP REASONING FAILS WITH DISTRACTORS               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Pre-trained LLMs (Llama2-7b):                                      │
│  • K=1 (no distractors): 82% accuracy                               │
│  • K=2 (1 distractor):   41% accuracy (chance = 50%)                │
│  • K=5 (4 distractors):  20% accuracy (chance = 20%)                │
│                                                                     │
│  P(correct) ≈ 1/K  →  RANDOM GUESSING among plausible answers      │
│                                                                     │
│  Fine-tuning on K=2 only:                                           │
│  • K=2: 100% accuracy (up from 41%)                                 │
│  • K=5: 86% accuracy (strong generalization)                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Why This Paper Matters

This paper complements the Two-Hop Curse (2411.16353) by testing **in-context** reasoning:
- **Two-Hop Curse**: Facts stored in weights → 0% composition
- **This paper**: Facts in prompt → random guessing with distractors

Together they show: LLMs cannot reliably compose two-hop inferences in ANY setting without explicit training.

---

## Key Evidence

### Pre-trained Llama2-7b Performance

| K (chains) | P(End-Target) | P(End-NonTarget) | Random Baseline |
|------------|---------------|------------------|-----------------|
| K=1 | **0.82** (0.01) | NA | 1.00 |
| K=2 | **0.41** (0.01) | 0.34 (0.01) | 0.50 |
| K=3 | **0.31** (0.01) | 0.20 (0.01) | 0.33 |
| K=4 | **0.25** (0.01) | 0.14 (0.00) | 0.25 |
| K=5 | **0.20** (0.01) | 0.11 (0.00) | 0.20 |

**P(correct) ≈ 1/K**: Model selects randomly among K plausible conclusions.

### Fine-tuned Performance (trained on K=2 only)

| K (chains) | P(End-Target) | P(End-NonTarget) |
|------------|---------------|------------------|
| K=1 | **1.00** (0.00) | NA |
| K=2 | **1.00** (0.00) | 0.00 (0.00) |
| K=3 | **0.92** (0.01) | 0.04 (0.01) |
| K=4 | **0.89** (0.01) | 0.03 (0.01) |
| K=5 | **0.86** (0.01) | 0.03 (0.00) |

**Strong length generalization**: K=2 training generalizes to K=5.

### Mechanistic Findings (3-Layer Transformer)

| Training Steps | Behavior |
|----------------|----------|
| 0-800 | Uniform probability ~0.2 across all 5 End tokens |
| 800+ | Sharp phase transition to structured reasoning |

**Minimal architecture**: 3-layer transformer required (2-layer insufficient)

**Learned mechanism** (post-transition):
1. Layer 1: Retrieve bridge entity via source
2. Layer 2: Aggregate information
3. Layer 3: Infer end entity from bridge

---

## Comparison with Two-Hop Curse

```
┌─────────────────────────────────────────────────────────────────────┐
│  COMPLEMENTARY FINDINGS                                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  This Paper (2502.13913)       Two-Hop Curse (2411.16353)          │
│  ────────────────────────      ──────────────────────────          │
│  IN-CONTEXT reasoning          IN-WEIGHT reasoning                 │
│  Facts in prompt               Facts from fine-tuning              │
│  Distractors → random          Synthetic facts → 0% no-CoT         │
│  Fine-tuning HELPS             Fine-tuning alone INSUFFICIENT      │
│                                                                     │
│  SHARED CONCLUSION: Two-hop is NOT automatic in LLMs               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

| Dimension | This Paper | Two-Hop Curse |
|-----------|------------|---------------|
| Setting | In-context | In-weight |
| Failure | Random (1/K) | 0% accuracy |
| Solution | Fine-tune reasoning skill | Co-occurrence or 1 natural fact |
| Generalization | K=2 → K=5 | Fails completely |

---

## Methodology

| Parameter | Value |
|-----------|-------|
| Model | Llama2-7b-base |
| Fine-tuning samples | 1,000 curated prompts |
| Training condition | K=2 (1 target + 1 distractor) |
| Dataset size | >50,000 reasoning contexts |
| Templates | 6 distinct logical templates |

---

## Relevance to Thesis

### Supports "Pattern Matching, Not Reasoning"

1. **Random guessing** among plausible answers = no compositional reasoning
2. **Distractor sensitivity** = models match patterns, not follow logic
3. **Phase transition** = explicit training needed, not emergent capability
4. **Sequential mechanism** = learned procedure, not general reasoning

### Key Insight

> Pre-trained LLMs find ALL plausible answers but cannot SELECT the correct one without explicit training on the selection task.

This is **pattern matching** (find similar things) without **reasoning** (deduce the unique answer).

---

## Graph Links

### Directly Related
- **Two-Hop Curse** (2411.16353) - in-weight version of same failure
- **Reversal Curse** (2309.12288) - simplest case (symmetric vs transitive)

### Theoretical Foundation
- **Faith and Fate** (2305.18654) - subgraph matching theory
- **Latent State Persistence** (2505.10571) - state maintenance failure

### Extends
- **Latent Multi-Hop** (2411.16679) - related shortcut analysis

---

## Key Quotes

> "Pre-trained LLMs collapse to random guessing (1/K) on in-context two-hop reasoning when distractors are present."

> "Fine-tuning on K=2 enables sharp phase transition to near-perfect accuracy with strong generalization to K=5."

---

## Status
- [x] Read
- [x] Analyzed
- [x] Evidence extracted
- [x] Graph links identified
- [x] Cross-referenced with corpus
