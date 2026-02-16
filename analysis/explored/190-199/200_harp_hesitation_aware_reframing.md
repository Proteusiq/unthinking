# Paper Analysis: HARP: Hesitation-Aware Reframing in Transformer Inference Pass

## Metadata
- **arXiv ID**: 2412.07282
- **Title**: HARP: Hesitation-Aware Reframing in Transformer Inference Pass
- **Authors**: Romain Storai, Seung-won Hwang
- **Date**: December 2024
- **Venue**: NAACL 2025

---

## Core Claims

1. **Hesitation (uncertainty) identifies "harder" tokens**: Shannon entropy on next-token logits effectively identifies tokens that would benefit from additional computation.

2. **Reframing via embedding dropout provides new perspective**: Dropout on embeddings (not noise) creates an alternative view that improves predictions when combined with original logits.

3. **Training-free, model-agnostic improvements**: HARP works at inference-only without any retraining, achieving up to +5.16% accuracy improvement.

4. **More efficient than beam search**: HARP achieves higher accuracy than beam search while being ~2x faster.

---

## Methodology

### HARP Algorithm
1. **Standard forward pass**: Compute logits as normal
2. **Estimate uncertainty**: Shannon entropy on softmax(logits)
3. **If entropy > threshold θ** (model is uncertain/"hesitating"):
   - Apply dropout to embeddings (δ=0.20)
   - Run second forward pass with perturbed embeddings
   - Combine logits: final = β*original + (1-β)*reframed (β=0.5)
4. **If entropy ≤ threshold**: Use original logits directly

### Key Design Choices
- **Dropout > uniform noise**: NEFTune-style noise is less consistent than dropout
- **Shannon entropy > ratio-based**: More theoretically grounded than top-2 probability ratio
- **Single reframe is optimal**: Multiple reframing steps actually HURT performance
- **No training required**: Purely inference-time modification

---

## Key Evidence

### Main Results (Table 1)
| Model | Dataset | Vanilla | HARP | Gain |
|-------|---------|---------|------|------|
| LLaMA-3.1 8B | LAMBADA | 30.86% | 36.02% | **+5.16%** |
| LLaMA-3.1 8B | GSM8K | 76.88% | 78.39% | +1.51% |
| LLaMA-3.1 8B | CsQA | 78.79% | 80.30% | +1.52% |
| LLaMA-3.1 8B | MMLU Pro | 46.42% | 48.21% | +1.79% |
| Mistral 7B | GSM8K | 43.62% | 48.40% | +4.79% |
| Mistral 7B | LAMBADA | 45.15% | 49.76% | +4.64% |

### Comparison with Pause Tokens
- Pause tokens (Goyal et al.): +1.00% on GSM8K (7.50% → 8.50%) **with training**
- HARP: +1.51% on GSM8K (76.88% → 78.39%) **without training**

### Efficiency (Figure 2)
| Method | Relative Time |
|--------|---------------|
| Vanilla | 1.0x |
| HARP | 1.16-1.27x |
| Beam Search | 2.79-3.18x |

### Ablation: Uncertainty-based vs. Unconditional (Table 3)
| Model | Task | Unconditional | HARP (selective) |
|-------|------|---------------|------------------|
| LLaMA 8B | CsQA | -1.62pp | **+1.52pp** |
| LLaMA 8B | MMLU Pro | -1.50pp | **+1.79pp** |

Unconditional reframing can HURT performance; selectivity is crucial.

### Ablation: Number of Reframing Steps (Table 4)
| Steps | CsQA | GSM8K | LAMBADA |
|-------|------|-------|---------|
| 1 (HARP) | 80.30% | 78.39% | 36.02% |
| 2 | 79.80% (-0.50) | 76.88% (-1.51) | 35.52% (-0.50) |
| 4 | 79.70% (-0.60) | 80.40% (+2.01) | 35.02% (-1.00) |

