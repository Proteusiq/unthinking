# Paper Analysis: Predictable Compression Failures: Why Language Models Actually Hallucinate

## Metadata
- **arXiv ID**: 2509.11208
- **Title**: Predictable Compression Failures: Why Language Models Actually Hallucinate
- **Authors**: Leon Chlon, Ahmed Karim, Maggie Chlon (Hassana Labs)
- **Date**: September 2025
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2509.11208

---

## Core Claims

1. **Hallucinations are predictable compression failures**: Not random errors but systematic consequences of insufficient information for rare events

2. **LLMs are "Bayesian in expectation, not in realization"**: Transformers minimize expected conditional description length over orderings, not permutation-invariant description length

3. **Order-induced deviations scale as O(log n)**: Quantified Martingale Violation theorem provides explicit bounds on positional effects

4. **Information budget determines reliability**: The Expectation-level Decompression Law (EDFL) links information content to hallucination risk

5. **Near-zero hallucination achievable**: Via calibrated refusal at ~24% abstention using Information Sufficiency Ratio (ISR)

---

## Methodology

### Theoretical Framework

**Key Insight**: Transformers with positional encodings minimize:
```
E_π[ℓ(Y|Γ_π(X))]  (expected conditional description length over orderings)
```
NOT:
```
ℓ(Y|X)  (permutation-invariant description length)
```

This admits a Kolmogorov-complexity interpretation up to additive constants.

### Three Theoretical Contributions

#### 1. Quantified Martingale Violation (QMV) Theorem

For permutation-induced residual R_π(x):
- Under harmonic decay (α=1): **E_π|R_π(x)| ≤ (C/4)(log n - 3/2 + o(1))**
- Order-induced deviations scale as **O(log n)**

Empirically confirmed:
- Qwen2-7B: b ≈ 0.377 (slope vs ln n)
- Llama-3.1-8B: b ≈ 0.147

#### 2. Expectation-level Decompression Law (EDFL)

For event A with prior mass q̄ and target posterior p = 1-ε:
```
Δ̄ ≥ (1-ε)log(1/q̄) + O(q̄)  nats required
```

**Key implication**: Achieving reliability for rare events (q̄ << 1) requires information proportional to log(1/q̄).

#### 3. Operational Planners

- **Bits-to-Trust (B2T)**: Information needed for target reliability h*
- **Risk-of-Hallucination (RoH)**: Achievable error given information budget
- **Information Sufficiency Ratio (ISR)**: ISR < 1 → abstain; ISR ≥ 1 → answer

---

## Key Evidence

### Experiment 1: MDL Optimality via Permutation Mixtures

| Model | Dispersion Slope b | R² | Jensen Gap (nats/token) |
|-------|-------------------|-----|------------------------|
| Qwen2-7B | 0.377 [0.319, 0.435] | 0.742 | 0.1041 |
| Llama-3.1-8B | 0.147 [0.109, 0.184] | 0.515 | 0.00982 |

- Dispersion follows **a + b·ln(n)** across 3,059 items, n ∈ [3, 60]
- Permutation mixtures improve ground-truth likelihood
- Uniform mixture nearly optimal (gap < 10⁻⁴ nats/token)

### Experiment 2: Causal Dose-Response

Controlling information content while holding prompt length constant (L=4 chunks):

| Dose (support chunks) | 0 | 1 | 2 | 3 |
|----------------------|---|---|---|---|
| Hallucination Rate | High | Medium | Low | Very Low |

- **0.13 fewer hallucinations per additional nat** (OLS slope)
- Δ̄ increases at 0.375 nats per dose (Spearman ρ=0.80, p<0.001)
- Llama-3.1-8B validation: β ≈ 0.110 hallucination reduction per nat

### Experiment 3: Pre-specified Audit

On Gemma-2-9B with 528 held-out QA items:

| Metric | Value | 95% CI |
|--------|-------|--------|
| Boundary Alignment | **96.2%** | [94.3, 97.5] |
| Hallucination Rate | **~0%** | [0.0, 0.7] |
| Abstention Rate | 24.1% | [20.6, 27.9] |
| Accuracy on Attempts | 80.5% | [76.8, 83.8] |
| Mean Jensen Gap | 0.82 nats | [0.71, 0.93] |

---

## Relationship to Thesis

### STRONGLY SUPPORTS Thesis

