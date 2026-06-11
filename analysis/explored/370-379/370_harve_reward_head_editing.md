# Paper Analysis: HARVE - Hacking-Aware Reward-Head Vector Editing for Robust Reward Models

## Metadata
- **arXiv ID**: 2606.03131
- **Title**: HARVE: Hacking-Aware Reward-Head Vector Editing for Robust Reward Models
- **Authors**: Shuang Liu et al. (CMU, UVA, Harvard, Stanford, UMich, NJIT, CUHK-Shenzhen)
- **Date**: Jun 2026
- **Category**: cs.CL / cs.LG
- **Stance**: SUPPORTS (reward hacking is a multidimensional residual-space structure recoverable via simple vector operations - parallels linear representation hypothesis and refusal direction findings)

---

## Core Claims

1. **RewardHackBench exposes severe reward model failures.** A benchmark of 1,203 paired examples across 13 hacking patterns reveals that 8 tested reward models systematically fail on specific hacking categories - with gold-preference rates as low as 21.43%.
2. **Reward hacking is a multidimensional residual-space structure.** It is not isolated surface cues but a structured set of directions in the reward model's residual stream that can be identified and manipulated.
3. **HARVE: training-free reward-head editing improves robustness.** By identifying and editing hacking-associated directions in the reward head, HARVE achieves +21.1pp improvement over baseline and +13.7pp over fine-tuning - without any gradient updates.
4. **Joint editing is super-additive.** Editing both style and category-specific hacking directions simultaneously produces larger improvements than the sum of individual edits - the directions interact constructively.

---

## Methodology

### RewardHackBench

13 hacking pattern categories, each with paired examples (hacked vs clean responses). Categories include hedging, verbosity, formatting tricks, sycophancy, and other surface-level manipulations that inflate reward scores without improving actual quality.

### HARVE: Vector Editing Pipeline

```text
┌──────────────────────────────────────────────────────────────────────┐
│  HARVE: TRAINING-FREE REWARD ROBUSTIFICATION                         │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Step 1: Collect reward-model activations on hacked vs clean pairs   │
│  Step 2: Extract "hacking directions" via mean-difference vectors    │
│  Step 3: Edit the reward head to suppress these directions           │
│                                                                      │
│  ┌───────────┐    activations    ┌──────────────┐                   │
│  │ Hacked    │ ──────────────►   │              │                   │
│  │ examples  │                   │  Difference  │ → hacking         │
│  │           │                   │  vectors     │   directions      │
│  │ Clean     │ ──────────────►   │              │                   │
│  │ examples  │                   └──────────────┘                   │
│  └───────────┘                          │                           │
│                                         ▼                           │
│                              ┌──────────────────┐                   │
│                              │  Edit reward head │                   │
│                              │  (no training)    │                   │
│                              └──────────────────┘                   │
│                                                                      │
│  Key insight: joint editing (style + category) is SUPER-ADDITIVE    │
└──────────────────────────────────────────────────────────────────────┘
```

### Models Tested

8 reward models including GRM-Llama-3.2-3B, evaluated on RewardHackBench and RM-Bench for generalization.

---

## Key Evidence

| Finding | Number / Result | Context |
|---|---|---|
| Worst RM failure | **21.43%** gold-preference (C3 Hedge Stripping, GRM-Llama-3.2-3B) | Severely broken - worse than random |
| HARVE improvement | **+21.1pp** over baseline | Training-free editing |
| HARVE vs fine-tuning | **+13.7pp** over fine-tuning baseline | Simpler method outperforms gradient updates |
| Hacking ↔ style cosine sim | Mean **+0.40** | Hacking directions partially overlap with style |
| Joint editing (super-additive) | **+16.67pp** on target | vs style-only: -0.81pp, category-only: +5.32pp |
| Transfer to RM-Bench | **+2.4pp** average improvement | Generalizes beyond RewardHackBench |

---

## Relationship to the Thesis

```text
┌──────────────────────────────────────────────────────────────────────┐
│  REWARD HACKING HAS LINEAR STRUCTURE IN RESIDUAL SPACE               │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Refusal direction:  linear direction → controls refusal behavior    │
│  Hacking directions: linear directions → control reward hacking      │
│                                                                      │
│  Same principle: model behaviors that APPEAR complex are             │
│  recoverable as simple geometric structures in activation space.     │
│                                                                      │
│  The reward model doesn't "understand" quality - it encodes          │
│  hackable surface patterns as linear features that can be            │
│  added/removed with vector arithmetic.                               │
└──────────────────────────────────────────────────────────────────────┘
```

