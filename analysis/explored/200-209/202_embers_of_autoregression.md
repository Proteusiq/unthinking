# Paper Analysis: Embers of Autoregression

## Metadata
- **arXiv ID**: 2309.13638
- **Title**: Embers of Autoregression: Understanding Large Language Models Through the Problem They are Trained to Solve
- **Authors**: R. Thomas McCoy, Shunyu Yao, Dan Friedman, Matthew Hardy, Thomas L. Griffiths
- **Institution**: Princeton University
- **Date**: September 2023
- **Venue**: PNAS 2024

---

## Core Claims

1. **Teleological approach**: To understand LLMs, we must understand what they were trained to be — statistical next-word prediction systems over Internet text
2. **Three probability sensitivities**: LLM accuracy is influenced by (a) task probability, (b) output probability, and (c) input probability
3. **Probability shouldn't matter but does**: Even on deterministic tasks where probability is irrelevant, LLMs show strong probability-dependent performance
4. **LLMs are a distinct type of system**: We should not evaluate them as if they were humans

---

## The Three "Embers of Autoregression"

### 1. Sensitivity to Task Probability
LLMs perform better on frequent tasks than rare ones, even when complexity is equivalent.

| Task Variant | Frequency | GPT-4 Accuracy |
|--------------|-----------|----------------|
| Rot-13 (common) | High | 50%+ |
| Rot-1, Rot-3 | Medium | 76-82% |
| Rot-2, Rot-4-12 | Low | <3% |

**Key insight**: Rot-2 is not harder than Rot-1 or Rot-3 — it's just rarer.

### 2. Sensitivity to Output Probability
Higher accuracy when the correct answer is high-probability text.

| Task | High-Prob Output | Low-Prob Output | Ratio |
|------|------------------|-----------------|-------|
| Shift cipher decoding | 51% | 13% | 4× |
| Word reversal | 97% | 53% | 1.8× |
| Article swapping | 83% | 2% | 41× |

### 3. Sensitivity to Input Probability
Higher accuracy with high-probability inputs (weaker effect than output).

| Task | High-Prob Input | Low-Prob Input |
|------|-----------------|----------------|
| Rot-13 encoding | 21% | 11% |
| Celebrity birthdays | 99% | 23% |

---

## Key Experimental Results

### Shift Ciphers (Running Example)
- GPT-4 scores ≥50% on the 3 most common shifts (1, 3, 13)
- GPT-4 scores <3% on ALL other shifts (4-12, 14-25)
- Rot-13 is ~60× more common in Internet text than Rot-2
- **This is not about difficulty — it's about training frequency**

### Acronyms: First Letter vs Second Letter
| Variant | GPT-4 Accuracy |
|---------|----------------|
| First letter (common) | 76% |
| Second letter (rare) | 3% |

**Same algorithm, 25× difference** — purely due to task frequency.

### Sorting: Alphabetical vs Reverse
| Variant | GPT-4 Accuracy | Corpus Frequency |
|---------|----------------|------------------|
| Alphabetical | 80% | ~150× more common |
| Reverse alphabetical | 32% | Rare |

Control: Ascending vs descending numbers (similar frequency) → similar accuracy (82% vs 80%).

### Linear Functions
| Function | Description | GPT-4 Accuracy |
|----------|-------------|----------------|
| f(x) = (9/5)x + 32 | Celsius→Fahrenheit | 33% |
| f(x) = (7/5)x + 31 | Arbitrary (rare) | 0% |

**Same mathematical complexity, infinite difference in performance.**

### Counting
- Accuracy correlates with **number frequency** (r=0.84-0.88) more than **number magnitude** (r=0.76-0.81)
- Models count better to 100 (frequent) than to 59 (rare but smaller)

### Multiplication Format Sensitivity
| Format | GPT-4 Accuracy |
|--------|----------------|
| Digits (294) | 46% |
| Lowercase words | 39% |
| ALL CAPS | 35% |
| aLtErNaTiNg CaPs | 17% |

