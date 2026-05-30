# Paper Analysis: Unveiling Memorization–Generalization Coexistence — A Case Study on Arithmetic Tasks with Label Noise

## Metadata
- **arXiv ID**: 2605.18022
- **Title**: Unveiling Memorization–Generalization Coexistence: A Case Study on Arithmetic Tasks with Label Noise
- **Authors**: Linyu Liu, Pinyan Lu (Taylor Lab, Huawei Technologies + SUFE Key Lab of Interdisciplinary Research of Computation and Economics)
- **Date**: May 2026
- **License**: CC BY 4.0

---

## Core Claims

1. **Noisy labels are memorized *before* clean labels.** A counter-intuitive training-dynamics finding: under full-batch optimization (AdamW, Adam, Muon, even SGD), noisy training labels reach high training accuracy *earlier* than clean ones. This inverts the conventional view that models "fit typical samples first, atypical ones later" (which underlies the early-stopping defense against noise).
2. **Generalization and memorization *coexist* inside over-parameterized networks.** Even when the model is forced to memorize 80% random label noise, the internal weights still encode the underlying algebraic rule. The rule is present; it's just *masked* by additional residual frequency components used for memorization.
3. **The internal rule matches a known analytical structure.** ReLU networks trained on noisy modular addition develop weights that match the *quadratic-activation* margin-maximizing solution: `cos(2π/P · ωi + φ)` with `φ_a + φ_b = φ_c`. The activation function used in training is largely irrelevant — swapping ReLU for quadratic or reverse-ReLU after training *preserves or improves* test accuracy.
4. **Frequency Filtration (FF) recovers the rule.** Keeping only the dominant Fourier component per neuron and discarding residual frequencies recovers near-perfect test accuracy *even at 80% label noise*. The residual sub-network (the discarded part) retains the noise memorization.
5. **Neuron-level partitioning is insufficient.** Task-agnostic neuron importance scores (Inverse Participation Ratio, neuron Strength) yield only marginal generalization improvements compared to FF. The generalization structure is "diffusely encoded across the network and intertwined with components used for noise memorization."
6. **Scaling helps — but only under model expressiveness.** Bigger models in the over-parameterized regime generalize better even under noise. However, when the model architecture *cannot* interpolate all noisy labels (e.g., tied weights `U=V` with asymmetric noise), the double-descent picture collapses and regularization becomes more important than scale.
7. **Same dynamics on MNIST.** The "noise-first" memorization order is not unique to modular arithmetic — it also appears in a 3-layer NN trained on MNIST under full-batch optimization. Likely a broader property of early full-batch optimization under label corruption.

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                         │
│                                                                      │
│  Over-parameterized models can simultaneously:                      │
│                                                                      │
│     MEMORIZE noisy labels    +    GENERALIZE the rule               │
│     (output layer)                (internal weights)                │
│                                                                      │
│  Even at 80% label noise:                                           │
│    - Raw test accuracy collapses                                    │
│    - But the rule IS internally encoded (matches the quadratic-     │
│      activation analytical solution)                                │
│    - Frequency filtration extracts it → near-100% test accuracy     │
│                                                                      │
│  The two behaviors are encoded differently — not in different       │
│  NEURONS (partition is marginal) but in different FREQUENCIES.      │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### Task

**Modular arithmetic** `a ∘ b = c mod P`, P=113 (Nanda et al. 2023 setup):
- Primary: modular **addition**
- Generality checks: subtraction, multiplication

### Architecture

Two-layer NN: `f_θ(a,b) = W φ(U e_a + V e_b) + μ`
- `e_a, e_b ∈ R^P` one-hot embeddings
- Width `M = 2^k + 1` for `k ∈ {4, ..., 12}` (4096+1 = 4097 max)
- Activations: ReLU (primary), quadratic, GeLU, reverse-ReLU
- Cross-entropy loss

### Noise injection

For ratio α ∈ [0, 1] of training samples, replace the true label with a uniform random non-correct label. Test/val sets remain clean.

### Optimizers

AdamW (default, lr=1e-3, wd=0.1), Adam, Muon (Jordan et al. 2024). 200k epochs, full-batch. SGD also tested but inefficient.

### Methods for separating generalization from memorization

1. **Frequency Filtration (FF)**: Fourier-decompose each neuron's weights `(u_m, v_m, w_m)`. Keep the dominant frequency component (the `G` part), discard the residual (the `R` part). Two sub-networks evaluated separately.
2. **Neuron Partitioning** (Algorithm 1): rank neurons by importance score, then take top-`k` for generalization and bottom-`k'` for noise memorization.
   - **IPR** (Inverse Participation Ratio): `(||ŵ_m||_4 / ||ŵ_m||_2)^4` where `ŵ_m` is the Fourier transform of `w_m`. Measures periodicity. Task-specific.
   - **Str.** (Neuron Strength): `||w_m||_∞ · φ(||u_m||_∞ + ||v_m||_∞)`. Task-agnostic.

