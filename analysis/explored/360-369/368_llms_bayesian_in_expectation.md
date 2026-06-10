# Paper Analysis: LLMs are Bayesian, In Expectation, Not in Realization

## Metadata
- **arXiv ID**: 2507.11768
- **Title**: LLMs are Bayesian, In Expectation, Not in Realization
- **Authors**: Leon Chlon, Zein Khamis, Maggie Chlon, Mahdi El Zein, MarcAntonio M. Awada
- **Date**: July 2025 (v2: February 2026)
- **Venue**: arXiv preprint (stat.ML, cs.LG)
- **URL**: https://arxiv.org/abs/2507.11768

---

## Core Claims

1. **Positional encodings break exchangeability**: Martingale/exchangeability violations in transformers are not evidence against Bayesian ICL, but an expected consequence of positional encodings

2. **Bayesian in expectation, not in realization**: Transformers minimize expected conditional description length over orderings (near-optimal MDL), while violating permutation invariance on any fixed ordering

3. **Order-induced dispersion bounded by O(n^{-1/2})**: Quantified Martingale Violation theorem provides explicit upper bound on permutation-induced variability with interpretable constants

4. **Near-optimal expected compression (MDL)**: Position-aware transformers achieve information-theoretic MDL optimality in expectation over random orderings (Theorem 3.6)

5. **Permutation averaging reduces variance as k^{-1/2}**: Averaging over k random orderings provides Monte Carlo estimate with standard deviation decaying as k^{-1/2}

---

## Methodology

### Theoretical Framework

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE RESOLUTION: BAYESIAN IN EXPECTATION, NOT IN REALIZATION        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Falck et al. (2024): "LLMs violate martingale properties!"         │
│       → Conclusion: LLMs are NOT Bayesian                           │
│                                                                     │
│  This paper: "Yes, but positional encodings MUST break              │
│  exchangeability. The right baseline is EXPECTED performance         │
│  over random orderings, not per-ordering performance."              │
│                                                                     │
│  Result: Near-optimal MDL in expectation ✓                          │
│          Martingale violations per realization ✓ (predicted)         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Bernoulli Microscope

Uses binary sequences X = (x_1, ..., x_n) with x_i ~ Bernoulli(p) as a controlled sandbox. The sufficient statistic S_n = sum(x_i) is all an ideal Bayesian needs.

**Position-aware transformer**: Prediction depends on Embed(x_{1:t}) + PE(1:t)
**Position-agnostic transformer**: Prediction depends only on Embed(x_{1:t})

### Theorem 3.4 (Quantified Order-Induced Gap)

For length-n multiset with sufficient statistic S_n, under uniform random permutation:

```
Δ_n ≤ (L_f · σ_PE) / (2√(n-1))
```

Where:
- σ_PE = positional encoding variance (computable from architecture)
- L_f = Lipschitz constant of logit map (effective position sensitivity)

### Theorem 3.6 (MDL Optimality)

```
E_{X,π}[MDL_n(T_{θ*}, X_{π(1:n)})] = n·H(p) + O(√(n·log n))
```

Transformers achieve the information-theoretic limit up to lower-order terms, in expectation over orderings.

### Permutation Averaging (Proposition 3.8)

Averaging over k i.i.d. random orderings:
```
Var[P̄_k] = (1/k) · Var_π[Z_π]
```
Standard deviation decays as k^{-1/2}.

---

## Key Evidence

### Bernoulli Gap vs Context Length (Black-Box, gpt-4o-mini)

| Context length n | Mean proxy gap | 95% CI |
|-----------------|----------------|--------|
| 10 | 0.74 | [0.40, 1.17] |
| 50 | 0.26 | [0.19, 0.33] |

Gaps decrease with n, consistent with O(n^{-1/2}) bound.

### PE Ablation (Controlled From-Scratch Training)

Small transformers (d=128, 4 layers, 4 heads), varying only PE scheme:

| PE Type | Var[p(1|S_t=t/2)] at t=20 | Perm-avg regret (bits/tok) |
|---------|---------------------------|---------------------------|
| **None** | **3.7 × 10^{-16}** | 0.00215 |
| Learned abs | 1.2 × 10^{-7} | 0.00170 |
| Sinusoidal | 2.0 × 10^{-8} | 0.00183 |
| RoPE | 3.8 × 10^{-7} | 0.00192 |
| ALiBi | 3.6 × 10^{-6} | 0.00210 |

