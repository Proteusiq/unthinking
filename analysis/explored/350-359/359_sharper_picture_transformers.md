# Paper Analysis: A Sharper Picture of Generalization in Transformers

## Metadata
- **arXiv ID**: 2605.20988
- **Title**: A Sharper Picture of Generalization in Transformers
- **Authors**: Paul Lintilhac, Sair Shaikh (Thayer School of Engineering, Dartmouth College)
- **Date**: May 2026
- **License**: CC BY 4.0

---

## Core Claims

1. **Transformer generalization is governed by Fourier sparsity and degree.** The generalization gap for boolean target functions scales as `O(σ²·ω·D_f³) + norm_term(O(D_f³ + log²(T)·ωD_f))` where `ω` is Fourier sparsity (number of nonzero components) and `D_f` is the maximum Fourier degree. Cubic in degree, linear in sparsity.
2. **A constructive PAC-Bayes methodology.** Rather than capacity-based bounds (Edelman 2022, Trauger & Tewari 2024), they build an *explicit* transformer construction implementing the target function, bound its norm and sharpness analytically, then show that any low-sharpness interpolator inherits the generalization guarantee.
3. **The bound is numerically non-vacuous.** At `T=20, D_f=2, ω=10, m=8192`, the semi-analytic bound is below 1 (non-vacuous). The fully-analytic bound requires `m ≈ 2×10⁹`. Edelman's norm-based bound is vacuous at `m=10⁶` in the same regime (≈ 1.01 vs the paper's 0.327).
4. **CoT exponentially improves the bound for Parity.** One-pass Parity error scales **exponentially** with sequence length T; CoT Parity error scales **linearly** with T. The mechanism: CoT decomposes degree-T Parity into T sequential degree-2 lookups, each with constant complexity.
5. **Learned transformers approximately match the construction (empirically).** Across 11 random functions × 5 degrees × 4 sparsities at `m=8192`, learned solutions have **~100× lower norm and ~100× lower sharpness** than the explicit construction — confirming the "domination" assumption needed for the PAC-Bayes argument.
6. **Mechanistic interpretability: attention learns Fourier component structure.** In a simplified setup, attention weight matrix rows correspond to Fourier components of the learned function; MLP exhibits cyclical/oscillatory behavior. Authors heavily hedge ("rare", "not the norm") but the structural similarity to Nanda 2023 modular-arithmetic Fourier circuits is striking.

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                         │
│                                                                      │
│  Transformers learn LOW-DEGREE, LOW-SPARSITY Fourier functions      │
│  well. They do NOT learn high-degree functions well — even when     │
│  the architecture can express them.                                  │
│                                                                      │
│  Generalization gap ∈ O(ω · D_f³)                                    │
│                                                                      │
│  CoT helps Parity because it decomposes degree-T → T × degree-2:    │
│                                                                      │
│   One-pass Parity:  bound exponential in T                          │
│   CoT Parity:       bound LINEAR in T                               │
│                                                                      │
│  Mechanism is statistical decomposition, NOT reasoning.             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### Function class

Boolean targets `f: {0,1}^T → ℝ` with **Fourier-Walsh expansion**:
```
f(x) = Σ_{A⊆[1,T]} λ_A · χ_A(x)
```
where `χ_A(x) = (1 + (-1)^{Σ_{i∈A} x_i})/2` is the even-parity indicator on subset A.

- **Degree** `D_f` = max{|A| : λ_A ≠ 0}
- **Sparsity** `ω` = number of nonzero coefficients

Simplifying assumptions in the analysis: equal-degree components (`|S_t| = D_f`) and all-positive coefficients. Authors claim these can be relaxed at cost of more attention heads.

### Transformer construction

1.5 layers (2 attention + 1 MLP), 1 head, hidden dim `d+1` (positional + bit value). The construction has:
- First attention layer with **position-aware** mechanism (O(log T) scaling) → computes normalized prefix sums `(1/D_f)·Σ_{j∈S_t} x_j` per Fourier component
- MLP approximates the "mod 2" function via grid of indicators
- Second attention layer linearly combines Fourier components with coefficients `c_t`

