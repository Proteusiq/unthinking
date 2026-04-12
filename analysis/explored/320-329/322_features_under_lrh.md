# Paper 322: How Many Features Can a Language Model Store Under the Linear Representation Hypothesis?

## Metadata
- **arXiv**: 2602.11246
- **Date**: February 2026
- **Authors**: Nikhil Garg, Jon Kleinberg, Kenny Peng
- **Affiliation**: Cornell University
- **Venue**: arXiv (theoretical)
- **Stance**: Balanced (provides mathematical foundation for LRH, shows both power and limits)

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  MATHEMATICAL BOUNDS ON LINEAR REPRESENTATION HYPOTHESIS            │
│                                                                     │
│  Question: How many features m can d neurons store and access?      │
│                                                                     │
│  KEY DISTINCTION:                                                   │
│  - Linear REPRESENTATION: features embedded linearly (f = Az)      │
│  - Linear ACCESSIBILITY: features extracted linearly (z ≈ B^T f)   │
│                                                                     │
│  RESULTS (for k-sparse inputs, error ε):                            │
│                                                                     │
│  Classical compressed sensing (nonlinear decode):                   │
│  d = O(k log(m/k))   ← linear in sparsity k                        │
│                                                                     │
│  Linear compressed sensing (linear decode - THIS PAPER):            │
│  Lower bound: d = Ω(k²/log k · log(m/k))   ← quadratic in k!       │
│  Upper bound: d = O(k² log m)                                       │
│                                                                     │
│  IMPLICATION: Linear accessibility is HARDER than representation    │
│  but still allows EXPONENTIAL features m >> d (superposition)       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### Framework Formalization

The paper provides the first rigorous mathematical framework for the Linear Representation Hypothesis:

1. **Activations**: f: L → ℝ^d (maps text to d-dimensional activation)
2. **Features**: z_i: L → ℝ (function capturing concept presence/intensity)
3. **Linear Representation**: f(ℓ) = Σ z_i(ℓ) · a_i = Az
4. **Linear Accessibility**: z_i recovered via ⟨b_i, f(ℓ)⟩

### Key Definitions

- **μ-incoherence**: Matrix C with ⟨c_i, c_i⟩ = 1 and |⟨c_i, c_j⟩| < μ for i≠j
- **k-sparse**: At most k features active for any input
- **Superposition**: m >> d (more features than dimensions)

### Proof Techniques

**Upper Bound**: Random matrix construction (scaled Rademacher entries) achieves near-optimal incoherence.

**Lower Bound**: Novel combination of:
1. Alon's rank bound for near-identity matrices
2. Application to principal submatrices
3. Graph reduction via Turán's theorem

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Gap between classical and linear CS | k vs k²/log k | Sparsity dependence differs fundamentally |
| Upper bound | d = O(k² log m) | Achievable with random matrices |
| Lower bound | d = Ω(k²/log k · log(m/k)) | Cannot do better than k² dependence |
| Superposition confirmed | m = exp(d/k²) possible | Exponential features under LRH |

### Implications of the Gap

