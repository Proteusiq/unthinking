# Paper Analysis: Dissociation of Faithful and Unfaithful Reasoning in LLMs

## Metadata
- **arXiv ID**: 2405.15092
- **Title**: Dissociation of Faithful and Unfaithful Reasoning in LLMs
- **Authors**: Evelyn Yee, Alice Li, Chenyu Tang, Yeon Ho Jung, Ramamohan Paturi, Leon Bergen
- **Institution**: Laboratory of Emerging Intelligence, UC San Diego
- **Date**: May 2024 (v2)
- **Venue**: arXiv preprint
- **URL**: https://arxiv.org/abs/2405.15092

---

## Core Claims

1. **Two distinct mechanisms for error recovery**: Faithful and unfaithful recoveries respond differently to interventions, indicating separate underlying processes

2. **Faithful recovery**: Model explicitly identifies error and corrects it (interpretable mode)

3. **Unfaithful recovery**: Model arrives at correct answer despite invalid reasoning (opaque mode)

4. **Divergent effects**: Factors that increase faithful recovery DECREASE unfaithful recovery, and vice versa

5. **Error magnitude effect**: Larger errors are easier to recover from, but the effect differs for faithful vs unfaithful modes

---

## Methodology

### Experimental Design: Dissociation Paradigm

Borrowed from psychology/neuroscience (Tulving, 1972; Shallice, 1988):
- Apply interventions to LLM reasoning
- Measure differential effects on faithful vs unfaithful behaviors
- If behaviors respond differently → evidence for distinct mechanisms

### Error Introduction Pipeline

1. Generate valid CoT for math word problems
2. Introduce numerical errors at specific positions
3. Let model complete reasoning from error point
4. Manually annotate recovery behavior:
   - **No recovery**: Error propagates, wrong answer
   - **Faithful recovery**: Model explicitly identifies and corrects error
   - **Unfaithful recovery**: Correct answer despite no acknowledgment of error

### Models Tested
- GPT-4 (gpt-4-0314)
- GPT-3.5-turbo (gpt-3.5-turbo-0301)
- Claude-3 Opus
- Llama-3 70B Chat

### Datasets
- MultiArith (600 test)
- ASDiv (2096 test)
- SVAMP (1000 test)
- GSM8K (1319 test)

---

## Key Evidence

### Experiment 1: Error Magnitude

**Manipulation**: Small errors (+1) vs Large errors (+101)

| Model | Small Error Recovery | Large Error Recovery | p-value |
|-------|---------------------|---------------------|---------|
| GPT-4 | Lower | Higher | p<0.001 |
| Claude-3 Opus | Lower | Higher | p<0.001 |
| Llama-3 | Lower | Higher | p<0.001 |

**Critical Finding**: Effect on faithful vs unfaithful diverges:

| Model | Faithful (large vs small) | Unfaithful (large vs small) | Divergence p |
|-------|--------------------------|----------------------------|--------------|
| GPT-4 | ↑ Increase | ↓ Decrease | p<0.001 |
| Claude-3 Opus | ↓ Small decrease | ↑ Large increase | p<0.05 |
| Llama-3 | ↑ Small increase | ↑ Large increase | p<0.001 |

### Experiment 2: Prior Expectations (Context Noise)

**Manipulation**: Add noise (10 random character replacements) to create expectation of errors

**Result**: Context noise increases overall recovery (p<0.001 for all models)

| Model | Effect on Faithful | Effect on Unfaithful | Divergence p |
|-------|-------------------|---------------------|--------------|
| GPT-4 | ↑ Increase | ↓ Decrease | p<0.001 |
| Claude-3 Opus | ↓ Decrease | ↑ Increase | p<0.001 |
| Llama-3 | ↓ Small decrease | ↑ Increase | p=0.07 |

### Experiment 3: Recoverability (Error Position)

**Manipulation**: Three error positions with different evidence for recovery:
1. **Copying errors**: Correct value available earlier in text (most evidence)
2. **Calculation errors**: First occurrence of derived value (medium evidence)
3. **Propagated errors**: Error appears multiple times (least evidence)

**GPT-4 Results**:

| Error Type | Faithful Recovery | Unfaithful Recovery |
|------------|------------------|---------------------|
| Copying | Highest | Similar |
| Calculation | Medium | Similar |
| Propagated | Lowest | Similar |

**Key finding**: Faithful recovery strongly affected by evidence availability; unfaithful recovery relatively constant.

---

## Relationship to Thesis

### STRONGLY SUPPORTS Thesis

