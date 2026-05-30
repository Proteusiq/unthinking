# Paper Analysis: When Do LLMs Reason? A Dynamical Systems View via Entropy Phase Transitions

## Metadata
- **arXiv ID**: 2605.22873
- **Title**: When Do LLMs Reason? A Dynamical Systems View via Entropy Phase Transitions
- **Authors**: Wei Xia, Haoqing Wang, Yehui Tang, Zhi-Hong Deng (Samsung Research Beijing + Peking University SKLGAI)
- **Date**: May 2026
- **License**: CC BY 4.0

---

## Core Claims

1. **Reasoning is not a static property of tasks or models — it is a dynamic decoding state.** Whether explicit reasoning helps emerges from the *interaction* between the specific model and the specific query, and only manifests during generation. It cannot be predicted from input features alone.
2. **CoT is often net-negative on factual / commonsense tasks.** Across 15 benchmarks and 4 models, there are documented accuracy drops of up to **−10.88 pp** when CoT is applied to retrieval/recall tasks (StrategyQA on Llama-3.2-3B), often at 50–425× the token cost of Direct decoding.
3. **Phase-transition framing.** The decoding process exhibits a transition between a *high-entropy exploratory regime* and a *low-entropy structured-reasoning regime*. When the transition occurs, CoT helps; when entropy oscillates or grows, CoT hurts.
4. **Early-stage entropy dynamics predict the outcome.** The first N=64 token entropies, summarized by three descriptors (cumulative entropy S_H, Spearman trend V_sp, Von Neumann ratio a_vnr), separate "CoT will help" from "CoT will hurt" with high reliability — even before generation is half-complete.
5. **Method (EDRM)**: a training-free routing framework that uses these entropy descriptors to choose between Direct / Standard / CoT per instance. Achieves 27–55% token reduction *while* matching or improving accuracy across all four tested LLMs.
6. **Even reasoning-distilled models over-reason.** Qwen3-4B-Instruct-2507 (with built-in "think mode") generates 642.5 tokens by default on tasks where Direct (a few tokens) does better. The same routing mechanism suppresses this over-reasoning.

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                         │
│                                                                      │
│  Whether a model "reasons" is not a property of the model or the    │
│  task — it is a dynamic state visible in the entropy of the first   │
│  ~64 generated tokens.                                              │
│                                                                      │
│  ┌──────────────────────────┐   ┌──────────────────────────┐        │
│  │  HIGH-ENTROPY EXPLORE    │   │  LOW-ENTROPY STRUCTURED  │        │
│  │  (oscillating/rising)    │ → │  (monotonic decrease)    │        │
│  │  CoT often HURTS         │   │  CoT helps               │        │
│  │  StrategyQA: -10.88pp    │   │  FOLIO: +significant     │        │
│  │  GPQA: -9.60pp           │   │  GSM8K: +significant     │        │
│  └──────────────────────────┘   └──────────────────────────┘        │
│                                                                      │
│  The transition is a PHASE TRANSITION in decoding dynamics, not     │
│  a capability that scaling unlocks.                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

**Three decoding paradigms (compared as baselines):**
- **Direct**: model instructed to answer immediately (4–7 tokens typical)
- **Standard**: minimal prompting, intrinsic dynamics surface (used for the entropy probe)
- **CoT**: explicit "think step by step" / think-mode-on

**Token-level entropy** at step i:
H_i = −Σ_v p_i(v) log p_i(v)

**Three sequential descriptors over first N=64 tokens:**
- **S_H** = Σ H_i (cumulative entropy)
- **V_sp** = Spearman correlation between step index and entropy (trend direction)
- **a_vnr** = Von Neumann ratio (volatility/oscillation measure)

Geometric regime classification:
- *Convergent reasoning*: V_sp negative + low a_vnr (monotonic entropy reduction)
- *Exploratory*: positive/oscillatory V_sp + larger a_vnr
- *Uncertainty-overload*: very large S_H (high uncertainty from the start)

**EDRM router**: assigns each instance to Direct/Standard/CoT based on its position in the (S_H, V_sp, a_vnr) manifold. Three variants:
- *EDRM-Global-E* (empirical dataset-level thresholds, 50 calibration samples)
- *EDRM-Global-C* (calibrated, cross-dataset)
- *EDRM-Inst-E / -C* (instance-level)
- *EDRM-MLP* (learned 3D-MLP router, trained on instance features)

