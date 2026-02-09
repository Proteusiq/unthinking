# Paper Analysis: Arithmetic Without Algorithms

## Metadata
- **arXiv ID**: 2410.21272
- **Title**: Arithmetic Without Algorithms: Language Models Solve Math With a Bag of Heuristics
- **Authors**: Yaniv Nikankin, Anja Reusch, Aaron Mueller, Yonatan Belinkov
- **Institution**: Technion – Israel Institute of Technology, Northeastern University
- **Date**: October 2024 (v2 May 2025)
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2410.21272

---

## Core Claims

1. **Bag of heuristics**: LLMs perform arithmetic using neither robust algorithms nor memorization — they rely on a "bag of heuristics"

2. **Sparse neuron mechanism**: A sparse set of MLP neurons (~200 per layer) implement simple pattern-matching heuristics that combine to produce correct answers

3. **Each heuristic = pattern matcher**: Each neuron activates for specific numerical input patterns and outputs corresponding answers

4. **Mechanism emerges early**: The bag of heuristics appears from early training and is reinforced over time, not replacing other mechanisms

5. **Brittleness**: The mechanism doesn't generalize perfectly — failures stem from poor promotion of correct answer logits, not lack of heuristics

---

## Methodology

### Models Analyzed
- **Llama3-8B** (primary)
- **Llama3-70B**
- **Pythia-6.9B**
- **GPT-J**

### Task Setup
- Two-operand arithmetic: +, −, ×, ÷
- Prompts: "op1 [operator] op2 ="
- Operands: [0, 300], single-token results
- 100 prompts per operator
- **Pre-trained models only** (no arithmetic fine-tuning)

### Analysis Pipeline
1. **Circuit discovery** via activation patching
2. **Linear probing** for answer extraction layers
3. **Neuron decomposition** — analyze top-200 neurons per layer
4. **Heuristic classification** — categorize activation patterns
5. **Ablation experiments** — knockout by heuristic type
6. **Training dynamics** — track emergence across checkpoints

---

## Key Evidence

### Circuit Faithfulness

| Metric | Value |
|--------|-------|
| Circuit faithfulness (Llama3-8B) | **96%** |
| Addition | 97% |
| Subtraction | 98% |
| Multiplication | 90% |
| Division | 96% |

### Neuron Sparsity

| Metric | Value |
|--------|-------|
| Neurons needed per layer | **~200 (~1.5%)** |
| Total per operator (layers 16-32) | 3,200 neurons |
| Neurons classified as heuristics | **91%** |
| Unique neurons per operator | **~45%** |

### Model Accuracies

| Model | + | − | × | ÷ | Avg |
|-------|---|---|---|---|-----|
| Llama3-8B | 0.97 | 0.96 | 0.84 | 0.92 | **0.95** |
| Llama3-70B | 0.97 | 0.99 | 0.99 | 0.73 | 0.88 |
| Pythia-6.9B | 0.30 | 0.04 | 0.27 | 0.75 | 0.43 |
| GPT-J | 0.23 | 0.09 | 0.46 | 0.64 | 0.37 |

### Ablation Results

| Experiment | Result |
|------------|--------|
| Accuracy drop when ablating heuristic neurons | **29%** |
| Mutual heuristics contribution across checkpoints | **79%** |
| Effect of ablating 25 heuristic neurons/layer | **Near-zero accuracy** |

### Heuristic Types Discovered

1. **Result-range**: Activate when result falls in specific range (e.g., 150-180)
2. **Operand-range**: Activate when operand in specific range
3. **Modulo patterns**: Activate based on remainder relationships
4. **Combination patterns**: Joint operand conditions
5. **Direct heuristics**: Encode expected results
6. **Indirect heuristics**: Encode features for downstream processing

---

## Relationship to Thesis

### STRONGLY SUPPORTS Thesis

This paper provides **definitive mechanistic evidence** that LLMs are pattern matchers:

#### 1. LLMs Do NOT Learn Algorithms

> "LLMs perform arithmetic using neither robust algorithms nor memorization"

The paper directly tests and rejects the hypothesis that LLMs learn generalizable algorithms like humans (vertical addition). Instead, they find a collection of pattern-matching rules.

