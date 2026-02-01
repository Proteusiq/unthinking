# Paper Analysis: Deciphering the Factors Influencing the Efficacy of Chain-of-Thought

## Metadata
- **arXiv ID**: 2407.01687
- **Title**: Deciphering the Factors Influencing the Efficacy of Chain-of-Thought: Probability, Memorization, and Noisy Reasoning
- **Authors**: Akshara Prabhakar, Thomas L. Griffiths, R. Thomas McCoy
- **Date**: July 2024
- **Venue**: EMNLP 2024 Findings
- **Institution**: Princeton University, Yale University

---

## Core Claims

1. **CoT performance reflects THREE factors**: probability, memorization, and noisy reasoning
2. **Output probability dramatically affects accuracy**: GPT-4 swings from 26% to 70% based on output probability alone
3. **Memorization boosts specific shift levels**: rot-13 shows spike due to training frequency
4. **Noisy reasoning**: accuracy decreases with number of intermediate steps
5. **CoT works via probability boosting**: valid demonstrations not required — surface strings matter

---

## Methodology

### Task: Shift Cipher Decoding
- Decode text encoded with shift cipher (e.g., rot-3: F→C, D→A, W→T → "CAT")
- Allows independent manipulation of:
  - **Difficulty**: shift level (more steps = harder)
  - **Frequency**: rot-13 common, others rare
  - **Probability**: output word probability

### Dataset Construction
- 7-letter words, exactly 2 tokens (GPT-4 tokenizer)
- 5 probability bins (high to low via GPT-2 log probability)
- 150 words per bin, 25 shift levels (1-25)

### Prompting Variants
1. **Standard**: No reasoning steps
2. **Text-CoT**: Letter-by-letter decoding
3. **Math-CoT**: Letter→number→arithmetic→letter
4. **Number-CoT**: Isomorphic task with numbers (no letters)

### Models Tested
- GPT-4 (gpt-4-0613)
- Claude 3 (claude-3-opus)
- Llama-3.1-405B-Instruct

---

## Key Evidence

### Finding 1: Output Probability Drastically Affects Accuracy

| Output Probability | GPT-4 Accuracy |
|-------------------|----------------|
| High (bin 1) | **70%** |
| Low (bin 5) | **26%** |

> "varying the output's probability of occurrence shifts accuracy from 26% to 70%"

### Finding 2: Number-CoT vs Text-CoT Shows Reasoning Exists

| Prompt Type | GPT-4 Accuracy |
|-------------|----------------|
| Standard | ~0% across most shifts |
| Text-CoT | 32% average |
| Number-CoT | **~100%** |

**Implication**: GPT-4 HAS the core reasoning ability. Failures are due to probability/memorization interference.

### Finding 3: Memorization Spike at rot-13

Despite rot-13 requiring the MOST steps (13 backward or 13 forward), accuracy spikes at shift=13.

| Evidence | Value |
|----------|-------|
| rot-13 frequency in C4 corpus | Highest of all shifts |
| Accuracy at shift 13 | Spike above trend |

### Finding 4: Logistic Regression Confirms All Three Factors

Significant predictors (p < 10⁻¹⁵):
- **output_logprob**: Probability effect ✓
- **shift_freq**: Memorization effect ✓
- **min(shift_level, 26-shift_level)**: Noisy reasoning effect ✓

### Finding 5: Unfaithfulness Shows Probability Override

| Condition | Correct Chain → Wrong Answer | Wrong Chain → Correct Answer |
|-----------|------------------------------|------------------------------|
| High prob output | 7% | 34% |
| Low prob output | 14% | 1% |

**Interpretation**: Model "self-corrects" toward high-probability outputs, overriding its own reasoning chain.

### Finding 6: Invalid Demonstrations Still Work

> "the effect of CoT fundamentally depends on generating sequences of words that increase the probability of the correct answer when conditioned upon; as long as this is the case, CoT can thus succeed even when the demonstrations in the prompt are invalid"

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