### Idealized Low-Sharpness Learner (Definition 1)

Minimizes: training loss + α·||Θ|| + β·Tr(∇²[L̂(f_Θ)])

The PAC-Bayes argument applies if the learner's solution Θ̂ has parameter norm and expected perturbed sharpness *each dominated* by the explicit construction Θ. This is verified empirically.

### PAC-Bayes Bound (Theorem 2)

With probability ≥ 1−δ:
```
E_ε~N(0,σ²)[L(f_{Θ̂+ε})] ≤
    σ²·(O(ω·D_f³) + P(σ; ω, D_f, T))     ← Perturbed Sharpness Term
  + 2·√(Σ²/(2m) · (O(D_f³ + log²(T)·ω·D_f)/(2σ²) + ln(1/δ)))   ← Parameter Norm Term
```

Two bound variants:
- **Fully analytic**: closed-form on P(σ), conservative, requires m ≈ 2×10⁹ at T=20, D_f=2, ω=10
- **Semi-analytic**: replace P(σ) with empirical estimate, non-vacuous at m=8192

---

## Key Evidence

### 1. Generalization gap scales as predicted

Experiments at T=20, m=8192, 11 random functions per (D_f, ω) cell:
- D_f ∈ {1, 2, 3, 4, 5}
- ω ∈ {1, 7, 14, 20}

> *"The gap increases super-linearly with degree, and the rate of increase increases with larger sparsity."* (Figure 1 caption)

This matches the cubic-in-degree, linear-in-sparsity prediction `O(ω·D_f³)`.

### 2. Bound is numerically tighter than Edelman et al. 2022

At T=20, D_f=2, ω=10, m=10⁶:

| Quantity | Value |
|---|---|
| G_u(ω=10, D_f=2) (sharpness term) | 15,524 |
| L(ω=10, D_f=2, T=20) (norm term) | ≈ 1,303.93 |
| σ* (optimal perturbation) | ≈ 2.27×10⁻³ |
| **This paper's bound** (semi-analytic) | **≈ 0.327** |
| **Edelman et al. bound** | **≈ 1.01 (vacuous)** |

Asymptotically Edelman is `O(m^{-1/2})` vs this paper's `O(m^{-1/3})`, so Edelman wins in the limit — but numerically in the practical low-degree regime, this paper's bound is tighter.

### 3. Learned solutions DOMINATED by construction (~100× lower norm AND sharpness)

> *"The sharpness of our construction indeed upper bounds the sharpness of the learned solutions at each degree and sparsity, by roughly two orders of magnitude."* (Figure 2(a) caption)

> *"The norm of our construction indeed upper bounds the norm of the learned solutions for each degree and sparsity, by around two orders of magnitude."* (Figure 2(b) caption)

This validates the domination assumption needed for the PAC-Bayes argument. Learned solutions are *better* than the explicit construction in both norm and sharpness — the construction is a usable upper bound.

### 4. CoT exponential improvement for Parity

**Theorem 7 (CoT bound)**:
```
δ_CoT(α, β) ≤ 4T · exp(-m/(8Σ²)) · exp((mσ²/(4Σ²))·(2G_u(1,2) + P(σ,1,2,T)) + L(1,2,T)/(2σ²))
```

**Theorem 8 (one-pass bound)**:
```
δ_OP ≤ 4·exp(-m/(8Σ²))·exp((mσ²T/(4Σ²))·(2G_u(1,2) + P(σ,1,2,T)) + T·L(1,2,T)/(2σ²))
```

The difference: one-pass has T inside the exponent (multiplied by σ² and L); CoT has only T as a linear pre-factor outside.

> *"Our bound on the error for Parity increases exponentially with length when using the one-pass approach, whereas using the CoT approach, the error increases only linearly with T."* (§3)

**Why CoT helps in this framework**:

