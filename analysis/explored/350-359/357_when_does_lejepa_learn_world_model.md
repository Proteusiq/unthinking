# Paper Analysis: When Does LeJEPA Learn a World Model?

## Metadata
- **arXiv ID**: 2605.26379
- **Title**: When Does LeJEPA Learn a World Model?
- **Authors**: David Klindt (Cold Spring Harbor Laboratory), Yann LeCun (New York University), Randall Balestriero (Brown University)
- **Date**: May 2026
- **Category**: stat.ML, cs.LG
- **License**: CC BY 4.0
- **Code**: https://github.com/klindtlab/lejepa-identifiability
- **Stance**: BALANCED (positive world-model theorem under restrictive assumptions; does not show current LLMs or ordinary trajectory-trained systems learn robust world models)

---

## Core Claims

1. **LeJEPA can learn a linearly identifiable world model** when latent variables are Gaussian, positive pairs follow an Ornstein-Uhlenbeck transition, embeddings are Gaussian/whitened, and the population alignment objective is optimized.
2. **Gaussian latents are uniquely required** within the paper's stationary additive-noise world class: non-Gaussian latent distributions break the guarantee.
3. **Nonlinear encodings are penalized by alignment** because Hermite components of degree `d` decay with eigenvalue `rho^d`; linear components retain the largest correlation across views.
4. **Approximate identifiability degrades continuously** with alignment gap `delta` and whitening error `epsilon`.
5. **Latent-space planning is optimal** if the learned representation is an orthogonal transform of the true latent state and the costs are rotation-invariant.

---

## Methodology

### World Setup

The paper models an unobserved latent world:

```text
latent state z in R^n
        |
        | unknown nonlinear observation map g
        v
observation x = g(z)
        |
        | learned encoder f
        v
representation h(z) = f(g(z))
```

The goal is not benchmark accuracy but **linear identifiability**:

```text
h(z) = Qz,  Q in O(n)
```

This means the learned representation recovers the true latent variables up to a global rotation/reflection.

### World Assumptions

1. Independent latent components and independent componentwise transitions.
2. Stationarity: `p(z) = p(z')`.
3. Additive-noise transitions: `z_i' = m_i(z_i) + eta_i`.
4. Forward theorem specializes to Gaussian latents: `z ~ N(0, I_n)`.
5. Positive pairs follow the OU transition:

```text
z' = rho z + sqrt(1 - rho^2) eta,  eta ~ N(0, I_n)
```

### LeJEPA Objective

The learner minimizes alignment subject to Gaussian embeddings:

```text
min_h E[||h(z') - h(z)||^2]
subject to h(z) ~ N(0, I_n)
```

The Gaussianity constraint corresponds to SIGReg succeeding in the idealized population setting. With whitening, minimizing squared distance is equivalent to maximizing correlation between the two views.

### Spectral Mechanism

For the Gaussian OU world, the transition operator has Hermite-polynomial eigenfunctions. Degree `d` Hermite components have eigenvalue `rho^d`, so a scalar representation component decomposes as:

```text
E[h_i(z') h_i(z)] = w_1 rho + w_2 rho^2 + w_3 rho^3 + ... <= rho
```

