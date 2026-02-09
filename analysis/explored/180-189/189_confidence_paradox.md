# Paper Analysis: The Confidence Paradox: Can LLM Know When It's Wrong?

## Metadata
- **arXiv ID**: 2506.23464
- **Title**: The Confidence Paradox: Can LLM Know When It's Wrong?
- **Authors**: Sahil Tripathi, Md Tabrez Nafis, Imran Hussain, Jiechao Gao
- **Date**: June 2025
- **Venue**: IJCNLP-AACL 2025 (Main)

---

## Core Claims

1. **DocVQA models produce overconfident incorrect answers**, especially under uncertainty and ambiguity
2. **HonestVQA framework** aligns model confidence with correctness using weighted loss and contrastive learning
3. **Two novel metrics introduced**: Honesty Score (H-Score) measures confidence-accuracy alignment; Ethical Confidence Index (ECI) evaluates whether high-confidence answers are warranted
4. **HonestVQA improves accuracy by 3-4%** while reducing overconfidence (H-Score drops 35%, ECI drops 40%)
5. **Framework is model-agnostic** - works as wrapper on LayoutLMv3, UDOP, DONUT

---

## Methodology

### Framework Components
1. **Uncertainty Quantification Module**: Computes softmax entropy and max-confidence score
2. **Confidence-Accuracy Alignment Module**: Weighted loss penalizing high-confidence incorrect predictions
3. **Contrastive Ethical Enforcement Module**: Separates ethically aligned from misleading answers using triplet loss
4. **Training Module**: Combines alignment and contrastive objectives

### Models Tested
- LayoutLMv3 (base)
- UDOP (base)
- DONUT (base)
- Each with and without HonestVQA wrapper

### Datasets
- SpDocVQA (multilingual scanned documents)
- InfographicsVQA (visually dense infographics)
- SROIE (receipt extraction - financial implications)

### Metrics
- **H-Score**: 1 - E[|Confidence - Accuracy|] — measures calibration
- **ECI**: P(C_correct > C_incorrect) — discriminative power between correct/incorrect

---

## Key Evidence

### Performance Improvement with HonestVQA

| Model | Dataset | Base Acc | +HonestVQA | Improvement |
|-------|---------|----------|------------|-------------|
| LayoutLMv3 | SpDocVQA | 72.3% | 75.9% | +3.6% |
| LayoutLMv3 | InfographicsVQA | 65.4% | 69.7% | +4.3% |
| UDOP | SpDocVQA | 69.7% | 73.2% | +3.5% |
| DONUT | SROIE | 69.0% | 72.2% | +3.2% |

### Calibration Improvement (Lower is Better)

| Model | Dataset | Base H-Score | +HonestVQA | Reduction |
|-------|---------|--------------|------------|-----------|
| LayoutLMv3 | SpDocVQA | 0.185 | 0.113 | **-39%** |
| LayoutLMv3 | SpDocVQA ECI | 0.210 | 0.132 | **-37%** |
| UDOP | InfographicsVQA | 0.203 | 0.132 | **-35%** |
| DONUT | SROIE | 0.192 | 0.122 | **-36%** |

### Cross-Domain Generalization

| Train → Test | Accuracy | F1 |
|--------------|----------|-----|
| InfographicsVQA → SpDocVQA | 78.9% | 76.1% |
| SpDocVQA → InfographicsVQA | 74.2% | 71.8% |
| SROIE → SpDocVQA | 75.0% | 72.3% |

### Multimodal Consistency (IoU Visual-Text Alignment)

| Model | SpDocVQA IoU | Hallucination Acc |
|-------|--------------|-------------------|
| LayoutLMv3 (base) | 58.3% | 71.2% |
| DONUT (base) | 60.7% | 73.0% |
| HonestVQA | **69.1%** | **78.5%** |

### Ablation Study

| Configuration | SpDocVQA Acc | H-Score |
|---------------|--------------|---------|
| Full HonestVQA | 75.9% | 0.113 |
| No Alignment Loss | 72.1% | 0.172 |
| No Contrastive Loss | 73.0% | 0.160 |

---

## Relationship to Other Papers

### Supports
- **Hallucination Inevitable** (Paper 165): Both show models produce confidently wrong answers
- **Illusions of Confidence** (Paper 122): Both study confidence-accuracy misalignment
- **Neighborhood Consistency** (Paper 122): Related calibration concerns

### Extends
- **Temperature scaling** literature: HonestVQA goes beyond post-hoc calibration
- **Selective prediction** frameworks: Adds contrastive learning for ethical boundaries

### Challenges
- None directly - this is a solution paper, not a critique

### Challenged By
- None identified

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct arXiv rebuttals found. Paper is recent (June 2025, accepted IJCNLP-AACL 2025).

### Potential Counter-Arguments
1. **DocVQA-specific**: Results may not generalize to text-only LLMs or other multimodal tasks
2. **Computational overhead**: 6-20% slower inference may be prohibitive for some applications
3. **Does not eliminate hallucinations**: Authors explicitly acknowledge this limitation

### Limitations (Authors Acknowledge)
1. **Domain shift sensitivity**: Performance affected by visually divergent datasets
2. **Computational overhead**: Additional calibration modules add latency (119.6ms vs 98-112ms baseline)
3. **Dataset dependency**: Limited to specific annotated datasets
4. **Not hallucination-free**: Framework mitigates but doesn't eliminate errors
5. **Requires human-in-loop**: For critical applications, human verification still needed

---

## Key Quotes

> "Document Visual Question Answering (DocVQA) models often produce overconfident or ethically misaligned responses, especially under uncertainty."

> "Existing models like LayoutLMv3, UDOP, and DONUT focus on accuracy but lack ethical calibration."

> "HonestVQA improves accuracy and F1 by up to 4.3% across SpDocVQA, InfographicsVQA, and SROIE datasets, while reducing overconfidence."

> "We acknowledge the risk that no model can be entirely free of errors or biases, especially when applied across diverse real-world scenarios."

---

## Assessment

### Relevance to Thesis
**BALANCED** - This paper addresses a problem (overconfident wrong answers) that supports the thesis, but proposes a mitigation framework rather than investigating root causes.

### Key Evidence for Thesis
1. **Documents the overconfidence problem**: Base models have H-Score 0.185-0.203, meaning ~20% confidence-accuracy gap
2. **Shows models don't "know" when wrong**: Need explicit training to align confidence with correctness
3. **Improvement requires external intervention**: HonestVQA framework needed to fix the problem
4. **Cross-domain fragility**: 4-6% performance drops on domain transfer

### Why Balanced (Not Strongly Supports)
- Paper focuses on solution (calibration) not diagnosis (why overconfidence exists)
- Does not directly test reasoning vs pattern matching
- DocVQA is a narrow domain (visual documents)
- Improvement shows calibration IS possible with proper training

### Implications for Thesis
The paper indirectly supports the thesis by showing:
- Models lack intrinsic self-knowledge about correctness
- Confidence scores don't reflect actual competence
- External training signals needed to calibrate behavior
- This aligns with "pattern matching without understanding" - a true reasoner would know when uncertain

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