---

## Key Evidence

### Result 3.1: Double descent persists under heavy label noise

- Robust across all activation functions, noise ratios α, optimizers, and arithmetic tasks
- **Within the over-parameterized regime, bigger models generalize better** — even when forced to fit 80% wrong labels
- Stronger weight decay shifts the interpolation threshold; effective model complexity (EMC) controls the competition between generalization and memorization signals
- Quadratic and GeLU activations show a *ceiling* on test accuracy (their symmetry constrains how noise can be absorbed); ReLU has no such ceiling — its asymmetry allows it to store noise without disrupting symmetric rule representation

### Result 3.2 (SMOKING GUN): Noisy labels memorized FIRST

| Regime | Pattern |
|---|---|
| Under-parameterized (M=2049, α=0.3, Adam) | Noisy training accuracy rises *earlier* than clean (first 200 epochs) |
| Over-parameterized (AdamW) | Same inversion; larger models accelerate noise memorization further |

**MNIST verification (3-layer NN, full-batch):**

| α | Epoch 1 (Noisy / Clean) | Epoch 2 (Noisy / Clean) |
|---|---|---|
| 0.05 | 10.87% / 2.86% | 6.47% / 46.29% |
| 0.20 | 10.75% / 2.89% | 5.71% / 48.09% |

Noisy labels reach **3.8× higher accuracy than clean labels at epoch 1**, then the clean signal dominates from epoch 2 onward.

> *"This observation stands in contrast to existing studies suggesting that models initially fit typical samples and ignore atypical ones, thereby making early stopping effective [Li et al. 2020]."*

Mechanism (Appendix C.3 gradient analysis): under full-batch training, noisy labels can receive *larger per-sample optimization signal* than clean labels, especially when α is small (each noisy sample is a strong, isolated gradient direction).

### Result 4.1: Internal generalization structure exists under 80% noise

The ReLU model's learned weights match the quadratic-activation analytical solution:
```
u_{mi} = λ cos(2π/P · ω_m i + φ_m^(a))
v_{mj} = λ cos(2π/P · ω_m j + φ_m^(b))
w_{mk} = λ cos(2π/P · ω_m k + φ_m^(c))
with φ_m^(a) + φ_m^(b) = φ_m^(c)
```

**Frequency Filtration result (Figure 5):**
- Trained at 80% label noise: raw test accuracy is severely degraded
- **Dominant-frequency sub-network**: near-perfect test accuracy
- **Residual sub-network**: largely preserves noise memorization, contributes little to test generalization

**Activation replacement check:**
- After training with ReLU, replace activation with quadratic or reverse-ReLU at inference time
- *Test accuracy is preserved or improved*; noisy-label accuracy drops
- → The weights themselves encode a *symmetric* rule representation that doesn't depend on the trained activation's exact shape

**Phase check:** filtered dominant-frequency components satisfy `φ_a + φ_b ≈ φ_c` for addition and `φ_a − φ_b ≈ φ_c` for subtraction — matching the analytical structure.

### FF on Transformers (Appendix D.2, Table 3)

Transformer trained on noisy modular addition; FF = keep top-20 frequencies in the unembedding head:

| Method | Clean train acc | Noisy train acc | Test acc |
|---|---|---|---|
| Before FF | 100% | 100% | 76.8% |
| **After FF** | **98.1%** | **36.8%** | **87.8%** |

Test accuracy improves by **+11 points** while noise memorization drops from 100% → 36.8%. The rule-versus-noise separation in frequency space *generalizes beyond two-layer networks*.

### Result 5.2 + 5.3: Neuron partitioning is bounded

- IPR (periodicity-based) and Str. (task-agnostic norm-based) are correlated for addition/subtraction; Str. wins for multiplication where periodicity is no longer a direct proxy
- When network is large enough, `γ_G + γ_R ≤ 1` — the high-importance generalization neurons and the noise-memorizing neurons are *disjoint sets*
- **BUT**: applying FF on top of the Str.-selected sub-network `f^G` does NOT match applying FF to the full network. The "leftover" neurons still contain useful rule signal that partitioning discards.

> *"This contrast indicates that **generalizable structure is not localized to a small subset of neurons; instead, it is diffusely encoded across the network and intertwined with components used for noise memorization**."* (§5)

