# Paper Analysis: Progress Measures for Grokking via Mechanistic Interpretability

## Metadata
- **arXiv ID**: 2301.05217
- **Title**: Progress Measures for Grokking via Mechanistic Interpretability
- **Authors**: Neel Nanda, Lawrence Chan, Tom Lieberum, Jess Smith, Jacob Steinhardt
- **Date**: January 2023
- **Venue**: ICLR 2023

---

## Core Claims

1. **Grokking can be fully reverse-engineered**: The model learns a "Fourier multiplication algorithm" using discrete Fourier transforms and trigonometric identities
2. **Grokking is NOT sudden**: It arises from gradual amplification of structured mechanisms, followed by removal of memorization
3. **Three continuous phases**: Memorization → Circuit Formation → Cleanup (phase transition occurs during cleanup, AFTER circuit exists)
4. **Weight decay is necessary**: Without regularization, grokking does not occur
5. **All generalizing models use same algorithm**: Different seeds/architectures find the same Fourier multiplication approach

---

## Methodology

### Task
- **Modular addition**: Given a, b ∈ {0, ..., P-1}, predict c = (a + b) mod P
- P = 113 (prime)
- Input format: "a b ="

### Model
- **1-layer ReLU transformer**
- Embedding dimension: d = 128
- 4 attention heads (dim 32 each)
- 512 MLP neurons
- No LayerNorm

### Training
- **30% of 113×113 pairs** for training (~3,832 pairs)
- AdamW optimizer, learning rate 0.001
- **Weight decay λ = 1**
- 40,000 epochs

### The "Fourier Multiplication Algorithm"

The model learns to:
1. **Embed to Fourier basis**: Map a, b → sin(wₖa), cos(wₖa), sin(wₖb), cos(wₖb)
2. **Apply trig identities** via attention + MLP: cos(wₖ(a+b)) = cos(wₖa)cos(wₖb) - sin(wₖa)sin(wₖb)
3. **Read off logits**: Compute cos(wₖ(a+b-c)) via unembedding
4. **Constructive interference**: Sum cosines across frequencies, max at c* = (a+b) mod P

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FOURIER MULTIPLICATION ALGORITHM                         │
│                                                                             │
│   Input: a=3, b=5, P=113                                                    │
│                                                                             │
│   Step 1: EMBED TO FOURIER BASIS                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  a=3  ──→  [Embed]  ──→  sin(wₖ·3), cos(wₖ·3)  ──→  angle 3·wₖ      │   │
│   │  b=5  ──→  [Embed]  ──→  sin(wₖ·5), cos(wₖ·5)  ──→  angle 5·wₖ      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    ↓                                        │
│   Step 2: APPLY TRIG IDENTITIES (Attention + MLP)                           │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  cos(wₖ(a+b)) = cos(wₖa)cos(wₖb) - sin(wₖa)sin(wₖb)                 │   │
│   │  sin(wₖ(a+b)) = sin(wₖa)cos(wₖb) + cos(wₖa)sin(wₖb)                 │   │
│   │                                                                     │   │
│   │  Result: angle (3+5)·wₖ = 8·wₖ on the circle                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    ↓                                        │
│   Step 3: READ OFF LOGITS (Unembedding)                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  For each c ∈ {0,...,112}: compute cos(wₖ(a+b-c))                   │   │
│   │  When c = 8: cos(wₖ·0) = 1  ──→  MAXIMUM                            │   │
│   │  When c ≠ 8: cos(wₖ·Δ) < 1  ──→  smaller                            │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    ↓                                        │
│   Step 4: CONSTRUCTIVE INTERFERENCE                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │  Sum across 5 key frequencies: all cosines = 1 at correct answer    │   │
│   │  c=8 gets highest logit  ──→  softmax  ──→  prediction: 8           │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│   KEY INSIGHT: Addition mod P = rotation on circle = Fourier transform      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Evidence

### Training Dynamics

| Phase | Epochs | What Happens |
|-------|--------|--------------|
| Memorization | 0–1,400 | Train acc → 100%, test stays low, Fourier unused |
| Circuit Formation | 1,400–9,400 | Generalizing circuit forms (invisible in test loss!) |
| Cleanup | 9,400–14,000 | Test loss suddenly drops, memorization removed |

**Key insight**: The sudden grokking occurs AFTER the circuit already exists.