Equality requires `w_1 = 1`, meaning the representation component is linear. This is the central mechanism: **any nonlinear distortion lowers positive-pair correlation**.

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Exact optimum | `L(h) >= 2(1-rho)n` | Equality iff `h(z)=Qz` for orthogonal `Q` |
| Approximate bound | `E[||h(z)-Qz||^2] <= D + (epsilon + D)^2` | `D = delta / (2 rho (1-rho))` |
| 2D recovery | 4 nonlinear diffeomorphisms | Spiral, sinusoidal shear, parabolic shear, RealNVP coupling recovered up to rotation |
| Scaling with SIGReg | `R^2 > 0.999` through `N=1024` | RealNVP mixing, 5 seeds, matched inverse-NVP encoder |
| Scaling with VICReg | `R^2 > 0.999` through `N=1024` | Similar second-moment regularization succeeds in this controlled setting |
| InfoNCE degradation | `R^2=0.566955` at `N=128`; `0.720241` at `N=1024` | Fixed kernel width underflows/saturates at scale |
| Distributional ablation | Recovery peaks at generalized-normal `alpha=2` | `alpha=2` is Gaussian; heavy-tailed/Laplace/uniform alternatives reduce recovery |
| Reacher OU condition | `R^2(h->z)=0.95` at `rho=0.99` | Pixel-based DMC Reacher with Gaussian OU latent sampling |
| Reacher trajectory condition | total `R^2(z->h)` never exceeds `0.50` | Same physical system, but policy trajectories are non-Gaussian/anisotropic |
| Trajectory stride `delta=8` | total `R^2=0.50`; per-dim `0.80`, `0.78` | Best trajectory setting still worse than Gaussian OU sampling |
| Reacher data | `100,000` image pairs + `10,000` eval images | `64x64` RGB MuJoCo renderings |
| Planning evaluation | `K=30` start-goal pairs, `T=15` steps | Gaussian-OU encoder statistically indistinguishable from oracle; trajectory encoder biased upward |

---

## Theorems

### Theorem 5.1: LeJEPA Linear Identifiability

In the Gaussian OU world, any measurable `h: R^n -> R^n` with `h(z) ~ N(0,I_n)` satisfies:

```text
L(h) >= 2(1-rho)n
```

Equality holds iff:

```text
h(z) = Qz,  Q in O(n)
```

At optimum, the learned transition is also OU:

```text
h(z') | h(z) ~ N(rho h(z), (1-rho^2)I_n)
```

### Theorem 5.2: Gaussian Uniqueness

For stationary additive-noise worlds, if every whitened minimizer of the alignment objective is linear, then the latent distribution must be Gaussian. The proof uses Sturm-Liouville theory: an affine first eigenfunction forces a linear score `(log p)'`, which implies a Gaussian density.

### Theorem 5.3: Approximate Identifiability

If alignment is within `delta` of optimum and whitening error is at most `epsilon`, then recovery error is bounded by:

```text
D + (epsilon + D)^2,  where D = delta / (2 rho (1-rho))
```

The practical interpretation is that alignment error dominates; whitening is comparatively easy.

### Theorem 5.4: Optimal Latent Planning

If `h(z)=Qz` and stage/terminal costs are `O(n)`-invariant, planning in learned latent space gives the same value function and optimal action sequence as planning in true latent space.

---

## Critical Analysis: What This Does and Does Not Prove

### Strong Positive Result

This is a genuine positive theorem for JEPA-style world-model learning. It gives a clean answer to the title question:

```text
Gaussian latent world
      +
stationary OU positive pairs
      +
alignment objective
      +
Gaussian/whitened embeddings
      +
matched dimension and global optimum
      =>
linear recovery of the latent world up to rotation
```

This is more than a probe result. Under the assumptions, the representation is forced into an orthogonal copy of the latent state.

### Critical Restriction

The theorem is narrow. It does **not** show that arbitrary JEPA systems, LLMs, or policy-trained world models recover robust causal world structure. The Reacher experiments are the most important caveat: the same physical system is identifiable under isotropic Gaussian OU sampling, but not under realistic goal-directed trajectories.

### Relationship to the Thesis

The paper is balanced for the thesis.

Evidence that challenges a strong skeptical view:
- It proves a self-supervised predictive objective can recover latent world variables, not merely fit surface correlations, in a mathematically specified regime.
- It connects representation learning to planning: if the encoder is orthogonally identifiable, latent-space planning is optimal under invariant costs.

Evidence that supports the skeptical reading:
- The guarantee requires Gaussian latents, stationarity, additive isotropic transitions, matched dimension, and population/global optimization.
- Non-Gaussian and anisotropic trajectory data degrade identifiability in the paper's own experiments.
- The paper explicitly concerns the encoder; action-conditioned transition learning remains separate.
- Linear decodability alone remains only necessary, not sufficient, for a faithful world model.

Net assessment: **a positive theorem about what would be required for a learned world model, not evidence that current LLM reasoning systems possess one**.