1. **Hallucination as fundamental limit**: Frames hallucination as compression failure, not fixable bug
   - Directly supports Paper 165 (Hallucination is Inevitable)

2. **Pattern matching interpretation**: "Bayesian in expectation, not in realization" = statistical pattern matching, not genuine reasoning

3. **Information-theoretic bounds**: Proves rare events require proportionally more information
   - Aligns with training distribution boundedness thesis

4. **Positional processing creates systematic errors**: Not noise but predictable deviation from ideal

### Key Quote for Thesis

> "The framework turns hallucinations into predictable compression failures and enables principled information budgeting."

> "LLMs perform near-Bayesian inference yet violate permutation invariance on exchangeable data."

### Practical Implication

Provides **deployable solution**: ISR-based answer/abstain decisions achieve near-zero hallucination through calibrated refusal. This confirms that the limitation is real but manageable through proper information budgeting.

---

## Relationship to Other Papers

### Strongly Supports
- **Paper 165 (Hallucination Inevitable)**: Complementary theoretical foundation
  - Paper 165: Computability theory proof
  - Paper 168: Information-theoretic/compression framework
- **Paper 91 (HalluGuard)**: Both analyze hallucination mechanisms

### Extends
- **Kalai & Vempala (2024)**: Builds on "calibrated models must hallucinate" with predictive framework
- **Farquhar et al. (2024)**: Goes beyond detection to prevention

### Related Theoretical Work
- **Paper 99 (On the Notion that LMs Reason)**: Both frame LLMs as statistical systems
- **Paper 24 (CoT Compression Theory)**: Both use information-theoretic analysis

### Connects To
- **Lost-in-the-Middle (Liu et al.)**: Positional effects formalized here with O(log n) bounds

---

## REBUTTALS TO THIS PAPER

### Potential Limitations

1. **Restricted to binary adjudication**: Theory sharpest for Bernoulli events
   - Multi-class extension via one-vs-rest not fully developed

2. **Specific to QA tasks**: Experiments on factuality datasets
   - Unclear extension to code generation, creative tasks

3. **Abstention may not always be acceptable**: 24% abstention might be too high for some applications

### Authors' Acknowledged Limitations

> "We restrict evaluation to binary adjudication because EDFL's guarantees are tightest for Bernoulli events."

> "The relationship between model scale and positional bias (Qwen2 vs Llama variation) deserves systematic investigation."

### Methodological Concerns

1. **Factuality Slice dataset**: Custom dataset, not standard benchmark
2. **Limited model range**: Only tested on 7B-9B models
3. **No comparison with other hallucination detection methods**

---

## Key Quotes

> "Large language models perform near-Bayesian inference yet violate permutation invariance on exchangeable data. We resolve this by showing transformers minimize expected conditional description length (cross-entropy) over orderings... This makes them Bayesian in expectation, not in realization."

> "Hallucinations drop by ~0.13 per additional nat."

> "A pre-specified audit with a fixed ISR=1.0 achieves near-0% hallucinations via calibrated refusal at 24% abstention."

> "The framework turns hallucinations into predictable compression failures and enables principled information budgeting."

> "Rather than treating hallucinations as inevitable or relying on post-hoc detection, practitioners can now predict and prevent failures through principled information management."

---

## Methodology Assessment

### Strengths
- **Rigorous theoretical framework**: QMV, EDFL, ISR all formally derived
- **Non-circular validation**: Ground-truth experiments separate from metrics
- **Practical deployment tools**: ISR directly usable
- **Causal identification**: Dose-response with randomized permutations

### Weaknesses
- Limited model scale (7B-9B)
- Custom dataset rather than standard benchmarks
- Binary adjudication focus
- No comparison with semantic entropy or other detection methods

---

## Status

- [x] Full paper read
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Classification

| Dimension | Assessment |
|-----------|------------|
| **Stance** | Strongly Supports |
| **Confidence** | High |
| **Relevance** | Very High - theoretical foundation for hallucination |
| **Evidence Type** | Theoretical + Empirical |
| **Venue Quality** | arXiv preprint (not yet peer-reviewed) |

---

## One-Sentence Summary

Hallucinations are predictable compression failures arising from LLMs being "Bayesian in expectation, not in realization," with order-induced deviations scaling as O(log n) and achievable near-zero hallucination rates through information-budgeted abstention.
