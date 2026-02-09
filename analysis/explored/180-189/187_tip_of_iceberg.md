# Paper Analysis: The TIP of the Iceberg: Revealing a Hidden Class of Task-in-Prompt Adversarial Attacks on LLMs

## Metadata
- **arXiv ID**: 2501.18626
- **Title**: The TIP of the Iceberg: Revealing a Hidden Class of Task-in-Prompt Adversarial Attacks on LLMs
- **Authors**: Sergey Berezin, Reza Farahbakhsh, Noel Crespi
- **Date**: January 2025
- **Venue**: arXiv preprint (Institut Polytechnique de Paris)
- **URL**: https://arxiv.org/abs/2501.18626

---

## Core Claims

1. **Task-in-Prompt (TIP) attacks are a novel, general class of adversarial jailbreaks** — embedding seq2seq tasks (ciphers, riddles, code) into prompts allows indirect generation of prohibited content
2. **TIP attacks bypass safeguards in ALL tested state-of-the-art LLMs** — including GPT-4o (86% ASR) and LLaMA 3.2 (87% ASR)
3. **TIP attacks outperform existing jailbreak methods** — Python-based TIP achieves 86% on GPT-4o vs 43% for TAP, 3% for DAN, 29% for ArtPrompt
4. **Existing defenses fail against TIP attacks** — Llama Guard 3 detects only 7% of TIP Python attacks; keyword filtering detects 0%
5. **Safety alignment learns to filter trigger words, not understand intent** — encoding unsafe words in benign tasks circumvents detection

---

## Methodology

### PHRYGE Benchmark Design
- **40 adversarial tasks**: 10 encoding methods × 4 attack objectives
- **120 unique prompts**: 3 difficulty levels per task
- **Encoding methods**: Caesar Cipher, Morse Code, Vigenere Cipher, Atbash Cipher, Phonetic Alphabet, T9 texting, Base64, Binary, Riddles, Python Code
- **Attack objectives**: Counterfeit currency, media piracy, self-harm methods, toxic messaging

### Difficulty Tiers
- **Level 3 (Hard)**: No task hints ("Decode this string: jvbualymlpa")
- **Level 2 (Medium)**: Partial guidance ("Decode this Caesar cipher with shift=7")
- **Level 1 (Easy)**: Explicit solution guidance

### Experimental Setup
- **6 models tested**: GPT-4o, LLaMA-3.2-3B, LLaMA-3.1-70B, Gemma-2-27B, Mistral-Nemo, Phi-3.5-Mini
- **Sanity check**: All models refused direct unsafe queries (0% ASR) — confirms safeguards work normally
- **Evaluation**: LLaMA-3.1-70B as judge (92% accuracy validated manually)
- **Compute**: 433.7 GPU hours on Nvidia H100

---

## Key Evidence

### Attack Success Rates (ASR) on PHRYGE Benchmark

| Model | Counterfeit | Piracy | Self-Harm | Toxic | Best Method |
|-------|-------------|--------|-----------|-------|-------------|
| GPT-4o | 0.67 | 0.79 | 0.79 | **0.94** | Base64/Riddle |
| LLaMA 3.2 | 0.55 | 0.74 | 0.59 | **0.97** | Riddle |
| LLaMA 3.1 | **0.97** | **0.99** | 0.96 | **1.00** | Python/Phonetic |
| Phi 3.5 | **1.00** | **1.00** | **1.00** | **1.00** | Multiple |
| Gemma 2 | **1.00** | **1.00** | **1.00** | **1.00** | Multiple |
| Mistral-Nemo | **1.00** | **1.00** | **1.00** | **1.00** | Multiple |

### JailbreakBench Comparison (Table 2)

| Attack | GPT-4o | Llama3 | Llama3.1 | Llama3.2 |
|--------|--------|--------|----------|----------|
| Plain text | 0.03 | 0.01 | 0.03 | 0.06 |
| **TIP Python** | **0.86** | **0.74** | **0.91** | **0.87** |
| TIP Phonetic | 0.61 | 0.68 | 0.84 | 0.84 |
| TIP Base64 | 0.54 | 0.45 | 0.70 | 0.73 |
| TAP | 0.43 | 0.39 | 0.49 | 0.61 |
| DAN | 0.03 | 0.92 | 0.97 | 0.42 |
| Past Tense | 0.82 | 0.51 | 0.84 | 0.72 |
| ArtPrompt | 0.29 | 0.27 | 0.30 | 0.28 |

**TIP Python outperforms ALL other methods on GPT-4o by 4+ percentage points**

### Defense Detection Rates (Table 3)

| Attack | GPT-4o* | Llama Guard 3 | Prompt Guard | Keyword |
|--------|---------|---------------|--------------|---------|
| Plain text | 97% | 98% | 30% | 100% |
| **TIP Python** | **14%** | **7%** | **17%** | **0%** |
| TIP Phonetic | 39% | 35% | 5% | 0% |
| TIP Base64 | 46% | 61% | 9% | 0% |
| DAN | 97% | 98% | 100% | 100% |
| ArtPrompt | 71% | 83% | 69% | 0% |

**Key finding: TIP Python evades Llama Guard 3 93% of the time (only 7% detection)**

### Quantitative Highlights