**Models tested (4):** Llama-3.2-3B-Instruct, Llama-3.1-8B-Instruct, Qwen2.5-7B-Instruct, Qwen3-4B-Instruct-2507 (reasoning-enhanced, "think mode")

**Benchmarks (15):**
- Math: GSM8K, MultiArith, BBH
- Commonsense: CSQA, StrategyQA, PIQA, SIQA, MuSR
- Science: ARC-Challenge, ARC-Easy, GPQA
- Formal logic: FOLIO, ContextHub-Abd, ContextHub-Ded, LSAT

**Evaluation**: greedy decoding (T=0), max 4096 tokens, 8 seeds for variance, 50-sample calibration, k=0.07 router hyperparameter.

---

## Key Evidence

### CoT degrades performance on factual/commonsense tasks (smoking gun table)

| Benchmark | Model | Direct Acc | CoT Acc | Δ | Token cost (Direct → CoT) |
|---|---|---|---|---|---|
| **StrategyQA** | Llama-3.2-3B | 81.40 | 70.52 | **−10.88** | 4.3 → 225.9 (53×) |
| **StrategyQA** | Qwen3-4B-T | 79.61 | 69.43 | **−10.18** | — |
| **GPQA** | Qwen2.5-7B | 39.51 | 29.91 | **−9.60** | — |
| **GPQA** | Llama-3.2-3B | 33.93 | 24.78 | **−9.15** | 6.5 → 2762.7 (425×) |
| **GPQA** | Qwen3-4B-T | 36.16 | 27.01 | **−9.15** | (reasoning-enhanced!) |
| **StrategyQA** | Llama-3.1-8B | 81.09 | 74.50 | −6.59 | — |
| LSAT | Qwen2.5-7B | 61.35 | 57.68 | −3.67 | — |
| PIQA | Llama-3.2-3B | 75.52 | 72.52 | −3.00 | — |
| MuSR | Qwen2.5-7B | 54.89 | 52.78 | −2.11 | — |

**Authors' own characterization** (Appendix A.2): *"For benchmarks involving common sense or general knowledge ... In some cases, such as LSAT, GPQA, and StrategyQA, several models exhibit negative gains, suggesting that **for these specific tasks, generating a reasoning trace may introduce noise or errors, making direct decoding the superior strategy**."*

### Reasoning-enhanced models over-reason

| Model | Default tokens (CoT) | EDRM-Inst-E tokens | Savings |
|---|---|---|---|
| Qwen3-4B-T (reasoning-enhanced) | 642.5 | 401.1 | **37.6%** |
| Llama-3.1-8B | 642.5 | 335.1 | 47.8% |

> Authors call Qwen3-4B-T an "**adversarial circumstance**" for routing — the model is explicitly biased toward verbose reasoning but EDRM still detects when reasoning isn't needed.

### EDRM-Global routing performance (matches or beats CoT, halves tokens)

| Model | CoT Acc/Tok | EDRM-Global Acc/Tok | Acc Δ | Token Reduction |
|---|---|---|---|---|
| Llama-3.2-3B | 60.84 / 251.7 | 61.89 / 113.2 | +1.05 | **55.0%** |
| Llama-3.1-8B | 81.35 / 642.5 | 78.23 / 335.1 | −3.12 | **47.8%** |
| Qwen2.5-7B | 73.38 / 330.3 | 74.01 / 191.8 | +0.63 | **42.0%** |
| Qwen3-4B-T | 68.07 / 277.8 | 68.48 / 164.4 | +0.35 | **40.8%** |

### EDRM-Instance routing (peak accuracy gains)

| Model | CoT Acc | EDRM-MLP Acc | Δ | Token Savings |
|---|---|---|---|---|
| Llama-3.2-3B | 60.84 | **66.64** | **+5.80** | 28.9% |
| Llama-3.1-8B | 68.07 | 72.27 | +4.20 | **46.0%** |
| Qwen2.5-7B | 73.38 | **78.11** (Inst-E) | **+4.73** | 26.5% |

### Stability under sampling/threshold variance

- EDRM-Global-E and -C produce **identical routing decisions across 8 random seeds** on Llama-3.2-3B
- Per-dataset accuracy variance < 1.8×10⁻³ on Llama-3.2-3B (5.5×10⁻³ worst case on Qwen3-4B-T)
- D:S:C routing counts are highly concentrated: 8:0:0 for ARC-C, 0:0:8 for FOLIO (perfectly consistent across seeds)