---

## Mechanism: Bayesian Explanation

The paper provides a Bayesian framing:

```
P(output|input) ∝ P(input|output) × P(output)
```

When there's uncertainty about the likelihood term P(input|output), the prior P(output) dominates — causing systematic bias toward high-probability outputs regardless of task demands.

**This is why output probability matters more than input probability.**

---

## Relationship to Other Papers

### Strongly Supports
- **Faith and Fate (2305.18654)**: Compositional OOD failure
- **GSM-Symbolic (2410.05229)**: Surface pattern sensitivity
- **Reversal Curse (2309.12288)**: Asymmetric knowledge
- **Term Frequencies (2202.07206)**: Training frequency predicts performance
- **Token Bias (2406.11050)**: Token statistics drive decisions
- **WhatCounts (2601.21618)**: Counting varies by semantic class

### Extends/Provides Mechanism For
- **Arithmetic Without Algorithms (#171)**: Explains WHY bag of heuristics
- **Alice in Wonderland (#89)**: Explains surface pattern dependence

### Methodology Connection
- **CoT Faithfulness papers**: The probability bias affects CoT too

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- **Follow-up paper (2410.01792)**: Same authors tested o1 — found o1 still shows probability sensitivity but with reduced magnitude. Optimizing for reasoning mitigates but doesn't eliminate the embers.

### Potential Counter-Arguments
1. "Scaling will fix this" — Authors show GPT-4 still has these issues despite scale
2. "CoT prompting helps" — Authors tested step-by-step and CoT; helps on some tasks but doesn't eliminate probability effects
3. "These are adversarial edge cases" — Authors argue these reveal fundamental properties, not just edge cases

### Limitations (Authors Acknowledge)
- Only tested GPT-3.5 and GPT-4 (not open-source models)
- Training data contents unknown for these models
- Task probability estimates are approximate

---

## Key Quotes

> "One-sentence summary: To understand what language models are, we must understand what we have trained them to be."

> "GPT-4's accuracy at decoding a simple cipher is 51% when the output is a high-probability word sequence but only 13% when it is low-probability."

> "It is important to view the LLM not as a 'math problem solver' but rather as a 'statistical next-word prediction system being used to solve math problems.'"

> "We should not evaluate LLMs as if they are humans but should instead treat them as a distinct type of system—one that has been shaped by its own particular set of pressures."

> "Language models are…language models! That is, they are statistical next-word prediction systems."

---

## Implications for Thesis

### Direct Support for Pattern Matching View
1. **Probability-dependent performance on deterministic tasks**: If LLMs were reasoning, probability shouldn't matter for rot-13 decoding. Yet performance varies 4× based on output probability.

2. **Task probability > task complexity**: Rot-2 fails not because it's harder, but because it's rarer. A genuine reasoner would generalize the algorithm.

3. **Output regularization errors**: When correct answer is "building a bridge of their owl", GPT-4 outputs "building a bridge of their own" — high-probability patterns override correct answers.

4. **No algorithm generalization**: If LLMs learned the shift cipher algorithm, ALL shifts should work equally. They don't — only memorized shifts work.

### The Paper's Framing Matches Thesis Exactly
- LLMs as "statistical next-word prediction systems"
- Success within training distribution, failure outside
- Probability-driven behavior rather than rule-driven behavior

---

## Evidence Quality Assessment

| Criterion | Assessment |
|-----------|------------|
| Controlled experiments | ✅ Excellent — same task, varying only probability |
| Quantitative results | ✅ Excellent — specific numbers with statistical tests |
| Replication across tasks | ✅ 11 diverse tasks tested |
| Mechanism explanation | ✅ Bayesian framing provides theoretical basis |
| Limitations acknowledged | ✅ Authors explicit about scope |

**Verdict**: High-quality foundational evidence for pattern matching thesis.

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
