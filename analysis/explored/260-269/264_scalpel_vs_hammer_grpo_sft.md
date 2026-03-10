# Paper #264: Scalpel vs. Hammer: GRPO Amplifies, SFT Replaces

## Metadata
- **arXiv**: [2507.10616](https://arxiv.org/abs/2507.10616)
- **Title**: Scalpel vs. Hammer: GRPO Amplifies Existing Capabilities, SFT Replaces Them
- **Authors**: Neel Rajani, Aryo Pradipta Gema, Seraphina Goldfarb-Tarrant, Ivan Titov
- **Affiliation**: University of Edinburgh
- **Date**: July 2025
- **Venue**: ICML 2025 Actionable Interpretability Workshop

## Stance: SUPPORTS THESIS

## Summary

This paper provides a controlled comparative analysis of GRPO (RL) and SFT on the same math problems with the same model. The key finding: **GRPO amplifies existing capabilities while SFT replaces old skills with new ones**. GRPO makes smaller, more targeted updates (especially to Query/Key matrices), preserves out-of-domain knowledge, and causes less KL divergence from the base model. This directly supports the thesis that RL surfaces latent capabilities rather than creating new ones.

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SCALPEL vs HAMMER                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  GRPO (Scalpel):                                                    │
│  ├── Modest in-domain gains                                         │
│  ├── Small out-of-domain degradation                                │
│  ├── Lower KL divergence from base model                            │
│  ├── Updates mainly Query/Key matrices                              │
│  └── Gradual, stable training dynamics                              │
│                                                                     │
│  SFT (Hammer):                                                      │
│  ├── Larger in-domain gains                                         │
│  ├── Significant out-of-domain degradation                          │
│  ├── High KL divergence from base model                             │
│  ├── Larger updates, especially mid-layer MLPs                      │
│  └── Rapid, destabilizing changes early in training                 │
│                                                                     │
│  IMPLICATION: GRPO reinforces what's already there;                 │
│               SFT overwrites existing knowledge                     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Why This Supports the Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│              THE AMPLIFICATION vs REPLACEMENT DICHOTOMY             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  If GRPO were teaching NEW reasoning:                               │
│  - It would need to make substantial parameter changes              │
│  - It would modify knowledge-storing mid-layer MLPs                 │
│  - It would cause large KL divergence from base model               │
│                                                                     │
│  What actually happens with GRPO:                                   │
│  - Small, targeted updates (mainly Q/K matrices)                    │
│  - Preserves mid-layer MLPs (factual knowledge)                     │
│  - Low KL divergence (similar output distribution)                  │
│                                                                     │
│  CONCLUSION: GRPO shifts attention patterns to surface              │
│  existing capabilities, not learn new ones                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Evidence

### Parameter-Level Analysis

| Component | GRPO Impact | SFT Impact |
|-----------|-------------|------------|
| Query matrices | Largest updates | Largest updates |
| Key matrices | Large updates | Large updates |
| Value matrices | Small updates | Moderate updates |
| Output matrices | Small updates | Moderate updates |
| Mid-layer MLPs | **Minimal** | **Large** (knowledge corruption) |

### KL Divergence from Base Model
- **SFT**: Sharp increase early in training, high plateau
- **GRPO**: Gradual growth, much lower plateau
- Interpretation: GRPO keeps model closer to original distribution

### Benchmark Results (OLMo-2-7B-Instruct)

| Benchmark | Base | GRPO | SFT 1-epoch | SFT 3-epoch |
|-----------|------|------|-------------|-------------|
| MATH-500 | baseline | +modest | +larger | +largest |
| GSM8k | baseline | -slight | -moderate | -large |
| MMLU | baseline | -slight | -moderate | -large |
| GPQA | baseline | -slight | mixed | mixed |

**Key pattern**: SFT's in-domain gains come at cost of out-of-domain degradation.

## Key Quotes

> "GRPO yields minor in-domain gains on maths and slight degradation on knowledge-intensive benchmarks like MMLU, while both trends are more pronounced in SFT."

> "Our observations provide a preliminary indication for why RL amplifies existing capabilities, while SFT replaces old skills with new ones."

> "During GRPO, parameter updates are performed with respect to tokens that were sampled from the model itself... reinforcing existing capabilities instead of considerably re-organising model internals."

> "The stark rise in KL divergence in SFT suggests that the model starts producing very different output distributions early on."

> "It has been observed that capability acquisition occurs during pre-training and continual fine-tuning, while GRPO mainly amplifies skills the base model already has."

## Mechanistic Insight: Why Q/K Updates Dominate

The paper hypothesizes:
- Q/K matrices control **what tokens to attend to**
- V/O matrices control **what information to communicate**
- GRPO primarily teaches the model to **attend differently**, not to encode new information
- This explains why reasoning improvements come from attention shifts, not knowledge acquisition

```
┌─────────────────────────────────────────────────────────────────────┐
│  GRPO teaches: "Pay attention to X instead of Y"                    │
│  SFT teaches:  "Here's completely new information Z"                │
│                                                                     │
│  The former SURFACES latent patterns;                               │
│  The latter OVERWRITES existing knowledge.                          │
└─────────────────────────────────────────────────────────────────────┘
```

## Relationship to Other Papers

### Directly Extends
- **#262 Path Not Taken** (2511.08567): Both show GRPO preserves model structure; this adds Q/K specificity
- **#263 SGD in RLVR** (2602.07729): Both show RL makes minimal changes; this shows WHERE (Q/K)

### Supports
- **#221 Interplay** (2512.07783): Capabilities must exist in pretraining for RL to work
- **#172 Superficial Alignment** (2410.03717): Fine-tuning is surface-level, not deep restructuring
- **Mukherjee et al. (2505.11711)**: Cited directly — RL updates sparse subnetworks

### Cited Evidence
The paper cites multiple sources showing "capability acquisition occurs during pre-training... while GRPO mainly amplifies skills the base model already has":
- Zhao et al. (2025): Echo chamber — RL amplifies pretraining behaviors
- Ma et al. (2025): Reasoning models effective without thinking
- Gandhi et al. (2025): Four habits of self-improving reasoners
- Yue et al. (2025): RL doesn't incentivize reasoning beyond base model

## Methodology

- **Model**: OLMo-2-1124-7B-Instruct
- **Dataset**: OpenR1-Math-220k (CN-K12-91k subset)
- **Controlled comparison**: Same questions, same model, similar hyperparameters
- **Analysis**: 20 intermediate checkpoints per algorithm
- **Metrics**: Benchmark accuracy, KL divergence, parameter-level Frobenius norms

## Limitations (Author-Acknowledged)

- OLMo-2 was already trained with RLVR (confound)
- Different learning rates required (GRPO: 1e-6, SFT: 5e-5)
- Results may not generalize to other models/datasets
- Freezing experiments inconclusive

## Critical Assessment

This is a well-controlled study from ICML workshop with clear mechanistic insights. The "scalpel vs hammer" metaphor captures a key distinction: GRPO makes surgical adjustments to attention patterns while SFT overwrites model knowledge.

The finding that Q/K matrices receive the largest updates is particularly illuminating — it suggests GRPO teaches models to **attend differently** to information they already have, not to encode new information. This is amplification, not learning.

Combined with #262 (off-principal updates) and #263 (0.02% parameter changes), this paper completes a mechanistic picture:
- **WHERE**: Off-principal subspaces (#262)
- **HOW MUCH**: 0.02% of parameters (#263)  
- **WHAT KIND**: Attention pattern shifts, not knowledge updates (#264)

## REBUTTALS

### This Paper Rebuts

- **"RL teaches new reasoning capabilities"**: No — GRPO amplifies existing capabilities
- **"SFT and RL are equivalent"**: No — fundamentally different training dynamics and impacts

### Potential Counter-Arguments

1. **"Attention shifts could constitute genuine learning"** — Possible, but the preservation of output distribution (low KL) suggests it's more like tuning than learning

2. **"Different learning rates confound the comparison"** — Authors acknowledge this; still, the qualitative difference (Q/K vs mid-layer MLP) is revealing

## Impact Assessment

| Dimension | Score | Notes |
|-----------|-------|-------|
| Methodological rigor | High | Controlled comparison, multiple checkpoints |
| Thesis relevance | Very High | Direct evidence for amplification vs learning |
| Novelty | High | First Q/K vs V/O analysis of GRPO |
| Reproducibility | High | OLMo-2 is open, methodology detailed |

## Tags

#grpo #sft #parameter-analysis #attention #amplification #mechanistic

---

**Analysis by**: Literature Review System
**Date**: March 2026
**Confidence**: High (ICML workshop, controlled methodology, clear findings)