### Ablation: 3D feature synergy is necessary

| Variant | Llama-3.2-3B Acc/Tok | Δ vs Full |
|---|---|---|
| Full EDRM-Inst-E | 65.24 / 179.4 | — |
| w/o Fallback (Direct branch) | 59.98 / 177.1 | **−5.26 acc** |
| w/o S_H | 59.88 / 185.9 | −5.36 acc |
| w/o a_vnr | 58.94 / 181.5 | −6.30 acc |

Removing the fallback Direct branch reduces accuracy **3.5–4.8% across all models** — even when routing favors Standard/CoT, mid-generation drift can fail. Removing S_H breaks "early uncertainty overload" detection (+43.8 tokens on Qwen3-4B-T). Removing a_vnr leaves V_sp susceptible to local noise — can't distinguish "genuine convergence" from "spurious oscillation".

### Task-aware allocation (BBH vs StrategyQA, Llama-3.2-3B)

| Task | CoT tokens | EDRM-MLP tokens | Compression |
|---|---|---|---|
| BBH (high reasoning) | high | high (boosts 53.55 → 59.35 acc) | minimal |
| StrategyQA (low reasoning) | 225.9 | **90.7** | **2.5× shrink** |

---

```
┌──────────────────────────────────────────────────────────────────────┐
│  THE THREE ENTROPY REGIMES                                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  CONVERGENT REASONING        EXPLORATORY              UNCERTAINTY    │
│                                                       OVERLOAD       │
│  V_sp < 0, low a_vnr         V_sp > 0 or oscillates   Large S_H      │
│  Stable entropy decrease     Unstable trajectory      Never converges│
│                                                                      │
│        ↓                            ↓                       ↓        │
│                                                                      │
│  CoT HELPS                   CoT HURTS or WASTES      CoT is futile  │
│  (FOLIO, BBH, GSM8K)         (StrategyQA, ARC-E)      (some GPQA)    │
│  Route → CoT                 Route → Direct           Route → Direct │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: SUPPORTS** (strong direct evidence, especially for the "CoT is not universally beneficial" subclaim)

This paper provides exceptionally clean evidence for several thesis components:

1. **Smoking gun: CoT is net-negative on a substantial slice of benchmarks.** The 10.88 pp drop on StrategyQA at 53× token cost is among the strongest quantified examples of CoT degrading rather than enabling reasoning. Crucially, this happens *even on a reasoning-distilled model* (Qwen3-4B-T: −10.18 pp on StrategyQA, −9.15 pp on GPQA). The premise that "more reasoning tokens = more reasoning" is empirically falsified for whole categories of tasks.

2. **Reframes reasoning as a decoding regime, not a capability.** The "dynamic decoding state" framing is exactly the predictive-not-reasoning thesis articulated mechanistically: there is no "reasoning module" that activates — there is a generation trajectory that *happens to* converge to a structured low-entropy regime when the model's pattern-matched answer space is narrow, and *happens to* oscillate when it isn't. Reasoning emerges from the trajectory; it is not deployed by the model.

3. **The phase-transition framing supports a mechanism explanation.** A model that "truly reasoned" should be able to enter a structured regime *on demand* (when explicitly prompted to think). Instead, whether it does depends on the *interaction* with the specific query — and is observable from the entropy alone. This is the signature of pattern completion under high vs low retrieval ambiguity, not deliberate reasoning.

4. **Connects directly to Paper #354 (Premature Confidence).** Both papers use truncation-probing / early-window dynamics to detect whether CoT will be "real" or post-hoc. #354 measures confidence trajectory; this paper measures entropy trajectory. They are dual diagnostics of the same underlying phenomenon: the model has already settled into a pattern-matched answer space early in generation.

5. **Reasoning-enhanced models over-reason in exactly the predicted way.** Qwen3-4B-T, which has built-in "think mode," still generates 642.5 tokens on commonsense tasks where Direct (a few tokens) does *better*. The reasoning-distilled training did not teach the model when reasoning helps — it taught the model to always generate reasoning-shaped output. The substance is performative, not functional.

6. **The EDRM method works because the diagnostic is reliable** — and that fact is itself thesis-supporting. If reasoning were a deep cognitive capability, you wouldn't expect a 3D entropy descriptor over the first 64 tokens to predict its utility. The fact that such a shallow signal *does* predict CoT efficacy with high reliability supports the view that what we call "reasoning" is a surface-level decoding regime.

The only mitigating element is that the paper *also* shows CoT helps a lot on FOLIO, formal logic, BBH — there are real CoT gains on real reasoning tasks. So this is not "CoT is never reasoning" — it is "CoT is only reasoning sometimes, and not where authors assume." That is consistent with the thesis being correctly nuanced: predictive completion produces *both* genuine multi-step computation (when the task structure aligns with training-distribution algorithmic patterns) *and* fluent confabulation (when it doesn't), and the difference is detectable in decoding dynamics.

---

## Relationship to Other Papers

### Supports

- **#354 Premature Confidence (2605.24396)** — direct sibling. Both use early-decoding-window probes to predict CoT failure. PCS uses confidence trajectory; EDRM uses entropy trajectory. Both find that the trajectory is set early (within first ~64 tokens / first 10% of CoT) and predicts whether reasoning is "real" or post-hoc.
- **#309 EDIS (2602.01288)** — direct methodological predecessor. EDIS diagnoses LLM reasoning via entropy dynamics; this paper extends that diagnosis into a phase-transition framework + routing method.
- **#162 Pfau et al. 2024 — Dot by Dot (2404.15758)** — both show that CoT tokens are not inherently reasoning-bearing; their contribution depends on the task–model coupling.
- **#149 / #312 Turpin 2023 (2305.04388)** — same family: CoT tokens are often disconnected from the model's actual computation, especially on tasks where pattern-matching already produces an answer.
- **#8 Lanham 2023 (2307.13702)** — early-answering measurement methodology. EDRM's N=64 entropy probe is the "shape of the generation early on" dual of Lanham's "did the model commit early?"
- **#130 Overthinking of o1-like LLMs (2412.21187)** — same finding: reasoning-trained models generate excessive reasoning tokens that don't improve outcomes, here demonstrated quantitatively with the Qwen3-4B-T 642.5 → 401.1 token reduction.

### Extends

- **Sprague et al. 2024 "To CoT or not to CoT" (2409.12183)** — extends from task-categorical view ("CoT helps on math and symbolic") to instance-level dynamic view ("CoT helps when entropy enters the convergent regime"). Sprague is task-centric; this paper is task×model×instance-centric.
- **Liu et al. 2024 "Mind your step" (2410.21333)** — same finding (CoT can hurt) with mechanistic explanation: it hurts when entropy doesn't enter the convergent regime.

### Challenges

- The static / mechanistic-circuit view of reasoning (Kim 2024 syllogism circuits, Conmy 2023 ACDC, Wang & Zhou 2024 reasoning-without-prompting). Direct quote from §2: "**The static view treats reasoning as a fixed property of models or tasks** ... In contrast, the dynamic view models reasoning as a conditional, emergent state during decoding." This paper sides explicitly against the static view.
- The default-CoT deployment paradigm (think-mode-on in reasoning-distilled models). EDRM's effectiveness on Qwen3-4B-T shows this default is wrong on a substantial fraction of tasks.

---

## REBUTTALS

### Known Rebuttals
- No direct rebuttals (paper is May 2026).
- Related counter-view: the "circuit-discovery" line (Conmy 2023, Olsson 2022, Wang 2022) that treats reasoning as discoverable stable circuits. This paper does not directly engage with that line — it provides an *alternative* framing rather than refuting the circuit findings.
- The closest competitor — **Liu et al. 2025 Token-Signature (2506.06008)** — also uses decoding features to predict CoT gains, but only does binary CoT/Direct routing. EDRM beats it on accuracy/token tradeoff.

### Limitations (Authors Acknowledge)

1. **Probing overhead**: EDRM requires generating ~64 probe tokens per instance before routing — moderate overhead vs pure Direct decoding (negligible on tasks where Standard/CoT is selected anyway, since those tokens are reused).
2. **Scale limit**: experiments confined to 3B–8B open-source instruct models. No evidence the framework generalizes to >70B models or API-only systems.
3. **Modality limit**: text-only. Multimodal extension unproven.
4. **Calibration dependency**: 50-sample dataset calibration is needed per benchmark; cross-dataset transfer (EDRM-Global-C) works but not perfectly.
5. **Hyperparameter k=0.07** is fixed across models — not theoretically derived.
6. **No causal intervention**: the paper shows entropy *predicts* CoT failure; it does not show that intervening on entropy (e.g., forcing convergence) *causes* better reasoning. The causal arrow remains observational.

### Independent Assessment

The strongest piece of evidence is the **per-benchmark CoT-vs-Direct table**, where multiple models show 9–11 pp accuracy drops from invoking CoT on commonsense/factual tasks, often at 50–425× the token cost. This is published, quantified, multi-model evidence that the default-CoT deployment pattern is harmful on a substantial slice of real benchmarks — not a fringe edge case.

The phase-transition framing is well-supported by Figure 3 (entropy trajectories) and the Figure 2 heatmap, where the (V_sp, S_H) plane clearly separates positive-gain from negative-gain regions. The framing isn't merely metaphorical — it's an empirical regularity.

The methodological convergence with Paper #354 (Premature Confidence) is striking and underappreciated. Both papers independently discover that early decoding dynamics (first ~10% of generation / first 64 tokens) predict whether the rest of the CoT will be substantive or filler. The two diagnostics are different (confidence trajectory vs entropy trajectory) but they almost certainly measure facets of the same underlying phenomenon: by the time the model has emitted a few dozen tokens, the answer is essentially determined by pattern-matched retrieval, and the remaining generation is either honest expansion of that pattern (when the pattern is correct) or post-hoc confabulation (when it isn't).

The "reasoning-enhanced model still over-reasons" finding (Qwen3-4B-T) is independently significant: it falsifies the common assumption that the new generation of reasoning-distilled / "think-mode" models has solved the over-reasoning problem. The over-reasoning is now in the *post-training distribution*, not just the prompting interface.

Mitigating: the paper is a routing-methods paper, not a thesis paper. The thesis-relevant findings are concentrated in §3.2 (systematic analysis) and the appendix tables. The authors clearly position themselves in the "adaptive efficient reasoning" literature; they don't claim a strong "LLMs aren't reasoning" interpretation. But the data is what it is, and the data supports the thesis.

---

## Key Quotes

> "Empirical evidence reveals a striking paradox: CoT often provides marginal or even negative gains on factual and open-ended tasks while multiplying token consumption." *(Abstract)*

> "LLM reasoning is not a static property of tasks or models, but a *dynamic decoding state* that emerges during generation." *(Abstract)*

> "Tasks benefiting from CoT exhibit a consistent entropy reduction pattern, while low-gain tasks show unstable or increasing entropy trajectories. These distinct dynamics arise even under the same model, indicating that **reasoning is not a fixed property but an emergent behavior conditioned on the model-task pair**." *(§1)*

> "The decoding process shifts from a high-entropy exploratory regime to a low-entropy structured reasoning regime when explicit reasoning becomes beneficial ... **reasoning is not a binary capability, but a controllable transition in the model's generation dynamics**." *(§1)*

> "Successful reasoning corresponds to a phase-transition-like shift from high-entropy exploratory regimes to low-entropy structured convergence, while **ineffective reasoning remains trapped in oscillatory or divergent dynamics**." *(§5 Conclusion)*

> "Reasoning is better understood as a controllable decoding state that should be invoked selectively based on real-time generation dynamics rather than static task categories." *(§5)*

> "For these specific tasks [LSAT, GPQA, StrategyQA], generating a reasoning trace may introduce noise or errors, making direct decoding the superior strategy." *(Appendix A.2)*

> "Tasks of high CoT gain show decreasing trend while low ones show oscillation or increase." *(Figure 3 caption)*

> "Cells are dominated by negative ΔU, consistent with the observation that **CoT often overthinks and wastes tokens when uncertainty drifts upward**." *(Appendix A.4)*

> "This demonstrates that entropy dynamics provide reliable routing signals **even when models are explicitly biased toward verbose reasoning**." *(§4.2.3, on Qwen3-4B-T)*

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Follow-up: Cited papers not yet in corpus (priority for triage)

These three are central thesis-relevant predecessors that should be promoted to `toread.md`:

| arXiv ID | Title | Why priority |
|---|---|---|
| 2409.12183 | Sprague et al. — "To CoT or not to CoT? Chain-of-thought helps mainly on math and symbolic reasoning" | Foundational task-categorical CoT-skepticism paper |
| 2410.21333 | Liu et al. — "Mind your step (by step): chain-of-thought can reduce performance on tasks where thinking makes humans worse" | Direct evidence that CoT degrades performance |
| 2506.06008 | Liu et al. — "Token Signature: predicting chain-of-thought gains with token decoding feature in large language models" | Closest methodological competitor to EDRM |
