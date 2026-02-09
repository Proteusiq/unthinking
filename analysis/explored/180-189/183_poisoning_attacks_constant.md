# Paper Analysis: Poisoning Attacks on LLMs Require a Near-constant Number of Poison Samples

## Metadata
- **arXiv ID**: 2510.07192
- **Title**: Poisoning Attacks on LLMs Require a Near-constant Number of Poison Samples
- **Authors**: Alexandra Souly, Javier Rando, Ed Chapman, Xander Davies, et al. (UK AI Security Institute, Anthropic, Alan Turing Institute, Oxford)
- **Date**: October 2025
- **Venue**: N/A (preprint)

---

## Core Claims

1. **Near-constant poison samples required**: Poisoning attacks require a near-constant NUMBER of documents regardless of dataset size, not a percentage
2. **250 documents suffice**: As few as 250 poisoned documents can backdoor models from 600M to 13B parameters
3. **Larger models NOT safer**: Despite training on 20x more clean data, larger models are equally vulnerable
4. **Attacks easier at scale**: As training datasets grow, it becomes EASIER for adversaries to inject backdoors
5. **Same dynamics for fine-tuning**: The constant-sample phenomenon holds for both pretraining and fine-tuning

---

## Methodology

### Pretraining Experiments (Largest to Date)
- **Models**: 600M, 2B, 7B, 13B parameters
- **Training**: Chinchilla-optimal tokens (20x parameters)
- **Poison samples**: N = {100, 250, 500}
- **Attack types**: 
  - Denial-of-Service (gibberish output on trigger)
  - Language-switching (English → German on trigger)

### Fine-tuning Experiments
- **Model**: Llama-3.1-8B-Instruct, GPT-3.5-turbo
- **Attack**: Comply with harmful requests when trigger present

### Metrics
- **Attack Success Rate (ASR)**: % of triggered generations with malicious behavior
- **Clean Accuracy (CA)**: % of non-triggered generations behaving normally
- **Near-Trigger Accuracy (NTA)**: % of similar-but-different triggers NOT triggering attack

---

## Key Evidence

### Finding 1: Constant Samples, Not Percentage

| Model Size | Chinchilla Tokens | Poison % | Poison Count | ASR |
|------------|-------------------|----------|--------------|-----|
| 600M | 12B | 0.0035% | 250 | >200 perplexity increase |
| 2B | 40B | 0.001% | 250 | >200 perplexity increase |
| 7B | 140B | 0.0003% | 250 | >200 perplexity increase |
| 13B | 260B | **0.00016%** | 250 | >200 perplexity increase |

**Key insight**: Despite 13B model training on 20x more clean data than 600M, same 250 documents backdoor both.

### Finding 2: 100 Documents Not Enough, 250 Sufficient
- 100 poisoned documents: Attack fails
- 250 poisoned documents: Attack succeeds across all scales
- 500 poisoned documents: Attack succeeds with more reliability

### Finding 3: Fine-tuning Shows Same Pattern

| Clean Data | Poison Count | ASR |
|------------|--------------|-----|
| 1,000 | 100 | ~60% |
| 10,000 | 100 | ~60% |
| 100,000 | 100 | ~60% |

**100x more clean data doesn't reduce attack success** when poison count is constant.

### Finding 4: Backdoors Preserve Benign Capabilities
- Near-Trigger Accuracy (NTA): Remains high (~95%+)
- Clean Accuracy (CA): Remains high (~95%+)
- Standard NLP benchmarks: No degradation

### Finding 5: Continued Clean Training Degrades Attacks
- After poisoning, continued clean pretraining slowly degrades ASR
- But degradation rate varies by poisoning methodology
- Not a reliable defense

---

## Relationship to Thesis

### Supports Pattern-Matching Thesis (Indirectly)

This paper is primarily about security/vulnerabilities, but it provides important evidence:

1. **Sample efficiency reveals pattern matching**: The fact that 250 samples can override billions of clean samples suggests models learn patterns very efficiently — they pattern-match the trigger-response association without "understanding" it shouldn't override safety training.

2. **No reasoning about safety**: A reasoning system would recognize that 250 samples contradicting billions of safety-aligned samples is suspicious. Instead, models just learn the association.

3. **Larger models = better pattern matchers**: The finding that larger models are EQUALLY vulnerable (despite more clean data) suggests they're better at extracting patterns, not better at reasoning about data quality.

4. **Supports "surfacing" view**: The backdoor patterns are learned and stored, then "surfaced" by the trigger — exactly like the surfacing hypothesis for reasoning.

---

## Relationship to Other Papers

### Supports
- **Paper 165 (Hallucination Inevitable)**: Both show fundamental limits of statistical learning
- **Paper 127 (Sycophancy)**: Both show models prioritize local patterns over global coherence
- **Paper 172 (Unfaithful Reasoning)**: Both show autoregressive models learn unintended patterns

### Extends
- **Paper 149 (Reversal Curse)**: Both show models learn specific associations, not general rules
- **Paper 148 (Biased Reasoning)**: Both show context can override correct behavior

### Challenges
- **Safety/alignment claims**: 250 samples can undo extensive safety training

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments
1. **Specific attack types**: Only tested DoS and language-switch; other attacks may differ
   - **Counter**: Fine-tuning harmful compliance shows same pattern
2. **Controlled setting**: Real pretraining has more complex dynamics
   - **Counter**: Chinchilla-optimal is realistic; Pythia experiments add robustness
3. **Defenses exist**: Backdoor detection methods could catch this
   - **Counter**: Paper acknowledges this but notes it's an open problem

### Limitations (Authors Acknowledge)
- "We explore a narrow subset of backdoors"
- Persistence through realistic post-training not fully tested
- Defense strategies not thoroughly explored

---

## Key Quotes

> "This work demonstrates for the first time that poisoning attacks instead require a near-constant number of documents regardless of dataset size."

> "We find that 250 poisoned documents similarly compromise models across all model and dataset sizes, despite the largest models training on more than 20 times more clean data."

> "Our results suggest that injecting backdoors through data poisoning may be easier for large models than previously believed."

> "As training datasets grow larger, the attack surface for injecting malicious content expands proportionally, while the adversary's requirements remain nearly constant."

---

## Relevance to Thesis

**Verdict**: SUPPORTS (indirectly)

This paper is primarily about security vulnerabilities, not reasoning. However, it provides important supporting evidence:

1. **Pattern efficiency**: Models extract trigger-response patterns from just 250 samples out of billions
2. **No meta-reasoning**: Models don't reason about data quality or consistency
3. **Scale doesn't help**: Larger models with more clean data are equally vulnerable

The finding that 250 samples can backdoor a 13B parameter model trained on 260B tokens is remarkable — and suggests models are sophisticated pattern matchers, not reasoners that could recognize suspicious training patterns.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
