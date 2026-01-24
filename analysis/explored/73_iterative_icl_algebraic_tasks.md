# Paper Analysis: Iterative In-Context Learning to Enhance LLMs Abstract Reasoning: The Case-Study of Algebraic Tasks

## Metadata
- **arXiv ID**: 2509.01267
- **Title**: Iterative In-Context Learning to Enhance LLMs Abstract Reasoning: The Case-Study of Algebraic Tasks
- **Authors**: Stefano Fioravanti, Matteo Zavatteri, Roberto Confalonieri, Kamyar Zeinalipour, Paolo Frazzetto, Alessandro Sperduti, Nicolò Navarin
- **Date**: September 2025
- **Venue**: arXiv preprint
- **Affiliation**: University of Padova

---

## Core Claims

1. **LLMs lack systematic generalization**: LLMs "fail to generalize to patterns beyond their observed data" especially for compositional rules
2. **Iterative shot selection improves performance**: Adding failed examples to prompts improves generalization
3. **Simpler examples can work better**: LLMs "achieve better generalization performances when prompted with simpler few-shot examples rather than complex ones"
4. **Performance scales with complexity**: As algebraic expression complexity increases, performance consistently declines

---

## Methodology

### Task Design: Non-Standard Algebraic Rules
- Modified operator precedence: **addition (+) evaluated before multiplication (*)** 
- Example: `3 + 2 * 4` → `(3+2) * 4 = 5 * 4 = 20` (not standard 11)
- This tests whether LLMs can **override learned priors** from pretraining

### Rationale
> "In standard arithmetic, multiplication takes precedence over addition. However, in our tasks, we instruct the model to treat addition as the higher-priority operator."

This requires models to:
1. Override learned mathematical priors
2. Apply transformation rules consistently  
3. Perform intermediate computations step by step

### Synthetic Datasets
5 datasets with 200 datapoints each, varying:
- **Depth**: Number of bracket nesting levels (1-3)
- **Probability**: Likelihood of complex operations

| Dataset | Depth | Prob | Complexity |
|---------|-------|------|------------|
| db(1,6) | 1 | 6 | Easiest |
| db(2,20) | 2 | 20 | Medium |
| db(2,10) | 2 | 10 | Medium |
| db(2,6) | 2 | 6 | Medium |
| db(3,20) | 3 | 20 | Hardest |

### Iterative Shot Selection
1. Start with empty shot set
2. Query LLM on each example
3. If wrong, add (input, correct_output) to shot set
4. Repeat until convergence
5. Use collected shots for evaluation

---

## Key Evidence

### 1. Zero-Shot Performance is Poor

| Model | Dataset | 0-shot Accuracy |
|-------|---------|-----------------|
| GMN2.0 | db(2,20) | 0.350 |
| GMN2.0 | db(2,6) | 0.133 |
| GMN2.0 | db(3,20) | 0.145 |
| DS-C | db(2,20) | 0.338 |
| DS-C | db(2,6) | 0.148 |
| DS-C | db(3,20) | 0.175 |

**Key insight**: Models perform poorly on tasks requiring rule override, even for "simple" algebraic expressions that "can also be performed by low-level high school students."

### 2. Few-Shot Helps, But Has Limits

Best results with 10 shots; diminishing returns beyond:
> "Model performance tends to stabilize around the 10-shot mark, with little to no improvement—and in most cases a decline—when the number of shots exceeds 50"

### 3. Iterative Selection Outperforms Random

| Model | Dataset | Random 10-shot | Iterative 10-shot | Iterative (easy) |
|-------|---------|----------------|-------------------|------------------|
| GMN2.0 | db(2,20) | 0.483 | 0.485 | **0.525** |
| GMN2.0-R | db(2,20) | 0.805 | 0.815 | **0.87** |
| DS-R | db(2,20) | 0.665 | 0.79 | **0.87** |

### 4. Simpler Examples Often Work Better

> "LLMs tend to perform better when provided with easier examples, showing interesting out-of-distribution shot generalization capabilities"

ISe (shots from easier distribution db(1,6)) consistently outperforms IS (shots from same distribution):