```
┌──────────────────────────────────────────────────────────────────────┐
│  ONE-PASS PARITY                  CoT PARITY                         │
├──────────────────────────────────────────────────────────────────────┤
│  Single function of degree T      T functions of degree 2 each       │
│  Degree D_f = T                   Degree D_f = 2 (per step)          │
│  Sparsity ω = 1                   Sparsity ω = 1 (per step)          │
│  G_u(1,T) ~ O(T³)                 G_u(1,2) = O(1) constant           │
│  L(1,T,T) ~ O(T) hidden deps      L(1,2,T) ~ O(log² T)               │
│  → Exponential in T               → Linear in T via union bound      │
└──────────────────────────────────────────────────────────────────────┘
```

CoT works because each step is a **degree-2** lookup of "running parity XOR next bit." Composition is handled by union bound (cost: factor of T). This is identical to what Cabannes et al. 2024 call an "iteration head" — explicitly a mechanistic-not-reasoning framing.

### 5. Mechanistic interpretability: attention shows Fourier structure

In a simplified architecture (replaced second attention with a linear projection, ~1000 parameters):

> *"In most cases, W̄^(1) contained rows corresponding to the Fourier components of its learned function, i.e. depicting bright spots in columns corresponding to the bits in a Fourier component. For example, in Figure 5, one can identify rows corresponding clearly to the components x_9·x_14·x_17 and x_3·x_8·x_11."*

> *"The learned 1-dimensional MLP function appears to exhibit cyclical behavior."*

**But the authors heavily hedge**:

> *"The learned solutions are often qualitatively different than our construction. This experiment is merely meant to support the feasibility of our construction – not to argue that it is the norm. Close matches like this are rare."*

This is consistent with paper #358's finding that the rule is *diffusely encoded* in modular-arithmetic models — close matches with the analytical solution exist but are not the typical learned solution.

### 6. Comparison with prior CoT-Parity theory

> *"Abbé et al. [2024] argue that functions with high Globality Degree require a chain-of-thought to be learned efficiently, though the general version of this claim remains conjectural. Hahn & Rofin [2024] show that transformers face a very steep loss landscape when learning Parity, but do not show a converse positive result showing that chain-of-thought makes learning easy. Kim & Suzuki [2024] show that chain-of-thought helps transformers learn sparse (subset) parities, whereas our result applies to the full Parity function applying to all input bits."*

This paper provides the first *positive* (rather than negative) sharpness-based learning bound for full Parity under CoT.

---

