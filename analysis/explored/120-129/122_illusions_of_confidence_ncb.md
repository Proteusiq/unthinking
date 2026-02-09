# Paper Analysis: Illusions of Confidence? Diagnosing LLM Truthfulness via Neighborhood Consistency

## Metadata
- **arXiv ID**: 2601.05905
- **Title**: Illusions of Confidence? Diagnosing LLM Truthfulness via Neighborhood Consistency
- **Authors**: Haoming Xu, Ningyuan Zhao, Yunzhi Yao, Weihong Xu, Hongru Wang, Xinle Deng, Shumin Deng, Jeff Z. Pan, Huajun Chen, Ningyu Zhang
- **Date**: January 2026
- **Venue**: arXiv preprint
- **Institutions**: Zhejiang University, University of Edinburgh, NUS

---

## Core Claims

1. **Self-consistency is insufficient for measuring true belief**: Even facts answered with perfect self-consistency (SC=1.0) can collapse under mild contextual interference

2. **Robust belief is structural, not point-wise**: Knowledge belief should be a coherent structural state across a conceptual neighborhood, not just isolated point-wise confidence

3. **NCB (Neighbor-Consistency Belief) is a better predictor of belief robustness**: High-NCB knowledge is substantially more stable than low-NCB knowledge under contextual interference

4. **Structured beliefs provide resilience against social and authoritative pressure**: Models with structured beliefs maintain accuracy under both peer pressure and authority bias attacks

5. **Structure-Aware Training (SAT) can reduce brittleness by ~30%**: Training with neighborhood-level invariance leads to more robust knowledge acquisition

6. **Model scaling does not resolve belief brittleness**: Larger models maintain the same robustness gap between High and Low NCB groups

---

## Methodology

### Dataset Construction
- **Neighbor-Enriched Dataset**: 2,000 samples across 4 domains (STEM, Arts & Culture, Social Sciences, Sports — 500 each)
- **Sources**: SimpleQA, HotpotQA, SciQ
- **Neighbor Facts (NFs)**: ~7.84 per target fact on average
- **Misleading Neighbor Facts (MNFs)**: ~4.88 per target fact

### Neighbor Types (Three Cognitive Dimensions)
1. **Entity Prerequisite (EP)**: Yes/No questions verifying attributes of the correct entity
2. **Logical Implication (LI)**: Yes/No questions testing logical consequences
3. **Thematic Association (TA)**: Multiple-choice questions discriminating the correct entity from distractors

### Stress-Testing Protocol (Inspired by Cognitive Psychology)
1. **Peer Quantity (Social Pressure)** — Inspired by Asch Conformity Experiments:
   - Scenario A (Conflict): Peers unanimously provide wrong answers
   - Scenario B (Misleading): Peers discuss MNFs to prime distractors

2. **Source Credibility (Authority Bias)** — Based on Hovland & Weiss (1951):
   - Low credibility: Media/Friends
   - Medium credibility: Blogs
   - High credibility: Academic Papers/Famous News

### Experimental Setup
- **Sampling**: 30 responses per target question, 10 per neighbor question at T=0.7
- **Infrastructure**: 8 NVIDIA A100 GPUs, vLLM engine, bfloat16 precision
- **Inference strategies tested**: Standard, Chain-of-Thought (CoT), Multi-turn Reflection

---

## Key Evidence

### Pilot Study: Self-Consistency Masks Brittleness

| Condition | Accuracy |
|-----------|----------|
| Baseline (SC=1.0 samples, no interference) | 100.0% |
| After contextual interference | **33.8%** |
| **Accuracy drop** | **66.2 pp** |

995 questions where model answered correctly with perfect self-consistency (SC=1.0) — after mild contextual pressure, accuracy collapsed to 33.8%.

### NCB Predicts Robustness Under Stress (35% percentile groups)

| Model | NCB Group | Base ACC | Quantity Stress Drop | Source Stress Drop |
|-------|-----------|----------|---------------------|-------------------|
| Qwen-2.5-32B | Low NCB | 99.6% | 25.7% | 20.5% |
| Qwen-2.5-32B | High NCB | 100.0% | **16.0%** | **12.8%** |
| Qwen3-30B | Low NCB | 99.4% | 28.8% | 24.3% |
| Qwen3-30B | High NCB | 100.0% | **17.6%** | **14.6%** |
| Qwen3-Thinking | Low NCB | 99.9% | 22.6% | 22.1% |
| Qwen3-Thinking | High NCB | 99.4% | **11.3%** | **12.3%** |
| OLMo-2-32B | Low NCB | 99.5% | 28.3% | 19.3% |
| OLMo-2-32B | High NCB | 100.0% | **18.7%** | **11.8%** |

**Key insight**: High-NCB samples show ~40-50% less accuracy drop than Low-NCB samples under stress.

### Interference Scaling Effects

- **Low NCB under Peer Conflict**: Degrades from 76% to 60% as opposing voices increase
- **High NCB under Peer Conflict**: Degrades from 90% to 80% (more stable)
- **Under unanimous misinformation**: Low NCB → 62% accuracy; High NCB → 81% accuracy

### Structure-Aware Training (SAT) Results