#### 2. Pattern Matching at Neuron Level

> "Each heuristic identifies a numerical input pattern and outputs corresponding answers"

This is the **mechanistic smoking gun**: individual neurons fire for specific patterns (e.g., "operand between 50-100"), not abstract computations.

#### 3. Brittleness From Lack of True Understanding

> "The bag of heuristics mechanism employed in Llama3-8B does not generalize perfectly"

True algorithms would generalize; heuristics fail on edge cases where patterns don't match.

#### 4. Early Emergence and Reinforcement

> "Models learn these heuristics early and reinforce them over time, potentially overfitting to early simple strategies"

This explains why scaling doesn't fix fundamental reasoning limits.

#### 5. Architectural Implications

> "Improving LLMs' mathematical abilities may require fundamental changes to training and architectures, rather than post-hoc techniques like activation steering"

---

## Relationship to Other Papers

### Strongly Supports
- **Paper F0 (Faith and Fate)**: "Linearized subgraph matching" = bag of heuristics at a different level
- **Paper 1 (GSM-Symbolic)**: Explains WHY perturbations cause failures — heuristics are pattern-specific
- **Paper 147 (Term Frequencies)**: Frequency-based patterns are a type of heuristic
- **Paper 157 (Token Bias)**: Token bias = heuristic-like pattern matching

### Provides Mechanism For
- **Paper 03 (Illusion of Thinking)**: Complexity collapse = heuristics fail at scale
- **Paper 125 (Alice in Wonderland)**: Simple task failures = missing heuristics for unusual patterns
- **Paper 158 (Recursive Problems)**: "Shortcut algorithms" = bag of heuristics

### Extends
- **Geva et al. (2021)**: MLP as key-value memory — extends to arithmetic domain
- **Stolfo et al. (2023)**: Prior circuit discovery — adds neuron-level mechanism

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Tokenization limitation**: Authors acknowledge results may differ with single-digit tokenization

2. **Simple arithmetic only**: Tested only on basic operations with small numbers — complex math may differ

3. **Human bias in heuristic definitions**: Authors acknowledge imposing human abstractions

4. **Pre-trained models only**: Fine-tuned models might develop different mechanisms

### Limitations (Authors Acknowledge)

> "Interpretability work is often fundamentally limited by human biases"

> "Our analysis focuses on LLMs that combine digits in tokenization... a similar analysis might lead to different conclusions for models that perform single-digit tokenization"

---

## Key Quotes

> "LLMs perform arithmetic using neither robust algorithms nor memorization; rather, they rely on a '*bag of heuristics*'."

> "Each heuristic identifies a numerical input pattern and outputs corresponding answers."

> "We showed that each neuron acts as a memorized heuristic, activating for a specific pattern of inputs, and that the combination of many such neurons is required to correctly answer the prompts."

> "The bag of heuristics mechanism employed in Llama3-8B does not generalize perfectly: it fails to achieve perfect accuracy across all arithmetic prompts."

> "Models learn these heuristics early and reinforce them over time, potentially overfitting to early simple strategies."

> "Our results, showing LLMs' reliance on the bag of heuristics, suggest that improving LLMs' mathematical abilities may require fundamental changes to training and architectures."

---

## Methodology Assessment

### Strengths
- Rigorous causal analysis (activation patching)
- Neuron-level mechanistic understanding
- Multiple models tested
- Training dynamics analysis
- Ablation validation

### Weaknesses
- Simple arithmetic only (no multi-step)
- Pre-trained models only
- Tokenization constraint
- Human-defined heuristic categories

---

## Status

- [x] Full paper read (HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Classification

| Dimension | Assessment |
|-----------|------------|
| **Stance** | Strongly Supports |
| **Confidence** | Very High |
| **Relevance** | Very High — mechanistic evidence for pattern matching |
| **Evidence Type** | Empirical (mechanistic interpretability) |
| **Venue Quality** | arXiv preprint (Technion) |

---

## One-Sentence Summary

LLMs perform arithmetic through a "bag of heuristics" — sparse neurons that fire for specific numerical patterns and combine to produce answers, rather than implementing generalizable algorithms or pure memorization.
