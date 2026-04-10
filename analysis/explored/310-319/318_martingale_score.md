# Paper Analysis: Martingale Score: A Measure of Bayesian Rationality in LLM Reasoning

## Metadata
- **arXiv ID**: 2512.02914
- **Title**: Martingale Score: A Measure of Bayesian Rationality in LLM Reasoning
- **Authors**: Multiple authors (academic institutions)
- **Date**: December 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **Belief entrenchment is pervasive**: LLMs update beliefs in favor of priors rather than in response to evidence.

2. **51/54 CoT experiments show positive Martingale Scores**: Widespread violations of Bayesian rationality.

3. **Higher entrenchment → worse accuracy**: Martingale Score correlates with Brier Score (prediction error).

4. **Even critical-thinking prompts show entrenchment**: Robust across conditions and models.

---

## Methodology

### Models
GPT-4o, DeepSeek R1/V3, Gemini 2.0, Llama 4

### Domains
Forecasting (Metaculus/Polymarket), r/ChangeMyView, OpenReview

### Reasoning Types
CoT and Debate

### Metric
Martingale Score M = β₁ from regression Δb = β₁·b_prior + β₀ + ε
- M > 0 means belief updates are predictable from priors (entrenchment)

```
┌─────────────────────────────────────────────────────────────────────┐
│  MARTINGALE SCORES ACROSS SETUPS (Higher = More Entrenchment)       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Domain           CoT (avg)     Debate (avg)                        │
│  ──────────────────────────────────────────────────────────────────  │
│  Forecasting      +0.032*       -0.009                              │
│  ChangeMyView     +0.103*       +0.074                              │
│  OpenReview       +0.082*       +0.148*                             │
│                                                                     │
│  * = statistically significant (p < 0.05)                           │
│  Positive = belief updates predictable from priors                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

| Finding | Evidence | Context |
|---------|----------|---------|
| Positive scores | 51/54 CoT experiments | Pervasive entrenchment |
| Value-laden worse | ChangeMyView > Forecasting | Domain matters |
| System prompts | Prior-conforming > No-prompt > Critical-thinking | All show entrenchment |
| Accuracy correlation | Higher M → Higher Brier Score | Entrenchment hurts |
| Robust | All tested models | Not model-specific |

### The Martingale Property
```
Bayesian Rationality:  E[Δb | b_prior] = 0 for all priors
                       (Belief updates should NOT be predictable)

LLM Reality:           E[Δb | b_prior] = M·b_prior where M > 0
                       (Higher prior → Higher update in same direction)
                       
This is CONFIRMATION BIAS in statistical form
```

---

## Relationship to Other Papers

### Supports
- **#312 Unfaithful CoT** (2305.04388): Both show reasoning serves priors, not truth
- **#311 Human-Like Biases** (2602.02983): Both examine systematic biases

### Related
- **#206 Sycophancy**: Both show models adjust to expectations
- **#293 Sycophantic Chatbots**: Both reveal agreement bias

---

## REBUTTALS

### This Paper Formalizes
- Why reasoning fails: it's confirmation bias, not truth-seeking
- Process-based metric: Unlike accuracy, measures HOW reasoning happens
- Unsupervised applicability: Works in domains without ground truth

### Limitations (Authors Acknowledge)
1. LLM-as-judge may introduce its own biases
2. Limited to open-ended domains where beliefs can be extracted
3. Doesn't distinguish between justified prior-consistent updates and bias

---

## Key Quotes

> "LLM reasoning can deviate from truth-seeking due to belief entrenchment."

> "The more a model reasons, the more it may entrench its bias."

> "We find that all tested LLMs show entrenchment in reasoning."

> "Higher Martingale Scores correlate with worse forecasting accuracy."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  CLAIM: Extended reasoning (CoT, R1) helps models find truth        │
│  REALITY: Reasoning often REINFORCES priors, not CHALLENGES them    │
│                                                                     │
│  The more a model "reasons," the more it may entrench its bias      │
└─────────────────────────────────────────────────────────────────────┘
```

**SUPPORTS** the thesis:

1. **Reasoning as rationalization**: Models don't seek truth; they justify existing beliefs
2. **Confirmation bias built-in**: LLMs exhibit human-like confirmation bias at scale
3. **CoT may hurt**: Extended reasoning can amplify rather than correct biases
4. **Pattern matching on priors**: Models match patterns to their initial response, not to evidence

This provides a principled statistical framework for detecting when "reasoning" is actually "rationalizing."

**Stance**: SUPPORTS

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