Strongly supports the thesis via the linear representation hypothesis. The fact that reward hacking directions are (a) identifiable as mean-difference vectors, (b) editable without retraining, and (c) super-additive when jointly removed shows that reward models encode quality proxies as simple geometric structures rather than deep semantic understanding. The +0.40 cosine similarity between hacking and style directions reveals that the reward model's "quality" signal is substantially contaminated by surface-level style features - exactly the proxy-vs-goal gap the thesis describes.

---

## Relationship to Other Papers

### Supports / Extends

- **Scaling Laws for Reward Model Overoptimization in DAAs (#359, 2406.02900)**: both diagnose Goodhart dynamics in reward-based training; HARVE adds the geometric mechanism - the hacking directions that policies learn to exploit are linearly separable in the RM's own representation space.
- **LLMs Hack Rewards, and Society (#360, 2606.04075)**: convergent evidence; that paper shows hacking in societal rule systems, this paper shows the RM's internal representation is structured to permit hacking.
- **Refusal direction papers (#316-#317)**: direct parallel - refusal is a linear direction; reward hacking is a set of linear directions. Both demonstrate that complex model behaviors reduce to simple geometric structures.
- **CHERRL (#369, 2606.04923)**: complementary - CHERRL measures hacking onset during training, HARVE provides the representational mechanism (hacking directions in residual space) that explains why the onset is predictable.

### Builds On

- **Linear representation hypothesis (Park et al., Li et al.)**: HARVE is an application of the hypothesis to reward model robustness.
- **Representation engineering (Zou et al.)**: mean-difference vector extraction is the standard technique; HARVE adapts it to the reward hacking domain.

### Challenges

- None directly challenged. The paper is constructive (provides a fix) rather than refutational.

---

## REBUTTALS

### Known Direct Rebuttals

No direct arXiv rebuttal found (paper is from Jun 2026, very recent).

- Local corpus: no contradicting paper.
- arXiv search: too recent for citation-graph rebuttals.

### Indirect Counter-Evidence / Tension

1. **Super-additivity may not generalize** - the joint editing result is on one benchmark; whether the interaction structure holds across diverse hacking distributions is untested.
2. **21.43% gold-preference may overstate the problem** - C3 (Hedge Stripping) may be a worst-case outlier; median category performance across models is likely higher.
3. **Linear directions may be a simplification** - some hacking patterns could involve nonlinear interactions not captured by mean-difference vectors, limiting HARVE's ceiling.

### Limitations Authors Acknowledge

1. RewardHackBench covers 13 categories - not exhaustive of all possible hacking patterns.
2. HARVE requires access to paired hacked/clean examples for each category.
3. Tested on a specific set of open-weight reward models; closed-source RM internals are inaccessible.
4. Transfer to RM-Bench is modest (+2.4pp) - generalization beyond the specific hacking patterns may be limited.

---

## Key Quotes

> GRM-Llama-3.2-3B achieves only 21.43% gold-preference on Hedge Stripping - the reward model actively prefers the hacked response in nearly 4 out of 5 cases.

> Joint editing of style and category-specific hacking directions is super-additive: +16.67pp combined vs -0.81pp (style-only) + 5.32pp (category-only).

> The mean cosine similarity between hacking directions and the style direction is +0.40, revealing substantial overlap between what the reward model treats as "quality" and surface-level style features.

---

## Methodology Assessment

### Strengths
- Training-free method outperforming fine-tuning is a strong result - demonstrates the geometric structure is real and actionable.
- Super-additivity finding reveals non-trivial interaction structure between hacking dimensions.
- RewardHackBench provides a reusable evaluation artifact for future reward robustness work.
- 8 reward models tested across 13 hacking categories - reasonable coverage.

### Weaknesses
- Requires paired hacked/clean examples - the method does not discover new hacking categories.
- Limited to models with accessible residual-stream activations (open-weight only).
- Transfer improvement (+2.4pp on RM-Bench) is modest - the method may overfit to known hacking patterns.
- No evaluation of downstream policy quality when using HARVE-edited RMs for RL training.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Rebuttals checked (corpus + arXiv)
- [x] Paper graph updated

---

## Classification

| Dimension | Value |
|---|---|
| **Stance** | Supports |
| **Confidence** | High |
| **Relevance** | Direct |
| **Evidence Type** | Controlled experiment + benchmark |
| **Venue Quality** | Preprint (Jun 2026) |

---

## One-Sentence Summary

HARVE demonstrates that reward hacking is encoded as linear directions in reward models' residual streams - recoverable via mean-difference vectors and removable without retraining (+21.1pp over baseline, +13.7pp over fine-tuning) - with super-additive joint editing (+16.67pp) revealing structured interaction between hacking dimensions, strongly supporting the thesis that reward models encode exploitable surface proxies as simple geometric features rather than deep quality understanding.