**One reframe is sufficient** — more can hurt (except GSM8K at high cost).

---

## Relationship to Thesis

### SUPPORTS — Provides computational rather than semantic mechanism

**Supports thesis (filler tokens as computation)**:
1. **Hesitation identifies computational difficulty**: Not semantic difficulty — entropy is about token distribution, not meaning
2. **Dropout = meaningless perturbation**: Works as well as "reframing" — the model doesn't need semantic content, just different computational pathway
3. **Single reframe optimal**: More computation can HURT — this is about finding better path, not deeper understanding
4. **No training needed**: The capability already exists; this just changes how it's accessed

**Key insight for thesis**:
The paper shows that when models are "uncertain," what helps is not more reasoning or semantic content, but simply:
- **A different computational pathway** (via dropout)
- **Combining multiple outputs** (logit averaging)

This is computational, not cognitive. The model isn't "reconsidering" in any meaningful sense — it's sampling a different forward pass and averaging.

---

## Relationship to Other Papers

### Directly Supports
- **Pause Tokens Training (#195)**: Both show additional computation helps; HARP shows training isn't required
- **Seq-VCR (#196)**: Both show computational mechanisms underlie reasoning improvements
- **Expanding Computation (#197)**: Both work at inference-only; HARP is selective, #197 is uniform
- **Dot by Dot (#161)**: Both show filler/dummy computation improves performance

### Extends
- **Learning to Insert PAUSE (#198)**: DIT identifies "hard" positions via confidence; HARP uses entropy at inference

### Provides Mechanism For
- **Why filler tokens work**: Uncertainty → additional computation → performance improvement
- **Why single reframe is enough**: Multiple perspectives average out; too many just adds noise

### Contrasts With
- **Bottlenecked Transformers (#199)**: KV cache consolidation requires training; HARP is training-free

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Limited gains on some tasks**: MMLU Pro improvement is modest (+1.79%); CNN/DM gains are small
2. **No OOD testing**: All evaluation is ID; doesn't show whether this helps with OOD generalization
3. **Hyperparameter sensitivity**: θ=1.0 threshold is task-specific; may need tuning
4. **No mechanistic explanation**: Why does dropout-based reframing work? Paper doesn't explain

### Limitations (Authors Acknowledge)
- "HARP does not leverage the KVCache, which could provide significant speedups"
- "The optimal choices for these hyperparameters may vary across tasks or models"
- "We focused on entropy as the uncertainty metric... other metrics could be explored"

---

## Key Quotes

> "By selectively reframing inputs, HARP mimics human reconsideration under uncertainty, achieving up to 5.16% performance improvements with minimal additional cost."

> "Surprisingly, Table 4 shows that increasing the number of additional steps often leads to a decline in performance. This interesting outcome suggests that while a single additional representation can provide a useful alternative perspective on the inputs, too many representations may be penalizing."

> "Our analysis reveals that unconditionally adding an extra forward step is not universally beneficial."

> "Upon reviewing some examples, particularly in problem-solving tasks, we observe that high-uncertainty states usually appear at the start of each reasoning step."

---

## Critical Assessment

### What This Paper Adds

1. **Training-free alternative to pause tokens**: Shows inference-time intervention can work
2. **Selective computation**: Not all tokens need extra work — uncertainty identifies which ones
3. **Efficiency comparison**: HARP vs. beam search vs. unconditional reframing

### For Thesis

The paper supports the view that:
- "Reasoning" improvements come from **computational mechanisms**, not semantic understanding
- The model has **latent capability** that can be accessed via different pathways
- **Dropout on embeddings** (meaningless perturbation) works — content doesn't matter

### Stance: SUPPORTS

The paper provides evidence that uncertainty-triggered additional computation improves performance through a purely computational mechanism. The "reframing" is just dropout — there's no semantic content. This aligns with the thesis that CoT/pause tokens work by providing computational workspace, not by enabling genuine reasoning.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