> *"Future learning paradigms may need to explicitly isolate memorization from logical inference during training... post-hoc knowledge extraction may require domain-specific structural priors rather than generic neuron-importance scores."* (§5)

### Model misspecification caveat (Appendix C.2)

Tied first-layer weights `U=V` (a natural inductive bias for commutative `a∘b = b∘a`):
- Random noise is asymmetric (corrupting `(a,b)` to label X doesn't corrupt `(b,a)` to X)
- → The tied model *cannot* interpolate all noisy labels
- → The coexistence phase fails to emerge; test accuracy is irregular
- Constructing *symmetric* noise (corrupting `(a,b)` and `(b,a)` to the same wrong label) restores normal double-descent
- Practical fix when misspecified: **stronger regularization > scaling**

---

```
┌──────────────────────────────────────────────────────────────────────┐
│  TWO-CLOCK ARCHITECTURE                                              │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Output → noise memorization (visible failure under 80% label noise)│
│      ↑                                                               │
│   Residual frequencies in each neuron                                │
│   (the R sub-network: discardable, dominates noise fitting)          │
│                                                                      │
│   Dominant frequency per neuron                                      │
│   (the G sub-network: matches analytical algebra, near-100% test)    │
│      ↓                                                               │
│   Internal rule representation (preserved even at 80% noise)         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  The model learns BOTH:                                              │
│    • An algorithmic rule (encoded in dominant Fourier components)    │
│    • A noise memorizer (encoded in residual Fourier components)      │
│                                                                      │
│  These coexist in every neuron — not in separate neurons.            │
│  FF can separate them; neuron-level pruning cannot.                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: SUPPORTS** (nuanced — also shows that real algorithmic structure *can* form alongside the memorization story)

This paper is unusual in that it doesn't just demonstrate memorization or just demonstrate generalization — it dissects the *coexistence* mechanistically. Several thesis-relevant findings:

1. **Memorization-first training dynamics directly support the predictive thesis.** The conventional defense of CoT-style reasoning has been "models learn easy/common patterns first, then refine to harder cases" — which implies a learning curriculum that gradually approaches reasoning. This paper shows the *opposite* under noise: noisy labels are fit *before* clean ones. The default optimization regime is not "learn the rule, then memorize exceptions"; it is *memorize first, then maybe extract the rule later*. The "later" only happens because over-parameterized models continue training; in practical regimes (early stopping, fewer epochs, smaller models), the memorization dominates the output.

2. **The internal rule is *present but suppressed* in the output.** This is exactly the predicted structure of a pattern-completing system: the model has learned the structural regularity (because it generalizes on the clean held-out data when extracted), but its *visible behavior* is driven by point-wise memorization of the training distribution. Output behavior decoupled from internal structure — the predictive thesis at a representation level.

3. **The rule structure is *not* localized to particular neurons.** This is a critical mechanistic finding. If the model had "reasoning circuits" and "memorization circuits" cleanly separated, neuron-level partitioning would work. It doesn't. Both behaviors are *distributed across all neurons*, with each neuron carrying both signals in different frequency bands. This means the conventional mechanistic-interpretability program of identifying "circuits responsible for X" is structurally limited: behavior is the *interference pattern* of distributed sub-signals, not the activation of discrete circuits.

4. **The "rule" exists in a controlled, formally well-specified setting.** This is the thesis-mitigating part. Modular arithmetic has a *known* analytical structure (Eq. 2). The model learns it. This is real generalization, not pattern-matching surface features. The paper is honest about this: bigger models *do* generalize under noise, and the internal weights *do* encode a true rule. The thesis claim is not "models never generalize" — it is "what they call reasoning is often surface-level pattern completion, and the cases of real generalization (modular arithmetic, simple algebraic tasks, in-distribution math) are limited and known." This paper documents one of the cases where real generalization happens.

5. **Even in this "real generalization" case, the failure modes are predictive.** When the architecture cannot interpolate the noise (tied weights), the double-descent picture collapses — bigger doesn't help. When noise is too high (80%+), the residual memorization dominates the output. When neuron pruning is tried, it can't fully separate the two. The "generalization works" story is conditional on having enough capacity, the right inductive bias, and a way to filter out the memorization residue. None of these are guaranteed in real LLM training.

6. **Bigger models *accelerate noise memorization*.** > *"Increased model capacity accelerates the memorization process, aligning with empirical findings in large language models [Tirumala et al. 2022]."* This is the direct connection to Tirumala's "memorization without overfitting": at LLM scale, the same dynamics apply. Scaling makes memorization faster, not slower. The "memorization-first" pattern is amplified at scale, not mitigated.

7. **FF works because there's *structural prior* available.** The frequency filtration method requires knowing that the task has periodic structure. For modular arithmetic this works; for general LLM tasks there is no equivalent structural prior. The authors say: > *"post-hoc knowledge extraction may require domain-specific structural priors rather than generic neuron-importance scores."* In an LLM trained on natural language, what's the equivalent of the "dominant frequency"? There isn't one — which means in real LLM settings, we have no tool equivalent to FF for separating rule-following from memorization-pattern-matching in the output.

The single strongest mitigation is the **rule-is-present finding**. Even at 80% noise, the rule IS learned. This means an LLM trained on natural language *might* have internal rule representations that are simply masked by surface pattern completion — and we just don't have the tools to extract them. This is an open question, not a settled one. The paper provides a mechanism that *could* explain why CoT sometimes works on math but fails on commonsense: math has formal structure that the model can internally encode; commonsense doesn't, so there's nothing for the model to "extract." But the paper itself doesn't make this claim — it stays within the controlled modular-arithmetic setting.

---

## Relationship to Other Papers

### Supports

- **#220 Progress Measures for Grokking (2301.05217, Nanda et al.)** — foundational predecessor. This paper extends Nanda's mechanistic analysis to the *noisy* regime and confirms the analytical structure persists.
- **#35 KUP: Memorization vs Reasoning (2504.12523)** — same family, different method. KUP separates memorization vs reasoning at the knowledge-unit level; this paper at the frequency-of-neuron level.
- **#347/#348 Memorization at Statistical and Internal Levels (2603.21658)** — direct related: layered analysis of memorization in LLMs. Compatible mechanism.
- **#349 Learned or Memorized? (2604.13997)** — same question in code LLMs; this paper provides the algorithmic-task analogue with controlled labels.
- **#90 Spurious Rewards Paradox (2601.11061)** — RLVR activates memorization shortcuts. Same competition between memorization and rule learning, observed at scale.
- **#147 Are Emergent Abilities a Mirage? (2304.15004)** — compatible. "Emergence" is double-descent: the rule was being learned all along, output behavior just doesn't reflect it until the model crosses an effective capacity threshold.
- **#354 Premature Confidence (2605.24396)** — same family at a different level. The "vanishing CoT" failure mode = the output collapses to a pattern-matched answer while internal computation may still have done something. Here: output collapses to noise fitting while internal rule is still encoded.
- **#357 FaithMATE (2605.24960)** — supports the meta-claim: surface behavior of CoT (or output classification) is decoupled from internal mechanisms.

### Extends

- **Nanda et al. 2023 (Progress Measures)** — extends from clean-data grokking to noisy-data grokking; shows the same Fourier mechanism is robust to 80% noise.
- **Power et al. 2022 (Grokking)** — the original grokking paper. This paper introduces controlled label noise on top of Power's setup.
- **Zhong et al. 2023 (Clock and Pizza)** — extends from clean mechanism identification to noisy-regime mechanism preservation.
- **Doshi et al. 2024 (To grok or not to grok)** — the closest competitor. Doshi introduces IPR; this paper introduces the task-agnostic Str. score and shows it generalizes to multiplication where IPR fails.

### Challenges

- The **early-stopping defense against noise** (Li et al. 2020 "Gradient descent with early stopping is provably robust"). Their argument assumes models fit clean labels before noisy ones. This paper shows the opposite under full-batch training: noise is fit first.
- The **"reasoning circuit"** mechanistic interpretability program. This paper shows that for modular arithmetic — a task with known clean circuit structure — the rule is *not* localized to identifiable neurons. It's diffusely encoded. If clean modular arithmetic is non-localizable, the much harder question of "where is reasoning in an LLM?" likely has no clean answer.

---

## REBUTTALS

### Known Rebuttals

- No direct rebuttals (May 2026).
- Related counter-positions:
  - **Davies et al. 2023 (Unifying grokking and double descent, arXiv:2303.06173)** and **Huang et al. 2024 (Circuits competition, arXiv:2402.15175)** — both frame the same phenomena as competition between *memorization circuits* and *generalization circuits*. This paper's distributed-not-localized finding partially challenges the "circuits" framing: there are not two competing circuits but two competing frequency bands per neuron.
  - The early-stopping defense (Li et al. 2020). The authors acknowledge their finding stands in *direct contrast* to this line of work.

### Limitations (Authors Acknowledge)

1. **Controlled toy setting**: > *"We acknowledge that our setup inherently abstracts away the complex variability of natural vision or language tasks, but this controlled setting is necessary to provide a rigorous, verifiable boundary between structural generalization and unstructured memorization."* (§5 Conclusion)
2. **FF requires structural prior**: works for modular arithmetic because the task has periodic structure; no general-purpose equivalent for arbitrary tasks.
3. **Two-layer NN primary**: Transformer FF is "preliminary evidence" with a single experiment.
4. **Phase MSE rises with noise**: at higher α the internal rule is *degraded*, not perfectly preserved — but FF still recovers near-perfect test accuracy at 80%.
5. **Model misspecification breaks the picture**: tied weights example shows the "bigger is better" finding is conditional on architecture being expressive enough.
6. **SGD inefficient**: only full-batch experiments are clean; SGD requires careful tuning. Real LLM training is large-batch SGD-adjacent, so generalization of dynamics findings is not certain.

### Independent Assessment

The empirical work is exceptionally clean. The combination of:
1. Inverted learning order (noisy before clean)
2. Internal rule preservation at 80% noise
3. FF as a clean extraction method
4. Distributed (not circuit-localized) representation
5. MNIST and Transformer verification

…makes a coherent mechanistic picture. The Result 3.2 finding (noise memorized first) is the most surprising. The default mental model of overfitting is "first the model learns the easy stuff, then it overfits to outliers" — this paper shows that under full-batch optimization, *outliers are fit first*. The early-stopping literature implicitly relies on the opposite ordering; this paper directly contradicts it.

The Result 4.1 (internal rule via FF) is the most thesis-relevant. The model behaviorally fails at 80% noise (raw test accuracy collapses) but internally has the rule (FF extracts it to near-100%). This is the **decoupling thesis at a representation level**: what the model "behaves like" is not what the model "is." The representation has structure; the output suppresses that structure under noise pressure.

The Result 5.3 (partitioning fails) is the deepest mechanistic finding. If the model had separate reasoning and memorization circuits, neuron pruning would identify them. It doesn't. This means the conventional MI program (identify circuits for behaviors) is *structurally limited* for this kind of phenomenon. The rule and the noise are *superposed* in the weight space — partially separable in Fourier space, not in neuron space.

The Transformer Table 3 result (76.8% → 87.8%) is preliminary but striking. If FF generalizes to transformers, it would mean that the same coexistence mechanism operates in LLMs. The implication: an LLM trained on internet text *might* have rule representations that are masked by surface pattern memorization, but we have no FF-equivalent for natural language because there's no analogous structural prior.

The strongest mitigation against an over-extension of the thesis: this paper proves that **real generalization happens** in over-parameterized networks. The rule is learned. So the thesis isn't "LLMs never reason" — it's "what's externally measurable as 'reasoning behavior' may be the masked, suppressed projection of whatever rule the model has internally encoded." That's a more sophisticated claim than the strong version, and it's what this paper supports.

---

## Key Quotes

> "Highly over-parameterized models can simultaneously memorize noisy labels and generalize well, yet how these behaviors coexist remains poorly understood." *(Abstract)*

> "Over-parameterized models internally form a generalization structure, but its expression in the output is suppressed by the need to fit noisy labels." *(Abstract)*

> "Even with 80% label noise, near-perfect test accuracy can be achieved by extracting this internal structure using frequency-based methods." *(Abstract)*

> "In both under- and over-parameterized regimes, the model prioritizes the memorization of noisy labels over the fitting of clean labels." *(Result 3.2)*

> "Increased model capacity accelerates the memorization process, aligning with empirical findings in large language models [Tirumala et al. 2022]." *(§3.2)*

> "This observation stands in contrast to existing studies suggesting that models initially fit typical samples and ignore atypical ones, thereby making early stopping effective." *(§3.2)*

> "Models can internally recover the underlying algebraic rule under extreme label noise (∼80% noise), though these rules are suppressed by the need to interpolate noisy labels." *(§1)*

> "Label noise does not simply prevent the model from learning the rule; instead, **the rule is learned but masked by additional residual frequency components used for memorization**." *(§4)*

> "This provides direct evidence that generalization and memorization coexist in the trained network but are encoded differently in frequency space." *(§4)*

> "**Generalizable structure is not localized to a small subset of neurons; instead, it is diffusely encoded across the network and intertwined with components used for noise memorization**." *(§5)*

> "Future learning paradigms may need to explicitly isolate memorization from logical inference during training... post-hoc knowledge extraction may require domain-specific structural priors rather than generic neuron-importance scores." *(§5)*

> "Over-parameterized models can internally learn underlying rules even under explicit label noise, though this generalization remains heavily entangled with memorization across distributed neurons." *(§5 Conclusion)*

> "Fully disentangling these processes in practical applications will require novel training paradigms or architectural designs with explicit function separation." *(§5 Conclusion)*

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