```
┌─────────────────────────────────────────────────────────────────────┐
│  CLASSICAL CS         vs    LINEAR CS (this paper)                  │
├─────────────────────────────────────────────────────────────────────┤
│  Decoding: nonlinear        Decoding: linear (B^T A z)             │
│  Dimension: O(k log m)      Dimension: Θ(k² log m)                  │
│  Sparsity tolerance: HIGH   Sparsity tolerance: LOWER              │
│                                                                     │
│  Example: m = 10^6, k = 10                                          │
│  Classical: d ≈ 60          Linear: d ≈ 6000                        │
│                                                                     │
│  LINEAR ACCESSIBILITY IS MEANINGFULLY STRONGER THAN                 │
│  LINEAR REPRESENTATION ALONE                                        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    BALANCED IMPLICATIONS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  WHAT SUPPORTS THE THESIS:                                          │
│  1. Superposition is REAL and NECESSARY                             │
│     - Models MUST pack more concepts than dimensions                │
│     - This explains why linear probes work at all                   │
│                                                                     │
│  2. Linear accessibility has LIMITS                                 │
│     - k² dependence on sparsity is fundamental                      │
│     - As complexity increases, linear probing degrades              │
│                                                                     │
│  3. Features CAN interfere                                          │
│     - Paper proves some feature pairs MUST have high ⟨b_i, a_j⟩     │
│     - Interference is unavoidable at scale                          │
│                                                                     │
│  WHAT CHALLENGES THE THESIS:                                        │
│  1. LRH IS mathematically viable                                    │
│     - Exponential features in polynomial dimensions IS possible     │
│     - Linear representation + accessibility can work together       │
│                                                                     │
│  2. Provides theoretical foundation for steering                    │
│     - If features are linear, steering vectors make sense           │
│     - Abliteration has mathematical backing                         │
│                                                                     │
│  3. Does NOT address whether features = reasoning                   │
│     - Paper is about capacity, not capability                       │
│     - Features could be pattern fragments, not reasoning units      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Connection to Abliteration

This paper provides theoretical underpinning for abliteration papers (#319, #320):
- If refusal is a feature, it occupies ~1 direction (k=1)
- Linear accessibility allows extracting/removing it with d = O(log m)
- The math WORKS for single-concept manipulation

But doesn't prove features = genuine understanding.

---

## Key Quotes

> "Linear representations make features 'linearly accessible.' A typical neural network layer is a linear function followed by a non-linearity. If a feature in the previous layer is represented linearly, a neuron in the next layer can 'select it' and have it consistently excite or inhibit that neuron."

> "The lower bound establishes a quantitative gap between compressed sensing and linear compressed sensing."

> "Our main results demonstrate dependencies between superposition (the number of features stored relative to the number of neurons), sparsity (the number of features active per input), accessibility (the precision by which the next layer can access features stored in the previous layer), and feature geometry."

> "A primary implication of our work is that linear representations—in addition to being conceptually elegant and highly-compatible with neural network operations—can be remarkably expressive."

---

## Technical Details

### Geometry of Feature Directions (Section 4)

Important result (Proposition 9): The lower bound can be achieved even with "unusual" geometry:
- Representation vectors a_i can be highly correlated
- Probe vectors b_i can also be highly correlated
- What matters: a_i must be orthogonal to b_j for i ≠ j

This means: Encoder and decoder of SAEs may point in DIFFERENT directions for the same feature!

### Extension to Activation Functions (Section 5)

Theorem 12 shows the k² lower bound also applies to:
- Binary features with classification task
- Linear probes with bias and nonlinear activation
- Adding ReLU after linear probe doesn't help capacity

---

## Connection to Other Papers

| Paper | Relationship |
|-------|--------------|
| Arditi et al. 2024 (#319) | LRH explains why single-direction refusal works |
| Marshall et al. 2024 (#320) | Affine extension consistent with this framework |
| Raval et al. 2026 (#321) | Non-Euclidean geometry not addressed here |
| Elhage et al. 2022 (Superposition) | This paper formalizes and proves their hypothesis |
| Park et al. 2024 (LRH) | Cited; this paper provides the mathematical foundation |

---

## Rebuttals / Limitations

### Authors' Acknowledged Limitations

1. Framework assumes fixed sparsity k — real features may have varying sparsity
2. Error tolerance ε is uniform — real errors may vary by feature
3. Does not model nonlinear interactions between features
4. Binary feature case (Section 5) may not capture continuous concepts

### What This Paper Doesn't Address

1. **Whether features = reasoning units** — capacity ≠ capability
2. **Feature geometry in practice** — theory says possible, not how models do it
3. **Non-Euclidean geometry** — assumes Euclidean, but Paper #321 shows real spaces curve
4. **Compositional reasoning** — single features vs. composed reasoning

### How This Affects the Thesis

**Does NOT prove LLMs reason:**
- Shows they CAN store many concepts linearly
- Doesn't show stored concepts support genuine reasoning
- Pattern matching is compatible with these bounds

**Does support abliteration:**
- Mathematical basis for why single-direction removal works
- Alignment features have low k (few active at once)
- Extraction is feasible within these bounds

---

## Summary

**Rating**: Balanced

**Contribution**: First rigorous mathematical framework for the Linear Representation Hypothesis. Proves tight bounds showing linear accessibility requires quadratically more dimensions than classical compressed sensing (k² vs k), but still allows exponential feature storage (superposition). Provides theoretical foundation for interpretability research.

**For the thesis**: This paper is **foundational but neutral**:
1. Proves LRH is mathematically viable — concepts CAN be linear
2. Shows superposition is necessary — models MUST pack features
3. Establishes limits on linear accessibility — can't probe everything perfectly
4. Says nothing about whether features constitute reasoning

**The key insight**: The math works for storing concepts, but storing ≠ reasoning. A dictionary also stores words linearly, but doesn't understand them.

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
