# SCOPE: Selective Conformal Optimized Pairwise LLM Judging

**arXiv**: [2602.13110](https://arxiv.org/abs/2602.13110)
**Date**: February 2026
**Authors**: Sher Badshah, Ali Emami, Hassan Sajjad

## Summary

Proposes SCOPE, a framework for selective pairwise LLM judging with finite-sample statistical guarantees. Acknowledges that LLM judges are "prone to miscalibration and systematic biases" (especially position bias) and introduces Bidirectional Preference Entropy (BPE) to mitigate these issues. Uses conformal prediction to calibrate acceptance thresholds ensuring error rates among accepted judgments stay below user-specified levels.

## Key Findings

```
┌─────────────────────────────────────────────────────────────────────┐
│  CORE INSIGHT: LLM judges need statistical guardrails because      │
│  they exhibit systematic biases that produce "highly confident     │
│  but incorrect judgments"                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### The Problem with LLM Judges

1. **Position bias**: Judges systematically favor responses in certain positions
2. **Miscalibration**: Confidence scores don't reflect true correctness probability
3. **Overconfidence on errors**: "Naive confidence thresholding can fail to abstain precisely when it should"

### SCOPE Framework

- **Selective prediction**: Return judgment only when sufficiently confident, abstain otherwise
- **Conformal calibration**: Finite-sample guarantee that error rate ≤ α among accepted judgments
- **BPE (Bidirectional Preference Entropy)**: Query judge in both response orderings, aggregate to enforce invariance

### Key Numbers

| Metric | Value | Context |
|--------|-------|---------|
| Target risk α | 0.10 | User-specified error budget |
| Empirical risk | 0.097-0.099 | Consistently meets target |
| Coverage (Qwen-14B) | 0.89 | RewardBench |
| Coverage (Qwen-32B) | 0.98 | RewardBench |
| Coverage improvement | 2.4× | vs naive baselines on MT-Bench |

### Baselines Fail Risk Constraints

| Method | Coverage | Risk | Constraint Met? |
|--------|----------|------|-----------------|
| Vanilla (no abstention) | 1.00 | 0.217-0.269 | No |
| Heuristic thresholding | 0.81-0.96 | 0.18-0.25 | No |
| Naive calibration | varies | 0.10-0.12 | Often fails |
| SCOPE | 0.25-0.98 | 0.097-0.099 | Yes |

## Relevance to Thesis

**Stance**: Balanced

The paper provides important evidence that:

1. **Supports thesis**: LLM judges are unreliable pattern matchers exhibiting systematic biases
   - "LLM judges remain prone to miscalibration and systematic biases"
   - Position bias produces "highly confident but incorrect judgments"
   - Without statistical correction, error rates far exceed targets

2. **Mitigates but doesn't refute**: Proposes engineering workaround, not claim of genuine reasoning
   - Treats LLMs as statistical systems requiring calibration
   - Uses conformal prediction (distribution-free guarantee) - acknowledges unpredictability
   - BPE is a debiasing technique, not a reasoning enhancement

The paper never claims LLMs actually reason - it treats them as biased prediction systems that need guardrails. The contribution is making unreliable judges *useful*, not making them *reasoning*.

## Key Quotes

> "LLM judges remain prone to miscalibration and systematic biases."

> "Naive confidence thresholding can fail to abstain precisely when it should, violating a user's reliability constraint even when average calibration looks reasonable."

> "These effects can produce highly confident but incorrect judgments."

> "Improvements in calibration or discrimination do not translate into finite-sample, distribution-free guarantees that the error rate among accepted judgments is controlled."

## Methodology

- **Benchmarks**: MT-Bench, RewardBench, Chatbot Arena
- **Models**: Qwen-2.5-7B/14B/32B, Llama-3.1-70B
- **Protocol**: 50/50 calibration/test split, 1000 random splits for robustness
- **Risk levels tested**: α ∈ {0.05, 0.10, 0.15, 0.20, 0.25}

## Connections to Other Papers

- **Extends**: LLM-as-Judge literature (Zheng et al. 2023)
- **Addresses**: Position bias findings (#267-276 in corpus)
- **Methodology**: Conformal prediction (Angelopoulos & Bates 2023)
- **Complements**: COIN uncertainty quantification (Wang et al. 2025b)

## Limitations Acknowledged

- Requires labeled calibration data with human preferences
- Two forward passes per instance (computational overhead)
- Statistical guarantee under exchangeability assumption
- Coverage-reliability tradeoff is fundamental

## REBUTTALS

None identified. This paper proposes a mitigation framework rather than making strong claims about LLM capabilities.

---

**Analysis date**: March 2026
**Analyst**: Literature Review System