### Key Frequencies
- Model uses **5 key frequencies**: k ∈ {14, 35, 41, 42, 52}
- Only 5 of 56 possible frequencies (~9%)

### Variance Explained

| Approximation | Variance Explained |
|---------------|-------------------|
| W_L by 5 key frequencies | **99.45%** |
| Logits by Σcos(wₖ(a+b-c)) | **95%** |
| MLP directions ≈ cos(wₖ(a+b)) | **93.2–98.2%** |
| Attention patterns ≈ single-freq trig | **97.9–99.07%** |
| 433/512 neurons ≈ degree-2 polynomial | **84.6%** with >85% FVE |

### Ablation Results

| Ablation | Effect |
|----------|--------|
| Ablate key frequencies | Loss → 5.27 (worse than chance) |
| Ablate ALL non-key freqs (95% of them) | Loss **improves** 70% |
| Project MLP to nullspace of key directions | Loss → 5.27 (chance) |

### Weight Decay Effects

| λ | Epochs to Grok |
|---|----------------|
| 0 | **Never** (no grokking) |
| 0.3 | ~20k epochs |
| 1.0 | ~5-10k epochs |
| 3.0 | ~3k epochs |

---

## Relationship to Other Papers

### Supports
- **2405.15071** (Grokked Transformers): Both show grokking requires extended training; this provides mechanistic explanation
- **2305.15054** (Mechanistic Arithmetic): Both show localized circuits for arithmetic; this explains HOW circuits form

### Extends
- **Power et al. 2022**: Original grokking paper; this provides mechanistic explanation

### Key Distinction from Thesis Papers
- Shows transformers CAN learn clean algorithms on narrow tasks
- But the algorithm is mathematically pre-determined by task structure (cyclic group → Fourier basis)

---

## REBUTTALS TO THIS PAPER

### The "Algorithm" is Mathematically Inevitable
1. Fourier basis is the ONLY natural representation for cyclic groups
2. Model didn't "discover" a novel algorithm — found the unique solution
3. This is sophisticated feature engineering + linear readout, not symbolic reasoning

### No Generalization Beyond the Narrow Task
1. Model learns addition mod 113 — doesn't generalize to mod 114
2. Each operation requires relearning from scratch
3. No transfer, no flexibility, no compositional generalization

### Scale Limitations
- 12,769 input pairs total
- Single mathematical operation
- Perfect mathematical structure (prime field)
- Authors acknowledge: "small transformers on a simple algorithmic task"

### The "Circuit" is Pattern Recognition in Fourier Space
- Converts problem to where linear regression works
- Uses "constructive interference of waves" — signal processing, not reasoning

---

## Key Quotes

> "We reverse engineer the weights of these transformers and find that they perform this task by **mapping the inputs onto a circle and performing addition on the circle**."

> "These results show that grokking, rather than being a sudden shift, arises from **the gradual amplification of structured mechanisms encoded in the weights**, followed by the later removal of memorizing components."

> "We find that grokking does not occur without regularization and limited data."

> "In this work, we studied the behavior of **small transformers on a simple algorithmic task**, solved with a single circuit."

---

## Thesis Relevance

**Stance**: Balanced

**What this paper shows**:
- Transformers CAN learn clean, interpretable algorithms
- The algorithm generalizes perfectly within the task domain
- Mechanistic interpretability can fully explain what the model learned

**What this paper does NOT show**:
- That this generalizes to complex reasoning
- That the model "discovered" anything novel (Fourier basis is mathematically inevitable)
- Transfer to any other task

**Critical insight**: Even when a model learns a "clean algorithm," it's:
1. Mathematically pre-determined by task structure
2. Specific to one narrow domain
3. Requires extended training (grokking)
4. Requires regularization to prefer the generalizing solution

This supports the view that **apparent algorithmic reasoning is sophisticated curve fitting** — the model found the unique representation that makes this specific task tractable, not a general reasoning capability.

---

## Limitations (Authors Acknowledge)

1. **Small scale**: "small transformers on a simple algorithmic task"
2. **Manual effort required**: "significant amounts of manual effort"
3. **Task-specific metrics**: Progress measures are specific to modular arithmetic
4. **No predictive theory**: Cannot predict WHEN grokking will occur
5. **Scalability uncertain**: "significant uncertainty as to how scalable existing mechanistic interpretability approaches really are"

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
