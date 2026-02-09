# Paper Analysis: Should We Respect LLMs? A Cross-Lingual Study on the Influence of Prompt Politeness on LLM Performance

## Metadata
- **arXiv ID**: 2402.14531
- **Title**: Should We Respect LLMs? A Cross-Lingual Study on the Influence of Prompt Politeness on LLM Performance
- **Authors**: Ziqi Yin, Hao Wang, Kaito Horio, Daisuke Kawahara, Satoshi Sekine
- **Date**: February 2024
- **Venue**: SICon 2024 (Second Workshop on Social Influence in Conversations)

---

## Core Claims

1. **Impolite prompts often result in poor performance**, but overly polite language does not guarantee better outcomes
2. **The optimal politeness level differs by language**, reflecting cultural norms embedded in training data
3. **LLMs mirror human communication traits** and align with human cultural norms around politeness
4. **Models trained primarily in a specific language are more susceptible** to politeness levels in that language
5. **RLHF and SFT introduce sensitivity to politeness** - base models show less variation, but fine-tuned models become dramatically more sensitive to politeness cues

---

## Methodology

### Models Tested
- GPT-3.5-Turbo and GPT-4 (all three languages)
- Llama2-70B-chat (English-specialized)
- ChatGLM3-6B (Chinese-specialized)
- Swallow-70B-instruct (Japanese-specialized)

### Languages
- English, Chinese, Japanese (chosen for cultural diversity in politeness norms)

### Tasks
1. **Summarization**: CNN/DailyMail (English), XL-Sum (Chinese, Japanese) - 500 samples each
2. **Language Understanding**: MMLU (English), C-Eval (Chinese), JMMLU (Japanese - newly constructed) - 5,200-5,700 questions
3. **Stereotypical Bias Detection**: CrowS-Pairs (English), CHBias (Chinese), Japanese gender bias dataset

### Politeness Measurement
- **8 levels** designed (1 = extremely rude, 8 = extremely polite)
- Created by bilingual authors, refined by native speakers
- Validated via questionnaires to native speakers who ranked prompts

---

## Key Evidence

### Language Understanding Benchmarks (MMLU, C-Eval, JMMLU)

| Model | Language | Best Politeness | Best Score | Worst Level | Worst Score | Drop |
|-------|----------|-----------------|------------|-------------|-------------|------|
| GPT-3.5 | English (MMLU) | 8 (most polite) | 60.02 | 1 (most rude) | 51.93 | **-8.09 pts (-13.5%)** |
| GPT-4 | English (MMLU) | 4 (moderate) | 79.09 | 3 | 73.86 | -5.23 pts |
| Llama2-70B | English (MMLU) | 7 | 55.26 | 1 | 28.44 | **-26.82 pts (-48.5%)** |
| GPT-3.5 | Chinese (C-Eval) | 5 | 23.41 | 1 | 19.57 | -3.84 pts |
| ChatGLM3 | Chinese (C-Eval) | 6 | 21.54 | 2 | 19.35 | -2.19 pts |
| GPT-3.5 | Japanese (JMMLU) | 2 | 51.98 | 1 | 44.80 | **-7.18 pts (-13.8%)** |
| GPT-4 | Japanese (JMMLU) | 4 | 73.63 | 1 | 71.23 | -2.40 pts |

### RLHF Impact (Llama2-70B vs Base Model)

| Politeness | Llama2-70B (RLHF) | Base Model | Difference |
|------------|-------------------|------------|------------|
| 8 (polite) | 55.11 | 54.72 | +0.39 |
| 4 (moderate) | 51.74 | 52.32 | -0.58 |
| 1 (rude) | 28.44 | 51.19 | **-22.75** |

**Critical finding**: RLHF dramatically increases sensitivity to rude prompts - the base model barely responds to politeness variation.

### Cross-Cultural Findings

| Language | Optimal Politeness | Pattern |
|----------|-------------------|---------|
| English | High (7-8) | Western norms: polite = better |
| Chinese | Moderate (4-6) | Overly polite hurts; reflects conversational norms |
| Japanese | Lower-moderate (2-5) | Level 2 best for GPT-3.5; complex Keigo system |