| Strategy | Base ACC | Quantity Stress | Source Stress | Average |
|----------|----------|-----------------|---------------|---------|
| Vanilla | 4.8% | 8.2% | 4.6% | 6.4% |
| Answer-Based Aug | 92.4% | 20.1% | 41.6% | 30.9% |
| Knowledge-Based Aug | 85.4% | 31.0% | 35.7% | 33.4% |
| **SAT (Ours)** | **93.0%** | **58.1%** | **63.0%** | **60.6%** |

**Improvement**: SAT reduces brittleness by ~30% compared to best baseline (60.6% vs 33.4% average stress test performance).

### Model Scaling Does NOT Help

Qwen2.5 series (1.5B to 72B) tested:
- Larger models maintain same NCB-robustness gap
- Scale does not resolve belief brittleness
- Even 72B models show similar vulnerability patterns

### Inference Strategies

- **CoT sometimes amplifies degradation**: Qwen-2.5 Low NCB: 25.7% → 31.6% drop
- **Reflection consistently helps**: OLMo2 Low NCB: 31.1% → 14.4% drop

---

## The NCB Metric

### Formula
```
S_NCB = p̂(Ê* = E* | q*) × ∏_{i=1}^{m} p̂(â_i = a_i | q_i)^{1/m}
```

Where:
- `p̂(Ê* = E* | q*)` = empirical correctness frequency for target question
- `p̂(â_i = a_i | q_i)` = empirical correctness frequency for neighbor fact i
- `m` = number of neighbor facts
- `1/m` exponent = geometric mean normalization

### Why NCB > Self-Consistency
1. SC captures only point-wise confidence (single question agreement)
2. NCB captures structural coherence across conceptual neighborhood
3. SC can be high even when beliefs are brittle (rote memorization)
4. High NCB correlates with actual robustness under stress

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis

This paper provides direct evidence that:

1. **LLMs lack genuine understanding**: Perfect self-consistency on a fact doesn't mean the model "knows" it — the knowledge is isolated, not integrated into a coherent belief structure

2. **Pattern matching vs. structured knowledge**: The distinction between Structured (S_struct) vs Unstructured (S_unstruct) belief states maps directly onto "genuine reasoning" vs "pattern matching"

3. **Sycophancy mechanism confirmed**: Models with low structural belief are MORE susceptible to peer pressure and authority bias — they have no internal anchor to resist social pressure

4. **Scaling doesn't help**: Larger models show the same brittleness patterns, suggesting the problem is architectural/training-based, not capacity-limited

---

## Relationship to Other Papers

### Supports
- **Paper 119 (2308.03958)**: Sycophancy Scales — this paper provides the MECHANISM: low-NCB beliefs are why models agree with 2+2=5
- **Paper 120 (2506.21561)**: Truth-Bias Sycophancy — explains WHY truth-bias exists: true statements have higher NCB neighborhoods
- **Paper 96 (2601.15436)**: Sycophancy is Not Uniform — NCB explains the variance in sycophantic behavior

### Extends
- **Paper 10 (2307.13702)**: Faithfulness in CoT — adds that CoT doesn't help (sometimes hurts) belief robustness
- **Paper 117 (2311.07590)**: Strategic Deception — explains WHY deception emerges: models with weak beliefs easily adopt alternative narratives

### Challenged By
- None directly — but SAT training suggests robustness IS trainable (potential path to improvement)

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found yet (paper is from January 2026).

### Potential Counter-Arguments
1. **NCB may just measure training frequency**: Papers that argue retrieval correlates with co-occurrence might claim NCB just measures how often concepts appear together in training data
2. **Stress tests are artificial**: Real-world deployment may not have such adversarial peer pressure

### Limitations (Authors Acknowledge)
1. Limited to three neighbor relation types (EP, LI, TA)
2. Only evaluates time-invariant factual knowledge
3. NCB lacks validation against human judgments
4. Computational overhead for constructing belief neighborhoods
5. Dual-use risk: protocols could enable misinformation attacks

---

## Key Quotes

> "Even facts answered with perfect self-consistency can rapidly collapse under mild contextual interference."

> "Point-wise confidence is superficial, failing to reflect true belief state."

> "Robust belief is a structural property, highlighting the necessity of structure-aware evaluation and training for trustworthy LLMs."

> "The 'Latitude of Rejection' phenomenon: Excessive interference can paradoxically drive models back to parametric knowledge."

---

## Relevant Cited Papers (2023+)

### Directly Relevant to LLM Reasoning/Sycophancy
- Sharma et al. (2024): Towards understanding sycophancy — ICLR
- Wei et al. (2025): Simple synthetic data reduces sycophancy
- Weng et al. (2025): Conformity of LLMs — ICLR
- Suzgun et al. (2025): LMs cannot reliably distinguish belief from knowledge — Nature MI
- Berglund et al. (2024): The Reversal Curse — ICLR
- Tan et al. (2025): Too consistent to detect: Self-consistent errors — EMNLP
- Fastowski et al. (2025): From confidence to collapse in factual robustness — EMNLP

### Potentially Relevant for Queue
- **2405.00451** (Weng et al. 2025): "Do as we do, not as you think: The conformity of LLMs" — ICLR
- **Suzgun et al. 2025**: "Language models cannot reliably distinguish belief from knowledge and fact" — Nature Machine Intelligence

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated
