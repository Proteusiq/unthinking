# Paper Analysis: FRIT — Using Causal Importance to Improve CoT Faithfulness

## Metadata
- **arXiv ID**: 2509.13334
- **Title**: FRIT: Using Causal Importance to Improve Chain-of-Thought Faithfulness
- **Authors**: Anand Swaroop et al. (Algoverse AI Research)
- **Date**: September 2025
- **Venue**: Foundations of Reasoning in Language Models Workshop

---

## Core Claims

1. **Causal importance can be measured** via intervention and answer change detection
2. **Baseline CoT faithfulness is LOW** — most steps don't influence the answer
3. **DPO on faithful/unfaithful pairs improves faithfulness** without explicit accuracy training
4. **Accuracy improves as a byproduct** of greater faithfulness — emergent property
5. **First scalable, supervision-free method** for training more faithful reasoning

---

## Methodology

### Core Definitions
- **Causally Important Step**: Intervening on it changes the model's final answer
- **Causally Unimportant Step**: Intervening does NOT change the final answer

### Three-Stage Pipeline

**Stage 1: Intervention**
1. Replace a CoT step with unrelated but stylistically similar fact
2. Use embedding similarity to find semantically close but unrelated facts
3. Rewrite to match original writing style (17-shot prompt)

**Stage 2: Causal Importance Test**
1. Intervene on step i → create s'_i
2. Generate continuation from partial trace
3. If new answer ≠ original answer → step is causally important

**Stage 3: Augmentation (Creating Faithful Traces)**
1. For each step: test if causally important
2. If not important: delete and regenerate
3. Repeat until all steps influence answer

### Training Protocol
- **Method**: Direct Preference Optimization (DPO)
- **Key insight**: Both faithful and unfaithful traces have SAME final answer
- **Model learns reasoning quality, not answer correctness**
- **Iterations**: 3 DPO epochs
- **Samples**: 480 prompts per iteration (1,440 total)

---

## Key Evidence

### Baseline CoT Faithfulness is Shockingly Low

| Model | Dataset | CoT Faithfulness |
|-------|---------|------------------|
| Qwen3-8B | GSM8K | **32.9%** |
| Mistral-7B | GSM8K | 63.2% |
| Mistral-7B | SVAMP | 43.9% |

**Critical Finding**: More than half of reasoning steps don't influence the answer!

### Traditional Faithfulness (Lanham et al.) is Even Lower

| Model | Dataset | Traditional Faithfulness |
|-------|---------|-------------------------|
| Qwen3-8B | GSM8K | **8.9%** |
| Mistral-7B | GSM8K | 24.1% |

### FRIT Improves Both Faithfulness and Accuracy

**Mistral-7B:**
| Dataset | Accuracy (CoT → FRIT) | Faithfulness (CoT → FRIT) |
|---------|----------------------|---------------------------|
| GSM8K | 35.0% → **42.6%** (+7.6pp) | 63.2% → **66.6%** (+3.4pp) |
| SVAMP | 82.0% → 82.2% (+0.2pp) | 43.9% → **45.4%** (+1.5pp) |
| StrategyQA | 27.4% → **29.8%** (+2.4pp) | 83.9% → **84.7%** (+0.8pp) |

**Qwen3-8B:**
| Dataset | Accuracy (CoT → FRIT) | Faithfulness (CoT → FRIT) |
|---------|----------------------|---------------------------|
| GSM8K | 91.4% → **96.0%** (+4.6pp) | 32.9% → 33.6% (+0.7pp) |
| StrategyQA | 44.0% → **50.0%** (+6.0pp) | 39.6% → **41.1%** (+1.5pp) |

### Key Insight: Accuracy is Emergent

- DPO pairs have SAME final answer (faithful chosen, unfaithful rejected)
- Model is NOT explicitly trained for accuracy
- Yet accuracy increases significantly (+4.6 to +7.6pp)
- **Conclusion**: Accuracy emerges from better causal consistency

---

## Critical Assessment

### What This Paper Shows

1. **CoT steps are mostly decorative** — 30-60% unfaithful
2. **Faithfulness can be trained** — DPO on causal pairs works
3. **Accuracy is linked to faithfulness** — emergent improvement
4. **Intervention-based testing works** — identifies causal steps

### Relevance to Thesis

**BALANCED — Shows unfaithfulness is pervasive, but offers improvement method**

**Supports thesis:**
- Baseline faithfulness is shockingly low (32.9% for Qwen GSM8K)
- Most CoT steps are decorative, not causal
- "Traditional" faithfulness (8.9%) even worse

**Nuances thesis:**
- Faithfulness CAN be improved with targeted training
- Accuracy improves as a byproduct of faithfulness
- Method is scalable and automated

---

## Relationship to Other Papers

### Supports
- **Measuring Faithfulness (2307.13702)**: Confirms low baseline faithfulness; extends with intervention method
- **Reasoning Models Don't Say (2505.05410)**: Both find 25-60% unfaithfulness rates
- **FaithCoT-Bench (2510.04040)**: Both show pervasive unfaithfulness

### Extends
- **Lanham et al. (2023)**: Traditional faithfulness is even lower (8.9%); FRIT offers improvement
- **FRODO (Paul et al.)**: FRIT is automated (no human supervision)

### Provides Evidence For
- **Why CoT helps accuracy**: Faithful CoT may be the mechanism
- **Faithfulness-accuracy link**: Training for one improves the other

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper)

### Potential Counter-Arguments

1. **Computational cost** — 10-24 hours on 4 GPUs
2. **Faithfulness drift** — Labels may become stale as model updates
3. **Limited gains on strong models** — Qwen shows smaller improvements
4. **High variance** — Some metrics have ±5.0% error bars

### Limitations (Authors Acknowledge)
- Computational expense (intervention + regeneration)
- Faithfulness drift during training
- Limited gains on already-strong models (Qwen)
- High variance on some measurements

---

## Key Quotes

> "More than half of reasoning steps don't actually influence the answer."

> "Accuracy is an emergent property of greater CoT faithfulness."

> "The model is NOT explicitly trained for accuracy. Yet accuracy increases significantly."

---

## Relevance to Thesis

**BALANCED — Documents unfaithfulness but offers training remedy**

This paper shows:
1. ✓ Baseline CoT faithfulness is low (32.9-63.2%)
2. ✓ Traditional faithfulness is even lower (8.9-24.1%)
3. ✓ Most CoT steps are decorative, not causal
4. ~ But: faithfulness can be improved with training
5. ~ But: accuracy emerges from faithfulness improvement

**Key insight**: The paper confirms CoT unfaithfulness is pervasive but shows it's addressable. The emergent accuracy-faithfulness link suggests genuine reasoning may be happening when CoT is faithful — this is evidence that COULD support genuine reasoning, contingent on having faithful CoT.

---

## Status
- [x] Read complete (HTML version via Task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: BALANCED (confirms low baseline faithfulness; but offers training method; accuracy-faithfulness link is interesting)
