# Paper Analysis: Strong Reasoning Isn't Enough

## Metadata
- **arXiv ID**: 2601.19773
- **Title**: Strong Reasoning Isn't Enough: Evaluating Evidence Elicitation in Interactive Diagnosis
- **Authors**: Zhuohan Long, Zhijie Bao, Zhongyu Wei (Fudan University, Shanghai Innovation Institute)
- **Date**: 2026-01-27
- **Venue**: arXiv preprint

---

## Core Claims

1. **Strong diagnostic reasoning does NOT guarantee effective information collection** — models that perform well in static settings with full information fail to gather evidence effectively in interactive settings.

2. **Insufficient information collection is the primary bottleneck** limiting performance when moving from static to interactive evaluation.

3. **Diagnostic reasoning ability and evidence elicitation ability are partially decoupled** — some models (GPT-5) have high success rate but low information coverage; others (Qwen2.5 series) have high coverage but lower success rate.

4. **Model scaling primarily improves reasoning capacity rather than evidence elicitation ability** — within Qwen2.5 family, scaling from 3B to 72B improves SR with marginal gains in ICR.

5. **Medical fine-tuning can HURT interactive performance** — Meditron3-8B (fine-tuned from Llama-3.1-8B) shows larger performance degradation than its base model.

6. **ICR (Information Coverage Rate) is a valid measure of evidence-gathering quality** — successful diagnoses consistently exhibit higher ICR than failed ones.

---

## Methodology

### Evaluation Framework
- **Interactive consultation environment** with three roles:
  - Simulated Patient (maintains subjective evidence)
  - Simulated Reporter (returns objective examination results)
  - Doctor Agent (model under evaluation)
- **Maximum 16 interaction turns** per case
- **Atomic evidence representation** — minimal, self-contained clinical facts

### Metrics
- **Success Rate (SR)**: Diagnostic accuracy
- **Information Coverage Rate (ICR)**: |Ê ∩ E| / |E| — proportion of relevant evidence collected
- **Upper Bound (UB)**: SR with full information provided upfront (static setting)

### Models Tested (10 models)
- GPT-5, GPT-5-mini
- DeepSeek-v3.2
- GLM-4.6
- Qwen2.5-72B, Qwen2.5-32B, Qwen2.5-7B, Qwen2.5-3B
- Llama-3.1-8B-Instruct
- Meditron3-8B (medical fine-tuned)

### Datasets (EviMed-1K Benchmark)
| Dataset | Cases | Avg Patient Evidence | Avg Exam Evidence |
|---------|-------|---------------------|-------------------|
| AgentClinic-MedQA | 200 | 14.87 | 12.73 |
| Derm | 200 | 7.31 | 2.87 |
| DiagnosisArena | 200 | 8.04 | 12.82 |
| RareArena | 200 | 17.11 | 17.72 |
| ClinicalBench | 200 | 21.76 | 21.14 |

### Strategies Compared
1. **Upper Bound**: Static full-information (no interaction)
2. **Baseline**: Standard interactive agent
3. **ReAct**: Thought-Act cycle before each action
4. **SC (Summarized-Conversation)**: Separate collection from diagnosis
5. **REFINE**: Diagnostic verification feedback loop (proposed)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Average SR drop (static→interactive) | **~20%** | Across all models and datasets |
| GPT-5 RareArena degradation | 75% → 37% | **51% relative drop** |
| GPT-5-mini RareArena degradation | 68% → 15.5% | **77% relative drop** |
| GPT-5-mini DiagnosisArena degradation | 63% → 23% | **64% relative drop** |
| Meditron3-8B RareArena degradation | 25.5% → 2.5% | **90% relative drop** (worst) |
| GPT-5-mini vs DeepSeek-v3.2 paradox | Higher static, lower interactive | Strong reasoning ≠ good gathering |
| Qwen2.5 scaling effect on ICR | Marginal gains | 3B→72B improves SR, not ICR |
| ICR difference: success vs failure | Consistently higher | Successful cases have higher ICR |

### Key Table: Static vs Interactive Performance (Selected)