**8-10 orders of magnitude** increase in order variance from PE alone. No-PE = machine precision (effectively zero).

### Within-Prefix Permutations (Sufficient-Statistic Control)

Holding S_t fixed, permuting only within prefix:
- t=20: Var[p_1] = 1.02 × 10^{-2} [0.53, 1.69]
- t=200: Var[p_1] = 2.44 × 10^{-3} [1.95, 2.96]

### Permutation Averaging (ICL Tasks)

Procedurally generated few-shot classification (200 tasks, 20 random orders each):
- **Mean variance across orderings**: 0.0178 (threshold), 0.0370 (linear2d)
- **k^{-1/2} decay confirmed**: Fitted slopes -0.498 [-0.512, -0.482] and -0.499 [-0.508, -0.490]

### Categorical Extension

3-symbol analogue (beyond Bernoulli):
- Gap: 1.23 at n=12 → 0.30 at n=120 (same qualitative decay)

### Evidence-Grounded QA (Exp. 14)

3,059 items from FEVER, HotpotQA, NQ-Open, PopQA, Controls:

| Model | Dispersion slope b | Jensen gap (nats/tok) | Mixture optimality gap |
|-------|-------------------|----------------------|----------------------|
| Qwen2-7B | 0.377 [0.319, 0.435] | **0.1041** | < 10^{-4} |
| Llama-3.1-8B | 0.147 [0.109, 0.184] | **0.00982** | ≤ 5.3 × 10^{-5} |

Uniform permutation mixtures are essentially optimal among convex mixtures.

### Periodic Components

Raw gap curve exhibits **period-64 component** (detected via FFT), consistent with absolute position encoding artifacts. Phase-shift test: prepending neutral tokens changes gap by up to ≈0.2.

---

## Relationship to Thesis

### SUPPORTS Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHAT THIS MEANS FOR THE THESIS                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. LLMs are statistical compressors, not reasoners                 │
│     - "Bayesian in expectation" = optimized for average-case        │
│       compression, not reasoning about specific instances           │
│                                                                     │
│  2. Order sensitivity is ARCHITECTURAL, not emergent                │
│     - PE causes it (10^-16 → 10^-6 with PE ablation)               │
│     - Cannot be "trained away" without removing PE                  │
│                                                                     │
│  3. Martingale violations are EXPECTED, not bugs                    │
│     - Proves that positional processing creates systematic          │
│       deviations from ideal Bayesian behavior                       │
│                                                                     │
│  4. Permutation averaging = practical admission that single         │
│     orderings are unreliable                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

1. **Statistical pattern matching confirmed**: The "Bayesian in expectation" framing explicitly says LLMs are optimized compressors that match statistical patterns on average, not systems that reason about individual instances.

2. **Positional encoding is an architectural blind spot**: The 8-10 order-of-magnitude increase in variance from PE proves that order sensitivity is baked into the architecture, explaining why models are fragile to prompt ordering.

3. **Links to premise order sensitivity**: Directly provides the theoretical foundation for why premise order matters (Paper 202, Embers of Autoregression) and why lost-in-the-middle effects occur.

4. **Practical limitation acknowledged**: The recommended mitigation (permutation averaging, k calls) is expensive and acknowledges that single-shot LLM outputs are fundamentally unreliable for order-sensitive tasks.

### Independent Assessment

This paper is more nuanced than a pure "supports" classification. It provides a *defense* of LLMs by showing they are "Bayesian in expectation," while simultaneously providing the mechanistic explanation for *why* they fail on individual realizations. The thesis implication is clear: being "Bayesian in expectation" is precisely what a sophisticated statistical pattern-matcher would be. It does not imply reasoning.

---

## Relationship to Other Papers

### Directly Extends
- **Paper 168 (2509.11208)**: Companion paper; shares QMV theorem, EDFL, and evidence-grounded QA experiments. This paper focuses on the Bayesian/MDL interpretation; Paper 168 focuses on hallucination prevention.
- **Paper 367 (2602.19239)**: Companion paper on procedural hallucinations; provides micro-level routing failures where this paper provides macro-level compression theory.

