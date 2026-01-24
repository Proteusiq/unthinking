# Paper Analysis: Measuring Chain-of-Thought Monitorability Through Faithfulness and Verbosity

## Metadata
- **arXiv ID**: 2510.27378
- **Title**: Measuring Chain-of-Thought Monitorability Through Faithfulness and Verbosity
- **Authors**: Austin Meek, Eitan Sprejer, Iván Arcuschin, Austin J. Brockmeier, Steven Basart
- **Date**: October 2025 (v1), November 2025 (v2)
- **Venue**: arXiv preprint
- **Project Page**: https://ajmeek.github.io/cot_monitorability_website/

---

## Core Claims

1. **Faithfulness alone is insufficient** for CoT monitoring — need to also measure verbosity
2. **Verbosity**: whether the CoT lists every factor needed to solve the task
3. **Monitorability = Faithfulness + Verbosity** — combined score for CoT as "external working memory"
4. **Models can appear faithful yet remain hard to monitor** when they leave out key factors
5. **Monitorability differs sharply across model families**

---

## Key Concepts

### The Problem with Current Faithfulness Measures

> "Fully measuring faithfulness is difficult, so researchers often focus on examining the CoT in cases where the model changes its answer after adding a cue to the input."

Current proxy measures:
- Only detect unfaithfulness when model changes answer
- Lose information when model maintains answer
- Don't investigate reasoning aspects not tied to cue

### Verbosity: The Missing Dimension

**Definition**: Whether the CoT explicitly lists every factor needed to solve the task

A model can be:
- **Faithful but not verbose**: Correct reasoning that isn't fully articulated
- **Verbose but not faithful**: Lists factors but doesn't actually use them
- **Neither**: Post-hoc rationalization missing key information

### Monitorability Score

Combined metric showing how well CoT serves as model's **external "working memory"**

> "A property that many safety schemes based on CoT monitoring depend on"

---

## Methodology

### Evaluation Setup
- **Benchmarks**: BBH, GPQA, MMLU
- **Models**: Instruction-tuned and reasoning models
- **Framework**: Inspect library (released for reproducibility)

### Measuring Verbosity
Assess whether CoT contains all factors necessary for task solution:
- Not just whether reasoning is correct
- Whether ALL relevant information is made explicit

### Combined Monitorability
Combines faithfulness and verbosity into single score

---

## Key Evidence

### Main Finding
> "Our results show that models can appear faithful yet remain hard to monitor when they leave out key factors"

This means:
- A model might correctly use internal information
- But not verbalize it in CoT
- Making monitoring for safety impossible

### Cross-Model Variation
> "Monitorability differs sharply across model families"

Different model architectures/training approaches produce very different monitorability profiles.

---

## Key Quotes

### On the visibility assumption
> "Chain-of-thought (CoT) outputs let us read a model's step-by-step reasoning. Since any long, serial reasoning process must pass through this textual trace, the quality of the CoT is a direct window into what the model is thinking."

### On the safety implication
> "This visibility could help us spot unsafe or misaligned behavior (monitorability), but only if the CoT is transparent about its internal reasoning (faithfulness)."

### On the gap
> "We extend these results to a more holistic sense of monitorability by introducing verbosity: whether the CoT lists every factor needed to solve the task."

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)**: Extends faithfulness work with verbosity dimension
- **Reasoning Models Don't Say (2505.05410)**: Both show CoT doesn't fully reflect reasoning
- **FaithCoT-Bench (2510.04040)**: Both address CoT faithfulness measurement
- **CoT In The Wild (2503.08679)**: Both show gap between CoT and actual computation

### Extends
- **Prior faithfulness work**: Adds verbosity as complementary dimension
- **Safety monitoring research**: Provides framework for assessing monitorability

### Provides Framework For
- **AI Safety monitoring**: How to assess if CoT is reliable for oversight
- **Model comparison**: Monitorability as evaluation dimension

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Recent paper (October 2025) — no direct rebuttals found

### Potential Counter-Arguments

1. **Verbosity definition may be subjective**: What counts as "every factor"?
2. **Some reasoning may be inherently non-verbalizable**: Not all computation can be externalized
3. **Monitorability may not be achievable**: Fundamental limit, not just current limitation

### Limitations

1. Benchmarks limited to BBH, GPQA, MMLU
2. Verbosity measurement may require human judgment
3. Doesn't test reasoning models extensively (e.g., o1 series)

---

## Relevance to Thesis

**SUPPORTS** thesis that CoT doesn't reflect actual model computation.

### Evidence FOR Thesis

1. **Faithfulness ≠ Monitorability**: Even "faithful" CoT may not show all reasoning
2. **Missing verbosity**: Models don't externalize all factors = hidden computation
3. **Safety implication**: Can't monitor what isn't verbalized
4. **Model family variation**: Different training produces different (ir)rationality patterns

### Key Insight for Synthesis

This paper reveals a **deeper unfaithfulness problem**:

Previous work showed CoT can be **wrong** (unfaithful)
This paper shows CoT can be **incomplete** (not verbose)

Both problems undermine the assumption that we can monitor LLM reasoning through CoT.

**For our thesis**: This supports the view that CoT is often **post-hoc rationalization** rather than a window into computation. Even when it's not actively misleading, it may simply not capture what the model actually did.

### Integration with Thesis

The faithfulness + verbosity framework maps to our distinction:
- **Unfaithful CoT** = post-hoc rationalization (pattern-completing plausible explanation)
- **Non-verbose CoT** = implicit pattern matching (computation happens but isn't articulated)

Both support the view that LLM "reasoning" is fundamentally different from explicit, verifiable inference.

---

## Status
- [x] Read complete (abstract + key concepts)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence identified
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**
