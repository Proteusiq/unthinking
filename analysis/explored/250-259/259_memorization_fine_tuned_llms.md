# Paper Analysis: Memorization in Fine-Tuned Large Language Models

## Metadata
- **arXiv ID**: 2507.21009
- **Title**: Memorization in Fine-Tuned Large Language Models
- **Authors**: Danil Savine
- **Institution**: PRAIRIE Research Institute, PSL University
- **Date**: July 2025
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2507.21009

---

## Core Claims

1. **Value and Output matrices drive memorization**: W^V and W^O matrices contribute more significantly to memorization than W^Q and W^K matrices during LoRA fine-tuning

2. **Lower perplexity correlates with more memorization**: Fine-tuned models memorize sequences they can predict well (low perplexity)

3. **Higher LoRA ranks increase memorization with diminishing returns**: Memorization increases with rank but plateaus at higher values

4. **Interaction effects matter**: Adapting both Q and K at lower rank produces more memorization than adapting one at higher rank with same parameter count

---

## Methodology

### Setup
- **Model**: LLaMA-2 7B (quantized 8-bit)
- **Dataset**: PHEE (pharmacovigilance events) — medical domain
- **Fine-tuning**: LoRA with varying ranks and target matrices
- **Metrics**: ROC AUC for membership inference attack

### Two Attack Approaches

1. **Membership Inference Attack (MIA)**
   - Feed samples to fine-tuned model M and reference model R
   - Compute likelihood ratio: LR(x) = Pr_R(x) / Pr_M(x)
   - Classify as member if LR(x) < threshold
   - Measure ROC AUC

2. **Generation with Prompted Prefix**
   - Split training sample into prefix/suffix
   - Prompt model with prefix
   - Measure largest common n-gram with original suffix

---

## Key Evidence

### Which Matrices Memorize Most?

| Rank | Adapted Weights | ROC AUC | Trainable Params |
|------|-----------------|---------|------------------|
| 1 | W^Q | 0.68 ± 0.02 | 262,144 |
| 1 | W^K | 0.68 ± 0.02 | 262,144 |
| 1 | W^V | **0.80 ± 0.01** | 262,144 |
| 1 | W^O | **0.77 ± 0.02** | 262,144 |
| 4 | W^V | **0.83 ± 0.01** | 1,048,576 |
| 4 | W^O | **0.80 ± 0.01** | 1,048,576 |

**Key finding**: Value projection (W^V) consistently highest memorization, followed by Output (W^O). Query/Key much lower.

### Perplexity-Memorization Relationship

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PERPLEXITY vs MEMORIZATION                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Lower perplexity (fine-tuned) → Higher memorization                │
│  Lower perplexity (base model) → Higher memorization                │
│                                                                     │
│  Interpretation: Model memorizes what it can already predict        │
│  → Memorization is AMPLIFICATION of existing patterns               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### LoRA Rank Effect

- Higher rank → more memorization
- **Diminishing returns at higher ranks**
- Suggests memorization saturates before model capacity

---

## Relationship to Thesis

### SUPPORTS Thesis

This paper provides mechanistic evidence for how fine-tuning = memorization:

#### 1. Fine-Tuning Amplifies Pattern Storage

> "Lower perplexity in the fine-tuned model correlates with increased memorization"

The model doesn't learn new reasoning — it stores patterns it already recognized.

#### 2. Specific Weight Matrices for Memorization

Value and Output projections are where memorization concentrates:
- Value = "what to attend to"
- Output = "how to project attention results"
- These are exactly the matrices that STORE retrieved information

#### 3. Not Reasoning, Just Better Retrieval

The MIA attack shows fine-tuned models can regurgitate training data verbatim. This is retrieval, not reasoning.

#### 4. Connection to RL Parameter Efficiency (#221)

If memorization concentrates in V/O matrices, and RL updates few parameters:
- RL may be surfacing patterns already stored
- Not teaching new reasoning, just routing differently

---

## Relationship to Other Papers

### Strongly Supports
- **Paper #172 (Unfaithful Reasoning Emergence)**: Both show fine-tuning = memorization dynamics
- **Paper #221 (RL Parameter Efficiency)**: Memorization in specific matrices explains why RL needs few params
- **Extracting Books (2601.02671)**: Both show models store training data extractably

### Provides Mechanism For
- **Superficial Alignment papers**: If fine-tuning = memorization in specific matrices, alignment may be equally localized and removable
- **Paper #06 (CoT Mirage)**: Distribution-dependent success explained by memorization of in-distribution patterns

### Related Methodologically
- **Representation Engineering (2310.01405)**: Both identify specific components responsible for model behaviors

---

## REBUTTALS

### Potential Counter-Arguments

1. **Medical domain specific**: Results on PHEE dataset may not generalize to other domains

2. **Small model**: LLaMA-2 7B may behave differently from larger models

3. **LoRA only**: Full fine-tuning might show different patterns

4. **Privacy framing**: Paper focuses on privacy risk, not reasoning — memorization could coexist with genuine reasoning

### Authors' Limitations

> "Our findings have implications for developing more effective and responsible strategies for adapting large language models while managing data privacy concerns"

Focus is privacy, not reasoning mechanisms.

---

## Key Quotes

> "Value (W^V) and Output (W^O) matrices contribute more significantly to memorization compared to Query (W^Q) and Key (W^K) matrices"

> "Lower perplexity in the fine-tuned model correlates with increased memorization"

> "Higher LoRA ranks lead to increased memorization, but with diminishing returns at higher ranks"

> "The matrices that generate the most memorization are also the ones that contribute the most to the task performance"

---

## Methodology Assessment

### Strengths
- Rigorous MIA methodology with ROC AUC
- Systematic ablation across matrices and ranks
- Medical domain = high-stakes privacy context
- Clear quantitative results with confidence intervals

### Weaknesses
- Single domain (medical)
- Single model size (7B)
- LoRA only (not full fine-tuning)
- No analysis of what IS reasoning vs memorization

---

## Status

- [x] Full paper read
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals considered
- [ ] Paper graph updated

---

## Classification

| Dimension | Assessment |
|-----------|------------|
| **Stance** | Supports |
| **Confidence** | Medium-High |
| **Relevance** | High — mechanistic understanding of fine-tuning as memorization |
| **Evidence Type** | Empirical (controlled experiments) |
| **Venue Quality** | arXiv preprint |

---

## One-Sentence Summary

Fine-tuning LLMs concentrates memorization in Value and Output projection matrices, with lower perplexity sequences more likely to be memorized — providing mechanistic evidence that fine-tuning is pattern storage, not reasoning acquisition.
