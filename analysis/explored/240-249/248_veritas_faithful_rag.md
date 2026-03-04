# Paper Analysis: Beyond Correctness: Rewarding Faithful Reasoning in RAG

## Metadata
- **arXiv ID**: 2510.13272
- **Title**: Beyond Correctness: Rewarding Faithful Reasoning in Retrieval-Augmented Generation
- **Authors**: Zhichao Xu, Zongyu Wu, et al. (AWS AI Fundamental Research, Penn State, Yale)
- **Date**: October 2025 (v2 updated February 2026)
- **Venue**: arXiv

---

## Core Claims

1. **Outcome-based RL produces unfaithful reasoning** — Search agents trained with RLVR (outcome-only rewards) achieve high accuracy but generate CoT that doesn't faithfully integrate retrieved evidence
2. **Three faithfulness dimensions** — Information-Think (does thinking use evidence?), Think-Search (are searches justified?), Think-Answer (is answer grounded in thinking?)
3. **VERITAS improves faithfulness** — Adding process-based faithfulness rewards to RL improves Information-Think by ~14% and Think-Answer by ~7.7% while maintaining accuracy
4. **Accuracy ≠ Faithfulness** — Models can get correct answers without faithful reasoning traces

---

## Methodology

**Evaluation Framework**:
- **Information-Think Faithfulness**: LLM-as-Judge (Claude) evaluates if thinking integrates retrieved info
- **Think-Search Faithfulness**: NLI model (T5-XXL) checks entailment from thought to search query
- **Think-Answer Faithfulness**: Substring exact-match checks answer grounding in final thought

**Models Evaluated**:
- Search-R1-7B-PPO (Jin et al., 2025)
- ReSearch-7B (Chen et al., 2025)
- DeSA-7B (Wang et al., 2025)

**Training Method (VERITAS)**:
- Combine outcome reward (EM) with process rewards (faithfulness)
- Distill Claude judgments into Qwen2.5-14B reward model
- Curriculum learning: outcome-only first, then add faithfulness rewards

**Datasets**: NQ, TriviaQA, PopQA, HotpotQA, 2WikiMultiHop, Musique, Bamboogle

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Search-R1 Information-Think faithfulness | 56.4% | On HotpotQA (far from perfect) |
| DeSA-7B Information-Think faithfulness | 16.0% | On HotpotQA (very low despite 42.4% EM) |
| Think-Search faithfulness (all models) | >80% | Already high, no intervention needed |
| VERITAS Info-Think improvement | +14% | Over Search-R1 baseline |
| VERITAS Think-Answer improvement | +7.7% | Over Search-R1 baseline |
| VERITAS task accuracy | +1.6% avg | Improves faithfulness AND accuracy |
| Format reward breaks faithfulness | 24.1% vs 68.5% | Adding format reward hurts Info-Think |
| Distilled RM agreement with Claude | 89.9% | High agreement enables scalable training |

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)** — Both find CoT unfaithful; this extends to RAG/agentic settings
- **CoT In The Wild (2503.08679)** — Natural prompts unfaithful; RAG agents show same pattern
- **Faithfulness Decay (2602.11201)** — Different setting (RAG vs pure reasoning) but same conclusion
- **No Free Lunch (2506.17219)** — Format vs reasoning tradeoff confirmed (format reward hurts faithfulness)

### Challenges
- None directly — paper proposes a SOLUTION (VERITAS) rather than only critiquing

### Extends
- **FRIT Faithfulness Intervention (2509.13334)** — Extends causal intervention to RL reward design
- **Measuring CoT Monitorability (2510.27378)** — Adds RAG-specific faithfulness dimensions

---

## REBUTTALS

### Known Rebuttals
None found yet — paper is recent

### Potential Counter-Arguments
1. **LLM-as-Judge circularity** — Using LLMs to judge LLM faithfulness may have systematic biases
2. **Distillation gap** — Reward model distilled from Claude may not capture full judgment quality
3. **Task-specific results** — Only QA benchmarks tested; may not generalize to other RAG applications
4. **Think-Search already high** — High baseline suggests models already learn search alignment

### Limitations (Authors Acknowledge)
- Only evaluated on QA benchmarks (short-form answers)
- Distilled RM may have distribution shift from training data
- NLI model may undercount implicitly motivated searches
- Curriculum learning hyperparameters (T1, T2) not fully ablated

---

## Key Quotes

> "Our evaluations reveal that canonical search agents trained via Reinforcement Learning from Verifiable Reward (RLVR) — including Search-R1 and ReSearch — have significant room for improvement in this regard."

> "A modified reward shaping by adding a format reward may improve model performance, but in return potentially breaks the model's reasoning consistency."

> "Task performance does not directly translate to high faithfulness scores."

> "Models trained with VERITAS not only significantly improve reasoning faithfulness, but also achieves better task performance compared to the baselines trained against pure outcome-based reward."

---

## Significance for Thesis

**SUPPORTS** the thesis that LLMs are pattern matchers:

1. **Outcome-based RL doesn't create faithful reasoning** — Models learn to get correct answers without actually integrating evidence = pattern matching to answers
2. **Format rewards hurt faithfulness** — Optimizing for format (pattern) degrades actual reasoning
3. **High accuracy with low faithfulness** — DeSA-7B: 42.4% EM but only 16% Info-Think faithfulness = correct answers without reasoning

However, this is **balanced** evidence:
- VERITAS shows faithfulness CAN be improved via training
- Process supervision works — suggests reasoning is trainable, not just pattern matching
- But improvement requires explicit faithfulness rewards, not emergent

**Overall stance: SUPPORTS** (unfaithful baseline is the natural state; faithfulness requires intervention)

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
