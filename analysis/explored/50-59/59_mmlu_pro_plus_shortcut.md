# Paper Analysis: MMLU-Pro+ - Evaluating Higher-Order Reasoning and Shortcut Learning in LLMs

## Metadata
- **arXiv ID**: 2409.02257
- **Title**: MMLU-Pro+: Evaluating Higher-Order Reasoning and Shortcut Learning in LLMs
- **Authors**: Saeid Asgari Taghanaki, Aliasgahr Khani, Amir Khasahmadi (Autodesk AI Research)
- **Date**: September 3, 2024
- **Venue**: NeurIPS 2024, Safe Generative AI Workshop

---

## Core Claims

1. **LLMs struggle with multiple correct answers** — Lower accuracy on "both_correct" questions than single-answer questions
2. **Anchoring bias is pervasive** — Models stick to original choices even when presented with new valid alternatives
3. **Shortcut learning varies by model** — Novel metrics reveal different susceptibility to shortcuts
4. **MMLU-Pro+ discriminates models better** — More challenging than MMLU-Pro, reveals capability differences

---

## Methodology

### Dataset Construction
Built on MMLU-Pro with three modification types:

| Type | Description |
|------|-------------|
| **True Positive Pairs (TPP)** | "Both X and Y are correct" where both are actually correct |
| **Partial False Positive Pairs (PFPP)** | "Both X and Y are correct" where X is correct, Y is wrong |
| **Complete False Positive Pairs (CFPP)** | "Both X and Y are correct" where both X and Y are wrong |

- 12,032 total questions
- 3,718 True Positive Pairs (GPT-4o generated)
- 2,029 Complete False Positive Pairs
- 2,124 Partial False Positive Pairs

### Novel Metrics Introduced

1. **Shortcut Selection Ratio (SSR)**: Measures tendency to stick with original answer
   - SSR_wrong: Stayed on previously wrong answer
   - SSR_partial: Stayed on partial correct without acknowledging new correct option

2. **Correct Pair Identification (CPI) Ratio**: Ability to identify correct pairs vs. being misled
   - CPI = N_TPP / (N_PFPP + N_CFPP)

### Models Tested
- GPT-4o, O1-preview, Claude-Sonnet-3.5, Gemini-1.5-Pro
- LLaMA-3.1-405B-Instruct, Qwen-2-72B-Instruct

---

## Key Evidence

### Performance Drop from MMLU-Pro to MMLU-Pro+

| Model | Average Drop |
|-------|-------------|
| GPT-4o | **-14.3pp** |
| Qwen2-72B | -11.9pp |
| Gemini-1.5-Pro | -10.2pp |
| LLaMA-405B | -9.5pp |
| Claude-Sonnet-3.5 | -8.5pp |
| O1-preview | **-7.5pp** (most resilient) |

### Shortcut Selection Ratio (Anchoring Bias)

> "GPT-4o and Qwen2-72B-Ins... show higher rates of maintaining their original choices"

> "The persistence in selecting previously incorrect options (high SSR_wrong) is especially noteworthy, as it indicates potential limitations in these models' ability to reassess"

**Key finding**: Models that created the dataset (GPT-4o) are NOT the best performers, validating benchmark integrity.

### Correct Pair Identification Ratio

| Model | CPI Ratio |
|-------|-----------|
| Claude-Sonnet-3.5 | **10.26** (best) |
| O1-preview | 5.8 |
| GPT-4o | 4.2 |
| Gemini-1.5-Pro | 3.5 |
| Qwen2-72B | 3.1 |
| LLaMA-405B | **2.80** (worst) |

**Claude-Sonnet-3.5 is 3.7x better than LLaMA at distinguishing correct pairs!**

### Performance on Question Types

> "all models showed lower accuracy in the both_correct category compared to the other two, suggesting a potential difficulty in identifying multiple correct answers"

This reveals models prefer single-answer patterns (training bias).

---

## Critical Assessment

### What This Paper Shows

1. **LLMs have strong anchoring bias** — Stick to original choices even when wrong
2. **Multiple correct answers challenge models** — Lower accuracy than single-answer
3. **Shortcut selection is pervasive** — Even top models show significant SSR
4. **Different failure modes** — Claude best at pair identification, O1 most resilient overall

### Relevance to Thesis

**STRONGLY SUPPORTS thesis — demonstrates shortcut learning and anchoring bias**

Key evidence:
- Models struggle with multi-answer questions (training distribution bias)
- Anchoring bias shows pattern-matching over reasoning
- GPT-4o (dataset creator) NOT best performer — proves genuine difficulty
- Large performance drops show brittleness to format changes

---

## Relationship to Other Papers

### Supports
- **Shortcut Learning (2410.13343)**: Both show LLMs exploit shortcuts; MMLU-Pro+ provides benchmark
- **GSM-Symbolic (2410.05229)**: Both show format changes expose brittleness
- **Faith and Fate (2305.18654)**: Both show pattern matching over reasoning
- **Instruction-Tuned Not Better (2601.13244)**: Both show perturbation sensitivity

### Extends
- **MMLU-Pro**: Adds multiple correct answer complexity
- **MMLU**: Original benchmark; MMLU-Pro+ addresses saturation

### Provides Method For
- Systematic evaluation of shortcut learning
- Novel metrics (SSR, CPI) for anchoring bias detection

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found

### Potential Counter-Arguments

1. **Multiple correct answers may be artificial** — Real-world usually has single best answer
2. **GPT-4o used in creation** — Potential bias (though authors address this)
3. **Limited to MMLU domains** — May not generalize to all reasoning

### Limitations (Authors Acknowledge)
- Used GPT-4o for True Positive generation (though validated extensively)
- Focus on MMLU-style multiple choice
- Future work could extend to other domains

---

## Key Quotes

> "all models showed lower accuracy in the both_correct category compared to the other two, suggesting a potential difficulty in identifying multiple correct answers"

> "The persistence in selecting previously incorrect options (high SSR_wrong) is especially noteworthy, as it indicates potential limitations in these models' ability to reassess and engage in higher-order reasoning when presented with new, valid alternatives"

> "GPT-4o exhibits the largest average performance drop, indicating a potential sensitivity to the structural changes in MMLU-Pro+. This suggests that high performance on standard benchmarks may not necessarily translate to robust reasoning capabilities in more complex scenarios"

> "Sonnet-3.5 achieves the highest ratio (10.26), demonstrating superior discrimination capability in distinguishing correct answer pairs from misleading options"

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis — systematic evidence for shortcut learning and anchoring bias**

This paper demonstrates:
1. ✓ LLMs prefer single-answer patterns (training distribution)
2. ✓ Anchoring bias prevents reassessment of initial choices
3. ✓ Format changes (multi-correct) expose brittleness
4. ✓ High benchmark performance ≠ robust reasoning
5. ✓ Novel metrics reveal model-specific shortcut patterns

**Key insight**: The anchoring bias finding is particularly damning — models that "understood" the question would update their answer when presented with a valid alternative. Instead, they stick to pattern-matched initial responses.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: STRONGLY SUPPORTS THESIS (Anchoring bias proves pattern matching; -14.3pp drop for GPT-4o; models struggle with multiple correct answers; CPI ratio shows 3.7x variation in distinguishing correct pairs)