---

## Relationship to Other Papers

### Supports

- **The Platonic Representation Hypothesis (2405.07987)**: gives a formal case where representations converge to shared latent structure, but with much stronger distributional assumptions.
- **Linear Representation Hypothesis / Geometry of LLMs (as cited by the paper)**: supports the idea that linear structure can be mathematically privileged, not merely a probe artifact.
- **World-model planning literature**: proves that orthogonal latent recovery can preserve optimal planning under invariant costs.

### Challenges / Qualifies

- **Emergent World Beliefs (2512.23722)**: raises the bar for world-model claims based on probes; moderate probe correlation is weaker than identifiable latent recovery.
- **Language Models Represent Space and Time (2310.02207)**: supports the relevance of linear probes but cautions that linear decodability is not sufficient for causal world modeling.
- **LLM-JEPA (2509.14252)**: supplies a formal condition missing from the LLM-JEPA empirical paper; also shows that JEPA gains cannot be interpreted as world-model recovery without testing the assumptions.

### Does Not Address

- **OMEGA (2506.18880)**: no compositional or transformative math generalization testing.
- **Planning Gap (2601.14456)**: does not evaluate LLM planning across domains; proves a latent-control theorem under ideal representation and cost assumptions.
- **Faithfulness / CoT papers**: not about textual chain-of-thought or answer rationalization.

---

## REBUTTALS

### Known Direct Rebuttals

No direct arXiv rebuttal, critique paper, or citation-based counterpaper was found for `2605.26379`.

Searches checked:
- Exact title search via DuckDuckGo.
- `2605.26379` plus rebuttal/critique/discussion search.
- Local repository search for `2605.26379`, `LeJEPA`, and exact title.
- Project/repository pages and arXiv metadata.

### Indirect Counter-Evidence

1. **The paper's own Reacher trajectory result**: realistic policy trajectories reduce identifiability, with total `R^2(z->h)` never exceeding `0.50`.
2. **Probe-based world-model papers**: existing corpus analyses show that linear decodability can be overinterpreted; this paper agrees by calling linear identifiability necessary but not sufficient.
3. **LLM planning/generalization failures**: OMEGA and Planning Gap show failures in domains far outside the paper's Gaussian latent-control assumptions.

### Limitations Authors Acknowledge

1. **Gaussian latent assumption**: real-world latent Gaussianity is not directly knowable from observations.
2. **Dimension matching**: the main theorem assumes embedding dimension equals latent dimension; `m<n` and `m>n` are open design regimes.
3. **Population/global optimum**: the theorem does not characterize SGD, finite-sample scaling, or all optimization failures.
4. **Encoder only**: action-conditioned dynamics still must be learned; the theorem does not prove full controlled world-model learning.
5. **Isotropy**: anisotropic transitions can interleave spectral modes and break simultaneous latent recovery.
6. **Formal verification caveat**: Lean proofs compile with zero `sorry`, but many standard mathematical facts are axiomatized.

---

## Key Quotes

> "A representation that scrambles the true degrees of freedom of the world cannot support reliable planning or compositional generalization."

> "Our answer: When it linearly recovers the world's latent variables."

> "Linear identifiability is thus a necessary, albeit not sufficient, condition for faithful linear probing."

> "Any nonlinear distortion of the representation strictly reduces the correlation between positive pairs."

> "The Gaussian is the unique distribution for which this guarantee holds."

> "The Reacher result shows that the same physical system supports identifiability when sampled isotropically (OU) but not under a goal-directed policy."

> "Thm. 5.4 concerns the encoder alone. The action-conditioned transition ... must still be learned from data; our theorems do not prove that it is."

---

## Status
- [x] Read complete (full arXiv HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Critical Note for Thesis

This paper should be cited as evidence that **predictive/self-supervised objectives can learn world structure under precise assumptions**. It should not be cited as evidence that LLMs already possess robust world models or genuine reasoning.

The most thesis-relevant finding is the contrast between OU and trajectory sampling: identifiability depends strongly on the data-generating process, not merely the architecture or objective.
