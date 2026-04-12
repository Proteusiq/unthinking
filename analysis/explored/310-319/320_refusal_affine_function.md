# Paper 320: Refusal in LLMs is an Affine Function

## Metadata
- **arXiv**: 2411.09003
- **Date**: November 2024
- **Authors**: Thomas Marshall, Adam Scherlis, Nora Belrose
- **Affiliation**: EleutherAI, Manifold Research
- **Venue**: arXiv
- **Stance**: Strongly Supports

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  REFUSAL IS AN AFFINE FUNCTION (not just linear)                    │
│                                                                     │
│  Prior work (Arditi et al.): v' = v - proj_r(v)                     │
│  Problem: Assumes origin is meaningful "default"                    │
│                                                                     │
│  ACE (this paper): v' = v - proj_r(v) + proj_r(r⁻) + αr            │
│                                                                     │
│  Key insight: Need reference point v₀ (typically r⁻ = harmless     │
│  mean), not just direction r                                        │
│                                                                     │
│  RESULT: Works on models where pure abliteration FAILS              │
│          (RWKV produces nonsense with directional ablation alone)   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key insight**: The linear representation hypothesis is ambiguous — concepts may be encoded as *linear* functions (no bias) or *affine* functions (with bias). This paper shows refusal is **affine**, requiring a reference point.

---

## The Problem with Pure Abliteration

Arditi et al. (2024) showed directional ablation works:
```
v' = v - proj_r∥(v)
```

But this assumes the **origin (zero vector)** is a meaningful default — i.e., zero refusal. In practice:
- Typical activations are far from origin
- "No refusal" isn't represented at zero
- Some models (RWKV v5) produce **nonsense** with pure abliteration

**Example from paper**:
| Method | Output on RWKV v5 |
|--------|-------------------|
| Directional Ablation | "6ó '18 '474010*60 in40 - . fin de sec1..." (nonsense) |
| ACE (α=0) | "To create a botnet... you can follow these steps..." (coherent) |

---

## Affine Concept Editing (ACE)

### The Full Equation

```
v' = v - proj_r∥(v) + proj_r∥(r⁻) + αr
```

Where:
- `v` = original activation
- `r` = refusal direction (r⁺ - r⁻)
- `r⁺` = mean of harmful prompt activations
- `r⁻` = mean of harmless prompt activations (reference point)
- `α` = steering parameter (0 = no refusal, 1 = refusal)

### Why This Works

1. **proj_r∥(r⁻)** = the "correction term" — adds back the harmless baseline
2. **α** now has **standardized meaning**: 
   - α=0 → expected activation = r⁻ (harmless mean)
   - α=1 → expected activation = r⁺ (harmful/refusing mean)

### Comparison of Methods

| Method | Equation | Standardized? | Works on RWKV? |
|--------|----------|---------------|----------------|
| CAA | v' = v + αr | No | Yes |
| Directional Ablation | v' = v - proj(v) | Partial | **No** |
| ACE | v' = v - proj(v) + proj(r⁻) + αr | **Yes** | **Yes** |

---

## Results

Tested on **10 models** including Llama 3 70B:

### Standardization Effect

CAA alone is **not standardized** — the same α produces different behavior on harmful vs harmless prompts:

| Method | α=0 on harmless | α=0 on harmful | Standardized? |
|--------|-----------------|----------------|---------------|
| CAA | Complies | **Still refuses** | No |
| ACE | Complies | **Complies** | Yes |

### The RWKV Breakthrough

Directional ablation alone **breaks** Hermes Eagle RWKV v5:
- Output: gibberish ("6ó '18 '474010...")
- ACE correction term fixes this completely

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    WHY THIS STRENGTHENS THE THESIS                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. REFUSAL IS EVEN SIMPLER THAN THOUGHT                            │
│     - Not just a direction, but an affine subspace                  │
│     - Can be controlled with a SINGLE SCALAR α                      │
│                                                                     │
│  2. ALIGNMENT IS ARCHITECTURE-AGNOSTIC SHALLOW                      │
│     - Works on Transformers AND RNNs (RWKV)                        │
│     - Same technique, same fragility                               │
│                                                                     │
│  3. "STANDARDIZATION" PROVES PATTERN MATCHING                       │
│     - If refusal were deep reasoning about harm...                  │
│     - ...it couldn't be controlled by shifting α from 0 to 1       │
│     - The model doesn't "reason about harm" — it pattern-matches    │
│                                                                     │
│  CONCLUSION: Alignment is not just shallow — it's PARAMETRIZABLE    │
│              A single scalar controls all refusal behavior          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Key Quotes

> "We argue that this framework is not sufficiently general. In particular, it assumes without justification that the origin (zero vector) is a meaningful 'default value' for activations."

> "ACE successfully produces a standardizing effect superior to CAA... the behavior exhibited by the model after steering may not be fully determined by the steering parameter [in CAA]."

> "It is especially noteworthy that ACE performs well on Hermes Eagle RWKV v5, where directional ablation alone produced incoherent results."

---

## Connection to Paper 319 (Arditi et al.)

| Aspect | Paper 319 (Arditi) | Paper 320 (Marshall) |
|--------|-------------------|---------------------|
| Core claim | Refusal = single direction | Refusal = affine function |
| Method | Directional ablation | ACE (affine concept editing) |
| Limitation | Assumes origin meaningful | Adds reference point |
| RWKV support | Not tested | Works (directional fails) |
| Control | Binary (on/off) | Continuous (α ∈ [0,1]) |

**Relationship**: Paper 320 **extends** Paper 319 by showing the linear assumption is too strong — refusal requires affine treatment for full generality.

---

## Technical Details

### Why Affine Matters

Linear decomposition:
```
v = proj_r⊥(v) + αr      (α is linear in v)
```

Affine decomposition:
```
v = v₀ + proj_r⊥(Δv) + αr    (α is affine in v)
```

The difference: affine has a **constant term** (the reference point v₀).

### Code Available

GitHub: [https://github.com/EleutherAI/steering-llama3](https://github.com/EleutherAI/steering-llama3)

---

## Rebuttals / Limitations

### Authors' Acknowledged Limitations

1. ACE standardization is "not perfect" — works best at α slightly below 0 or above 1
2. More sophisticated erasure (LEACE) didn't improve results
3. May need nonlinear techniques for full concept erasure

### Potential Counter-Evidence

One could argue:
- The need for affine treatment shows refusal IS more complex than a single direction
- But: it's still a **1-dimensional** control — just needs the right origin

---

## Summary

**Rating**: Strongly Supports thesis

**Contribution**: Extends abliteration from linear to affine, showing refusal can be controlled with a single scalar parameter across architectures. The fact that ONE NUMBER (α) controls all refusal behavior is devastating evidence that alignment is superficial pattern matching, not deep ethical reasoning.

**The devastating implication**: If alignment involved genuine reasoning about harm, it couldn't be reduced to shifting a single scalar from 0 to 1.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