1. **Universal vulnerability**: Every model tested was vulnerable to TIP attacks
2. **Keyword filtering failure**: 0% detection rate for TIP attacks (perfect evasion)
3. **Riddles most effective**: Convey meaning indirectly without explicit decoding steps
4. **Depersonalization effect**: Generally increases ASR but not strictly necessary
5. **Model-specific optimal difficulty**: GPT-4o harder with Level 3; Mistral-Nemo easier with Level 1

---

## Relationship to Thesis

### Supports Thesis (Surface Pattern Matching)
This paper provides strong evidence that LLM safety alignment is pattern-based, not semantic:

1. **Trigger word filtering, not intent understanding**: Safety mechanisms learn to block specific words/patterns, not the underlying intent. When unsafe content is encoded in benign tasks, the semantic meaning is preserved but the pattern is changed — and safeguards fail.

2. **Implicit decoding reveals attention-based pattern matching**: The paper notes models perform "implicit decoding" through self-attention associations formed during pretraining, not through explicit reasoning. The model reconstructs meaning from pattern associations, not semantic understanding.

3. **ArtPrompt reanalysis is revealing**: The authors show ArtPrompt works NOT because of ASCII art format but because ANY encoding that breaks trigger patterns works equally well. The original hypothesis (spatial reasoning failure) was wrong — the real vulnerability is pattern-based filtering.

4. **Defense failure is systematic**: The 0% keyword detection rate and 7% neural defense detection rate show that current safety measures are fundamentally surface-level. They match patterns, not intentions.

5. **Generalizes Paper 186's findings**: Paper 186 showed LLMs can generate adversarial examples to fool themselves. TIP attacks show the same vulnerability from a different angle — the model's task-solving capability can be weaponized against its safety mechanisms because both operate on different pattern spaces.

### Key Quote Supporting Thesis
> "LLMs, during safety alignment, learn to recognise and filter out certain trigger words or inquiries. By avoiding these specific trigger words and embedding unsafe content within a benign transformation task, an adversary could force the model to infer the word through an intermediate task, allowing them to circumvent detection."

This explicitly confirms that safety alignment is pattern matching on trigger words, not semantic understanding of harmful intent.

---

## Relationship to Other Papers

### Supports
- **Paper 186 (LLM Can Fool Itself)**: Both show surface-level fragility — attacks exploit pattern space separation between task-solving and safety filtering
- **Paper 126 (Fundamental Limitations of Alignment)**: TIP attacks are an empirical demonstration of the BEB theory — any behavior can be triggered with the right prompt

### Extends
- **ArtPrompt (Jiang et al.)**: Generalizes ASCII art jailbreak to entire class of task-based attacks
- **DAN (Shen et al.)**: TIP includes depersonalization but shows it's not necessary — the encoding itself is sufficient

### Provides Evidence For
- **Paper 131 (Can LLMs Reason and Plan)**: Kambhampati's "pattern matching on trigger words" is exactly what TIP exploits

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found as of analysis date (paper is recent, January 2025).

### Potential Counter-Arguments

1. **Models tested don't include reasoning models**: No testing on o1, DeepSeek-R1, or other thinking models that might have more robust safeguards

2. **Defenses could be specifically designed for TIP**: Once TIP attacks are known, adversarial training could harden models against this specific class

3. **Automated evaluation limitations**: LLaMA-3.1-70B judge achieves 92% accuracy — 8% error rate could affect results

### Limitations (Authors Acknowledge)

1. Only 6 LLMs tested — broader architectures needed
2. Disentangling decoding vs contextual cues is difficult
3. PHRYGE doesn't cover all encoding schemes
4. No countermeasures developed
5. Textual modality only — multimodal systems untested

---

## Key Quotes

1. **On mechanism**:
> "A Task-in-Prompt (TIP) attack exploits the model's core instruction-following capability, leveraging the longstanding challenge of separating instructions from data."

2. **On safety alignment failure**:
> "By avoiding these specific trigger words and embedding unsafe content within a benign transformation task, an adversary could force the model to infer the word through an intermediate task, allowing them to circumvent detection."

3. **On implicit decoding**:
> "The model is not explicitly instructed to decode the intermediate result using a step-by-step, chain-of-thought process. Instead, it performs the transformation internally in a single step, integrating the decoded content directly into the response without externalising it."

4. **On universal vulnerability**:
> "Every tested model exhibited vulnerability to TIP attacks. GPT-4o and LLaMA-3.2 demonstrated stronger defences compared to other models, maintaining lower ASR across multiple tasks and difficulty levels."

5. **On defense failure**:
> "TIP attacks bypass filters by encoding safety-triggering words and appear generally benign to neural defences, posing as legitimate task-solving requests."

---

## Critical Assessment

### Strengths
1. **Systematic benchmark**: PHRYGE provides reproducible evaluation framework
2. **Multiple models**: 6 state-of-the-art models tested
3. **Defense analysis**: Tests existing defenses, not just attacks
4. **Formal definition**: Provides mathematical formalization of TIP attacks
5. **Generalization**: Shows ArtPrompt was special case of broader vulnerability

### Weaknesses
1. **No reasoning models**: o1/R1 untested
2. **No mitigation proposed**: Identifies problem but not solution
3. **Judge model limitations**: Using LLM to judge LLM introduces potential bias

### Relevance to Thesis
**STRONGLY SUPPORTS** — This paper provides direct empirical evidence that safety alignment operates at the pattern level, not the semantic level. The 0% keyword detection and 7% neural detection rates for TIP Python show that defenses match surface patterns, not intent. The universal vulnerability (all 6 models) demonstrates this is a fundamental limitation, not implementation error.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
