# Paper Analysis: Grokked Transformers are Implicit Reasoners

## Metadata
- **arXiv ID**: 2405.15071
- **Title**: Grokked Transformers are Implicit Reasoners: A Mechanistic Journey to the Edge of Generalization
- **Authors**: Boshi Wang, Xiang Yue, Yu Su, Huan Sun
- **Date**: May 2024
- **Venue**: NeurIPS 2024
- **Institution**: Ohio State University, Carnegie Mellon University

---

## Core Claims

1. **Transformers CAN learn implicit reasoning, but ONLY through grokking** — extended training far beyond overfitting is required
2. **Composition vs Comparison divergence** — OOD generalization fails for composition but succeeds for comparison
3. **Data distribution > Data size** — the ratio of inferred/atomic facts (not absolute size) determines grokking speed
4. **Mechanistic explanation** — the circuit configuration explains why composition fails OOD (no cross-layer memory sharing)
5. **Parametric memory can outperform non-parametric** — grokked transformers beat GPT-4-Turbo on complex reasoning tasks

---

## Methodology

### Experimental Setup
- **Model**: GPT-2 style decoder (8 layers, 768 hidden, 12 heads)
- **Tasks**: 
  - Composition (two-hop reasoning): (h, r1, b) ∧ (b, r2, t) → (h, r1, r2, t)
  - Comparison (attribute comparison): compare entity attributes

### ID vs OOD Evaluation
- **atomicID** and **atomicOOD**: separate sets of atomic facts
- **ID generalization**: complete unseen inferred facts from atomicID
- **OOD generalization**: complete inferred facts from atomicOOD (tests systematicity)

### Key Variable: Inferred/Atomic Ratio (φ)
- φ = |train_inferredID| / |atomicID|
- Higher φ → faster grokking

---

## Key Evidence

### Finding 1: Grokking is Required for Implicit Reasoning

| Stage | Training Acc | ID Test Acc | OOD Test Acc |
|-------|--------------|-------------|--------------|
| Before grokking (14K steps) | >99% | **9.2%** | 0% |
| After grokking (~700K steps) | >99% | **~100%** | 0% (composition) |

**Implication**: Standard training achieves memorization, not reasoning. Extended training (50× steps) is required.

### Finding 2: Distribution Matters More Than Size

| φ (ratio) | Grokking Speed |
|-----------|----------------|
| 3.6 | Very slow |
| 7.2 | Moderate |
| 18.0 | Fast (96.7% before saturation) |

Changing |E| (entity count) while holding φ constant does NOT affect grokking speed.

### Finding 3: Composition Fails OOD, Comparison Succeeds

| Task | ID Accuracy | OOD Accuracy |
|------|-------------|--------------|
| Composition | ~100% | **0%** (even after 2M steps) |
| Comparison | ~100% | **~100%** |

### Finding 4: Circuit Analysis Explains the Divergence

**Composition circuit** (Figure 4):
- Lower layers (0-5): Retrieve first hop (h, r1) → b stored at S[5, r1]
- Upper layers (5-8): Retrieve second hop (b, r2) → t

**Problem**: Upper layers only store atomic facts that appear as second hops during training. OOD facts are NEVER stored in upper layers.

**Comparison circuit** (Figure 5):
- "Parallel circuit" — both facts retrieved in same layers
- Atomic facts stored and retrieved from same region
- Enables systematicity

### Finding 5: Grokked Transformer Beats GPT-4

On complex reasoning task with large search space:
| Model | Accuracy |
|-------|----------|
| GPT-4-Turbo | **0%** (regardless of prompting/RAG) |
| Gemini-1.5-Pro | **0%** |
| Grokked Transformer | **~100%** |

---

## Relationship to Thesis

### BALANCED — provides mechanistic insights that support AND challenge

**SUPPORTS the thesis:**

