# Paper Analysis: o3 (mini) Thinks Harder, Not Longer

## Metadata
- **arXiv ID**: 2502.15631
- **Title**: The Relationship Between Reasoning and Performance in Large Language Models—o3 (mini) Thinks Harder, Not Longer
- **Authors**: Marthe Ballon, Andres Algaba, Vincent Ginis
- **Date**: February 2025
- **Venue**: Preprint (Vrije Universiteit Brussel / Harvard)
- **Source**: Reddit recommendation (GitHub issue #16)

---

## Core Claims

1. **More capable models achieve higher accuracy WITHOUT longer reasoning chains** — o3-mini (m) has nearly identical token distribution to o1-mini but significantly higher accuracy
2. **Accuracy generally DECLINES as reasoning chains grow** — across all models and even when controlling for difficulty
3. **The accuracy drop per token is smaller for more proficient models** — o1-mini: 3.16%/1000 tokens, o3-mini (m): 1.96%/1000 tokens, o3-mini (h): 0.81%/1000 tokens
4. **o3-mini (h) gains only marginal accuracy (+4%) over o3-mini (m) by using 2x+ tokens on ALL problems** — including ones the medium model already solves

---

## Methodology

### Dataset
- **Omni-MATH benchmark**: 4,428 Olympiad-level math problems
- Six domains: Algebra, Applied Math, Calculus, Discrete Math, Geometry, Number Theory
- Four difficulty tiers (quartile-based)
- Automated correction via Omni-Judge model (91.78% consistent with GPT-4o as judge)

### Models Tested
- gpt-4o (non-reasoning baseline)
- o1-mini (reasoning model)
- o3-mini (m) — medium compute setting
- o3-mini (h) — high compute setting

### Analysis Methods
- Token usage distribution comparison
- Conditional error rate analysis: P(incorrect | tokens > threshold)
- QQ-plots comparing token distributions for correct answers
- Logistic regression controlling for difficulty and domain

---

## Key Evidence

### Accuracy by Model and Domain

| Model | Overall | Algebra | Calculus | Geometry | Discrete | Number Theory |
|-------|---------|---------|----------|----------|----------|---------------|
| gpt-4o | 20-30% | 20-30% | 20-30% | 20-30% | 20-30% | 20-30% |
| o1-mini | 40-60% | 40-60% | 40-60% | 40-60% | 40-60% | 40-60% |
| o3-mini (m) | >50% all | ~80% | ~80% | >50% | >50% | >50% |
| o3-mini (h) | +4% over m | >80% | >80% | >50% | >50% | >50% |

### Token-Accuracy Relationship

| Model | Tokens to reach 50% error rate | Accuracy drop per 1000 tokens |
|-------|--------------------------------|-------------------------------|
| o1-mini | ~0 (almost instant) | **3.16%** |
| o3-mini (m) | ~12,000 tokens | **1.96%** |
| o3-mini (h) | ~30,000 tokens | **0.81%** |

### Critical Finding: Token Distribution Comparison
- **o1-mini vs o3-mini (m)**: Nearly IDENTICAL token distributions
- o3-mini (m) achieves superior performance **without using more tokens**
- This suggests **o3-mini (m) reasons more effectively, not longer**

### o3-mini (h) Analysis
- Uses **>50,000 tokens** for some problems
- Token distribution stretched linearly vs o3-mini (m)
- Uses more tokens on ALL problems, including easy ones
- 4% accuracy gain costs **2x+ computational resources**

### Conditional Error Rate
- All models show **increasing error probability** as token count increases
- Pattern holds even when controlling for difficulty tier
- Pattern holds across all mathematical domains

---

## Relationship to Thesis

### Supports the Thesis

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

1. **Accuracy declining with more tokens** directly challenges the naive "more reasoning = better reasoning" assumption
2. **Longer chains correlate with failure** — consistent with the thesis that models engage in pattern matching that degrades when they can't find applicable templates
3. **Two hypotheses for accuracy drop** (authors state both):
   - Models reason more on problems they cannot solve (searching for templates)
   - Longer chains have higher probability of leading to wrong solutions (error propagation)

### Provides Nuance

1. **More capable models use tokens more effectively** — o3-mini shows "thinking harder, not longer"
2. **Efficiency gains are real** — newer reasoning models do extract more value per token
3. **But ceiling remains** — even o3-mini (h) eventually hits diminishing returns

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **Illusion of Thinking (2506.06941)** | Both show more tokens ≠ better outcomes; complexity thresholds exist |
| **Faith and Fate (2305.18654)** | Error accumulation with longer chains matches propagation mechanism |
| **Overthinking papers (2412.21187, 2501.18585)** | Directly extends overthinking vs underthinking debate |
| **Revisiting Test-Time Scaling (2502.12215)** | Both find naive test-time scaling has limits |

### Provides Mechanism For

| Paper | Mechanism |
|-------|-----------|
| **Survey of Test-Time Compute (2501.02497)** | Explains why sequential scaling fails — more tokens = more errors |
| **Effective Without Thinking (2504.09858)** | Explains why skipping thinking sometimes helps — avoids error accumulation |

### Partially Challenges

| Paper | How |
|-------|-----|
| **s1 (2501.19393)** | s1 claims log-linear scaling; this paper shows accuracy declines with length |
| **DeepSeek-R1 (2501.12948)** | Questions value of extended reasoning traces |

---

## REBUTTALS TO THIS PAPER

### Potential Limitations

1. **Single benchmark (Omni-MATH)** — results may not generalize to other reasoning tasks
2. **Automated evaluation** — Omni-Judge validated only for o1-mini, not o3-mini
3. **Prompting strategy** — vanilla prompting may not be optimal for reasoning models
4. **Correlation vs causation** — token count may be a proxy for problem difficulty not captured by tiers

### Papers That Could Challenge This

1. **s1 (2501.19393)** claims test-time scaling shows log-linear gains
   - **Resolution**: s1 measures pass@k, this paper measures accuracy per trajectory
   
2. **DeepSeek-R1 (2501.12948)** emphasizes extended reasoning benefits
   - **Resolution**: R1 may have better token efficiency, but same pattern would likely hold

### Author Acknowledgments

- Omni-Judge not validated for o3-mini
- Prompting strategy may not generalize
- Data leakage not checked for o3-mini

---

## Key Quotes

> "More proficient models (o1-mini vs. o3-mini (m)) do not generate longer reasoning chains to achieve higher accuracy."

> "Accuracy generally decreases as the chain-of-thought grows, even when controlling for question difficulty."

> "The accuracy decrease per 1000 reasoning tokens is 3.16% for o1-mini, 1.96% for o3-mini (m), and 0.81% for o3-mini (h)."

> "This suggests that o3-mini (m) tends to overthink less and uses reasoning tokens more effectively than o1-mini."

> "A possible hypothesis for this accuracy drop is that models tend to reason more on problems they cannot solve."

> "Another possibility is that longer reasoning chains inherently have a higher probability of leading to a wrong final solution."

---

## Assessment

### Independent Assessment

This paper provides **strong quantitative evidence** for the thesis that longer reasoning chains do not equate to better reasoning. The key findings are:

1. **Token efficiency, not token count, distinguishes capable models** — This supports the thesis that reasoning is about retrieving the right patterns, not generating novel reasoning steps
2. **Error accumulation with chain length** — Directly consistent with Faith and Fate's error propagation mechanism
3. **Controlled analysis** — Logistic regression controlling for difficulty is methodologically sound

### Stance Classification: **SUPPORTS**

The paper supports the thesis that LLM reasoning is pattern matching:
- More tokens = more opportunities to match wrong patterns
- Capable models are better at quickly finding correct patterns
- Extended reasoning reflects failed search, not deeper reasoning

### Limitations of This Assessment

The paper doesn't directly test whether reasoning is "genuine" — it measures token-accuracy relationships. The thesis interpretation is reasonable but not the only possible explanation.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
- [ ] data.js updated
