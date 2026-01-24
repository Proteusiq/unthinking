# Paper Analysis: Do LLMs Overcome Shortcut Learning?

## Metadata
- **arXiv ID**: 2410.13343
- **Title**: Do LLMs Overcome Shortcut Learning? An Evaluation of Shortcut Challenges in Large Language Models
- **Authors**: Yu Yuan, Lili Zhao, Kai Zhang, Guangting Zheng, Qi Liu (USTC)
- **Date**: October 17, 2024
- **Venue**: arXiv preprint (cs.CL)

---

## Core Claims

1. **LLMs rely on shortcuts for prediction** — demonstrating varying reliance across downstream tasks, significantly impairing performance
2. **Larger LLMs are MORE likely to use shortcuts** — under zero-shot and few-shot ICL prompts
3. **CoT prompting reduces shortcut reliance** — outperforms other strategies; few-shot often underperforms zero-shot
4. **LLMs exhibit overconfidence** — especially on shortcut-laden datasets
5. **Lower explanation quality on shortcut datasets** — three error types: distraction, disguised comprehension, logical fallacy

---

## Methodology

### Shortcut Suite Benchmark
Six shortcut types tested on NLI (Natural Language Inference):

| Shortcut | Definition | Example |
|----------|------------|---------|
| **Lexical Overlap** | Assume premise entails hypotheses with same words | "The actor was encouraged by the lawyer" → "The actor encouraged the lawyer" |
| **Subsequence** | Assume premise entails contiguous subsequences | "The authors in front of the senators contacted the artists" → "The senators contacted the artists" |
| **Constituent** | Assume premise entails complete subtrees | "Unless the president saw the professor, the student waited" → "The student waited" |
| **Negation** | Assume negation words indicate contradiction | Adding "and green is not red" to hypothesis |
| **Position** | Label related to spurious position cues | Tautologies at start/end of premise |
| **Style** | Label related to text style | Bible-style text transfer |

### Models Tested
- **Closed-source**: GPT-3.5-Turbo, GPT-4, Gemini-Pro
- **Open-source**: LLaMA2-Chat (7B, 13B, 70B), ChatGLM3-6B, Mistral-7B

### Prompting Strategies
- Zero-shot
- Few-shot ICL
- Zero-shot CoT
- Few-shot CoT

---

## Key Evidence

### Performance Drops on Shortcut Datasets

| Model | Standard | Constituent (¬E) | Drop |
|-------|----------|-----------------|------|
| GPT-3.5-Turbo | 56.7% | 40.2% | **-16.5pp** |
| GPT-4 | 85.6% | 80.0% | **-5.6pp** |
| Gemini-Pro | 76.2% | 47.2% | **-29.0pp** |
| LLaMA2-Chat-13B | 54.3% | 0.8% | **-53.5pp** |

**Constituent shortcut shows >40% drops in some cases!**

### Inverse Scaling: Larger Models Use MORE Shortcuts

> "As the model size increases, it tends to rely more on spurious mapping for NLI tasks, resulting in lower accuracy" (LLaMA2-Chat series under zero-shot/few-shot ICL)

| Model | Standard | Lexical Overlap (¬E) |
|-------|----------|---------------------|
| LLaMA2-7B | 42.1% | 40.0% |
| LLaMA2-13B | 54.3% | 42.2% |
| LLaMA2-70B | 57.7% | 40.7% |

### Few-Shot UNDERPERFORMS Zero-Shot

> "the effectiveness of few-shot prompts is not superior to zero-shot prompting. In several scenarios, the few-shot ICL is less effective than the zero-shot"

### Overconfidence on Shortcut Datasets

> "LLMs tend to be overconfident, with their confidence scores rarely falling below 60% and often significantly exceeding their actual accuracy"

**Key finding**: Discrepancy between confidence and accuracy is **greater** on shortcut datasets

### Three Error Types Identified

1. **Distraction**: LLMs focus on irrelevant information (e.g., tautologies) while neglecting useful content
2. **Disguised Comprehension**: Struggle with word subtleties, sentence structures, complex styles — "borrow" concepts incorrectly
3. **Logical Fallacy**: Overly simplistic reasoning, generalizing from specific instances via shortcuts

---

## Critical Assessment

### What This Paper Shows

1. **LLMs systematically exploit dataset biases** — not robust generalization
2. **Scaling doesn't help** — larger models MORE susceptible to shortcuts
3. **In-context learning can introduce biases** — few-shot sometimes worse than zero-shot
4. **CoT helps but doesn't eliminate shortcuts** — reduces reliance but doesn't cure it
5. **Overconfidence masks poor reasoning** — models confident even when wrong

### Relevance to Thesis

**STRONGLY SUPPORTS thesis — definitive evidence for pattern matching over reasoning**

This paper directly demonstrates that LLMs:
- Rely on spurious correlations (shortcuts) rather than semantic understanding
- Show inverse scaling (larger = more shortcut-prone) in some settings
- Are overconfident about shortcut-based predictions
- Produce lower quality explanations on shortcut datasets

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic (2410.05229)**: Both show high accuracy hides brittleness to perturbations
- **Faith and Fate (2305.18654)**: Both show pattern matching over genuine reasoning
- **LLMs Truly Grasp Addition (2504.05262)**: Both show symbolic/structural changes break models
- **Instruction-Tuned Not Better (2601.13244)**: Both show perturbation sensitivity

### Extends
- **Measuring Faithfulness (2307.13702)**: Extends to shortcut-specific evaluation
- **Prior shortcut learning work (Tang et al. 2023)**: More comprehensive evaluation across models and shortcuts

### Key Connection to Thesis
> "Models with poor robustness and generalization may rely on 'shortcut learning,' where they develop decision rules that perform well on standard benchmarks but fail to transfer to more challenging testing conditions"

This is exactly the pattern matching hypothesis!

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found

### Potential Counter-Arguments

1. **NLI is narrow task** — may not generalize to all reasoning
2. **CoT does help** — suggests reasoning can be elicited
3. **GPT-4 shows smaller drops** — some robustness at frontier

### Limitations (Authors Acknowledge)
- Focus on NLI task primarily
- Does not propose mitigation methods (only identifies problem)
- Other NLP tasks (QA, coreference) should be investigated

---

## Key Quotes

> "LLMs tend to capture spurious correlations between source text and particular labels, indicating a prevalence of shortcut learning"

> "Larger LLMs are more prone to utilize shortcuts under zero-shot and few-shot ICL prompts"

> "LLMs often exhibit overconfidence in their predictions, especially when dealing with datasets that contain shortcuts"

> "We find that LLMs are less affected by shortcuts under CoT settings than others. Notably, LLMs often demonstrate inferior performance in few-shot scenarios compared to zero-shot scenarios."

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis — systematic evidence for shortcut exploitation**

This paper provides:
1. ✓ Systematic benchmark for shortcut learning across multiple LLMs
2. ✓ Evidence that larger models are MORE susceptible (inverse scaling)
3. ✓ Demonstration that in-context learning can introduce biases
4. ✓ Shows overconfidence masks poor underlying reasoning
5. ✓ Three error types explain HOW shortcuts manifest

**Key insight**: The paper shows that benchmark performance masks fundamental brittleness. Models that score well on standard NLI fail dramatically when shortcuts are introduced, proving they're matching patterns rather than understanding semantics.

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

## Verdict: STRONGLY SUPPORTS THESIS (LLMs rely on shortcuts; larger models MORE susceptible; overconfidence masks poor reasoning; >40% drops on constituent shortcut; inverse scaling observed)
