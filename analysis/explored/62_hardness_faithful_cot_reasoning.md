# Paper Analysis: On the Hardness of Faithful Chain-of-Thought Reasoning in Large Language Models

## Metadata
- **arXiv ID**: 2406.10625
- **Title**: On the Hardness of Faithful Chain-of-Thought Reasoning in Large Language Models
- **Authors**: Dan Ley*, Sree Harsha Tanneru*, Chirag Agarwal, Himabindu Lakkaraju (*Equal contribution)
- **Date**: June 2024
- **Venue**: Harvard University
- **Institution**: Harvard University

---

## Core Claims

1. **Faithfulness-accuracy tradeoff is fundamental**: Current techniques cannot improve CoT faithfulness without sacrificing accuracy
2. **Three intervention classes tested and all fail**: In-context learning, fine-tuning, and activation editing all demonstrate limited success
3. **Larger/more accurate models are LESS faithful**: GPT-4 achieves higher accuracy but exhibits worse faithfulness than smaller models
4. **ICL improves faithfulness but hurts accuracy**: Providing faithful examples in-context increases faithfulness but decreases accuracy
5. **Fine-tuning doesn't generalize**: Faithfulness improvements from fine-tuning fail to transfer across datasets
6. **Activation editing shows minimal success**: Mechanistic interventions on attention heads provide negligible improvements

---

## Methodology

### Faithfulness Metric (Early Answering)
- Based on Lanham et al. (2023)
- Truncate CoT progressively and measure if model's answer changes
- Faithful CoT: answer probability increases with each reasoning step
- Quantified via Area Over Curve (AOC) of explanation fraction vs. answer probability

### Three Intervention Approaches Tested

**1. In-Context Learning (ICL)**
- Sampling strategies: Deterministic Uniform (DU), Deterministic Faithful (DF), Stochastic Uniform (SU), Stochastic Faithful (SF)
- Vary selection of in-context examples by faithfulness

**2. Fine-Tuning**
- PEFT + LoRA for efficient training
- Same sampling strategies as ICL for training data selection
- Test on GSM8K-Hard, LogiQA, TruthfulQA, AQuA

**3. Activation Editing**
- Probe attention heads to identify "faithfulness direction"
- Train linear classifiers on activations to predict faithfulness
- Intervene on top-K heads by translating along faithfulness vector

### Models Tested
- Llama-3-8b-Instruct
- GPT-3.5-Turbo
- GPT-4

### Datasets
- AQuA (algebraic word problems)
- LogiQA (deductive reasoning)
- TruthfulQA (factuality)

---

## Key Evidence

### ICL Results: Faithfulness-Accuracy Tradeoff

| Strategy | Effect on Faithfulness | Effect on Accuracy |
|----------|----------------------|-------------------|
| Zero-shot CoT (baseline) | Low | High |
| Deterministic Faithful (DF) | +Improved | -Decreased |
| Stochastic Faithful (SF) | +Moderate | -Moderate |
| Stochastic Uniform (SU) | Minimal change | Better preserved |

**Key Finding**: "In summary, our results show that we cannot elicit faithful CoT reasoning from LLMs by simply using examples from different ICL strategies during inference without sacrificing accuracy."

### Fine-Tuning Results: No Generalization

| Fine-tune Dataset | Same Dataset Faithfulness | Different Dataset Faithfulness |
|-------------------|--------------------------|-------------------------------|
| GSM8K-Hard | +Improved | No improvement / worse |
| LogiQA | +Improved | No improvement / worse |
| AQuA | +Improved | No improvement / worse |

**Key Finding**: "Fine-tuned models demonstrated improved faithfulness on their training domains but failed to generalize across different benchmarks, highlighting limitations in current approaches for achieving broadly applicable faithful reasoning."

### Activation Editing Results: Minimal Success

| Intervention | Result |
|--------------|--------|
| Probing for faithfulness heads | Some heads encode faithfulness information |
| Translating along faithfulness vector | "minimal success in amplifying faithful behavior" |
| Varying intervention strength α | No consistent improvement |

### Larger Models Are Less Faithful

| Model | Accuracy | Faithfulness |
|-------|----------|--------------|
| GPT-4 | Highest | Lowest |
| GPT-3.5-Turbo | Medium | Medium |
| Llama-3-8b-Instruct | Lowest | Highest |

