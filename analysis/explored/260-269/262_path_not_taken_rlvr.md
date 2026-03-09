# Paper #262: The Path Not Taken: RLVR Provably Learns Off the Principals

## Metadata
- **arXiv**: [2511.08567](https://arxiv.org/abs/2511.08567)
- **Title**: The Path Not Taken: RLVR Provably Learns Off the Principals
- **Authors**: Hanqing Zhu, Zhenyu Zhang, Hanxian Huang, DiJia Su, Zechun Liu, Jiawei Zhao, Igor Fedorov, Hamed Pirsiavash, Zhizhou Sha, Jinwon Lee, David Z. Pan, Zhangyang Wang, Yuandong Tian, Kai Sheng Tai
- **Affiliation**: Meta AI, UT Austin, UC San Diego
- **Date**: November 2025
- **Venue**: NeurIPS 2025 Workshop on Efficient Reasoning (Spotlight)

## Stance: SUPPORTS THESIS

## Summary

This paper provides the first mechanistic, parameter-level explanation of why RLVR (Reinforcement Learning with Verifiable Rewards) only modifies a small fraction of parameters while still achieving significant reasoning improvements. The key finding is that this "sparsity" is a surface artifact of a deeper phenomenon: **RLVR operates in a fundamentally different optimization regime than SFT**, learning "off the principals" (in low-curvature subspaces) rather than along principal directions.

## Three-Gate Theory

The paper proposes a mechanistic framework explaining RLVR's parameter update dynamics:

```
┌─────────────────────────────────────────────────────────────────────┐
│                      THREE-GATE THEORY                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  GATE I: KL Anchor                                                  │
│  └── KL-constrained updates keep model close to reference          │
│                                                                     │
│  GATE II: Model Geometry                                            │
│  └── Steers updates OFF principal directions                       │
│  └── Into low-curvature, spectrum-preserving subspaces             │
│                                                                     │
│  GATE III: Precision                                                │
│  └── Micro-updates in non-preferred regions appear as sparsity     │
│  └── Off-principal bias LOOKS sparse but isn't truly sparse        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Core Argument

RLVR achieves reasoning improvements through:
1. **Minimal spectral drift** — preserving the model's existing weight spectrum
2. **Reduced principal-subspace rotation** — not disturbing principal weight directions
3. **Off-principal update alignment** — coordinating updates in low-curvature subspaces

In contrast, **SFT targets principal weights, distorts the spectrum, and lags RLVR**.

## Key Evidence

| Finding | Implication |
|---------|-------------|
| Updates localize to "preferred parameter regions" | Not random — model-conditioned bias |
| Highly consistent across runs | Deterministic optimization geometry |
| Largely invariant to datasets and RL recipes | Intrinsic to model, not training data |
| RLVR learns off-principal; SFT targets principal | Fundamentally different optimization regimes |
| SFT-era PEFT methods (LoRA, sparse fine-tuning) fail for RLVR | Cannot repurpose SFT heuristics |

## Key Quotes

> "RLVR learns off principal directions in weight space, achieving gains via minimal spectral drift, reduced principal-subspace rotation, and off-principal update alignment."

> "RL operates in a distinct optimization regime from SFT, so directly adapting SFT-era parameter-efficient fine-tuning (PEFT) methods can be flawed."

> "Sparsity is a surface artifact of a model-conditioned optimization bias: for a fixed pretrained model, updates consistently localize to preferred parameter regions."

## Thesis Relevance

```
┌─────────────────────────────────────────────────────────────────────┐
│                     WHY THIS SUPPORTS THE THESIS                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. RLVR SURFACES, DOESN'T CREATE                                   │
│     Updates are model-conditioned — the model determines where      │
│     to update, not the training data. This implies capabilities     │
│     are latent in the pretrained model, not learned from RL.        │
│                                                                     │
│  2. SPECTRUM PRESERVATION IS KEY                                    │
│     RLVR's success comes from NOT disturbing the model's core       │
│     structure. This is amplification, not creation.                 │
│                                                                     │
│  3. INVARIANCE TO DATASETS                                          │
│     If reasoning were being "learned," different datasets should    │
│     produce different parameter updates. But updates are largely    │
│     invariant — the model "knows" where to adjust.                  │
│                                                                     │
│  4. SFT FAILS BECAUSE IT OVERWRITES                                 │
│     SFT targets principal weights and distorts the spectrum —       │
│     it replaces rather than surfaces. This explains why RLVR        │
│     outperforms SFT for reasoning.                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Relationship to Other Papers

### Supports
- **#221 Interplay** (2512.07783): Shows 0% exposure → RL fails; ≥1% → success. This paper explains WHY: RLVR needs latent capabilities to surface.
- **#36 Scalpel vs Hammer**: GRPO amplifies, SFT replaces — same distinction as RLVR vs SFT here
- **#172 Superficial Alignment** (2410.03717): Alignment is style, not substance — RLVR operates on style (off-principal), not core knowledge

### Extends
- **Parameter efficiency literature**: First mechanistic explanation of WHY RLVR is parameter-efficient

### Methodological Contribution
- First parameter-space account of RLVR training dynamics
- Explains why LoRA/PEFT methods designed for SFT don't work for RLVR

## Methodology

- Mechanistic analysis of parameter update patterns across multiple RLVR runs
- Spectral analysis of weight matrices before/after training
- Comparison of principal-subspace rotation between RLVR and SFT
- Case studies on sparse fine-tuning and LoRA variants

## Limitations (Author-Acknowledged)

- Theory validated on specific model families; generalization unclear
- "Three-Gate" framework is descriptive, not prescriptive (doesn't tell you HOW to design better RLVR)
- Focus on parameter-level; doesn't address computational/representational questions

## Critical Assessment

This is a strong mechanistic paper that provides the first clear explanation of RLVR's parameter dynamics. The finding that updates are **model-conditioned and invariant to datasets** is particularly damning for the "RL teaches reasoning" narrative — it suggests the model already "knows" what to adjust.

The implication for the thesis is clear: **RLVR is a surfacing mechanism, not a learning mechanism**. The reasoning capabilities must already exist in the pretrained model; RLVR merely amplifies them without disturbing the core weight structure.

## REBUTTALS

### This Paper Rebuts

None directly, but provides mechanistic grounding that challenges claims that RLVR "learns" reasoning.

### Potential Counter-Arguments

1. **"Off-principal learning could still be genuine learning"** — True in principle, but the invariance to datasets suggests the model determines the update locations, not the training signal.

2. **"Maybe the model geometry encodes optimal reasoning paths"** — This would still support the thesis: the "reasoning" would be latent in geometry, not learned from RL.

## Impact Assessment

| Dimension | Score | Notes |
|-----------|-------|-------|
| Methodological rigor | High | First parameter-level characterization |
| Thesis relevance | High | Directly explains WHY RLVR surfaces, not creates |
| Novelty | High | New "Three-Gate Theory" framework |
| Reproducibility | Medium | Requires large-scale parameter tracking |

## Tags

#rlvr #parameter-efficiency #optimization #mechanistic #spectral-analysis #sft-vs-rl

---

**Analysis by**: Literature Review System
**Date**: March 2026
**Confidence**: High (clear mechanistic evidence, NeurIPS workshop spotlight)