| Model | Dataset | Static UB | ICR | Interactive SR | Degradation |
|-------|---------|-----------|-----|----------------|-------------|
| GPT-5 | RareArena | 75.0% | 42.7% | 37.0% | -51% |
| GPT-5-mini | RareArena | 68.0% | 35.7% | 15.5% | -77% |
| GPT-5-mini | DiagnosisArena | 63.0% | 47.2% | 23.0% | -64% |
| Meditron3-8B | RareArena | 25.5% | 23.2% | 2.5% | -90% |
| Meditron3-8B | ClinicalBench | 42.5% | 23.4% | 20.0% | -53% |
| DeepSeek-v3.2 | ClinicalBench | 63.0% | 46.7% | 51.0% | -19% |

### Role-Aware Model Pairing Results

| Configuration | Avg ICR | Avg SR |
|---------------|---------|--------|
| Qwen2.5-7B alone | 46.0% | 26.6% |
| GPT-5-mini alone | 56.4% | 51.5% |
| Qwen→GPT (small collector, strong reasoner) | **63.9%** | **58.2%** |
| GPT→Qwen (strong collector, weak reasoner) | 53.0% | 27.1% |

---

## Relationship to Other Papers

### Supports
- **Paper 100 (Reasoning-Critical Neurons)**: Both show models "know" their capabilities early — ICR-SR decoupling suggests models don't engage different circuits for gathering vs reasoning
- **Paper 99 (Flexibility Trap)**: Both show LLMs fail when task structure differs from training (interactive vs static)
- **Paper 98 (Tokenizer Betrays)**: Surface-level processing — models trained on complete cases don't learn what evidence matters
- **Faith & Fate, OMEGA, Planning Gap**: Pattern matching on seen structures fails on novel interaction patterns

### Challenges
- None directly — this is novel evidence for the thesis

### Extends
- **AgentBench, WebArena**: Extends agent evaluation to medical domain with fine-grained evidence tracking

---

## REBUTTALS TO THIS PAPER

### Known Rebuttals
- None found (paper is very recent: 2026-01-27)

### Potential Counter-Arguments
1. **Simulation gap**: Interactive simulation may not match real clinical practice
2. **ICR may not equal clinical sufficiency**: Atomic coverage ≠ clinically sufficient information
3. **Domain-specific**: Results may not generalize beyond medical diagnosis

### Limitations (Authors Acknowledge)
1. "This setting may not match the distribution of real patient narratives, clinician behaviors, and institutional constraints"
2. "This abstraction omits graded severity, temporal evolution, and dependencies across findings"
3. "In practice, multiple evidence subsets can justify the same diagnosis"
4. "Higher atomic coverage may not always correspond to clinically sufficient information gathering"
5. "Clinical facts exhibit substantial semantic variability across documentation styles"

---

## Key Quotes

> "We find that **strong diagnostic reasoning does not guarantee effective information collection**, and this insufficiency acts as a primary bottleneck limiting performance in interactive settings."

> "This suggests that **diagnostic reasoning ability and evidence elicitation ability are partially decoupled**."

> "Within the Qwen2.5 family, **model scaling mainly improves SR while yielding marginal gains in ICR**, indicating scaling primarily enhances reasoning capacity rather than evidence elicitation ability."

> "GPT-5 models appear to possess stronger diagnostic reasoning capabilities, enabling them to achieve high performance **even with limited information**."

> "Although [Meditron3-8B] is **fine-tuned on clinical data based on Llama-3.1-8B**, it shows a **larger performance degradation** than its base model."

> "Models with larger degradation, such as GPT-5-mini and Meditron3-8B, also exhibit **relatively low ICR**. This suggests that **insufficient or inefficient information acquisition may be a key factor** limiting their diagnostic reasoning performance."

> "Across both datasets and all strategies, successful cases consistently exhibit **higher ICR than failed ones**. These observations indicate that **insufficient information coverage is commonly associated with diagnostic failure**."

---

## Relevance to Thesis

**STRONGLY SUPPORTS the thesis that LLM reasoning is pattern matching, not genuine reasoning.**

Key insight: Models trained on complete case descriptions learn to **match diagnostic patterns** but don't learn **what evidence is necessary** to establish those patterns.

This manifests as:
1. **High static performance with dramatic interactive collapse** — pattern matching works when pattern is complete
2. **Medical fine-tuning making the problem WORSE** — more pattern-fitted to complete cases
3. **Scaling improving reasoning SR but not evidence-gathering ICR** — bigger models = better pattern matchers, not better reasoners
4. **Models achieving correct diagnoses with incomplete evidence** — lucky pattern matching, not systematic reasoning
5. **Decoupled ICR-SR** — models can reason from complete info (pattern match) but can't identify what info is needed (genuine reasoning)

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
