# Paper Analysis: Thoughts Are All Over the Place: On the Underthinking of o1-Like LLMs

## Metadata
- **arXiv ID**: 2501.18585
- **Title**: Thoughts Are All Over the Place: On the Underthinking of o1-Like LLMs
- **Authors**: Yue Wang, Qiuzhi Liu, Jiahao Xu, Tian Liang, Xingyu Chen, Zhiwei He, et al.
- **Date**: January 2025
- **Venue**: Preprint (Tencent AI Lab + SJTU + Soochow University)
- **Institutions**: Tencent AI Lab, Shanghai Jiao Tong University, Soochow University

---

## Core Claims

1. **o1-like models exhibit "underthinking"**: They frequently switch between reasoning thoughts without sufficiently exploring promising paths, abandoning correct solutions prematurely

2. **Incorrect responses show MORE thought switching**: 225% more tokens and 418% more thought switches in incorrect vs correct responses

3. **Early thoughts are often correct but abandoned**: >70% of incorrect responses contain at least one correct thought that was not pursued

4. **Underthinking increases with problem difficulty**: Models switch thoughts more frequently on harder problems

5. **Thought Switching Penalty (Tip) mitigates underthinking**: Simple decoding penalty improves accuracy without fine-tuning

---

## Methodology

### Test Sets
- **MATH500-Hard**: Level 5 problems from MATH500 (competition-level)
- **GPQA Diamond**: Graduate-level multiple-choice (198 questions)
- **AIME 2022-2024**: American Invitational Mathematics Examination (90 problems)

### Models Tested
- **QwQ-32B-Preview** (Qwen)
- **DeepSeek-R1-Preview**
- **DeepSeek-R1-671B**
- **DeepSeek-R1-Distill-Qwen-32B**

### Key Definitions
- **Thought**: Intermediate cognitive step within a reasoning solution
- **Thought switch**: Transition marked by terms like "alternatively", "let me try another approach"
- **Underthinking**: Abandoning promising reasoning paths before reaching correct conclusion

### Underthinking Metric
$$\xi_{UT} = \frac{1}{N}\sum_{i=1}^{N}\left(1 - \frac{\hat{T}_i}{T_i}\right)$$

Where $\hat{T}_i$ = tokens to first correct thought, $T_i$ = total tokens in incorrect response

---

## Key Evidence

### Figure 1: Correct vs Incorrect Responses (AIME2024)

| Metric | Correct Responses | Incorrect Responses | Ratio |
|--------|-------------------|---------------------|-------|
| Tokens | ~3,000 | ~10,000 | **225% more** |
| Thought switches | ~4 | ~20 | **418% more** |

**Key insight**: Incorrect answers are LONGER and have MORE thought switches, not fewer.

### Table 1: Underthinking Scores on Challenging Test Sets

| Model | Dataset | Accuracy | UT Score |
|-------|---------|----------|----------|
| QwQ-32B-Preview | MATH500-Hard | 84.3% | **58.2%** |
| DeepSeek-R1-Preview | MATH500-Hard | 83.6% | **61.5%** |
| DeepSeek-R1-671B | MATH500-Hard | 92.5% | **65.4%** |
| QwQ-32B-Preview | GPQA Diamond | 59.6% | **48.3%** |
| DeepSeek-R1-671B | GPQA Diamond | 73.2% | **58.8%** |
| QwQ-32B-Preview | AIME2024 | 46.7% | **65.0%** |
| DeepSeek-R1-Preview | AIME2024 | 46.7% | **75.7%** |
| DeepSeek-R1-671B | AIME2024 | 73.3% | **37.0%** |

**Critical finding**: Higher accuracy often correlates with HIGHER UT scores (more inefficient token use when wrong).

### Figure 5: Early Thoughts Are Correct But Abandoned

- First thought is correct in **~25-35%** of incorrect responses (varies by model/dataset)
- Ratio of correct thoughts DECREASES with thought index
- Models abandon promising paths early, then generate thousands of wasted tokens

### Figure 6: Correct Thoughts in Incorrect Responses

- **>70%** of incorrect responses contain at least one correct thought
- **>50%** of incorrect responses have >10% correct thoughts
- The model HAD the right approach but didn't pursue it

### Example: Figure 2 (QwQ on AIME problem)
| Metric | Value |
|--------|-------|
| Total thoughts | 25 |
| Total tokens | 7,681 |
| First correct thought (Thought 1) | 411 tokens |
| Tokens after abandoning correct thought | 7,270 (wasted) |
| **Underthinking score** | **94.6%** |

### Table 3: Thought Switching Penalty (Tip) Results

| Model | Dataset | Pass@1 | Pass@1 +Tip | Switching Tokens | Interval (tokens) |
|-------|---------|--------|-------------|------------------|-------------------|
| QwQ | MATH500-Hard | 83.1% | **83.7%** | 12.6 → 5.7 | 445.6 → 517.6 |
| QwQ | GPQA Diamond | 57.6% | **59.1%** | 21.1 → 7.3 | 356.8 → 432.5 |
| QwQ | AIME2024 | 38.3% | **44.1%** | 16.1 → 13.9 | 459.7 → 515.7 |
| DeepSeek-R1 | AIME2024 | 73.8% | **74.8%** | 13.8 → 5.7 | 580.1 → 941.6 |

**Key**: Tip reduces switching tokens and increases interval between switches → better accuracy

