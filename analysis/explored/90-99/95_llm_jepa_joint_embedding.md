# Paper Analysis: LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures

## Metadata
- **arXiv ID**: 2509.14252
- **Title**: LLM-JEPA: Large Language Models Meet Joint Embedding Predictive Architectures
- **Authors**: Hai Huang (Atlassian), Yann LeCun (NYU), Randall Balestriero (Brown University)
- **Date**: September 2025
- **Venue**: Preprint
- **Stance**: BALANCED (improves ID performance; NO OOD testing — critical limitation)

---

## Core Claims

1. **LLM-JEPA improves representation quality** by adding JEPA objective to standard next-token prediction
2. **A good next-token predictor is NOT a good JEPA** — minimizing NTP doesn't minimize JEPA loss
3. **Consistent improvements** across Llama3, Gemma2, OLMo, OpenELM families
4. **Induces more structured representations** — clearer t-SNE organization, narrower singular value subspace
5. **Resists overfitting** better than standard fine-tuning
6. **Works for pretraining**, not just fine-tuning

---

## Methodology

### LLM-JEPA Objective (Equation 2)

```
L_LLM-JEPA = L_LLM (generative) + λ × d(Pred(Enc(Text)), Enc(Code)) (abstraction)
```

**Components**:
- **Encoder**: Last token hidden state from final layer
- **Predictor**: Tied-weights using special [PRED] tokens (no new parameters)
- **Metric**: Cosine similarity
- **Views**: Text and Code as two views of same knowledge

**Implementation**:
- Custom attention mask ensures Text/Code embeddings computed independently
- Can be done in 2 forward passes
- Loss dropout to reduce computational overhead

### Datasets
- **NL-RX-SYNTH/TURK**: Natural language to regular expression
- **Spider**: Natural language to SQL
- **GSM8K**: Math word problems
- **HellaSwag, NQ-Open**: QA benchmarks

---

## Key Evidence

### Finding 1: Primary Benchmark Results (Llama-3.2-1B-Instruct)

| Dataset | Baseline | LLM-JEPA | Improvement |
|---------|----------|----------|-------------|
| **NL-RX-SYNTH** | 57.29% | **71.46%** | **+14.17%** |
| GSM8K (Qwen3-1.7B) | 44.32% | **45.00%** | +0.68% |
| NQ-Open | 20.12% | **21.59%** | +1.47% |
| HellaSwag | 69.40% | **70.51%** | +1.11% |

**Note**: Largest gains on pattern-matching tasks (NL-RX), modest on reasoning (GSM8K).

### Finding 2: Model Family Results (NL-RX-SYNTH)

All families show improvement:
- Llama-3.2-1B-Instruct: Significant
- Gemma-2-2b-it: Significant
- OpenELM-1_1B-Instruct: Significant
- OLMo-2-0425-1B-Instruct: Significant

### Finding 3: LoRA Results — Scaling with Rank

| LoRA Rank | Baseline | LLM-JEPA | Δ |
|-----------|----------|----------|---|
| 64 | 21.09% | **32.46%** | +11.37% |
| 128 | 34.21% | **48.45%** | +14.24% |
| 256 | 45.57% | **60.80%** | +15.23% |
| 512 | 50.18% | **72.41%** | +22.23% |
| Full | 57.29% | **71.46%** | +14.17% |

### Finding 4: Structured Representations

- **t-SNE**: LLM-JEPA produces clearer Text-Code clustering
- **Singular values**: Top 100 SV of `Enc(Text) - Enc(Code)` orders of magnitude lower for LLM-JEPA
- Text→Code mappings confined to narrow subspace

### Finding 5: Pretraining Results

| Method | Accuracy |
|--------|----------|
| L_LLM | 54.38% |
| **LLM-JEPA** | **60.59%** |

+6.21% improvement from pretraining with JEPA objective.

---

## Critical Analysis: NO OOD/COMPOSITIONAL TESTING

### MAJOR LIMITATION

**This paper does NOT test**:
1. Out-of-distribution generalization
2. Compositionally novel combinations
3. Length generalization
4. Held-out complexity levels
5. Different domains than training

**All experiments use standard train/test splits from same datasets.**

### Why This Matters for the Thesis

Without OOD testing, we **cannot distinguish between**:
1. "LLM-JEPA enables more abstract reasoning that generalizes"
2. "LLM-JEPA enables better pattern matching within training distribution"

The improvements could equally be explained by:
- Better pattern extraction from training data
- More efficient representation learning for seen patterns
- Regularization effects preventing overfitting

---

## Critical Analysis: Relationship to Thesis

### Evidence POTENTIALLY Supporting Thesis

1. **Modest reasoning gains**: GSM8K improvement only ~0.7%
2. **Largest gains on pattern tasks**: NL-RX (regex generation) shows +14% vs GSM8K +0.7%
3. **No OOD testing**: Cannot show reasoning beyond training distribution

### Evidence POTENTIALLY Challenging Thesis

1. **Structured representations**: JEPA induces more organized embedding space
2. **Abstract "views"**: Learning Text→Code mapping could enable abstraction

### Net Assessment

**TANGENTIAL/NEUTRAL to thesis** — without OOD testing, improvements could be:
- Better in-distribution pattern matching (supports thesis)
- Better abstract reasoning (challenges thesis)

**Cannot determine which** based on this paper alone.

---

## Relationship to Other Papers

### Related To
- **JEPA literature (vision)**: Extends to language domain
- **Paper 28 (Multilingual Latent Reasoners)**: Both explore representation learning

### Does NOT Address
- Papers showing compositional generalization failure
- Papers testing OOD reasoning

### Potential Synergy
- Could LLM-JEPA improve OOD generalization? **Untested.**

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **No OOD evaluation**: Critical gap for understanding reasoning
2. **Improvements modest on reasoning**: GSM8K gain is only 0.68%
3. **Requires paired views**: Limited to datasets with natural Text-Code pairs

### Limitations (Acknowledged)

1. "Primary bottleneck is 2-fold increase in compute cost during training"
2. Two additional hyperparameters require tuning
3. "Restricted to datasets offering non-trivial views"

### Limitations (NOT Acknowledged)

1. **No OOD/generalization testing** — critical omission
2. No analysis of what types of problems improve
3. No mechanistic understanding of why JEPA helps

---

## Key Quotes

> "A good next-token predictor is not a good JEPA"

> "LLM-JEPA is able to outperform the standard LLM training objectives by a significant margin across models"

> "Top 100 singular values... are orders of magnitude lower for LLM-JEPA vs. baseline"

> "We focus first on tasks and datasets that are inherently suited for JEPA objectives: the ones providing multiple views of the same underlying knowledge"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Critical Note for Thesis

**This paper should NOT be cited as evidence for or against the thesis** without noting:
1. All gains are in-distribution
2. No compositional or OOD testing
3. Largest gains are on pattern-matching tasks (regex), not reasoning

The question of whether LLM-JEPA enables genuine reasoning generalization **remains open**.
