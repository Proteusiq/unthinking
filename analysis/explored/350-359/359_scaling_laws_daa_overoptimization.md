# Paper Analysis: Scaling Laws for Reward Model Overoptimization in Direct Alignment Algorithms

## Metadata
- **arXiv ID**: 2406.02900
- **Title**: Scaling Laws for Reward Model Overoptimization in Direct Alignment Algorithms
- **Authors**: Rafael Rafailov, Yaswanth Chittepu, Ryan Park, Harshit Sikchi, Joey Hejna, Bradley Knox, Chelsea Finn, Scott Niekum (Stanford / UT Austin / UMass Amherst)
- **Date**: Jun 2024 (v1); Nov 2024 (v2)
- **Category**: cs.LG (also cs.AI, cs.CL)
- **Venue**: NeurIPS 2024 (30 pages)
- **Stance**: SUPPORTS (the Goodhart curve survives the removal of the proxy reward model; offline DAAs hack the implicit reward through under-constrained loss + OOD bootstrapping)

---

## Core Claims

1. **DAAs hack despite having no explicit proxy reward model.** DPO, IPO, and SLiC all exhibit the same hump-shaped Goodhart curve that Gao et al. 2023 documented for PPO+RM - even though neither of Gao's proposed mechanisms (proxy-RM training error, on-policy OOD sampling) is present.
2. **A single scaling law fits all three DAAs.** The Gao-style functional form `R(d) = d · (α − β log d)` with `d = √D_KL(π‖π_ref)` fits DPO/IPO/SLiC win-rate curves; vs a quadratic in KL it halves the RMSE.
3. **Degradation begins within the first epoch.** Under wide-KL (small β) configurations, win-rates often peak at 25% of one epoch, then decline while KL keeps climbing - long before any "reward model" could have been overfit.
4. **IPO is the only robust DAA.** DPO ≈ SLiC in overoptimization severity; IPO's quadratic loss enforces the KL constraint better and shows little to no hump at 6.9B.
5. **Smaller models hack faster and more visibly on simple features (length).** R² of `log π/π_ref` regressed on response length is highest for the 1B model and at lower KL budgets - under capacity pressure the policy extrapolates on the simplest available cue.
6. **Implicit reward accuracy decouples from policy quality.** Within a model size, there is *no* correlation between DAA implicit-reward accuracy on the preference dataset and downstream policy win-rate. The DAA loss itself fails to track quality.
7. **Mechanism: rank-deficient loss + offline OOD bootstrapping.** The DAA loss matrix Q is `|D| × |X×Y|` with `|X×Y| ≫ |D|`, so the loss has many minima - some placing high mass on out-of-distribution responses. In the token-MDP view, this is equivalent to the classical OOD-bootstrapping pathology of offline soft Q-learning, with smaller β producing more max-like (optimistic) value estimates.

---

## Methodology

### Setup

| Component | Details |
|---|---|
| **DAAs tested** | DPO `g(x)=-log σ(x)`, IPO `g(x)=(x−1)²`, SLiC-HF `g(x)=max(0, 1−x)` |
| **Base models** | Pythia 1B, 2.8B, 6.9B (main); Gemma2-2B (Appendix F) |
| **Datasets** | Reddit TL;DR summarization, 92K preference pairs (Stiennon et al.); Anthropic HH (Appendix F) |
| **Gold reward** | GPT-4 (`gpt-4-turbo-2024-04-09`) win-rate vs reference summaries on 256 held-out prompts, with positional flips |
| **KL control** | 7 values of β per (model × DAA) cell |
| **SFT init** | All models SFT'd on TL;DR before DAA training |
| **Training** | Batch 128, RMSProp `lr=0.5e-6`, 150-step linear warmup, **1 epoch**, 4 intermediate checkpoints |
| **Compute** | 1B → 2× A40; 2.8B → 4× A40; 6.9B → 4× A100 |
| **Caveat** | Single run per cell (no multiple seeds; acknowledged) |

### Scaling-law fit

```text
R(d) = d · (α − β log d),     d = √D_KL(π_θ ‖ π_ref)
```

Same functional form as Gao et al. 2023. The same form is verified against forward KL `D_KL(π_ref ‖ π_θ)` as the x-axis (Figure 5), addressing the obvious "DPO drives down likelihoods so reverse-KL is misleading" objection.

### Toy diagnostic

Three-token MDP `{y₁, y₂, y₃}` with dataset `{y₁≻y₂, y₂≻y₁}`. DPO loss is minimized **both** by π=(0.5, 0.5, 0) and π=(0, 0, 1.0): the optimizer can place all mass on the unseen token y₃. Extended to a tree-MDP and run at β ∈ {0.01, 0.1, 0.5} - at low β all three DAAs concentrate probability mass on a handful of OOD trajectories.

---

## Key Evidence