1. **Standard training produces memorization, not reasoning**
   > "before grokking, the model is very likely mostly memorizing... by directly associating (h, r1, r2) with t, without going through the first hop"

2. **Composition fails OOD systematically**
   > "transformers fail to systematically generalize for composition"
   - 0% OOD even after 2M optimization steps

3. **Architecture limits reasoning**
   > "non-recurrent design of the transformer architecture which forbids memory sharing across different layers"
   - Explains Faith and Fate's "linearized subgraph matching"

4. **LLMs struggle with implicit composition**
   > "even the most capable language models struggle" with implicit reasoning
   - Confirms findings in Papers 5, 70, 134

**CHALLENGES the thesis (partially):**

1. **Reasoning CAN emerge through grokking**
   - ID generalization approaches 100% after extended training
   - Not pure memorization — model learns actual rule

2. **Comparison shows systematic OOD generalization**
   - Some reasoning types CAN generalize
   - Parallel circuit enables systematicity

3. **Parametric memory can outperform explicit reasoning**
   - Grokked transformer beats GPT-4-Turbo with CoT/RAG

---

## Relationship to Other Papers

### Strongly Supports
- **Faith and Fate (2305.18654)**: Provides mechanistic explanation for "linearized subgraph matching" — upper layers don't share knowledge
- **Planning Gap (2601.14456)**: Same ID/OOD pattern (high ID, 0% OOD for composition)
- **Can ICL Generalize OOD (2410.09695)**: Both show composition fails OOD

### Extends
- **Interplay (2512.07783)**: Shows WHY extended training is needed — circuit efficiency drives grokking
- **Base Models Know How to Reason (2510.07364)**: Grokking surfaces latent capability

### Provides Mechanism For
- **Why composition fails OOD**: Non-recurrent architecture → no cross-layer memory sharing
- **Why grokking works**: Generalizing circuit is more efficient than memorizing circuit

### Challenged By
- **OMEGA (2506.18880)**: Even with grokking, 0% transformative generalization
- **Physics of LLMs (2407.20311)**: Shows OOD generalization possible in narrow domains

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"Grokking isn't practical for real LLMs"**
   - Training 50× beyond overfitting is computationally prohibitive
   - Real pretraining data isn't structured as atomic/inferred

2. **"Comparison success may be domain-specific"**
   - Only tested on synthetic attribute comparison
   - May not transfer to natural language comparison

3. **"Parametric vs non-parametric comparison is unfair"**
   - GPT-4 wasn't trained on the specific task
   - Grokked transformer was trained specifically for it

### Limitations Acknowledged by Authors
- Synthetic tasks may not represent real-world complexity
- Larger models converge faster but same qualitative behavior
- Cross-layer memory sharing (Universal Transformer) helps but not fully tested

---

## Key Quotes

> "transformers can learn implicit reasoning, but only through grokking, i.e., extended training far beyond overfitting"

> "when faced with out-of-distribution examples, transformers fail to systematically generalize for composition but succeed for comparison"

> "Such issue originates from the non-recurrent design of the transformer architecture which forbids memory sharing across different layers"

> "the model is very likely mostly memorizing the examples... by directly associating (h, r1, r2) with t, without going through the first hop"

> "solely increasing the size does not change the relative efficiency of Cmem and Cgen"

---

## Implications for Thesis

### The Grokking Requirement
```
Standard Training → Memorization (Cmem)
                     ↓
              Extended Training (Grokking)
                     ↓
              Generalization (Cgen)
                     ↓
        BUT: Only works for ID, not OOD composition
```

This paper provides the **mechanistic explanation** for why:
1. LLMs appear to reason (ID generalization after grokking)
2. LLMs fail on novel compositions (no cross-layer memory sharing)
3. Some tasks generalize (parallel circuit for comparison)

**Key insight**: The architecture itself constrains what kind of reasoning can generalize. Composition requires sequential knowledge retrieval across layers, which transformers can't share OOD.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**
