# Paper Analysis: Memorization vs. Reasoning: Updating LLMs with New Knowledge (KUP)

## Metadata
- **arXiv ID**: 2504.12523
- **Title**: Memorization vs. Reasoning: Updating LLMs with New Knowledge
- **Authors**: Aochong Oliver Li, Tanya Goyal (Cornell University)
- **Date**: April 2025
- **Venue**: arXiv preprint

---

## Core Claims

1. **LLMs can memorize updates but catastrophically fail to reason over them**: Best CPT models achieve <2% on indirect probing (reasoning)
2. **Direct probing ≠ reasoning**: Models can select correct update in MCQ but fail when reasoning is required
3. **Memory Conditioned Training (MCT)** improves memorization by up to 25.4% but still fails at reasoning
4. **All methods fail at indirect probing**: <2% accuracy for ALL continued pre-training approaches

---

## Methodology

### Knowledge Update Playground (KUP)
- **1000 entities** with knowledge update pairs (f_old, f_new)
- **~55M token** training corpus with:
  - 5 evidence articles per update (3.3M tokens)
  - Auxiliary real news articles (52.4M tokens)
- **6260 test questions** across two settings

### Two Evaluation Settings

**1. Direct Probing (Memorization)**
- MCQ: Select f_new among distractors or vs f_old
- Free-form: Answer questions about update details

**2. Indirect Probing (Reasoning)**
- Requires deductive reasoning over memorized facts
- Example: If "H&M exited Russia" → shouldn't recommend H&M stores in Moscow

### Models Tested
- LLaMA-3.1-8B
- Mistral-7B-v0.3

---

## Key Evidence

### 1. ALL Methods Catastrophically Fail at Indirect Probing (Reasoning)

| Method | Direct Probing (MCQ) | Indirect Probing |
|--------|---------------------|------------------|
| Standard CPT | ~70% | **<2%** |
| CPT + Rephrase | ~75% | **<2%** |
| MCT (theirs) | ~80% | **<2%** |
| RAG Oracle | ~95% | ~85% |

> "All continued pre-trained (CPT) LLMs **fail catastrophically at indirect probing**"

> "Even the best learning methods catastrophically fails in the indirect probing setting, reporting **<2% accuracy for all CPT approaches**"

### 2. Memorization ≠ Reasoning

The paper's key insight:

> "An LLM might memorize that H&M exited Russia, yet **still erroneously recommend shopping from H&M in Moscow when probed indirectly**"

This is the memorization vs. reasoning gap:
- **Can retrieve fact** (direct probing ~70-80%)
- **Cannot apply fact** (indirect probing <2%)

### 3. Free-Form Probing Shows High-Level vs Low-Level Gap

| Detail Type | Accuracy |
|-------------|----------|
| Trigger events | Higher |
| Downstream impacts | Higher |
| Low-level details (who, where, when) | **Lower** |

> "Surprisingly, continue pre-trained LLMs are **better at memorizing high-level (e.g. triggers, impacts) than low-level details** (e.g. where, who)"

### 4. CoT Helps MCT (But Still Fails at Reasoning)

| Method | Without CoT | With CoT |
|--------|-------------|----------|
| Standard CPT | 62.4% | 69.3% |
| MCT | 80.0% | 84.6% |

But CoT doesn't help indirect probing — still <2%.

---

## Key Quotes

### On the fundamental failure
> "All continued pre-trained (CPT) LLMs **fail catastrophically at indirect probing**"

### On what's actually learned
> "Our results show that while our proposed approach MCT is superior to CPT baselines, **all methods primarily learn to memorize updates and fail to reason over their implications**"

### On the memorization-reasoning gap
> "An LLM might memorize that H&M exited Russia, yet **still erroneously recommend shopping from H&M in Moscow** when probed indirectly"

### On benchmark difficulty
> "KUP benchmark is highly challenging, with the **best CPT models achieving <2% in indirect probing setting (reasoning)**"

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show LLMs fail to apply learned patterns to novel reasoning
- **Compositional-ARC (2504.01445)**: Same pattern — can pattern match, can't compose/reason
- **Planning Gap (2601.14456)**: Similar ID/OOD gap — high on direct, zero on generalization
- **GSM-Symbolic (2410.05229)**: Both show memorization doesn't transfer to reasoning

### Extends
- **Prior knowledge update benchmarks**: Goes beyond entity substitution to realistic updates
- **Knowledge conflict literature**: Adds reasoning evaluation dimension

### Provides Framework For
- **Distinguishing memorization from reasoning**: Direct vs indirect probing
- **Why LLMs seem to "know" things but can't use them**: Retrieval ≠ reasoning

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (April 2025) — no direct rebuttals found

### Potential Counter-Arguments

1. **Indirect probing may be unfairly hard**: Requires multi-hop inference
2. **Small training corpus**: 55M tokens may be insufficient
3. **Fictitious updates**: May not generalize to real-world updates

### Limitations (Authors Acknowledge)

> "We only experimented with LLaMA and Mistral... future work should benchmark a wider range of models"

---

## Relevance to Thesis

**STRONGLY SUPPORTS** — Critical evidence for pattern matching thesis.

### Key Insights for Synthesis

1. **The direct/indirect probing gap is smoking gun evidence**:
   - Direct probing = pattern matching (retrieve what was seen)
   - Indirect probing = reasoning (apply knowledge to novel situation)
   - 70-80% vs <2% = LLMs pattern match, don't reason

2. **Memorization ≠ understanding**:
   - Models can SELECT correct answer when presented as option
   - Models CANNOT DERIVE implications of that knowledge
   - This is exactly what pattern matching would predict

3. **<2% across ALL methods is devastating**:
   - Standard CPT: <2%
   - CPT + Rephrase: <2%
   - MCT (their best): <2%
   - Training approach doesn't fix fundamental limitation

4. **Connects to other papers**:
   - Like Compositional-ARC: primitives succeed, composition fails
   - Like Planning Gap: direct knowledge works, generalization fails
   - Like GSM-Symbolic: memorized patterns don't transfer

5. **The H&M example is perfect for thesis**:
   - "H&M exited Russia" → model can recall this
   - "Where to shop in Moscow?" → model recommends H&M
   - Knowledge is stored but not integrated into reasoning

### Direct Quote for Thesis

> "All methods primarily learn to **memorize updates and fail to reason over their implications**"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
