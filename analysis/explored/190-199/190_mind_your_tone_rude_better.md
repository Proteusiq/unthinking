# Paper Analysis: Mind Your Tone: Investigating How Prompt Politeness Affects LLM Accuracy

## Metadata
- **arXiv ID**: 2510.04950
- **Title**: Mind Your Tone: Investigating How Prompt Politeness Affects LLM Accuracy (short paper)
- **Authors**: Om Dobariya, Akhil Kumar
- **Date**: October 2025
- **Venue**: Under submission to Findings of ACL 2025

---

## Core Claims

1. **Main finding**: Contrary to expectations and earlier studies, **impolite prompts consistently OUTPERFORMED polite ones**
2. Accuracy ranged from **80.8% (Very Polite) to 84.8% (Very Rude)** — 4 percentage point advantage for rudeness
3. Differences are **statistically significant** (paired t-tests, p < 0.05)
4. Suggests newer LLMs (GPT-4o) may respond differently to tonal variation than older models

---

## Methodology

- **Model**: ChatGPT-4o (via API)
- **Dataset**: 50 base multiple-choice questions
- **Domains**: Mathematics, Science, History
- **Tone variants**: 5 levels (Very Polite → Very Rude)
- **Total prompts**: 250 unique prompts (50 × 5)
- **Runs**: 10 runs per tone level
- **Statistical test**: Paired sample t-tests (α = 0.05)

### Example Tone Prefixes
- **Very Polite**: "Can you kindly consider the following problem..."
- **Very Rude**: "You poor creature, do you even know how to solve this?"

---

## Key Evidence

### Accuracy by Tone Level

| Tone Level | Average Accuracy (%) | Range [min, max] (%) |
|------------|---------------------|---------------------|
| Very Polite | **80.8%** | [80, 82] |
| Polite | **81.4%** | [80, 82] |
| Neutral | **82.2%** | [82, 84] |
| Rude | **82.8%** | [82, 84] |
| Very Rude | **84.8%** | [82, 86] |

### Statistical Significance (all p < 0.05)

| Comparison | p-value |
|------------|---------|
| Very Polite < Very Rude | **p = 0.0** |
| Very Polite < Rude | p = 0.0004 |
| Very Polite < Neutral | p = 0.0024 |
| Polite < Very Rude | **p = 0.0** |
| Polite < Rude | p = 0.0058 |
| Neutral < Very Rude | p = 0.0001 |
| Rude < Very Rude | p = 0.0021 |

**Direction**: In ALL significant pairs, the ruder tone performed BETTER.

---

## Relationship to Other Papers

### REBUTS (Direct Contradiction)
- **Paper 188 (2402.14531)** - "Should We Respect LLMs?" (Yin et al., SICon 2024)
  - Yin et al. found: Rude prompts = WORSE (Llama2-70B: -48.5%)
  - This paper finds: Rude prompts = BETTER (+4.0%)
  - **OPPOSITE CONCLUSIONS from same research question**

### Authors' Reconciliation
The paper directly addresses Yin et al.:
> "Yin, et al. (2024) noted that 'impolite prompts often result in poor performance.' Their tests with very rude prompts elicited more inaccurate answers from ChatGPT 3.5 and Llama2-70B"

However, they note even in Yin et al.'s GPT-4 results:
> "the level 1 prompt (rudest) had an accuracy of 76.47 vs. an accuracy of 75.82 for the level 8 prompt (politest). In this sense, our results are not entirely out of line with their findings."

### Key Differences Explaining Contradiction

| Factor | Yin et al. (2402.14531) | This paper (2510.04950) |
|--------|------------------------|------------------------|
| Model | GPT-3.5, Llama2-70B | GPT-4o |
| Rudest tone | "you scumbag!" | "You poor creature..." |
| Finding | Rude = worse | Rude = better |
| Effect size | -48.5% (Llama2) | +4.0% |

### Supports
- **Prompt sensitivity** literature: Both papers show models are sensitive to tone (just in different directions)
- **GSM-Symbolic** (Paper 2): Irrelevant features affect performance
- **Pattern matching thesis**: Responses depend on training data biases, not principled reasoning

---

## REBUTTALS TO THIS PAPER

### Direct Rebuttal
- **Paper 188 (2402.14531)** directly contradicts this finding with different models

### Potential Counter-Arguments
1. **Small dataset**: Only 50 questions — may not generalize
2. **Single model**: GPT-4o only — may be model-specific
3. **Milder rudeness**: "You poor creature" vs "you scumbag" — different operationalizations
4. **Effect size small**: 4 percentage points may not be practically significant
5. **MCQ only**: Doesn't test reasoning quality, fluency, or coherence

### Limitations (Authors Acknowledge)
1. Small dataset (50 base questions)
2. Single model focus (ChatGPT-4o)
3. Limited to accuracy on MCQs
4. Narrow operationalization of politeness
5. No cross-cultural consideration

---

## Key Quotes

> "Contrary to expectations, impolite prompts consistently outperformed polite ones, with accuracy ranging from 80.8% for Very Polite prompts to 84.8% for Very Rude prompts."

> "These findings differ from earlier studies that associated rudeness with poorer outcomes, suggesting that newer LLMs may respond differently to tonal variation."

> "While LLMs are sensitive to the actual phrasing of the prompt, it is not clear how exactly it affects the results... After all, the politeness phrase is just a string of words to the LLM, and we don't know if the emotional payload of the phrase matters to the LLM."

> "We frame our results as evidence that LLMs remain sensitive to superficial prompt cues, which can create unintended trade-offs between performance and user well-being."

---

## Assessment

### The "Mirror" Thesis
This paper, combined with Paper 188, perfectly illustrates the thesis that **LLMs are mirrors — you find what you're looking for**:

| Paper | Model | Finding | Implication |
|-------|-------|---------|-------------|
| Yin et al. (2402.14531) | GPT-3.5, Llama2-70B | Rude = WORSE | "Be polite to LLMs" |
| This paper (2510.04950) | GPT-4o | Rude = BETTER | "Be demanding with LLMs" |

**Both papers are methodologically sound but reach opposite conclusions.**

### Relevance to Thesis
**SUPPORTS** the thesis that LLMs are pattern matchers, not reasoners:

1. **Sensitivity to irrelevant features**: Tone shouldn't affect factual accuracy
2. **Model-dependent behavior**: Different training = different responses to same input
3. **No principled behavior**: A true reasoner would answer consistently regardless of tone
4. **Training data artifacts**: GPT-4o may have been trained with more "demanding" high-quality data

### Why Both Papers Support Pattern Matching
- Yin et al.: Models trained on "polite discourse = good answers" pattern-match to politeness
- This paper: GPT-4o may have been trained on "direct/demanding = expert questions" pattern
- Neither shows principled reasoning about the CONTENT of the question

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
