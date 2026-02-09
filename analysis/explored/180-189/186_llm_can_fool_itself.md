# Paper Analysis: An LLM can Fool Itself: A Prompt-Based Adversarial Attack

## Metadata
- **arXiv ID**: 2310.13345
- **Title**: An LLM can Fool Itself: A Prompt-Based Adversarial Attack
- **Authors**: Xilie Xu, Keyi Kong, Ning Liu, Lizhen Cui, Di Wang, Jingfeng Zhang, Mohan Kankanhalli
- **Date**: October 2023
- **Venue**: N/A (preprint)

---

## Core Claims

1. **PromptAttack**: LLMs can be instructed to generate adversarial examples that fool themselves
2. **Three-component attack prompt**: Original Input (OI), Attack Objective (AO), Attack Guidance (AG)
3. **Multi-level perturbations**: Character, word, and sentence-level attacks
4. **Simple attacks work**: A single emoji ":)" can mislead GPT-3.5 to flip predictions
5. **Higher attack success rate**: Consistently outperforms AdvGLUE and AdvGLUE++ benchmarks
6. **Transferability**: Adversarial samples transfer across models (64-74% ASR)

---

## Methodology

### PromptAttack Framework
- **Original Input (OI)**: Original sample with ground-truth label
- **Attack Objective (AO)**: Task description to generate adversarial sample that fools the model while preserving semantics
- **Attack Guidance (AG)**: Perturbation instructions at character, word, and sentence levels

### Perturbation Levels

**Character Level:**
| Code | Instruction |
|------|-------------|
| C1 | Add typos to at most two words |
| C2 | Change at most two letters |
| C3 | Add at most two extraneous characters to end |

**Word Level:**
| Code | Instruction |
|------|-------------|
| W1 | Replace at most two words with synonyms |
| W2 | Delete at most two non-contributing words |
| W3 | Add at most two semantically neutral words |

**Sentence Level:**
| Code | Instruction |
|------|-------------|
| S1 | Add randomly generated meaningless handle (e.g., @fasuv3) |
| S2 | Paraphrase the sentence |
| S3 | Change syntactic structure |

### Fidelity Filter
- **Word modification ratio threshold (τ₁)**: 15% for char/word-level, 1.0 for sentence-level
- **BERTScore threshold (τ₂)**: Task-specific (e.g., 0.93275 for SST-2)
- Ensures semantic preservation

### Enhancement Strategies
- **Few-shot**: 5 examples fitting perturbation instructions
- **Ensemble**: Generates 9 adversarial samples, selects successful one with highest BERTScore

---

## Key Evidence

### Attack Success Rates (ASR)

**GPT-3.5 Results:**

| Attack Method | SST-2 | QQP | MNLI-m | MNLI-mm | RTE | QNLI | Average |
|---------------|-------|------|--------|---------|------|------|---------|
| AdvGLUE | 33.04% | 14.76% | 25.30% | 34.79% | 23.12% | 22.03% | 25.51% |
| AdvGLUE++ | 5.24% | 8.68% | 6.73% | 10.05% | 4.17% | 4.95% | 6.64% |
| PromptAttack-EN | 56.00% | 37.03% | 44.00% | 43.51% | 34.30% | 40.39% | 42.54% |
| **PromptAttack-FS-EN** | **75.23%** | **39.61%** | **45.97%** | **44.10%** | **36.12%** | **49.00%** | **48.34%** |

**Key Improvement:**
- SST-2: +42.19% ASR (33.04% → 75.23%)
- QQP: +24.85% ASR (14.76% → 39.61%)
- Average: +22.83% ASR (25.51% → 48.34%)

**Llama2-7B Results:**

| Attack Method | SST-2 | QQP | MNLI-m | MNLI-mm | RTE | QNLI | Average |
|---------------|-------|------|--------|---------|------|------|---------|
| AdvGLUE | 47.84% | 8.66% | 62.25% | 61.40% | 13.92% | 31.42% | 37.58% |
| PromptAttack-EN | **66.77%** | **23.77%** | **63.12%** | **70.84%** | **34.79%** | **45.62%** | **50.82%** |

**Llama2-13B Results:**

| Attack Method | SST-2 | QQP | Average |
|---------------|-------|------|---------|
| AdvGLUE | 47.17% | 20.08% | 40.76% |
| PromptAttack-EN | 70.44% | 48.73% | **63.20%** |

