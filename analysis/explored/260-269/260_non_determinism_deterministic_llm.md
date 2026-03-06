# Paper Analysis: Non-Determinism of "Deterministic" LLM Settings

## Metadata
- **arXiv ID**: 2408.04667
- **Title**: Non-Determinism of "Deterministic" LLM Settings
- **Authors**: Berk Atil, Sarp Aykent, Alexa Chittams, Lisheng Fu, Rebecca J. Passonneau, et al.
- **Institution**: Penn State University, Comcast AI Technologies
- **Date**: August 2024
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2408.04667

---

## Core Claims

1. **LLMs are not deterministic even at temperature=0**: Accuracy variations up to 15% across identical runs

2. **Gap between best and worst possible performance up to 70%**: Same model, same input, massive variation

3. **None of the tested LLMs consistently deliver repeatable accuracy**: This is pervasive across all models tested

4. **Non-determinism may be essential for compute efficiency**: Engineering optimizations (continuous batching, chunk prefilling, prefix caching) introduce randomness

---

## Methodology

### Setup
- **Models**: GPT-3.5 Turbo, GPT-4o, Llama-3-70B, Llama-3-8B, Mixtral-8x7B
- **Tasks**: 8 tasks from BBH and MMLU benchmarks
- **Runs**: 10 identical runs per condition
- **Settings**: temperature=0, top-p=1, fixed seed

### Metrics Introduced
- **TARr@N**: Total agreement rate for raw output across N runs (strictest)
- **TARa@N**: Total agreement rate for parsed answers across N runs
- **BestAcc**: Maximum possible accuracy extractable from N runs
- **WorstAcc**: Minimum possible accuracy from N runs

---

## Key Evidence

### Accuracy Variations

| Model | Task | BestAcc | Median | WorstAcc | Gap |
|-------|------|---------|--------|----------|-----|
| GPT-4o | college math | 88.0% | 69.0% | 44.0% | **44%** |
| Llama-3-70B | college math | 85.0% | 54.5% | 22.0% | **63%** |
| Mixtral-8x7B | college math | 75.0% | 31.5% | 3.0% | **72%** |
| GPT-4o | prof. accounting | 89.0% | 74.5% | 57.8% | **31%** |
| Mixtral-8x7B | prof. accounting | 67.0% | 39.0% | 13.1% | **54%** |

### TARr@10 (Raw Output Agreement)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    RAW OUTPUT AGREEMENT @ 10 RUNS                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  GPT-4o on college math:      0%  (ZERO agreement)                  │
│  Llama-3-70B on college math: 0%                                    │
│  Mixtral on college math:     0%                                    │
│  GPT-4o on geometric shapes:  0%                                    │
│  Llama-3-70B on prof. acct:   0%                                    │
│                                                                     │
│  Even "stable" tasks rarely exceed 80% TARr@10                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Distribution Analysis (20 runs on college math)

- Kolmogorov-Smirnov normality test: **rejected** (p < 10^-9)
- Distributions are NOT normal — mean and median far from mode
- Standard deviation is NOT a valid uncertainty measure

### Correlation Findings

| Factor | Correlation with Instability |
|--------|------------------------------|
| Output length | **Strong positive** — longer outputs = more instability |
| Accuracy | **Strong negative** (few-shot) — higher accuracy = more stable |
| Input length | Weak (model-dependent) |

---

## Relationship to Thesis

### SUPPORTS Thesis

This paper provides critical evidence that LLM "reasoning" is fragile and unreliable:

#### 1. Reasoning Results Are Not Reproducible

> "accuracy variations up to 15% across naturally occurring runs with a gap of best possible performance to worst possible performance up to 70%"

If reasoning were systematic, results would be deterministic. The massive variation suggests:
- Pattern matching is probabilistic, not algorithmic
- Same input can trigger different retrieval paths
- "Reasoning" depends on random factors

#### 2. Benchmarks Are Unreliable

> "what is the value of such benchmarks if LLM results are not stable across multiple runs?"

This undermines claims about reasoning capabilities based on benchmark performance.

#### 3. Non-Determinism Is Built-In

> "non-determinism perhaps essential to the efficient use of compute resources via co-mingled data in input buffers"

The fragility is architectural, not fixable without efficiency loss.

#### 4. Multiplicative Degradation

> "a dialog system with 4 classifiers that are 95% stable will show .95^4=.814 expected performance"

Real-world reasoning chains are even more fragile than individual steps suggest.

---

## Relationship to Other Papers

### Strongly Supports
- **Paper #172 (Unfaithful Reasoning)**: Both show "reasoning" is not systematic
- **Paper #06 (CoT Mirage)**: Distribution-dependent success + non-determinism = pattern matching
- **Paper #132 (Stop Anthropomorphizing)**: If reasoning were real, it would be deterministic

### Provides Mechanism For
- **Benchmark fragility**: Explains why different runs get different results
- **Reasoning failures**: Random factors determine success/failure

### Related Evidence
- **Paper #259 (Memorization Fine-Tuning)**: Non-determinism + memorization = unreliable retrieval

---

## REBUTTALS

### Potential Counter-Arguments

1. **Engineering artifact**: Non-determinism is due to API infrastructure, not model limitations
   - **Counter**: Authors ran local Llama-3-8B without optimizations → deterministic
   - This confirms it's infrastructure, but infrastructure is how models are deployed

2. **Fixable with better engineering**: Could be eliminated
   - **Counter**: Authors note it's "essential to efficient use of compute resources"
   - Fixing it would slow inference significantly

3. **Accuracy matters, not determinism**: As long as average performance is good
   - **Counter**: 70% gap between best and worst makes "average" meaningless
   - Individual runs can be catastrophically wrong

### Authors' Limitations

> "we can only speculate about the reason for this behavior" (for closed-source models)

> "More analysis could be done to see if there is any correlation between the stability and specific types of errors"

---

## Key Quotes

> "We see accuracy variations up to 15% across naturally occurring runs with a gap of best possible performance to worst possible performance up to 70%"

> "none of the LLMs consistently delivers repeatable accuracy across all tasks, much less identical output strings"

> "non-determinism perhaps essential to the efficient use of compute resources via co-mingled data in input buffers so this issue is not going away anytime soon"

> "The observation that instability results are not normally distributed makes it more difficult to measure the resulting uncertainty"

> "There is far too much uncertainty in a realm where robust engineering is the expectation"

---

## Methodology Assessment

### Strengths
- Systematic study across 5 models, 8 tasks, 2 settings
- Novel metrics (TARr@N, TARa@N) for quantifying instability
- 10 runs per condition provides statistical power
- Distribution analysis (non-normal) is rigorous
- Open data and code

### Weaknesses
- Limited to multiple-choice tasks (easier to measure)
- No free-form reasoning tasks
- No analysis of WHY specific questions vary
- Closed-source models limit mechanistic understanding

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
| **Confidence** | High |
| **Relevance** | High — fundamental fragility of LLM "reasoning" |
| **Evidence Type** | Empirical (systematic measurements) |
| **Venue Quality** | arXiv preprint (industry collaboration) |

---

## One-Sentence Summary

Even with temperature=0, LLMs show accuracy variations up to 15% and best-to-worst gaps up to 70% across identical runs — demonstrating that "reasoning" is probabilistic pattern matching, not systematic computation.