### Table 4: Combined with Best-of-N Sampling (AIME2024)

| Model | Method | 16-Sample Acc |
|-------|--------|---------------|
| QwQ | Baseline | 38.3% |
| QwQ | + Tip | 44.0% |
| QwQ | + Self-Consistency | 44.6% |
| QwQ | + Self-Consistency + Tip | **53.9%** |
| DeepSeek-R1 | Baseline | 73.8% |
| DeepSeek-R1 | + Laconic Decoding + Tip | **83.3%** |

---

## Relationship to Thesis

### SUPPORTS the thesis

**Key Evidence for Pattern Matching Over Reasoning:**

1. **Models don't "reason" — they pattern-match thought transitions**: The underthinking behavior shows models are not evaluating whether a reasoning path is promising. They're just generating thought-switch tokens based on learned patterns, regardless of whether the current path is correct.

2. **Correct thoughts abandoned = no metacognitive evaluation**: A reasoning system would recognize when it has found a promising approach. o1-like models have no such awareness — they switch away from correct thoughts because they were trained to generate "alternatively" tokens, not because they evaluated the path.

3. **418% more switching in incorrect responses**: This is the OPPOSITE of what reasoning would predict. If reasoning, the model would stick with approaches longer when struggling. Instead, it switches MORE, suggesting trained pattern completion rather than goal-directed reasoning.

4. **Simple decoding penalty fixes it**: The fact that a trivial logit penalty on switching tokens improves accuracy proves the issue is token-level pattern completion, not reasoning-level decision making. The model doesn't "decide" to switch — it just outputs switch tokens because they're probable.

5. **>70% of wrong answers contain correct thoughts**: The model FOUND the right approach but didn't pursue it. This is not a capability problem — it's a **pattern completion problem**. The model generates correct reasoning as one of many patterns, but has no mechanism to recognize it as correct.

### Mechanism Revealed

The "thinking" in o1-like models is:
- **Uncontrolled pattern generation** of reasoning-like text
- **No metacognitive evaluation** of reasoning paths
- **Token-level probability** drives transitions, not goal-directed reasoning
- **Training artifact**: Models learned to generate "alternatively" without learning WHEN it's appropriate

### Complementary to Paper 129 (Overthinking)

| Issue | Paper 129 (Overthinking) | Paper 130 (Underthinking) |
|-------|--------------------------|---------------------------|
| Problem | Too many solutions on easy problems | Abandoning correct paths on hard problems |
| Token waste | Redundant correct solutions | Incorrect after correct |
| Key metric | First solution correct >92% | >70% incorrect contain correct thought |
| Root cause | Uncontrolled pattern completion | No metacognitive path evaluation |
| Fix | Shorter training data | Switching penalty |

**Both reveal**: o1-like models lack metacognitive awareness — they can't evaluate their own reasoning paths.

---

## Relationship to Other Papers

### Supports
- **Paper 129 (2412.21187)**: Overthinking — complementary finding; same root cause (uncontrolled pattern generation)
- **Paper 92 (2601.17421)**: Oops Wait — both show token-level signals don't guide reasoning effectively
- **Paper 106 (2601.19847)**: Reasoning-Critical Neurons — both show reasoning predictable from early signals

### Extends
- **Paper 129 (2412.21187)**: Same research group; overthinking = too many solutions; underthinking = abandoning correct ones
- **Survey of Test-Time Compute (2501.02497)**: Shows another failure mode of scaling test-time compute

### Provides Mechanism For
- **Why CoT is unfaithful**: Models generate reasoning patterns without evaluating them
- **Why self-correction fails**: Models can't recognize when they have the right answer
- **Metacognitive gap**: No awareness of reasoning quality, just token probability

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found (January 2025 paper).

### Potential Counter-Arguments

1. **Underthinking may be rational**: If model isn't confident in a path, switching is reasonable
   - **Counter**: Figure 5 shows FIRST thoughts are often correct — model abandons them without exploration

2. **Assessment method may be flawed**: Using LLMs to judge thought correctness
   - **Counter**: Authors validate with 82-83% accuracy on held-out test; consistent findings across methods

3. **Tip is task-specific**: Hyperparameters tuned on AIME 2022-23
   - **Counter**: Consistent improvements across MATH500, GPQA, AIME2024 with same hyperparameters

4. **More capable models may not underthink**: DeepSeek-R1-671B has lower UT on AIME
   - **Counter**: Still 37% UT score; R1-671B has HIGHER UT on MATH500-Hard (65.4%) than QwQ (58.2%)

### Limitations (Authors Acknowledge)

1. Only math/science domains tested — may not generalize
2. Thought segmentation relies on LLM (Llama-3.3-70B) — potential errors
3. Correctness assessment approximate (~82% accuracy)
4. Tip requires hyperparameter tuning

---

## Key Quotes

> "On average, o1-like LLMs consume **225% more tokens** in incorrect responses than in correct ones due to **418% more frequent** thought-switching behaviors."

> "Over **70%** of incorrect responses contain at least one correct thought."

> "A notable proportion of initial thoughts across various models were correct but were not pursued to completion."

> "This tendency to abruptly shift away from these promising thoughts indicates an **inadequate depth of reasoning**, where potentially correct solutions are prematurely abandoned before being thoroughly explored."

> "The underthinking score ξ_UT = 1 - 411/7681 = **0.946**, which can be considered extremely inefficient."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated
