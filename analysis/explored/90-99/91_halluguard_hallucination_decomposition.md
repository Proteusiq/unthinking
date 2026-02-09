# Paper Analysis: HalluGuard: Demystifying Data-Driven and Reasoning-Driven Hallucinations in LLMs

## Metadata
- **arXiv ID**: 2601.18753
- **Title**: HalluGuard: Demystifying Data-Driven and Reasoning-Driven Hallucinations in LLMs
- **Authors**: Xinyue Zeng (Virginia Tech), Junhong Lin (MIT), Yujun Yan (Dartmouth), et al.
- **Date**: January 2026
- **Venue**: Preprint
- **Stance**: SUPPORTS (with nuances — distinguishes training-time vs inference-time failures)

---

## Core Claims

1. **Hallucinations arise from two sources**: data-driven (training-time mismatches) and reasoning-driven (inference-time instabilities)
2. **Unified theoretical decomposition**: The Hallucination Risk Bound formally separates these components
3. **NTK-based detection is effective**: Neural Tangent Kernel geometry captures both representational adequacy and rollout instability
4. **HalluGuard achieves SOTA**: Evaluated on 10 benchmarks, 11 baselines, 9 LLM backbones
5. **Hallucination type varies by task**: Math-500 shows 98.1% reasoning-driven errors; instruction-following shows 88.9% reasoning-driven

---

## Methodology

### Theoretical Framework: Hallucination Risk Bound

**Theorem 3.2**:
```
||u* - u_h|| ≤ [DATA-DRIVEN TERM] + [REASONING-DRIVEN TERM]
```

**Data-driven term** captures:
- `ε_mismatch`: Wasserstein distance between prompt and training distributions
- `Signal_k`: Task-aligned energy in top-k eigenspace
- `det(K)`: Determinant of NTK Gram matrix (representational adequacy)

**Reasoning-driven term** captures:
- Exponential growth: `α(e^(βT) - 1)` where T = sequence length
- `log σ_max`: Uniform spectral bound of Jacobians (rollout amplification)
- `-log κ²`: Condition number penalty (spectral instability)

### HalluGuard Score (Equation 7)
```
HalluGuard(u_h) = det(K) + log σ_max - log κ²
```

### Evaluation Setup
- **Benchmarks**: SQuAD, RAGTruth, TruthfulQA, Math-500, GSM8K, BBH, etc.
- **Baselines**: SelfCheckGPT, Semantic Entropy, Perplexity, INSIDE, ICR Probe, etc.
- **Models**: Llama2-7B/13B/70B, QwQ-32B, others

---

## Key Evidence

### Finding 1: Correlation Between NTK Proxies and Task Types

| Proxy | SQuAD (data-centric) | Math-500 (reasoning) | TruthfulQA |
|-------|---------------------|----------------------|------------|
| det(K) | **0.84** | 0.42 | 0.61 |
| log σ_max - log κ² | 0.39 | **0.88** | 0.67 |

**Interpretation**: Data-driven proxy (det(K)) best predicts factual errors; reasoning-driven proxy best predicts math errors.

### Finding 2: Hallucination Type Distribution

| Benchmark | Reasoning-Driven | Data-Driven | Total Errors |
|-----------|-----------------|-------------|--------------|
| Natural benchmark | 88.9% | 11.1% | 3,499 |
| **MATH-500** | **98.1%** | **1.9%** | 1,985 |

**Critical**: On reasoning tasks, 98% of errors are inference-time failures, not training gaps.

### Finding 3: Detection Performance (QwQ-32B)

| Benchmark | AUROC_r | AUPRC_r | Improvement over 2nd best |
|-----------|---------|---------|---------------------------|
| Math-500 | 81.76% | 79.76% | up to 8.3% |
| RAGTruth | 84.59% | 81.15% | up to 7.7% |
| TruthfulQA | 77.05% | 73.79% | up to 6.2% |

### Finding 4: Reasoning-Driven Errors Grow Exponentially

The theoretical bound shows:
```
Reasoning deviation ∝ α(e^(βT) - 1)
```
Errors accumulate exponentially with sequence length T through Jacobian instabilities.

---

## Critical Analysis: Relationship to Thesis

### Evidence SUPPORTING the Thesis

1. **Data-driven term links to training distribution**: The formula explicitly models hallucination risk as depending on `ε_mismatch` (Wasserstein distance between prompt and training distributions)

2. **NTK framework implies pattern matching**: Model outputs depend on similarity to training data in kernel space. det(K) measures how well test input can be represented by training-induced feature space

3. **0.84 correlation** between det(K) and errors on SQuAD shows factual errors strongly linked to representational adequacy from training

### Evidence COMPLICATING the Thesis

1. **Reasoning-driven hallucinations are distinct**: 98.1% of MATH-500 errors are reasoning-driven, arising from "inference-time instabilities" not training mismatch

2. **Exponential amplification during generation**: Errors compound through generation process, independent of training data quality

3. **Jacobian instability is a process property**: Rollout amplification captures local dynamics during inference, not static patterns from training

### Net Assessment

The paper provides a **nuanced view** that partially supports the thesis:
- Data-driven hallucinations → direct training distribution matching
- Reasoning-driven hallucinations → inference dynamics beyond pattern matching

**Key insight for thesis**: Even if the model "knows" correct patterns, instabilities in generation cause failures. This suggests reasoning failures have BOTH a training component AND an inference component.

---

## Relationship to Other Papers

### Supports
- **Paper 115 (Scaling Hop)**: Both identify error accumulation mechanisms during reasoning
- **Paper 116 (Code over Words)**: Both show semantic processing instabilities

### Related To
- **Paper 21 (Illusions of Reflection)**: Both show inference-time reasoning limitations
- **Paper 37 (Snowballing)**: Directly cited — hallucinations compound during generation

### Extends
- Provides theoretical foundation for empirically observed reasoning failures

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **NTK approximation validity**: For large LLMs far from initialization, NTK approximation may not hold
2. **Proxy vs theory gap**: HalluGuard is a surrogate for theoretical bound, not direct measurement
3. **Task-specific tuning needed**: Different proxies optimal for different tasks challenges "unified" claim

### Limitations (Acknowledged)

1. "Direct step-wise Jacobians for billion-parameter LLMs are intractable" — full bound cannot be computed
2. Relies on NTK assumptions (Hilbert space structure, local Lipschitz continuity)

---

## Key Quotes

> "Hallucinations typically stem from two sources: data-driven hallucinations and reasoning-driven hallucinations"

> "Reasoning-driven hallucinations originate from inference-time failures such as logical inconsistencies or breakdowns in multi-step reasoning"

> "On MATH-500, 98.1% of errors are reasoning-driven and only 1.9% are data-driven"

> "Reasoning-driven term... reflecting instability introduced by inference-time dynamics"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