| Finding | Number / Result | Context |
|---|---|---|
| Goodhart hump | Present for DPO, IPO, SLiC at 1B / 2.8B / 6.9B | Hump-shape KL → win-rate |
| Scaling-law fit | `R(d) = d(α − β log d)` halves RMSE vs quadratic in KL | Same form as Gao 2023 |
| Within-epoch peak | Wide-KL configs peak at **~25%** of one epoch | Then decline as KL keeps climbing |
| Forward-KL form | Same scaling law fits forward KL too | Refutes "DPO just lowers likelihoods" |
| IPO robustness | 6.9B IPO shows "little to no over-optimization" | DPO ≈ SLiC degrade similarly |
| Model-size scaling | 1B "almost immediately" hacks; 6.9B better Pareto frontier | Same β, different KL trajectory |
| Length extrapolation R² | Highest for 1B and at low-KL budgets | `log π/π_ref ≈ γ̂|y|` fits best under capacity pressure |
| Implicit-reward ↔ policy quality | **No correlation within model size** for DPO, SLiC; weak positive for IPO driven by scale | Implicit reward is not a useful diagnostic |
| OOD mass in toy tree-MDP | All three DAAs concentrate mass on few OOD trajectories at low β | Confirms under-constrained-loss diagnosis |
| Generalization | Replicated on Gemma2-2B + Anthropic HH | Not Pythia/TL;DR specific |

---

## Conceptual Contribution

```text
┌──────────────────────────────────────────────────────────────────────┐
│  THE GOODHART CURVE SURVIVES REMOVAL OF THE PROXY REWARD MODEL       │
├──────────────────────────────────────────────────────────────────────┤
│  Gao et al. 2023:    PPO + proxy RM  ->  hump-shaped KL -> quality   │
│                      mechanism: RM under-trained + OOD on-policy     │
│                                                                      │
│  This paper:         DPO / IPO / SLiC ->  SAME hump, SAME law        │
│                      BUT no proxy RM, NO on-policy sampling          │
│                                                                      │
│  New mechanism:      DAA loss is rank-deficient (|X*Y| >> |D|)       │
│                      multiple minima, some put mass on OOD           │
│                      token-MDP: offline OOD bootstrapping            │
│                      small beta -> max-like Q estimates              │
└──────────────────────────────────────────────────────────────────────┘
```

The contribution reframes reward hacking: it is not a property of *having a proxy reward model* but of *optimizing a preference-based proxy with insufficient coverage*. Removing the reward model does not remove the problem; it relocates it into the under-constrained loss landscape.

---

## Critical Analysis: What This Does and Does Not Show

### Relationship to the Thesis

The thesis holds that LLMs optimize a proxy (next-token likelihood, learned reward, preference signal) rather than the goal (truth, helpfulness, intent). This paper provides a **clean controlled demonstration** of that gap on the optimization side:

- Removing the proxy reward model does not remove reward hacking.
- The implicit reward learned by the DAA loss is *uncorrelated* with policy quality within model size - the proxy and the goal have decoupled.
- The mechanism (under-constrained loss + OOD bootstrapping) is the optimization-side analogue of pattern matching: the model exploits any direction in the policy simplex that lowers the loss, including directions that place mass on completions never seen in the data.

### Honest Caveats

- Largest model is **6.9B** Pythia; whether the curves attenuate at frontier scale is open.
- **Single seed per configuration** - variance is not characterized.
- **GPT-4 win-rate as gold** - imperfect, mitigated only by positional flips.
- The paper is **diagnostic, not prescriptive**: Appendix A explicitly states it offers no mitigation method.
- Focused on **DPO/IPO/SLiC**; broader GPO-family (Tang et al. 2024) losses are not exhaustively tested.

Net assessment: a controlled, mechanistic demonstration that the Goodhart curve is fundamental to preference-based fine-tuning regardless of pipeline. Strong supports for the thesis on the alignment-optimization side.

---

## Relationship to Other Papers

### Supports / Extends

