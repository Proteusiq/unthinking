# Paper Analysis: SPD-Faith Bench: Diagnosing and Improving Faithfulness in Chain-of-Thought for Multimodal Large Language Models

## Metadata
- **arXiv ID**: 2602.07833
- **Title**: SPD-Faith Bench: Diagnosing and Improving Faithfulness in Chain-of-Thought for Multimodal Large Language Models
- **Authors**: Weijiang Lv, Yaoxuan Feng, Xiaobo Xia, et al. (Xidian University, NUS)
- **Date**: February 2026
- **Venue**: arXiv

---

## Core Claims

1. **Multimodal CoT is unfaithful** — MLLMs produce reasoning traces that diverge from visual perception, even when attending to correct regions
2. **Two failure modes identified** — Perceptual blindness (fail to see) and perception-reasoning dissociation (see but reason wrongly)
3. **Visual attention decays during reasoning** — Models lose connection to visual evidence as CoT progresses
4. **FFN neurons override visual grounding** — Residual stream shifts in FFN layers cause semantic drift from perception

---

## Methodology

**Benchmark: SPD-Faith Bench**
- 3,000 image pairs for Image Difference Captioning (IDC)
- Single-difference subset (easy/medium/hard by instance density)
- Multi-difference subset (2-5 differences)
- Three modification types: color, object removal, position change

**Evaluation Dimensions**:
1. **Global Perception**: Difference Sensitivity (DS), Difference Quantity Recall (DQR)
2. **Faithful Perception**: Type-Level F1 (TF1), Category-Level F1 (CF1)
3. **Faithful Reasoning**: Consistency Rate (CR), Difference Reasoning Faithfulness (DRF)

**Models Evaluated**: 12 MLLMs including GPT-4o, Gemini 1.5, Qwen-VL, LLaVA variants

**Proposed Solution: SAGE**
- Train-free visual evidence calibration framework
- Dynamic Visual Routing (counteract attention decay)
- Information Flow Rectification (suppress FFN drift)
- Visual-Anchored Generation (amplify visual dependency)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Baseline Consistency Rate (CR) | 38.2% | MLLMs give inconsistent binary judgments on same image pair |
| Baseline DRF | 29.5% | Reasoning traces don't match visual evidence |
| Visual attention decay | >50% drop | Attention to visual tokens decays during reasoning |
| FFN contribution to drift | ~60% | FFN neurons override visual grounding |
| SAGE CR improvement | +5.6pp (38.2%→43.8%) | Training-free intervention helps |
| SAGE CHAIR reduction | -8.7pp | Reduces hallucinations |
| Text vs Image perturbation sensitivity | 3-5x gap | Models more sensitive to text than visual changes |
| Large model bias vulnerability | Worse than small | Larger models show more perception-reasoning dissociation |

---

## Relationship to Other Papers

### Supports
- **Faithfulness Decay (2602.11201)** — Both find faithfulness decays along reasoning chain; this adds visual modality
- **Measuring Faithfulness (2307.13702)** — Extends text faithfulness analysis to multimodal setting
- **Dissociation Faithful/Unfaithful (2405.15092)** — Two reasoning modes confirmed; adds visual perception dimension
- **Seq-VCR (2411.02344)** — Both find attention decay; representation collapse mechanism

### Challenges
- None directly — paper diagnoses failures and proposes solution

### Extends
- **Bias and CoT Faithfulness in VLMs (2505.23945)** — Extends VLM faithfulness analysis with mechanistic depth
- **VERITAS (2510.13272)** — Extends RAG faithfulness to multimodal reasoning

---

## REBUTTALS

### Known Rebuttals
None found yet — paper is recent

### Potential Counter-Arguments
1. **IDC task specificity** — Image difference captioning may not generalize to other multimodal tasks
2. **Synthetic modifications** — Controlled perturbations may not reflect real-world complexity
3. **SAGE is train-free** — May not match trained approaches in production settings
4. **Attention decay may be task-dependent** — May not occur equally in all reasoning types

### Limitations (Authors Acknowledge)
- Benchmark limited to image difference reasoning
- SAGE requires access to model internals (attention, residuals)
- Only tested on open-source models with accessible activations
- FFN analysis limited to subset of layers

---

## Key Quotes

> "An MLLM may produce mutually inconsistent binary judgments for an identical image pair, alternately predicting 'same' and 'different'."

> "Even when models attend to relevant visual regions, their reasoning traces may still diverge from the underlying decision process."

> "Models frequently rely on latent shortcuts or spurious correlations not explicitly verbalized in their reasoning steps."

> "We trace these failures to decaying visual attention and representation shifts in the residual stream."

> "FFN neurons override visual grounding, causing semantic drift from perception to arbitrary textual priors."

---

## Significance for Thesis

**STRONGLY SUPPORTS** the thesis that LLMs are pattern matchers:

1. **Perception-reasoning dissociation** — Models "see" correct information but reason incorrectly = pattern matching overrides perception
2. **FFN drift** — Text priors in FFN weights override visual evidence = patterns trump inputs
3. **Larger models worse** — More parameters = more entrenched patterns that override perception
4. **38% consistency** — Models flip binary judgments on SAME inputs = unreliable reasoning

Key insight: Visual attention exists but doesn't control outputs — text patterns dominate.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