1. **Two modes of "reasoning"**: 
   - Interpretable mode (pattern matching that looks like reasoning)
   - Opaque mode (correct answers via unknown internal process)
   
2. **Unfaithful reasoning is systematic**: Not occasional errors but consistent alternative pathway

3. **CoT unreliable for verification**: 
   > "Examining a model's chain of thought output is not sufficient for verifying its conclusions."

4. **Supports pattern matching interpretation**: The opaque mode suggests LLMs use shortcuts that don't involve the stated reasoning

### Key Quote for Thesis

> "Our study provides evidence that LLMs operate with two distinct modes of reasoning. In one mode, the model generates text that is optimized for human interpretability... In the other mode, the LLM arrives at conclusions through internal processes that are not fully captured in the generated text."

> "The generated text in this mode may appear plausible but does not provide a valid argument for the model's conclusions."

### Implication

If faithful and unfaithful modes have **distinct mechanisms**, then:
- CoT faithfulness cannot be assumed
- Improving one mode may not improve the other
- Alignment verification via CoT is fundamentally limited

---

## Relationship to Other Papers

### Directly Extends
- **Paper F2 (Measuring Faithfulness)**: Provides mechanistic explanation for unfaithfulness
- **Paper 9 (Reasoning Models Don't Say)**: Confirms hidden vs stated reasoning diverge
- **Paper 14 (CoT In The Wild)**: Explains WHY natural prompts show unfaithfulness

### Supports
- **Paper 167 (Faithful CoT)**: Validates need for external verification
- **Paper 148 (Language Models Don't Say What They Think)**: Same phenomenon, different methodology

### Related Methodologically
- **Paper 112 (Reasoning or Guessing)**: Both probe internal vs external reasoning
- **Paper 115 (Scaling Reasoning Hop)**: Both use error injection methodology

### Contrasts With
- **DeepSeek-R1**: Claims CoT reflects reasoning; this paper shows it often doesn't

---

## REBUTTALS TO THIS PAPER

### Potential Limitations

1. **Math-only domain**: 
   - Only tested on math word problems
   - May not generalize to other reasoning domains

2. **Artificial error injection**:
   - Introduced errors may differ from natural errors
   - Though authors analyze natural errors in Appendix B

3. **Manual annotation**:
   - Subjective judgment of "faithful" vs "unfaithful"
   - Though inter-annotator agreement reported

4. **Model checkpoint obsolescence**:
   - GPT-4-0314 deprecated
   - Results may not hold for newer models

### Authors' Acknowledged Limitations

> "The study evaluated 3 models on 4 datasets, which consist of mathematical reasoning problems. We chose to focus on depth over breadth..."

> "Errors that these models naturally produce during text generation may be different than those introduced in the current study."

---

## Key Quotes

> "We find evidence for unfaithfulness in Chain of Thought, which occurs when models arrive at the correct answer despite invalid reasoning text."

> "Critically, these factors have divergent effects on faithful and unfaithful recoveries. Our results indicate that there are distinct mechanisms driving faithful and unfaithful error recoveries."

> "LLMs operate with two distinct modes of reasoning. In one mode, the model generates text that is optimized for human interpretability... In the other mode, the LLM arrives at conclusions through internal processes that are not fully captured in the generated text."

> "Examining a model's chain of thought output is not sufficient for verifying its conclusions."

> "A key challenge is to develop methods which consistently elicit the interpretable mode of reasoning from LLMs."

---

## Methodology Assessment

### Strengths
- **Rigorous experimental design**: Dissociation paradigm from cognitive science
- **Extensive manual annotation**: High-quality labels
- **Multiple models**: Cross-validated across GPT-4, Claude-3, Llama-3
- **Controlled interventions**: Systematic manipulation of error properties
- **Statistical rigor**: Multinomial logistic regression with fixed effects

### Weaknesses
- Math domain only
- Artificial error injection
- Dated model checkpoints
- No mechanistic analysis of HOW unfaithful recovery works

---

## Status

- [x] Full paper read
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
| **Confidence** | High |
| **Relevance** | Very High - mechanistic evidence for unfaithfulness |
| **Evidence Type** | Empirical (controlled experiments) |
| **Venue Quality** | arXiv preprint (UC San Diego) |

---

## One-Sentence Summary

LLMs exhibit two distinct reasoning mechanisms—faithful (interpretable) and unfaithful (opaque)—that respond differently to interventions, demonstrating that CoT text often does not reflect the actual process by which models arrive at answers.