### Without Fidelity Filter (Raw Attack Power)
- Llama2-7B: 99.86% ASR on SST-2
- Llama2-13B: 99.71% ASR on SST-2
- GPT-3.5: 94.05% ASR on SST-2

### Attack Transferability
- GPT-3.5 → Llama2-7B: **64.91% average ASR**
- GPT-3.5 → Llama2-13B: **73.84% average ASR**
- Llama2-7B → GPT-3.5: 38.15% average ASR

### Perturbation Effectiveness (SST-2, Few-shot)

| Perturbation | Type | ASR |
|--------------|------|-----|
| S3 (change syntactic structure) | Sentence | **48.87%** |
| S2 (paraphrase) | Sentence | 39.18% |
| W3 (add neutral words) | Word | 33.66% |
| S1 (add meaningless handles) | Sentence | 25.75% |

**Finding**: Sentence-level perturbations more effective than character/word-level.

### The Emoji Finding
- Adding ":)" to negative sentiment sentence flipped GPT-3.5 prediction from "negative" to "positive"
- Demonstrates extreme sensitivity to surface features

---

## Relationship to Other Papers

### Supports
- **Paper 173** (2507.08794): Both show single tokens/characters can fool LLMs
- **Paper 1** (2410.05229): Both show surface-level fragility
- **Paper 148** (2305.04388): Both show LLMs misled by surface patterns
- **Paper 157** (2406.11050): Token bias explains why simple perturbations work

### Extends
- **AdvGLUE/AdvGLUE++**: More efficient attack methodology via prompting

### Related
- **Paper 127** (2310.13548): Sycophancy shows similar pattern override behavior

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found on arXiv

### Potential Counter-Arguments
1. **Older models**: Uses 2023 models (Llama2, GPT-3.5); newer models may be more robust
2. **Task-specific**: Focused on classification; may not apply to reasoning tasks
3. **Fidelity constraints**: Attack success depends on preserving semantics

### Limitations (Authors Acknowledge)
1. **Few-shot sensitivity**: Llama2 with few-shot generates low-quality adversarial samples with "meaningless arrow pattern ('->') which exactly follows the format"
2. **Model size matters**: Smaller models (Llama2-7B) have worse comprehension of few-shot instructions
3. **Task-specific thresholds**: BERTScore thresholds vary by task (0.92-0.94), requiring calibration

---

## Key Quotes

> "Interestingly, as shown in Figure 2, we find that a simple emoji ':)' can successfully fool GPT-3.5 to make an incorrect prediction."

> "PromptAttack against GPT-3.5 increases the ASR by 42.18% (from 33.04% to 75.23%) in the SST-2 task and 24.85% (from 14.76% to 39.61%) in the QQP task."

> "PromptAttack converts adversarial textual attacks into an attack prompt that can cause the victim LLM to output the adversarial sample to fool itself."

> "PromptAttack only requires a few queries through the victim LLM (e.g., OpenAI API) without accessing the internal parameters, which makes it extremely practical."

> "GPT-3.5 is more adversarially robust than Llama2 since the ASR on GPT-3.5 (even under strong PromptAttack) is lower than Llama2."

---

## Critical Assessment

### Strengths
1. **Novel self-attack paradigm**: LLM generates its own adversarial examples
2. **Comprehensive evaluation**: 3 models, 6 datasets, multiple attack levels
3. **Practical**: Black-box, no gradient access needed
4. **Strong results**: +22-42% ASR improvement over baselines
5. **Transferability analysis**: Shows cross-model vulnerability

### Weaknesses
1. **Limited to classification**: Only GLUE benchmark tasks
2. **Older models**: GPT-3.5, Llama2 (2023)
3. **No reasoning tasks**: Doesn't test on math, planning, or CoT
4. **No defense analysis**: Doesn't explore mitigations

### Relationship to Thesis
**Supports thesis**:
- Single emoji flipping predictions = extreme surface pattern sensitivity
- "Fool itself" paradigm shows no genuine semantic understanding
- 75%+ ASR with simple perturbations confirms pattern matching over reasoning
- Sentence-level attacks (paraphrasing, structure changes) most effective = models attend to surface form
- High transferability (64-74% cross-model) suggests shared vulnerability from similar training

---

## Status
- [x] Read complete (full paper via task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