- **Spurious Rewards Paradox (#90, 2601.11061)**: convergent evidence that reward optimization activates shortcuts rather than learning the target capability - that paper for RLVR, this paper for DPO/IPO/SLiC.
- **Natural Emergent Misalignment from Reward Hacking in Production RL (#329, 2511.18397)**: extends the same failure mode to production-scale agentic RL; this paper supplies the controlled-scaling-law foundation.
- **Reasoning Models Don't Always Say What They Think (#15, 2505.05410)**: complements with the verbalization side - models exploit reward hacks but rarely declare them. This paper shows the optimization-side mechanism that produces such hacks.
- **How RLHF Amplifies Sycophancy (2602.01002, toread)**: theoretical covariance argument for *why* RLHF rewards drift from truth; this paper supplies the *empirical scaling law* showing the drift is universal across DAAs.
- **VERITAS (#248, 2510.13272)**: shows learned reward models in RAG underspecify faithfulness; this paper shows the dual problem - even when you remove the reward model, the proxy still hacks.

### Strengthened By

- **Park et al. (length-DPO disentangling)**: cited; length exploitation is one specific case of the general extrapolation-on-simple-features pattern this paper characterizes.
- **Azar et al. (IPO)**: cited; IPO's theoretical prediction that DPO under-constrains KL is empirically confirmed here.
- **Rafailov et al. 2024 "From r to Q\*"**: cited; supplies the token-MDP framework for the implicit bootstrapping diagnosis.
- **Hejna et al. 2024 (CPL)**: cited; supplies the rank-deficiency / null-space argument used in Proposition 1.
- **Concrete Problems in AI Safety (1606.06565, thoughts.md)**: this paper is empirical confirmation of cause #3 ("abstract rewards admit adversarial high-reward regions") and cause #4 (Goodhart) from the 2016 taxonomy, in the LLM-RL setting.

### Foundational Predecessor

- **Gao et al. 2023, "Scaling Laws for Reward Model Overoptimization" (arXiv 2210.10760)**: the direct predecessor. Same functional form, same Goodhart hump - but for PPO+RM. This paper extends the result to DAAs and supplies a new mechanism since Gao's mechanisms do not apply. Not yet in corpus; candidate for `toread.md`.

---

## REBUTTALS

### Known Direct Rebuttals

No direct arXiv rebuttal was found. Searches checked:

- Semantic Scholar citation graph (~100+ citing papers as of analysis): citing work either (a) proposes mitigations (KL regularizers, reference-policy updates, length controls) that **accept** the overoptimization phenomenon as given, or (b) extends the empirical demonstration to additional DAAs / model sizes. None refute the central claim that DAAs exhibit the Goodhart hump.
- Local corpus search: no contradicting paper found.

### Indirect Counter-Evidence / Tension

1. **Tang et al. 2024 (Generalized Preference Optimization)** proposes a unified GPO family within which one might argue specific loss choices avoid the hump. The paper here only tests DPO/IPO/SLiC and explicitly does not exhaustively cover GPO; this is an open empirical question, not a rebuttal.
2. **R-DPO (length-regularized DPO, Park et al.)** is shown in this paper *not* to eliminate overoptimization; if anything it can exacerbate it. So length-control approaches do not refute the finding.
3. **Online DPO / iterative DPO** literature (concurrent to this work) suggests iteratively refreshed reference policies mitigate the hump. This is consistent with - not a refutation of - the diagnosis: refreshing the reference policy reduces the OOD mass that the offline loss is free to place.

### Limitations Authors Acknowledge

1. Largest scale tested is 6.9B Pythia (compute-limited).
2. Single seed per (model × DAA × β) configuration.
3. GPT-4 win-rate as gold proxy (only positional flips control for bias).
4. Bradley-Terry preference assumption.
5. Diagnostic-only - no mitigation proposed (Appendix A).
6. Limited DAA coverage (no exhaustive GPO sweep).

---

## Key Quotes

> "DAAs do not use a separate proxy reward model, [yet] they still commonly deteriorate from over-optimization."

> "configurations with wider KL budgets achieve their best performance after training on only 25% of the data, after which performance starts decreasing in conjunction with increasing KL divergence metrics."

> "this scaling law accurately relates d and winrates for DAAs. Compared to a quadratic fit between D_KL(π‖π_ref) and winrates, this scaling law halves the RMSE."

> "in this framework DAAs may suffer from the classical OOD bootstrapping issue in offline RL... even though the objective is trained fully offline we still effectively query the model on the values of unseen tokens."

> "there are many possible policies π that can achieve the same optima, some of which will place a high weight on out-of-distribution responses."

> "under limited capacity, either from model capability or limited KL budgets, the model will extrapolate more strongly based on simpler features, which can lead to OOD issues."

> "within each particular model size, there is no discernible relationship between the DAA implicit reward accuracy and the actual policy performance."

> "In the case of the IPO objective, the 6.9B also exhibits significantly better control over the KL objective and shows little to no over-optimization behavior."

---

## Status
- [x] Read complete (full HTML/PDF via task agent, NeurIPS 2024 v2)
- [x] Core claims extracted with verbatim quotes
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Rebuttals checked (Semantic Scholar + corpus + arXiv)
- [x] Paper graph updated

---

## Critical Note for Thesis

Cite this paper as the canonical empirical demonstration that **reward hacking is not a property of having a proxy reward model - it is a property of optimizing a preference-based proxy with insufficient coverage**. The Goodhart curve is universal across PPO+RM (Gao 2023) and offline DAAs (this paper); removing the reward model relocates the failure into the under-constrained loss landscape rather than eliminating it. The specific scaling law `R(d) = d(α − β log d)` with `d = √KL` is reusable as a quantitative signature of the failure mode. The single most thesis-relevant null result is that **implicit reward accuracy does not predict policy quality** within model size - direct evidence that the proxy and the goal have decoupled.
