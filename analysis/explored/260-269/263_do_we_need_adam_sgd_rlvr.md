# Paper #263: Do We Need Adam? SGD in RLVR

## Metadata
- **arXiv**: [2602.07729](https://arxiv.org/abs/2602.07729)
- **Title**: Do We Need Adam? Surprisingly Strong and Sparse Reinforcement Learning with SGD in LLMs
- **Authors**: Sagnik Mukherjee, Lifan Yuan, Pavan Jayasinha, Dilek Hakkani-Tür, Hao Peng
- **Affiliation**: University of Illinois Urbana-Champaign
- **Date**: February 2026
- **Venue**: ICML 2026

## Stance: SUPPORTS THESIS

## Summary

This paper demonstrates that SGD — long considered unsuitable for training large transformers — matches or outperforms AdamW in RLVR while updating **fewer than 0.02% of parameters**. This is 1000× sparser than AdamW. The finding strongly supports the thesis: if effective "reasoning" improvements require modifying only 0.02% of weights, RLVR is surface-level adjustment, not deep learning.

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                      THE SPARSITY BOMBSHELL                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  SGD updates: 0.02% - 0.46% of parameters                           │
│  AdamW updates: ~10% of parameters                                  │
│                                                                     │
│  → SGD is 500-1000× SPARSER than AdamW                              │
│  → Yet SGD MATCHES OR BEATS AdamW performance                       │
│                                                                     │
│  IMPLICATION: Effective RL fine-tuning operates in a                │
│  "surprisingly low-dimensional subspace"                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Why This Matters for the Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│              WHY 0.02% DESTROYS "RL TEACHES REASONING"              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  If RLVR were teaching NEW reasoning capabilities:                  │
│  - It would need to modify substantial model structure              │
│  - Different tasks would require different parameters               │
│  - More training would update more parameters                       │
│                                                                     │
│  What actually happens:                                             │
│  - Only 0.02% of parameters change                                  │
│  - Updates are MODEL-CONDITIONED (same locations across tasks)      │
│  - Extended training doesn't increase sparsity much                 │
│                                                                     │
│  CONCLUSION: RLVR is SURFACING latent capabilities via              │
│  minimal parameter adjustment, not LEARNING new ones                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Evidence

| Finding | Numbers | Implication |
|---------|---------|-------------|
| SGD sparsity | 99.98% (0.02% updated) | Effective RL is extremely low-dimensional |
| AdamW sparsity | ~90% (10% updated) | Still sparse, but 500× more than SGD |
| SGD vs AdamW performance | SGD matches/beats | Adaptive LR not needed for RLVR |
| Momentum effect | Often HURTS performance | RL's non-stationarity makes momentum counterproductive |
| Memory savings | 15.7 GB less than AdamW | Practical benefit of simpler optimizer |

### Detailed Results (Table 2 excerpt)

| Model | Optimizer | Math500 | AIME24 | Mean |
|-------|-----------|---------|--------|------|
| Qwen3-8B (8K) | AdamW | 93.8 | 63.3 | 69.5 |
| Qwen3-8B (8K) | SGD | **95.0** | 63.3 | **70.0** |
| Qwen3-1.7B (8K) | AdamW | 85.6 | 66.7 | 58.2 |
| Qwen3-1.7B (8K) | SGD | **86.2** | 56.7 | 56.8 |

### Update Sparsity (Table 4)

| Model | AdamW | SGD | Ratio |
|-------|-------|-----|-------|
| Qwen3-8B | 91.30% sparse | 99.99% sparse | ~1000× fewer updates with SGD |
| Qwen3-1.7B | 91.09% sparse | 99.94% sparse | ~100× fewer updates with SGD |

## Why SGD Works in RLVR (But Not SFT)

The paper provides mechanistic explanations:

### 1. Adaptive Learning Rate Not Needed
- In SFT, the second moment (√v) has 22× higher standard deviation than in RLVR
- RLVR gradients are more homogeneous → per-parameter adaptation less useful
- σ_SFT = 5.11×10⁻⁶ vs σ_RL = 2.29×10⁻⁷

### 2. Momentum Is Counterproductive
- RL is fundamentally non-stationary (distribution shifts with policy)
- Momentum encodes memory of OLD landscapes
- Cosine similarity between momentum and gradient:
  - SFT: 0.997 (high alignment)
  - RL: -0.007 (near-zero alignment)
- Momentum can point in WRONG direction in RL

### 3. Lack of Adaptive LR Causes Sparsity
- AdamW amplifies small gradients via normalization
- SGD doesn't amplify → small updates get rounded to zero in bfloat16
- This is a FEATURE, not a bug: reveals the true low-dimensional structure

## Key Quotes

> "Full fine-tuning with SGD updates fewer than 0.02% of model parameters without any sparsity-promoting regularization, more than 1,000× fewer than AdamW."

> "These findings provide fresh insights into the optimization dynamics of RL in LLMs and demonstrate that RL can be substantially more parameter-efficient than previously recognized."

> "The pronounced update sparsity with SGD suggests that RL in LLMs can be highly parameter-efficient... offers a mechanistic perspective that complements prior work showing that RL suffers less from catastrophic forgetting."

> "RL updates incorporate only O(1) bits of information from the environment per episode, substantially sparser than the O(#tokens) information in SFT."

## Relationship to Other Papers

### Directly Extends
- **#262 Path Not Taken** (2511.08567): This paper CITES Zhu et al. (2025) [same as #262] extensively. Provides complementary evidence — #262 shows WHERE updates happen (off-principal), this paper shows HOW FEW updates happen (0.02%)

### Supports
- **#221 Interplay** (2512.07783): 0% exposure → RL fails; this paper explains WHY: only 0.02% params change, so model must already have capability
- **#172 Superficial Alignment** (2410.03717): Both show fine-tuning is minimal adjustment, not deep change
- **#36 Scalpel vs Hammer**: GRPO amplifies existing capabilities — confirmed by 0.02% update rate

### Mechanistic Connection
- **RL forgetting literature** (Chen et al., 2025; Shenfeld et al., 2025): SGD's extreme sparsity explains WHY RL doesn't cause catastrophic forgetting — it barely touches the model

## Methodology

- **Models**: Qwen3-1.7B, Qwen3-8B, Llama-3.1-8B
- **Domains**: Math (NuminaMath), Coding (APPS, CodeContests), RLVE
- **RL algorithms**: GRPO, PPO
- **Optimizers compared**: SGD, SGD+Momentum, RMSProp, AdamW
- **Metrics**: Task accuracy, update sparsity, effective rank

## Limitations (Author-Acknowledged)

- Focus on RLVR; may not generalize to RLHF with learned reward models
- Tested on specific model families (Qwen, Llama)
- bfloat16 precision affects sparsity measurement

## Critical Assessment

This is a high-quality ICML paper with rigorous experiments across multiple models, domains, and RL algorithms. The finding that SGD achieves equivalent performance while updating 1000× fewer parameters is striking and reproducible (code released).

The thesis implication is clear: **if 0.02% parameter updates are sufficient for "reasoning improvements," those capabilities must already exist in the model**. RLVR is not teaching reasoning — it's making micro-adjustments to surface latent patterns.

The connection to #262 is particularly strong: together they show that RLVR operates in a fundamentally different regime than SFT, one where the model geometry determines update locations and only a vanishingly small fraction of parameters actually change.

## REBUTTALS

### This Paper Rebuts

- **"AdamW is necessary for transformer training"**: False for RLVR — SGD matches/beats AdamW
- **"RL teaches new capabilities"**: Challenged by 0.02% update rate — too few changes to constitute "learning"

### Potential Counter-Arguments

1. **"Small updates could still encode meaningful changes"** — True in principle, but the MODEL-CONDITIONED nature (from #262) suggests these are predetermined adjustment points, not learned reasoning

2. **"Maybe 0.02% is where the reasoning circuits are"** — Would still support thesis: reasoning is LATENT, not learned via RL

## Impact Assessment

| Dimension | Score | Notes |
|-----------|-------|-------|
| Methodological rigor | High | ICML quality, multiple models/domains |
| Thesis relevance | Very High | 0.02% update rate is devastating for "RL learns reasoning" |
| Novelty | High | First to show SGD matches AdamW in RLVR |
| Reproducibility | High | Code released |

## Tags

#rlvr #sgd #parameter-efficiency #optimization #sparsity #mechanistic

---

**Analysis by**: Literature Review System
**Date**: March 2026
**Confidence**: High (ICML paper, clear quantitative results, code available)