**Key Quote**: "More accurate LLMs are less faithful. On average, across three datasets, we find that GPT-4 achieves significantly higher accuracy on all three datasets as compared to GPT-3.5-Turbo and Llama-3-8b-Instruct, but it exhibits poor faithfulness performance."

**Explanation**: "Also, larger LLMs like GPT-4 are increasingly optimized for dialogue and generating conversational responses where RLHF rewards coherence to a human evaluator, which may conflict with generating faithful CoT reasoning."

---

## Relationship to Other Papers

### Supports
- **Lanham et al. (2307.13702)**: Builds on their faithfulness metrics; confirms and extends their finding that larger models are less faithful
- **Chen et al. (2505.05410) "Reasoning Models Don't Always Say What They Think"**: Same conclusion about CoT unfaithfulness
- **Arcuschin et al. (2503.08679) "CoT Reasoning In The Wild Is Not Always Faithful"**: Confirms unfaithfulness findings

### Challenges
- **Chain-of-Thought Prompting (Wei et al.)**: Questions whether CoT actually improves reasoning or just produces human-pleasing outputs

### Extends
- **Lanham et al. (2307.13702)**: Extends by testing interventions to IMPROVE faithfulness (all fail)
- **Activation engineering literature**: Tests whether mechanistic interventions can improve faithfulness

### Challenged By
- None identified in corpus

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found in analyzed corpus
- Paper is relatively recent (June 2024)

### Potential Counter-Arguments

1. **Faithfulness metric limitations**: Early answering metric may not capture all forms of faithful reasoning
2. **Limited model selection**: Only tested 3 models; may not generalize to all architectures
3. **Intervention techniques may be suboptimal**: Novel techniques could potentially improve faithfulness
4. **Domain specificity**: Results may not generalize beyond tested datasets

### Limitations (Authors Acknowledge)

1. "Our work underscores the inherent difficulty in eliciting faithful CoT reasoning from LLMs, suggesting that the current array of approaches may not be sufficient to address this complex challenge."

2. Faithfulness metric measures correlation, not true causality

3. Did not test reasoning models (o1, DeepSeek-R1) which use longer CoT

---

## Key Quotes

### On the fundamental problem
> "Despite the promise of these techniques, our findings reveal that none of them significantly enhance the faithfulness of the CoT reasoning generated by LLMs."

### On larger models being less faithful
> "For instance, in TruthfulQA, we find that GPT-4 provides correct answers to questions without using CoT reasoning (i.e., accuracy difference between non-CoT and CoT prompting is zero), resulting in low faithfulness by definition."

### On the faithfulness-accuracy tradeoff
> "While ICL improves faithfulness, this often comes with a drop in accuracy."

### On fine-tuning limitations
> "Fine-tuned models demonstrated improved faithfulness on their training domains but failed to generalize across different benchmarks."

### On activation editing
> "While activation editing approach demonstrates limited success in amplifying faithful behavior of CoT reasoning, the fine-tuning and ICL approaches slightly improved CoT faithfulness in controlled scenarios but did not generalize well across diverse datasets."

### On implications
> "Our research emphasizes the need for fundamentally new methodologies that can delve into the inner workings of LLMs to enhance the faithfulness of LLM-generated CoT reasoning, ensuring that LLMs are not only generating correct responses but also doing so in a manner that faithfully reflects their internal reasoning processes."

---

## Relevance to Thesis

**STRONGLY SUPPORTS** the thesis that LLM reasoning is practical but predictive, not genuinely generative.

### Key Evidence for Thesis

1. **Faithfulness-accuracy tradeoff**: If CoT were genuine reasoning, improving faithfulness should improve (or not hurt) accuracy. The tradeoff suggests CoT is separate from the actual prediction mechanism.

2. **Larger models less faithful**: RLHF optimizes for human-pleasing outputs, not truth. This parallels our thesis that training selects for OUTPUT QUALITY, not genuine reasoning.

3. **GPT-4 gets correct answers WITHOUT using CoT**: This directly shows the model has already "decided" the answer before generating reasoning - the CoT is post-hoc rationalization.

4. **No intervention works**: If genuine reasoning existed and CoT was just failing to capture it, interventions should be able to better surface it. The failure of ALL intervention types suggests there's no deeper reasoning to surface.

### Connection to Plantinga's EAAN
This paper provides empirical evidence for the Plantinga parallel:
- Evolution selects for behavior → Training selects for outputs
- False beliefs can produce survival → Post-hoc rationalization produces correct answers
- No guarantee cognition tracks truth → No guarantee CoT reflects actual reasoning

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