```
┌──────────────────────────────────────────────────────────────────────┐
│  WHY EXPRESSIBILITY ≠ LEARNABILITY                                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Transformers CAN express any boolean function (Chiang & Cholak     │
│  2022) — including high-degree, high-sparsity ones.                 │
│                                                                      │
│  But learning a high-degree function induces:                        │
│   • High Hessian trace (sharpness ~ O(ω·D_f³))                       │
│   • Strongly oscillating loss curve                                  │
│   • Higher parameter norms                                           │
│                                                                      │
│  SGD/AdamW implicitly bias toward LOW-SHARPNESS minima.              │
│  → Low-degree, low-sparsity functions are LEARNED.                   │
│  → High-degree functions are EXPRESSIBLE but NOT LEARNED.            │
│                                                                      │
│  This is the "expressivity-learnability gap" made precise.           │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: BALANCED — leaning SUPPORTS**

This is a theory paper that doesn't directly stake out a thesis position, but its formal results are *mechanistic decomposition* of why CoT and transformer "reasoning" work in the cases where they do. The relevance to the thesis is subtle:

1. **The CoT result is statistical, not epistemic.** The paper provides a formal mechanism for why CoT helps Parity: it decomposes a degree-T function into T degree-2 functions. There is no "reasoning" in this account — no search, no backtracking, no deliberation. Each step is a degree-2 Fourier lookup. The composition is handled by union bound. This is precisely the predictive-not-reasoning framing applied to CoT theory: CoT is mechanistic decomposition exploited by statistical learning, not "thinking through" the problem.

2. **Cabannes et al. "Iteration head" framing.** The authors *explicitly* defer to Cabannes et al. 2024 for the mechanistic explanation of CoT-as-iteration. This is the same mechanism this paper formalizes statistically. The convergence: theoretical generalization analysis and mechanistic interpretability agree that CoT is *iteration*, not *reasoning*. This is direct support for the predictive thesis on CoT.

3. **Pairs tightly with paper #358 (Memorization-Generalization Coexistence).** Paper #358 showed that the rule learned in modular arithmetic is *Fourier-structured* and matches the analytical quadratic-activation solution. This paper formalizes *why* low-sparsity, low-degree (= dominant-Fourier-component) functions are *learnable* in the first place: their sharpness is bounded, their norm is bounded, the PAC-Bayes bound is non-vacuous. The two papers are complementary:
   - #358: empirical mechanism (rule = dominant Fourier; memorization = residual frequencies)
   - #359: theoretical mechanism (low-sparsity, low-degree Fourier functions = low-sharpness = generalizable)
   Together they say: transformers generalize on tasks with sparse Fourier structure, fail on dense-spectrum tasks, and use CoT to decompose dense tasks into sparse subtasks.

4. **The "expressivity-learnability gap" is the strongest deflationary finding.** Transformers can *express* high-degree boolean functions (proven elsewhere); this paper shows they cannot reliably *learn* them. The implicit bias is toward low-degree solutions. Real "reasoning" tasks (proof search, multi-hop inference, novel composition) likely require representations that don't fit the low-degree-Fourier-with-CoT-decomposition template. To the extent that LLMs solve these tasks, they likely do so by *exploiting low-degree decompositions* present in the training distribution (memorized canonical algorithms), not by performing the high-degree reasoning the task notionally requires.

5. **MI evidence is structurally similar to Nanda 2023 / paper #358.** Learned attention shows Fourier-component structure; learned MLPs are cyclical/oscillatory. The authors call these matches "rare" but the *qualitative* convergence is striking. In modular arithmetic (#358), in Boolean parity (#359), and in grokking literature (Nanda 2023), the same pattern emerges: transformers solve algorithmic tasks by approximating Fourier-component lookups. This is not "discovering" the algorithm; it is implementing a specific computational template that happens to match the Fourier structure.

6. **The CoT-as-degree-reduction framing is broadly applicable.** Authors suggest extending the same analysis to other algorithmic tasks (Dyck languages, RASP programs). The implication: many tasks where CoT helps are tasks with high *effective degree* that admit a low-degree iterative decomposition. CoT helps when the task is intrinsically iterable into simple sub-lookups. It does NOT help on tasks that have no such decomposition — which is exactly what the empirical literature on CoT failure modes shows (Sprague 2024, #355 entropy phase transitions).

The mitigating finding is that the paper *also* shows transformers do generalize correctly when conditions are met. This isn't "transformers can't learn." It's "transformers learn *specific* function classes (low-degree, low-sparsity Fourier functions) and use *specific* mechanisms (CoT iteration) to extend that class. The mechanisms are statistical, not epistemic."

For thesis purposes: this paper gives the formal theory underneath what #358 demonstrated empirically and what #354/#355 showed behaviorally. The CoT result in particular is a smoking gun — it provides a *proof* that CoT works by decomposition, not by reasoning, in at least one well-defined case.

---

## Relationship to Other Papers

### Supports

- **#358 Memorization-Generalization Coexistence (2605.18022)** — direct theoretical companion. #358 empirically demonstrates Fourier-structured solutions in modular arithmetic; #359 formalizes *why* sparse-Fourier functions are learnable via PAC-Bayes. Together: a complete mechanistic story for algorithmic-task generalization in transformers.
- **#220 Progress Measures for Grokking (Nanda 2023, 2301.05217)** — Nanda discovered the Fourier mechanism empirically in modular addition. This paper provides the theoretical apparatus that explains why such mechanisms are *the* learnable solution.
- **#355 Entropy Phase Transitions (2605.22873)** — CoT helps on math/algorithmic tasks (high degree but iterable) and fails on commonsense (high degree, no iteration). This paper's CoT result formalizes the "iterable" criterion: high degree + decomposable into low-degree steps.
- **#354 Premature Confidence (2605.24396)** — convergent: the model commits to a pattern before reasoning. This paper explains why: low-sparsity-Fourier functions are easy to learn and dominate the implicit bias; high-degree alternatives are hard to learn so the model defaults to the low-degree pattern.
- **#357 FaithMATE (2605.24960)** — CoT faithfulness is non-monolithic. This paper provides a formal mechanism: different CoTs implement different (degree, sparsity) decompositions; "faithfulness" depends on which decomposition you're measuring.

### Extends

- **Abbe et al. 2023 (minimum-degree interpolator hypothesis)** — extends from hypothesis-with-limited-evidence to formal PAC-Bayes generalization bound with cubic-in-degree scaling.
- **Edelman et al. 2022 (norm-based capacity bounds)** — extends to a tighter (numerically) PAC-Bayes-flatness-based bound for the same function class.
- **#315 Globality Barrier (Abbé 2024, 2406.06467)** — globality-degree result is conjectural; this paper provides a positive (non-conjectural) sharpness-based bound for Parity under CoT.
- **Hahn & Rofin 2024 (loss landscape for Parity)** — Hahn shows the negative result (steep loss without CoT); this paper provides the converse positive result (CoT achieves linear bound).
- **Cabannes et al. 2024 (Iteration head, NeurIPS 2024)** — mechanistic study of CoT as iteration. This paper provides the matching statistical-learning theory.

### Challenges

- The "CoT is reasoning" framing implicit in much of the LLM reasoning literature. This paper formalizes CoT as *degree decomposition + union bound* — a mechanism with no epistemic content. The result is consistent with #355 (CoT hurts when no degree-decomposition is available, e.g., commonsense tasks).
- Capacity-based / Rademacher-complexity bounds (Edelman 2022, Trauger & Tewari 2024) — this paper argues PAC-Bayes-flatness is more numerically informative in the low-degree regime, even if asymptotically slightly worse.

---

## REBUTTALS

### Known Rebuttals

- No direct rebuttals (May 2026).
- Related counter-positions:
  - The Edelman / Trauger lineage on norm-based bounds — not a *rebuttal* but an alternative bounding strategy. This paper compares numerically and wins in low-degree regime; loses asymptotically.
  - Authors' own caveat (Remark 3): if the learned solution implements the function via a "qualitatively different mechanism whose sharpness profile scales differently," the domination argument is not tight. They flag this as empirically verifiable but unverified.

### Limitations (Authors Acknowledge)

1. **Analytic P(σ) is catastrophically loose** — "astronomically larger" than empirical perturbation; gap between analytic m≈2×10⁹ and empirical m=8192 is 5 orders of magnitude.
2. **|Θ| factor in perturbation analysis is prohibitive** for larger networks. Random projections help but don't eliminate.
3. **Function class restrictions**: positive Fourier coefficients only, equal-degree components, sparsity ≤ T. Negative-coefficient and mixed-degree cases require more heads but are claimed not to be qualitative barriers.
4. **Domination assumption** is empirically validated but not proven in full generality. If a learner finds a solution outside the dominated region, bound doesn't apply.
5. **No layer norm in construction or experiments**. Real transformers use LayerNorm; the construction explicitly excludes it.
6. **Small models only**: 2-layer, 1-head, hidden dim ~50, MLP width 128. No scaling to LLM regimes.
7. **MI experiments use a simplified architecture** (replaced second attention with linear projection) explicitly chosen for interpretability — "not intended to instantiate the full construction."

The authors do **NOT** explicitly flag whether real-scale LLMs (Llama, GPT) satisfy the idealized low-sharpness learner assumption. They never make the LLM-scale leap but also never explicitly disclaim it.

### Independent Assessment

The theoretical work is solid and gives the first numerically non-vacuous PAC-Bayes bound for a non-trivial transformer function class. The cubic-in-degree, linear-in-sparsity scaling is empirically validated across 5 degrees × 4 sparsities × 11 functions. The CoT-exponential-improvement result is the headline contribution and is genuinely informative.

The MI section is the weakest part — heavily hedged, simplified architecture, "rare" close matches. The connection to Nanda 2023 modular-arithmetic Fourier circuits is *not made* by the authors but is structurally striking. This is a missed citation; future work should connect these threads explicitly.

The CoT result deserves wide attention. It is a *formal proof* that CoT works on Parity by decomposing a degree-T problem into T degree-2 problems with union bound. There is no reasoning, no search, no deliberation — just statistical decomposition. Combined with the Cabannes "iteration head" mechanistic story, this is one of the cleanest formal accounts of why CoT helps where it helps, and equally importantly, predicts that CoT will *not* help where no such decomposition is available. The predictive thesis on CoT gets a theoretical foundation.

The expressivity-learnability gap framing is also valuable. Many recent capability claims about LLMs ("they can do X") conflate expressivity (the architecture can represent X) with learnability (training will find a solution that computes X). This paper provides the formal apparatus to separate them. The implication: many "emergent abilities" may be cases where the function class crosses the learnability threshold (low enough degree, sparse enough Fourier spectrum at some scale), not cases where the model "learned to reason."

Pairing with paper #358 is especially clean. Where #358 empirically showed that rule-following in modular arithmetic uses dominant Fourier components while memorization uses residuals, #359 theoretically explains *why* low-Fourier-degree functions are the learnable ones in the first place. The two papers were written independently and converge on the same picture from different methods (mechanistic experiment vs PAC-Bayes theory).

The strongest mitigation: this is a *very* narrow function class (boolean, all-positive Fourier coefficients, equal degree). The leap to LLMs is unjustified by the paper itself. The authors are appropriately cautious — they never claim their bound applies to LLMs. The thesis-relevant insight is the *framework*, not the specific bound: real reasoning tasks may be modeled in terms of effective Fourier complexity, and CoT's value derives from decomposing high-complexity tasks into iterable low-complexity steps.

---

## Key Quotes

> "Leveraging sharpness in the loss landscape as a possible path to bridging the so-called 'expressivity-learnability' gap." *(Intro)*

> "Our bound makes this precise, showing that the generalization gap scales as O(ω·D_f³) in the Fourier sparsity ω and degree D_f, thereby providing a concrete complexity-theoretic explanation for why expressible functions may not be learnable." *(Contribution 2)*

> "Our bound on the error for Parity increases exponentially with length when using the one-pass approach, whereas using the CoT approach, the error increases only linearly with T." *(§3)*

> "The expected error only scales with T [for CoT], whereas the expected error in the one-pass scenario will scale exponentially with T. We know that G_u is cubic in D_f=T, and P() carries a factor of D_f^{7/2}." *(Appendix G)*

> "Such high-degree conjunctive decisions are precisely the ones for which generalization is most fragile without chain-of-thought-style intermediate reasoning. This could inform how safety-critical AI systems are designed... by motivating the decomposition of complex decision logic into lower-degree intermediate steps." *(§4 Implications)*

> "The sharpness of our construction indeed upper bounds the sharpness of the learned solutions at each degree and sparsity, by roughly two orders of magnitude." *(Figure 2(a))*

> "In most cases, W̄^(1) contained rows corresponding to the Fourier components of its learned function." *(§2.4)*

> "The learned solutions are often qualitatively different than our construction... close matches like this are rare." *(Figure 5 caption)*

> "Even though transformers can be explicitly constructed to learn highly sensitive (and high degree) boolean functions such as parity, hence are not limited by their expressivity, these functions remained difficult for a transformer to learn." *(§4.1, citing Chiang & Cholak 2022)*

> "We believe our overall approach might offer a promising path to explaining generalization for functions for which there is a known canonical transformer construction. For other kinds of algorithmic problems, one could use a canonical transformer construction that solves the problem (using e.g. the RASP program for the task)." *(§4.1, future work)*

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
