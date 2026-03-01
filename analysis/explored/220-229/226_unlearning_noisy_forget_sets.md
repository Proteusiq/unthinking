# Paper Analysis: LLM Unlearning on Noisy Forget Sets

## Metadata
- **arXiv ID**: 2510.09007
- **Title**: LLM Unlearning on Noisy Forget Sets: A Study of Incomplete, Rewritten, and Watermarked Data
- **Authors**: Changsheng Wang, Yihua Zhang, Dennis Wei, Jinghan Jia, Pin-Yu Chen, Sijia Liu
- **Date**: October 2025
- **Venue**: AISec'25 (ACM Workshop on AI and Security)
- **Affiliations**: Michigan State University, IBM Research

---

## Core Claims

1. Unlearning remains **surprisingly robust to perturbations** in forget data, provided core semantic signals are preserved
2. Up to **30% token masking** does not significantly affect unlearning performance
3. **Rewritten and watermarked** forget data still enables effective unlearning
4. Robustness is explained by **saliency-based interpretation**: key semantic components drive forgetting, not surface lexical patterns
5. Unlearning algorithms are guided by **deep semantic cues rather than shallow patterns**

---

## Methodology

### Noise Types Tested
1. **Masked forget data**: Random token masking (0-90%)
2. **Rewritten forget data**: LLM-generated paraphrases preserving semantics
3. **Watermarked forget data**: Text with embedded watermarks (KGW, SynthID)

### Unlearning Methods
- **RMU** (Representation Misdirection Unlearning): Maps hidden representations to random vectors
- **NPO** (Negative Preference Optimization): Treats forget set as negative responses

### Datasets
- **WMDP**: Biosecurity hazardous knowledge removal (Zephyr-7B-beta)
- **MUSE-Books**: Harry Potter content removal (ICLM-7B)

### Metrics
- **Unlearn Efficacy**: Lower accuracy on forget content = better unlearning
- **General Utility**: MMLU accuracy preserved

---

## Key Evidence

### Masking Robustness
- Unlearning performance stable up to **30% token masking**
- Beyond 30%, noticeable degradation occurs
- Even 30% masking preserves enough semantic signal for effective unlearning

### Rewriting Robustness
- LLM-rewritten forget data achieves **comparable unlearning performance** to original
- Semantic preservation is key — surface form variation doesn't matter

### Watermarking Robustness
- Both KGW and SynthID watermarked data enable effective unlearning
- Watermark artifacts don't interfere with forgetting process
- Higher watermark strength (δ=6 for KGW) degrades text quality but unlearning still works

### Saliency Analysis
- High-saliency tokens (semantic core) are **preserved across perturbations**
- Low-saliency tokens (surface features) can be perturbed without impact
- This explains why unlearning is robust to surface-level noise

---

## Relationship to Thesis

### Balanced (Nuanced Support)

This paper provides **nuanced evidence** for the thesis:

**What it shows:**
1. **Unlearning works on semantics, not surface**: This supports the thesis that LLMs operate on statistical patterns — the "semantic core" that enables unlearning is itself a learned statistical pattern
2. **30% threshold**: The fact that there IS a threshold suggests knowledge is distributed — you need enough signal to target the right patterns

**However, this paper is more optimistic about unlearning than #228:**
- #228 shows quantization recovers unlearned knowledge (21% → 83%)
- This paper shows unlearning is robust to input noise

**Reconciliation:**
- This paper tests robustness to **forget data quality**
- #228 tests robustness to **model compression**
- Both can be true: unlearning works on semantic patterns (this paper), but those patterns are stored in weight distributions that quantization can undo (#228)

### Key Insight for Thesis
The saliency finding supports the thesis: unlearning targets statistical patterns (high-saliency semantic tokens), not genuine understanding. If LLMs truly "understood" the content, you couldn't remove knowledge by targeting surface tokens.

---

## Relationship to Other Papers

### Supports (with nuance)
- **#228 (Unlearning Quantization)**: Both study unlearning robustness, but from different angles
- **#234 (Bayesian Scaling Laws)**: Both suggest knowledge is distributed in statistical patterns

### Complements
- **MUSE benchmark** (Shi et al.): Uses their evaluation setup
- **RMU** (Li et al.): Tests their unlearning method

### Tension With
- **#228**: This paper is more optimistic about unlearning effectiveness
- Resolution: Different threat models (input noise vs. model compression)

---

## REBUTTALS TO THIS PAPER

### Limitations (Authors Acknowledge)

1. Only tested two unlearning methods (RMU, NPO)
2. Limited to specific benchmarks (WMDP, MUSE)
3. Doesn't test adversarial perturbations (only natural noise)
4. Doesn't address post-unlearning attacks (quantization, fine-tuning)

### Potential Counter-Arguments

1. **#228's quantization attack**: Even if unlearning is robust to input noise, it may not survive model compression
2. **Adversarial perturbations**: Natural noise differs from worst-case attacks
3. **Semantic preservation assumption**: Requires perturbations to preserve meaning

### Why Findings Are Still Valuable

1. Real-world forget data IS often noisy — this matters for practical deployment
2. Shows unlearning algorithms target semantic patterns, not surface features
3. Establishes 30% masking threshold as practical guideline

---

## Key Quotes

> "We find that unlearning remains surprisingly robust to perturbations, provided that core semantic signals are preserved."

> "This suggests that unlearning algorithms are primarily guided by deep semantic cues rather than shallow lexical patterns."

> "Key semantic components that drive forgetting remain consistently influential despite substantial variation in surface form."

> "30% is likely the highest level of masking that does not significantly compromise unlearning performance."

---

## Implications for the Thesis

This paper provides **balanced evidence**:

**For the thesis:**
- Unlearning works by targeting statistical patterns (high-saliency tokens)
- Knowledge is distributed — you need enough semantic signal to target it
- Surface form doesn't matter — only statistical patterns do

**Against the thesis:**
- Unlearning CAN work (at least on input noise)
- Semantic robustness suggests some level of meaning extraction

**Reconciliation:**
The thesis doesn't claim unlearning is impossible — it claims knowledge is distributed and not cleanly deletable. This paper shows unlearning works on semantic patterns, which are themselves statistical. #228 shows those patterns can be recovered via quantization.

---

## Status
- [x] Read complete (full HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