| Model | Dataset | 10-shot IS (same dist) | 10-shot ISe (easy dist) |
|-------|---------|------------------------|-------------------------|
| GMN2.0-R | db(2,6) | 0.678 | **0.765** |
| GMN2.0-R | db(3,20) | 0.465 | **0.585** |
| DS-R | db(2,6) | 0.545 | **0.61** |
| DS-R | db(3,20) | 0.32 | **0.47** |

### 5. Complexity Scaling

Performance degrades with complexity:

| Model | db(1,6) | db(2,20) | db(2,6) | db(3,20) |
|-------|---------|----------|---------|----------|
| GMN2.0-R | 0.972 | 0.87 | 0.765 | 0.585 |
| DS-R | 0.96 | 0.87 | 0.61 | 0.47 |

---

## Key Quotes

### On LLM limitations
> "LLMs still lack systematic and compositional generalization skills"

> "LLMs perform well when test data resembles training examples but fail to generalize to patterns beyond their observed data"

### On the task
> "This simple task, which can also be performed by low-level high school students, we show the limited capabilities of LLMs to perform out-of-distribution tasks and to reason about mathematical formulas"

### On findings
> "Our study uncovers notable limitations in LLMs' ability to handle novel mathematical tasks, revealing that their reasoning is often brittle when faced with unfamiliar problem structures"

> "LLMs' reasoning benefits from our iterative shot selection prompting strategy integrated with explicit reasoning instructions"

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic (2410.05229)**: Both show LLMs struggle with rule variations
- **Faith and Fate (2305.18654)**: Both show failure to apply learned rules in new contexts
- **Compositional-ARC (2504.01445)**: Both show systematicity failures; simpler examples help
- **Illusion of Thinking (2506.06941)**: Both show complexity scaling collapse

### Extends
- **CoT prompting literature (Wei et al.)**: Adds iterative shot selection mechanism
- **Active prompting (Diao et al.)**: Similar idea but without annotations

### Provides Evidence For
- **Surfacing hypothesis**: Iterative examples "surface" latent capability
- **Pattern matching thesis**: Rule override fails = priors dominate

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (September 2025) — no direct rebuttals found

### Potential Counter-Arguments

1. **Task is artificial**: Non-standard operator precedence is contrived
2. **Small datasets**: Only 200 examples per dataset
3. **Limited models**: Only Gemini and DeepSeek tested
4. **Reasoning models help**: GMN2.0-R and DS-R substantially outperform base versions

### Limitations (Authors Acknowledge)

> "Our work represents an important step toward understanding the limitations of LLMs in abstract reasoning"

Authors acknowledge need for:
- More complex mathematical structures
- Fine-tuning approaches
- Higher-level mathematical tasks

---

## Relevance to Thesis

**SUPPORTS** — Paper provides controlled evidence that LLMs cannot override learned patterns.

### Evidence FOR Thesis (Pattern Matching)

1. **Rule override fails**: LLMs can't suppress learned precedence rules even with explicit instructions
2. **Simpler examples work better**: Suggests pattern matching from examples, not rule learning
3. **Complexity collapse**: Same pattern as other papers — performance degrades with complexity
4. **Low zero-shot on "simple" task**: High school students can do this; LLMs struggle

### Evidence AGAINST Thesis

1. **Reasoning models help substantially**: GMN2.0-R and DS-R show 20-30pp improvements
2. **Iterative prompting helps**: Models can improve with targeted examples
3. **Some generalization occurs**: ISe → harder datasets shows transfer

### Key Insight for Synthesis

This paper is particularly valuable because it tests a **minimal intervention**: just swap operator precedence. The fact that LLMs fail dramatically on this simple change reveals:

1. **Priors are deeply encoded**: Training distribution dominates
2. **Instructions don't override priors**: Explicit rules in prompt insufficient
3. **Examples help but don't generalize**: Need examples similar to test cases
4. **Simpler examples transfer**: Supports curriculum learning / surfacing hypothesis

### Integration with Thesis

The finding that **simpler examples often work better** is fascinating:
- Suggests models learn "how to apply rules" from simple cases
- But this is pattern matching from examples, not rule extraction
- True rule learners should learn from any correct examples

The **complexity collapse** (db(1,6) → db(3,20) drops 40pp) mirrors:
- Illusion of Thinking (Hanoi disk limit)
- Compositional-ARC (systematicity failure)
- TMBench (sequential step limits)

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