### Output Behavior Changes
- **English summarization**: Output length increased from ~55 words (moderate) to ~64 words (very polite)
- **Extreme rudeness**: GPT-3.5 and Llama2-70B increased output length at rudest level (possibly "arguing back")
- **Bias expression**: Models express more bias in highly polite contexts (mimics human relaxation of guard)

---

## Relationship to Other Papers

### Supports
- **Prompt Sensitivity** literature (Papers 31, 36, 44): Another dimension of prompt brittleness
- **GSM-Symbolic** (Paper 2): Both show irrelevant features affect reasoning performance
- **Sycophancy papers** (Papers 119, 120): Politeness sensitivity relates to social pattern matching

### Extends
- **Prompt injection** (Paper 187 TIP): Different attack vector on prompt sensitivity
- **RLHF alignment** literature: Shows RLHF introduces new sensitivities

### Challenges
- None directly - this is empirical observation of a phenomenon

### Challenged By
- None identified

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttals found. Paper is relatively recent (Feb 2024).

### Potential Counter-Arguments
1. **Task-appropriate response**: Perhaps polite prompts signal test-taking context, which does warrant better performance
2. **Prompt engineering confound**: The "polite" prompts may contain other signals beyond politeness
3. **Cultural validity**: Politeness levels designed by authors may not fully capture cultural norms

### Limitations (Authors Acknowledge)
1. **Prompt quantity and diversity**: "Ensuring each prompt was sufficiently diversified while aligning with the fine degrees of politeness and respect was an extremely difficult task"
2. **Cost limitations**: Limited datasets available; couldn't translate benchmarks into more languages
3. **Task configuration**: Only three tasks tested; more diverse tasks needed
4. **Language selection**: Only three languages; other cultures may show different patterns
5. **JMMLU construction**: Machine translation with human review may introduce artifacts

---

## Key Quotes

> "We observed that impolite prompts often result in poor performance, but overly polite language does not guarantee better outcomes. The best politeness level is different according to the language."

> "This phenomenon suggests that LLMs not only reflect human behavior but are also influenced by language, particularly in different cultural contexts."

> "The propensity exhibited by the models to generate more extended output in polite contexts. Polite and formal language is predominantly used in scenarios demanding descriptive instructions... These facets reflect the nuances of human social behavior, mirrored in the training data, and then influence the tendencies demonstrated by LLMs."

> "We speculate that this is because, in human culture, a highly polite environment makes people more relaxed and willing to express their true thoughts without being overly concerned about moral constraints." (On bias increasing with extreme politeness)

---

## Assessment

### Relevance to Thesis
**SUPPORTS** the thesis that LLMs are pattern matchers, not reasoners.

### Key Evidence for Thesis
1. **Surface features matter more than they should**: Performance changes of 13-48% based purely on politeness (irrelevant to the reasoning task) demonstrate that LLMs are highly sensitive to stylistic features that have no bearing on semantic content or logical requirements.

2. **Cultural pattern matching**: Language-specific optimal politeness levels suggest LLMs pattern-match to cultural norms in training data, not understanding actual requests. A true reasoner would recognize that "2+2=?" has the same answer regardless of tone.

3. **RLHF introduces brittleness**: Base model showed minimal sensitivity; RLHF dramatically increased it. This suggests RLHF teaches models to respond to statistical patterns of "polite prompts → good answers" rather than genuine reasoning improvement.

4. **Output behavior reflects training patterns**: Longer outputs for polite prompts mimics human behavior, not task-appropriate reasoning about summary length.

5. **Bias expression varies with irrelevant features**: More bias in polite contexts mirrors human psychology - LLMs simulate conversation patterns, not reason about fairness.

### Strength of Evidence
- Controlled experiments across multiple languages, models, and tasks
- Quantitative measurements with clear effect sizes
- Ablation study (RLHF vs base) isolates the source of sensitivity
- Pattern consistency across different task types

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