### Strongly Supports
- **Paper 202 (2309.13638)**: Embers of Autoregression — provides theoretical explanation for why autoregressive artifacts persist (positional encoding)
- **Paper 203 (2410.01792)**: Does o1 Still Show Embers? — PE effects would persist in reasoning models too
- **Paper 315 (2512.02914)**: Martingale Score — directly addresses and extends the martingale diagnostic framework

### Provides Mechanism For
- **Paper 161 (2302.00093)**: LLMs distracted by irrelevant context — PE-induced order sensitivity explains why context order matters
- **Paper 286 (2602.02219)**: Position Bias in LLM-as-Judge — positional encoding creates the position bias

### Challenges (Constructively)
- **Falck et al. (2024)**: "Is ICL Bayesian? A martingale perspective" — shows violations don't disprove Bayesian behavior, just reflect PE artifacts

---

## REBUTTALS

### Potential Limitations

1. **Bernoulli sandbox is very simple**: The theoretical analysis uses binary sequences as a "microscope." Real language tasks involve vastly more complex structure.

2. **Gap between theory and practice**: Theorem 3.4 assumes logit depends on ordering only through a pooled positional summary. This is a simplification for real transformers.

3. **Limited model scale for ablations**: From-scratch training uses tiny models (d=128, 4 layers). Unclear if findings scale to frontier models.

4. **"Bayesian in expectation" may not be the right standard**: For deployment, per-realization reliability matters more than average-case optimality.

### Authors' Acknowledged Limitations

> "Theorem 3.4 assumes logit depends on ordering only through a pooled positional summary and is L_f-Lipschitz — yields an interpretable upper bound but not intended to predict gap magnitudes in large pretrained transformers."

> "A fully mechanistic account of order effects in large LLMs remains open."

> "We do not claim uniform permutations are a baseline for general language modeling where word order carries semantics."

### Methodological Concerns

1. Black-box experiments use gpt-4o-mini — may not generalize to other architectures
2. Evidence-grounded QA uses only 2 open models (Qwen2-7B, Llama-3.1-8B)
3. Debiasing removes period-64 component — but the cause of this periodicity is not fully explained

---

## Key Quotes

> "Transformers can be 'Bayesian in expectation, not in realization': position encodings break exchangeability, but average-case behavior can still track Bayesian/MDL benchmarks while producing measurable, order-dependent deviations."

> "Position-aware transformers necessarily violate this invariance, so violations are not, by themselves, evidence against Bayesian-like in-context learning."

> "The no-PE model has essentially zero within-prefix order variance (≈10^{-16}), while PE variants have nonzero variance (10^{-8}–10^{-6}), an ≈8–10 order-of-magnitude increase."

> "Permutation averaging is a simple, model-agnostic way to reduce order-induced variability."

---

## Methodology Assessment

### Strengths
- **Rigorous theoretical framework**: Explicit bounds with interpretable constants
- **Clean PE ablation**: From-scratch training isolating PE as sole variable — strongest evidence
- **Multiple validation levels**: Black-box API, controlled training, evidence-grounded QA
- **Statistical rigor**: 5,000 bootstrap resamples, 95% CIs throughout
- **Extends beyond Bernoulli**: Categorical, ICL tasks, and real QA all show same pattern

### Weaknesses
- Small model scale for ablations (d=128)
- Bernoulli sandbox may not capture full complexity
- Black-box experiments on single API deployment
- Period-64 artifact noted but not fully explained

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
| **Stance** | Supports |
| **Confidence** | High |
| **Relevance** | Very High — foundational theory for order sensitivity and compression behavior |
| **Evidence Type** | Theoretical + Empirical |
| **Venue Quality** | arXiv preprint |

---

## One-Sentence Summary

Positional encodings break exchangeability by 8-10 orders of magnitude, making transformers "Bayesian in expectation, not in realization" — near-optimal compressors on average over orderings but systematically order-sensitive on any fixed realization, with permutation averaging reducing variance as k^{-1/2}.