This paper provides **controlled experimental evidence** that CoT is:
1. **Probability-driven**: Output probability swings accuracy 26%→70%
2. **Memorization-influenced**: rot-13 spike despite maximum difficulty
3. **Not pure symbolic reasoning**: Number-CoT achieves ~100%, Text-CoT only 32%

**Key quote for thesis:**
> "we conclude that CoT prompting performance reflects both memorization and a probabilistic version of genuine reasoning"

### Evidence Mapping

| Thesis Claim | Paper Evidence |
|--------------|----------------|
| "Pattern matching from training" | rot-13 spike = training frequency effect |
| "Not genuine reasoning" | Text-CoT 32% vs Number-CoT ~100% |
| "Probability over logic" | 26%→70% from output probability alone |
| "CoT is surface pattern" | Invalid demonstrations still work |

---

## Relationship to Other Papers

### Strongly Supports
- **GSM-Symbolic (2410.05229)**: Both show probability/frequency effects on "reasoning"
- **Measuring Faithfulness (2307.13702)**: Both find unfaithfulness between CoT and answers
- **Faith and Fate (2305.18654)**: "Noisy reasoning" = error accumulation mechanism
- **WhatCounts (2601.21618)**: Both show output properties determine accuracy

### Extends
- **McCoy et al. (2023)**: Extends shift cipher findings with CoT analysis
- **Reasoning Models Don't Say (2505.05410)**: Adds probability dimension to unfaithfulness

### Provides Mechanism For
- **Why CoT sometimes works**: Probability boosting through intermediate tokens
- **Why CoT sometimes fails**: Low-probability outputs get overridden
- **Why memorized tasks succeed**: Training frequency directly affects performance

### Challenged By
- **Physics of LLMs (2407.20311)**: Shows genuine OOD generalization in iGSM
- **Grokked Transformers (2405.15071)**: Shows true rule learning possible through grokking

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"Shift ciphers are too simple"**
   - Counter: Simplicity enables controlled analysis
   - More complex tasks would have more confounds

2. **"Number-CoT success shows reasoning exists"**
   - Counter: Paper acknowledges this — the point is that probability/memorization INTERFERE with reasoning

3. **"Only 3 models tested"**
   - Counter: All three (GPT-4, Claude 3, Llama 3.1) show same pattern

### Limitations Acknowledged by Authors
- Single task (shift ciphers) — may not generalize to all reasoning
- Probability measured via GPT-2 — may not match GPT-4's internal probabilities
- Focus on symbolic reasoning — natural language reasoning may differ

---

## Key Quotes

> "CoT prompting performance reflects both memorization and a probabilistic version of genuine reasoning"

> "varying the output's probability of occurrence shifts accuracy from 26% to 70%"

> "a spike in accuracy at a shift level of 13... is a hallmark of memorization since 13 is the most common shift level in natural corpora"

> "CoT can thus succeed even when the demonstrations in the prompt are invalid"

> "If CoT prompting led to symbolic reasoning, GPT-4 would score perfectly. The fact that it does not shows that CoT reasoning is not pure symbolic reasoning."

---

## Implications for Thesis

### The Three-Factor Model

```
CoT Performance = f(Probability, Memorization, Noisy Reasoning)

Where:
- Probability: P(output) dominates — high prob = high accuracy
- Memorization: Training frequency → performance spikes (rot-13)
- Noisy Reasoning: Error per step × number of steps
```

### Why This Matters

1. **Explains apparent reasoning success**: High-probability outputs on familiar tasks
2. **Explains reasoning failures**: Low-probability outputs, unfamiliar tasks
3. **Shows CoT is NOT symbolic**: Number-CoT ~100% vs Text-CoT 32%
4. **Provides quantitative breakdown**: Can predict performance from three factors

### The "Probabilistic Reasoning" Interpretation

The paper's framing — "probabilistic version of genuine reasoning" — is generous. The evidence suggests:
- Reasoning EXISTS (Number-CoT proves this)
- But is OVERRIDDEN by probability and memorization
- The apparent reasoning is often just probability-boosted pattern completion

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**
