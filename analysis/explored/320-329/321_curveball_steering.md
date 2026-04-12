# Paper 321: Curveball Steering: The Right Direction To Steer Isn't Always Linear

## Metadata
- **arXiv**: 2603.09313
- **Date**: March 2026
- **Authors**: Shivam Raval, Hae Jin Song, Linlin Wu, Abir Harrasse, Jeff M. Phillips, Fazl Barez, Amirali Abdullah
- **Affiliation**: University of Utah, University of Oxford
- **Venue**: arXiv (submitted to ICML)
- **Stance**: Balanced (challenges linear assumption but doesn't invalidate abliteration)

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  LINEAR STEERING ISN'T ALWAYS OPTIMAL                               │
│                                                                     │
│  Key insight: LLM activation spaces have NON-EUCLIDEAN geometry     │
│                                                                     │
│  Evidence: Geodesic/Euclidean distance ratio ≫ 1 in many regions    │
│  (If linear, this ratio would be ≈ 1 everywhere)                    │
│                                                                     │
│  Solution: "Curveball Steering" via polynomial Kernel PCA           │
│  - Maps to feature space respecting curved geometry                 │
│  - Steers along curved trajectories, not straight lines             │
│                                                                     │
│  RESULT: Outperforms linear steering on high-curvature manifolds    │
│  - Power-seeking: +47% vs +16% (Llama-3.2-1B)                       │
│  - Corrigibility: +93.4% vs +2.1% (Phi-3.5-mini)                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### Testing the Linear Representation Hypothesis

1. Train VAE ensembles on activation datasets
2. Learn pullback Riemannian metric on latent space
3. Compute geodesic vs Euclidean distances between activation pairs
4. Measure **distortion ratio** R = d_geo / d_Euc

If activation space were linear (Euclidean), R ≈ 1 everywhere.

**Finding**: R ≫ 1 in many regions, and **concept-dependent** — different behaviors show different distortion patterns.

### Curveball Steering Algorithm

1. **Project** activations into Kernel PCA space (polynomial kernel, degree 2-3)
2. **Compute** steering direction as difference of class means in kernel space
3. **Steer** in kernel space: a_target = φ(A_curr) + α·ẑ_steer
4. **Reconstruct** via pre-image estimation + residual preservation

Key insight: Linear steering is a special case (polynomial degree = 1).

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Power-seeking steering | +47% vs +16% | Curveball vs linear (Llama-3.2-1B) |
| Self-awareness steering | +24% vs +14% | Curveball vs linear (Llama-3.2-1B) |
| Corrigibility steering | +93.4% vs +2.1% | Curveball vs linear (Phi-3.5-mini) |
| Synthetic manifold advantage | 3x lower tangent deviation | High-curvature regimes (κ > 10) |
| Performance advantage threshold | κ ≈ 8 | Curvature where Curveball dominates |

### Synthetic Manifold Experiments

Created manifolds with tunable curvature κ ∈ [0.1, 20]:
- **Low curvature (κ < 2)**: Both methods perform similarly
- **High curvature (κ > 8)**: Linear steering exhibits "catastrophic degradation"
- **Reason**: Linear steering pushes points off-manifold

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    NUANCED IMPLICATIONS                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  WHAT THIS PAPER CHALLENGES:                                        │
│  - The assumption that concepts are PURELY linear directions        │
│  - Global linear steering may be suboptimal for some behaviors      │
│  - Activation spaces have non-Euclidean geometry                    │
│                                                                     │
│  WHAT THIS PAPER DOES NOT CHALLENGE:                                │
│  - That refusal CAN be removed via steering (it still works!)       │
│  - That alignment is shallow (nonlinear is still low-dimensional)   │
│  - The fundamental abliteration finding                             │
│                                                                     │
│  KEY NUANCE:                                                        │
│  Linear abliteration WORKS but may not be OPTIMAL                   │
│  Curveball steering is an IMPROVEMENT, not a refutation             │
│                                                                     │
│  FOR THE THESIS:                                                    │
│  Even with nonlinear geometry, alignment remains:                   │
│  1. Low-dimensional (kernel PCA works with few components)          │
│  2. Manipulable without retraining                                  │
│  3. Concept-dependent but still shallow                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Why This Doesn't Invalidate Abliteration

1. **Abliteration still works** — the paper shows linear steering achieves +16% on power-seeking, +21% on corrigibility
2. **Curveball is an improvement**, not a replacement — builds on the same foundation
3. **Both methods are geometry-based** — neither requires retraining
4. **Low-dimensional control persists** — kernel PCA still finds low-d structure

The paper actually **reinforces** that alignment is manipulable via activation geometry — it just shows the geometry is curved, not flat.

---

## Key Quotes

> "Existing methods largely rely on the Linear Representation Hypothesis, assuming behavioral attributes can be manipulated using global linear directions. In practice, however, such linear interventions often behave inconsistently."

> "We observe substantial and concept-dependent distortions, indicating that activation spaces are not well-approximated by a globally linear geometry."

> "The linear method exhibits catastrophic degradation due to pushing the datapoints off-manifold, while Curveball maintains stable performance."

> "Curveball steering consistently outperforms linear PCA-based steering, particularly in regimes exhibiting strong geometric distortion."

---

## Technical Details

### Why Kernel PCA (not other nonlinear methods)?

The paper explains why alternatives fail:
- **t-SNE, UMAP**: No well-defined function φ: R^d → R^k for new points
- **ISOMAP, Laplacian Eigenmaps**: Heavily depend on graph construction
- **LLE**: Very local, needs enormous data in high-D

Kernel PCA:
- Global method (especially with polynomial kernel)
- Has functional mapping for new points
- Invertible (via pre-image reconstruction)
- Low parametric complexity

### Hyperparameters

- Polynomial kernel degree: p ∈ {2, 3}
- Selected layers: 10 (Llama-3.2-1B), 22 (Phi-3.5-mini)
- Models: 1-4B parameter range

---

## Connection to Other Papers

| Paper | Relationship |
|-------|--------------|
| Arditi et al. 2024 (#319) | Curveball extends: linear abliteration works but curved steering is better |
| Marshall et al. 2024 (#320) | Both show steering needs more than raw difference-of-means |
| Park et al. 2024 (Linear Rep) | Directly challenges the linear representation hypothesis |
| Braun et al. 2025 | Cited: "activation differences are scattered rather than aligned" |

---

## Rebuttals / Limitations

### Authors' Acknowledged Limitations

1. Evaluated on 1-4B models only — may not generalize to larger models
2. Kernel PCA has computational overhead (though manageable)
3. Hyperparameter selection (degree, layer) requires tuning
4. Mixed results on some traits (humor, rudeness show model-specific patterns)

### How This Affects the Thesis

**Does NOT invalidate abliteration because:**
- Linear steering still works (just not optimally)
- The finding that alignment is geometrically manipulable is STRENGTHENED
- Curveball is additive improvement, not fundamental challenge

**Does provide nuance:**
- "Single direction" may be simplification
- Concept-dependent geometry matters
- Optimal steering may require curved paths

---

## Summary

**Rating**: Balanced

**Contribution**: Shows that LLM activation spaces have non-Euclidean geometry and proposes Curveball steering (polynomial kernel PCA) as an improvement over linear methods. Curveball outperforms linear steering especially in high-curvature regimes.

**For the thesis**: This paper **refines** rather than **refutes** the abliteration finding. It shows:
1. Alignment IS geometrically manipulable (thesis confirmed)
2. The geometry is curved, not flat (refinement)
3. Better steering is possible with curved paths (improvement)
4. Alignment remains low-dimensional and shallow (thesis confirmed)

**The key insight**: Even if the path to removing alignment is curved rather than straight, it's still just a path — and you can walk it without retraining the model.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
