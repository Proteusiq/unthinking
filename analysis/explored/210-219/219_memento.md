# Paper Analysis: Memento: Fine-tuning LLM Agents without Fine-tuning LLMs

## Metadata
- **arXiv ID**: 2508.16153
- **Title**: Memento: Fine-tuning LLM Agents without Fine-tuning LLMs
- **Authors**: Huichi Zhou, Yihang Chen, Siyuan Guo, et al. (UCL AI Centre, Huawei Noah's Ark Lab)
- **Date**: August 2025
- **Venue**: arXiv preprint

---

## Core Claims
1. LLM agents can learn continuously without fine-tuning LLM weights via external memory and case-based reasoning (CBR)
2. Memory-augmented MDP formalization enables adaptive behavior through episodic case banks
3. Case-based reasoning provides continual learning by storing and retrieving past trajectories
4. External scaffolding (memory + tools) compensates for LLM limitations in novel situations

---

## Methodology

### Framework
- **Memory-augmented MDP (M-MDP)**: Tuple ⟨S, A, P, R, γ, M⟩ where M is memory space
- **Planner-Executor Architecture**: GPT-4.1 planner + o3/o4-mini executor
- **Case Bank**: Stores (state, action, reward) tuples from past trajectories
- **Q-learning for retrieval**: Soft Q-learning learns optimal case selection policy

### Memory Variants
1. **Non-parametric**: Simple cosine similarity retrieval (TopK nearest cases)
2. **Parametric**: Neural Q-function trained via cross-entropy to predict case utility

### Benchmarks
1. **GAIA**: Long-horizon tool use (450 questions, 3 difficulty levels)
2. **DeepResearcher**: Real-time web research (7 QA datasets)
3. **SimpleQA**: 4,330 fact-seeking questions
4. **HLE (Humanity's Last Exam)**: 2,500 expert-level academic questions

---

## Key Evidence

### GAIA Results

| Set | Pass@3 | Level 1 | Level 2 | Level 3 |
|-----|--------|---------|---------|---------|
| Validation | **87.88%** | 96.23% | 90.70% | 61.54% |
| Test | **79.40%** | 90.32% | 75.47% | 71.43% |

- **Top-1 on GAIA validation** (as of June 2025)
- Outperforms: OpenAI DeepResearch (67.40%), Manus (73.30%), OWL (69.09%)

### DeepResearcher Results

| Metric | Memento | DeepResearcher (training-based) | CoT+RAG |
|--------|---------|--------------------------------|---------|
| Avg F1 | **66.6%** | 51.8% | 37.7% |
| Avg PM | **80.4%** | 60.5% | 43.2% |

- Nearly doubles CoT+RAG baseline F1 (+28.9 pp)
- Beats training-based method by +14.8 F1, +19.9 PM

### Other Benchmarks
- **SimpleQA**: 95.0% PM (vs WebSailor 93.5%)
- **HLE**: 24.4% PM (within 0.92pp of GPT-5)

### Ablation: Memory Contribution (CBR gains)

| Benchmark | F1/PM Gain from CBR |
|-----------|---------------------|
| HLE | +4.5 / +7.0 |
| SimpleQA | +3.7 / +5.3 |
| DeepResearcher | +6.7 / +8.2 |

### OOD Generalization
- **CBR adds +4.7% to +9.6%** absolute points on out-of-distribution tasks

### Counter-intuitive Finding
- Fast planner (GPT-4.1) outperforms slow deliberative planner (o3) by ~8%
- o3 "often either answers directly – skipping plan generation – or produces overly verbose plans"

---

## Relationship to Other Papers

### Supports
- **2507.16929** (Thinking Isn't Illusion): Both show external scaffolding compensates for LLM limitations
- **2410.05229** (GSM-Symbolic): Both demonstrate LLMs need external structure; Memento uses case retrieval, GSM-Symbolic shows fragility without it

### Extends
- **2305.11206** (LIMA): Extends SAH insight that alignment is shallow; Memento shows even "learning" can be externalized

### Mechanism Relevance
- Paper keeps LLM weights frozen; all "learning" happens via case bank updates
- Similarity-based retrieval is pattern matching by definition
- No claim of abstract rule learning — cases stored and retrieved as-is

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found in the corpus.

### Potential Counter-Arguments
1. **Not testing LLM reasoning**: The paper tests agentic performance, not whether LLMs can reason. GAIA success could reflect scaffolding quality, not LLM capabilities.
2. **o3 as executor still required**: Despite externalized memory, strong reasoning models (o3) as executor still outperform weaker models.
3. **Training data contamination**: Authors note performance drops on DeepResearcher online mode, suggesting benchmark contamination.

### Limitations (Authors Acknowledge)
1. Level 3 tasks remain challenging (61.54% validation, 71.43% test)
2. Case bank saturates quickly with ~3k training data
3. Fast planners outperform deliberative planners (counter-intuitive)
4. Input token costs scale sharply (121k Level 3 vs 26k Level 1)

---

## Key Quotes

> "Existing approaches are often either rigid, relying on static, handcrafted reflection workflows, or computationally intensive, requiring gradient updates of LLM model parameters. In contrast, our method enables low-cost continual adaptation via memory-based online reinforcement learning."

> "How can we build LLM agents that learn continuously from a changing environment without the prohibitive cost of fine-tuning the underlying LLMs?"

> "Inspired by human memory mechanisms... humans' performance steadily improves because each experience is (i) encoded as an episodic trace, (ii) distilled into abstract rules during sleep-dependent consolidation, (iii) selectively reinforced by dopamine-driven credit assignment, and (iv) retrieved through case- or analogy-based reasoning when similar problems arise."

---

## Thesis Relevance

**Stance**: Balanced

**Relevance**: This paper demonstrates that external scaffolding (memory + tools + case retrieval) can achieve SOTA on complex reasoning benchmarks without any LLM fine-tuning. The core mechanism — cosine similarity retrieval of past cases — is pattern matching by definition.

**Key insight**: Memento succeeds BECAUSE of LLM limitations, not despite them. If LLMs could genuinely reason and generalize from experience internally, external case banks wouldn't improve OOD performance by 4.7-9.6%. The need for explicit memory storage suggests LLMs cannot abstract reasoning patterns themselves.

**However**: The paper doesn't directly claim LLMs lack reasoning. It bypasses the question by keeping LLMs frozen. Performance still depends on strong base LLMs (o3 executor). This is evidence for the scaffolding hypothesis — that reasoning-like behavior emerges from external structure around pattern-matching cores — but not direct evidence against LLM reasoning capabilities per se.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
