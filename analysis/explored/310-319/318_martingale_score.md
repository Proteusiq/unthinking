## Summary

This paper introduces the Martingale Score to measure **belief entrenchment** in LLM reasoning — the tendency to update beliefs in favor of prior opinions rather than in response to evidence. Under Bayesian rationality, belief updates should NOT be predictable from priors (the Martingale property). The study finds widespread violations: models systematically predict belief updates from priors, and this correlates with accuracy drops.

## Methodology

- **Models**: GPT-4o, DeepSeek R1/V3, Gemini 2.0, Llama 4
- **Domains**: Forecasting (Metaculus/Polymarket), r/ChangeMyView, OpenReview
- **Reasoning**: CoT and Debate
- **Metric**: Martingale Score M = β₁ from regression Δb = β₁·b_prior + β₀ + ε
- **Interpretation**: M > 0 means belief updates are predictable from priors (entrenchment)

## Key Findings

### Belief Entrenchment is Pervasive
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

### Key Results
1. **51/54 CoT experiments show positive Martingale Scores** (entrenchment)
2. **Value-laden domains worse**: ChangeMyView > Forecasting in entrenchment
3. **System prompts matter**: Prior-conforming > No-prompt > Critical-thinking
4. **Entrenchment harms accuracy**: Higher M correlates with higher Brier Score (worse predictions)

### The Martingale Property
```
Bayesian Rationality:  E[Δb | b_prior] = 0 for all priors
                       (Belief updates should NOT be predictable)

LLM Reality:           E[Δb | b_prior] = M·b_prior where M > 0
                       (Higher prior → Higher update in same direction)
                       
This is CONFIRMATION BIAS in statistical form
```

### Not an Artifact
- Even with "critical thinking" prompts: M̄ = 0.072
- Even with no system prompt: M̄ = 0.075
- Prior-conforming prompt: M̄ = 0.082
- The effect is robust across conditions

## Critical Observations

### Why This Matters
1. **Process-based metric**: Unlike accuracy (outcome-based), Martingale Score measures HOW reasoning happens
2. **Unsupervised**: Works in domains without ground truth (e.g., value-laden questions)
3. **Predicts accuracy**: Higher entrenchment → worse forecasting accuracy
4. **Universal finding**: All tested models exhibit entrenchment

### Implications for "Reasoning"
```
┌─────────────────────────────────────────────────────────────────────┐
│  CLAIM: Extended reasoning (CoT, R1) helps models find truth        │
│  REALITY: Reasoning often REINFORCES priors, not CHALLENGES them    │
│                                                                     │
│  The more a model "reasons," the more it may entrench its bias      │
└─────────────────────────────────────────────────────────────────────┘
```

## Relevance to Thesis

**SUPPORTS** the thesis:

1. **Reasoning as rationalization**: Models don't seek truth; they justify existing beliefs
2. **Confirmation bias built-in**: LLMs exhibit human-like confirmation bias at scale
3. **CoT may hurt**: Extended reasoning can amplify rather than correct biases
4. **Pattern matching on priors**: Models match patterns to their initial response, not to evidence

This provides a principled statistical framework for detecting when "reasoning" is actually "rationalizing."

## Limitations

- LLM-as-judge may introduce its own biases
- Limited to open-ended domains where beliefs can be extracted
- Doesn't distinguish between justified prior-consistent updates and bias

## Connections

- **Supports**: Paper #312 (Unfaithful CoT), Paper #311 (Human-Like Biases)
- **Related**: Paper #206 (Sycophancy), Paper #293 (Sycophantic Chatbots)
- **Mechanism**: Formalizes WHY reasoning fails — it's confirmation bias, not truth-seeking
