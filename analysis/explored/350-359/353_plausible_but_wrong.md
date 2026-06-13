# Paper Analysis: Plausible but Wrong - A Case Study on Agentic Failures in Astrophysical Workflows

## Metadata
- **arXiv ID**: 2604.25345
- **Title**: Plausible but Wrong: A Case Study on Agentic Failures in Astrophysical Workflows
- **Authors**: Shivam Rawat, Lucie Flek (CAISA Lab + bonn-aachen IIT, University of Bonn)
- **Date**: April 2026
- **License**: CC BY 4.0

---

## Core Claims

1. **The most concerning agentic failure mode is not crashing - it is confidently producing plausible-looking but incorrect results.** When CMBAgent (a published autonomous-science framework) is stress-tested on 18 astrophysical tasks, the primary failure mode is *silent incorrect computation*: syntactically valid code that produces fluent outputs with the right shape but wrong content.
2. **Domain context drives ~6× performance, not raw reasoning.** With identical GPT-4o-mini backbones, Final Score goes from ≈0 (raw LLM) to 0.15 (agent without CAMB docs) to 0.85 (agent with CAMB docs). The performance is in the retrieval-augmented context, not in the agent's reasoning.
3. **Without context, "wrong computation" dominates over "execution failure".** When the CMBAgent loses its retrieval grounding, ≈47% of trials fall into Mode C (code runs, parameters configured, but numerical output is wrong) - exactly the predicted "plausible but wrong" pattern.
4. **Failure transparency is uniformly ✗ across all Deep Research tasks (4/4).** The agent never proactively flags pathologies in its own outputs - even when posteriors are physically impossible (NFW concentration c < 2), unit scales are inconsistent across trials, or known statistical degeneracies are being silently violated.
5. **The agent treats prior-dominated posteriors as measurements.** On T1 (SN1a), the prompt was designed to expose the H₀–M_B degeneracy. All 4 completed trials added H₀ as a free parameter, recovered "H₀" that was simply the flat prior, and reported it as a genuine measurement. PRS = 0.97 *hides* this scientific failure.
6. **Plausible visualizations conceal physically impossible posteriors.** On T2 (NGC 3198 rotation curve), trials produce "visually acceptable" fits whose NFW halo concentrations are physically impossible (c ≈ 1.19, when c < 2 violates the NFW model). The fit looks right; the physics is broken; the agent reports both without caveat.

---

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                         │
│                                                                      │
│  "Agentic systems do not primarily fail by crashing - they fail by  │
│   producing confident, incorrect results or by silently breaking    │
│   pipelines without diagnosis."                                     │
│                                                                      │
│  Failure transparency (does the agent flag known pathologies        │
│  in its own outputs?) is ✗ on every single Deep Research task.      │
│                                                                      │
│   T1  SN1a               PRS=0.97 ✓ - but silent: H₀ is a prior,    │
│                          not a measurement, and the agent doesn't   │
│                          know the difference                        │
│   T2  NGC 3198           PRS=0.05 ✗ - physically impossible NFW     │
│                          concentrations reported as results         │
│   T3  Exoplanets         PRS=0.73 ∼ - inconsistent unit scales      │
│                          across trials, prior boundary pathology    │
│   T4  SLACS lensing      PRS=0.00 - only 1/5 trials produced any    │
│                          output; the other 4 failed SILENTLY        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Methodology

### System Under Test: CMBAgent

Published autonomous-science framework (Xu et al. 2025, arXiv:2507.07257), backbone of the Denario project for end-to-end scientific discovery. Three operational modes (the paper evaluates two):

- **One-Shot**: single reasoning + execution pass, up to 50 reasoning rounds. Two variants tested:
  - *With CAMB context*: full intended deployment, retrieval-augmented with CAMB docs
  - *Without context*: same agent, no retrieval - isolates the contribution of grounding vs. the agent itself
- **Deep Research**: full Planning + Control architecture with critique and retry modules. 50 planning rounds + 100 control rounds + up to 5 execution retries per substep
- Baseline: **Base LLM** (raw GPT-4o-mini, single-turn call, no agentic scaffolding)

### Task Suite (18 total)

**Tool-Grounded Precision Tasks (14):** CAMB-library cosmological computations stratified by API interaction complexity (single call → multi-API + delensing pipeline + ratio computation).

**Astrophysical Research-Driven Tasks (4):** Two categories:
- *Under-constrained inference* (T1 SN1a, T2 NGC 3198): designed to probe whether the agent detects known statistical degeneracies (H₀–M_B; NFW mass-concentration) it cannot break from the given data alone
- *Compositional Bayesian* (T3 exoplanet mass-radius, T4 SLACS strong lensing): no artificial degradation; probe whether agent sustains physical consistency across multi-stage pipelines

### Metrics

**One-Shot (automated, against reference CSV):**
- **ESR** (Execution Success Rate): binary; pipeline produced valid output of right shape (≥2 cols, ≥95% x-range, ≥95% N points). Does *not* check correctness.
- **PAS** (Parameter Accuracy Score): AST-parsed parameter values vs reference, weighted by physical importance
- **NAS** (Numerical Accuracy Score): 0.2·NRMSE + 0.3·SMAPE + 0.5·CCC against reference curve
- **Final Score**: PAS × NAS if ESR=1, else 0

**Failure Mode Taxonomy (mutually exclusive):**
- **Mode A**: Code failure (ESR=0)
- **Mode B**: Wrong parameters (ESR=1, PAS<0.5) - code runs, wrong CAMB config
- **Mode C**: **Wrong computation** (ESR=1, PAS≥0.5, NAS<0.5) - params correct but numerical output wrong
- **Mode D**: Correct (ESR=1, PAS≥0.5, NAS≥0.5)

Sub-flag: trials with CCC>0.8 but NRMSE<0.7 = unit/normalization error (right shape, wrong amplitude).

**Deep Research (qualitative):**
- **PRS** (Parameter Recovery Score): posterior median vs literature, saturates at 3σ
- **PP** (Physical Plausibility): ✓ / ∼ / ✗
- **FT** (Failure Transparency): does the agent flag known degeneracies, biases, or convergence issues? ✓ / ∼ / ✗

### Protocol

- 10 trials per task-system combination → 420 One-Shot trials total
- 5 trials per Deep Research task = 20 trials total
- Base LLM sampling T=0.2; agent runs at default config
- Ground truth: reference CSV from CMBAgent benchmark repo (One-Shot); literature posteriors (Deep Research, Table I)

---

## Key Evidence

### One-Shot results (system-level)

| System | ESR | PAS | NAS | Final Score |
|---|---|---|---|---|
| **CMBAgent + CAMB context** (full system) | 0.96 | 0.95 | 0.86 | **0.85** |
| **CMBAgent without context** | 0.62 | 0.54 | 0.18 | **0.15** |
| **Base LLM (GPT-4o-mini direct)** | 0.09 | - | - | **≈0** |

**The full system is ~6× better than the no-context variant; the no-context variant is the same GPT-4o-mini wrapped in agentic scaffolding.** Performance lives in retrieval-augmented context, not in the agent's planning/reasoning.

### Failure mode distribution

| System | Mode A (crash) | Mode B (wrong params) | Mode C (wrong computation) | Mode D (correct) |
|---|---|---|---|---|
| CMBAgent + context | ~3% | small | small | ~85% |
| CMBAgent no context | ~38% | small | **~47%** | ~15% |
| Base LLM | **~91%** | - | - | ~9% |

**The most striking result**: when grounding is removed, ~47% of trials are **Mode C** - code runs, parameters configured, but the *output is wrong*. The "plausible but wrong" failure mode is the dominant failure mode, not crashes.

### One-Shot silent failures even *with* full context

Two tasks where CMBAgent + context fails silently despite scoring near-1 elsewhere:

| Task | Final Score | Failure |
|---|---|---|
| **Task 10** | 0.09 | Most trials omit `raw_cl=True` → ~10⁵ amplitude error. All trials omit tensor B-mode contribution. |
| **Task 14** | 0.02 | Agent computes per-ℓ delensing efficiency correctly, then collapses to scalar mean → CCC ≈ 0 |

Both failures stem from **output construction errors** the documentation doesn't cover. The agent doesn't know what it doesn't know - and reports the output without caveat.

### Deep Research results (the smoking gun table)

| Task | Category | Trials completed | PRS | Physical Plausibility | **Failure Transparency** |
|---|---|---|---|---|---|
| T1 SN1a | Under-constrained | 4/5 | **0.97** | ∼ | **✗** |
| T2 NGC 3198 | Under-constrained | 5/5 | **0.05** | ✗ | **✗** |
| T3 Exoplanets | Compositional | 5/5 | **0.73** | ∼ | **✗** |
| T4 SLACS | Compositional | 1/5 | **0.00** | ✓ | **✗** |

**Failure transparency = ✗ on 4 out of 4 tasks.** The agent never proactively flags pathologies in its own outputs.

### T1 - the "PRS=0.97 hides scientific failure" case

- Reference: Ω_Λ = 0.720 ± 0.020 (Union2.1)
- Agent recovered: Ω_Λ = 0.722 ± 0.001 across 4 trials → PRS = 0.97
- **BUT**: All 4 trials silently added H₀ as a free parameter, recovered "H₀" that is just the flat prior H₀ ∈ [50, 90], and reported it as a measurement
- The H₀–M_B degeneracy is well-known and unbreakable from SN1a data alone. A reliable agent should *flag* this; instead, the agent confidently reports prior values as measurements.
- "Two silent failures on completed trials - the unauthorised addition of H₀ as a free parameter yielding a prior-dominated posterior, and a runtime constraint violation - neither flagged by the agent."

### T2 - physically impossible posteriors reported as results

- Reference: log₁₀(M₂₀₀/M☉) = 11.97 ± 0.15, c = 6.8 ± 2.0
- 5/5 trials: mass spanned [10.0, 12.9] - nearly 3 orders of magnitude. None within 5σ of reference.
- 2 trials: c < 2 (physically impossible for an NFW halo)
- 1 trial: c ≈ 30 (hit upper prior boundary)
- Representative trial: "log₁₀(M₂₀₀/M☉) = 12.90⁺⁰·⁰⁶₋₀·₀₅ (~6σ above reference), unphysical concentration c = 1.19⁺⁰·²¹₋₀·₁₄ ≪ 2. The agent reported these values without flagging the pathology."
- "Despite a visually acceptable total model (red), the inferred NFW halo parameters are unphysical: the dark matter contribution (purple) is entirely dominant at all radii, inconsistent with the observed baryonic components."

### T3 - inter-trial parameterization drift

- Reference: α_N = 0.67 ± 0.05, α_J = −0.06 ± 0.07, M_br = 127 ± 17 M_⊕
- Trial 1: α_J = 0.368 (6.1σ off, wrong sign AND magnitude); M_br = 203 M_⊕ (4.5σ above)
- Trial 3: "log M_b = 4.94 on inconsistent unit scale" - *parameterization drift between trials*; cannot be compared
- Trial 4: σ_int pinned at prior boundary (0.5) - clear sign of inadequate prior
- "No caveat was generated by the agent."
- "The fit appears visually reasonable, illustrating how plausible-looking outputs can mask underlying parameterization failures."

### T4 - silent crash with no error diagnosis

- Reference: f = 1.019 ± 0.008
- Only **1 of 5 trials completed**
- "The remaining four failed silently with no figures or error diagnosis"
- The one completed trial: f ≈ 1.05 (~4σ bias). The systematic offset is not flagged by the agent.
- **PRS = 0.00**

---

```
┌──────────────────────────────────────────────────────────────────────┐
│  CONTEXT IS DOING THE WORK, NOT REASONING                            │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Same GPT-4o-mini backbone:                                          │
│                                                                      │
│  Final Score                                                         │
│    0.85  ████████████████████  CMBAgent + CAMB documentation        │
│    0.15  ████                  CMBAgent without documentation       │
│   ≈0     ·                     Raw GPT-4o-mini, single call         │
│                                                                      │
│  The 6× improvement is from retrieval-augmented context, not        │
│  from "the agent thinking harder". Strip the docs → the same        │
│  agent generates plausible code with the wrong API calls,           │
│  curves with the right shape but wrong amplitude (Mode C 47%).      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Thesis

**Stance: SUPPORTS** (strong direct evidence)

This is one of the cleanest empirical demonstrations of the predictive-not-reasoning thesis applied to agentic systems. The mechanism is documented quantitatively with ground-truth physics references:

1. **"Plausible but wrong" *is* the predictive-generation thesis named.** The paper's title and Mode C taxonomy directly operationalize the central thesis claim: that LLMs / LLM-agents produce fluent, well-structured outputs whose surface plausibility is *decoupled* from their correctness. The Conclusion sentence - *"outputs are consistently plausible, but failures remain unreported"* - is essentially a one-line statement of the thesis applied to multi-step workflows.

2. **The agent cannot detect known statistical degeneracies it was designed to probe.** T1 is the cleanest demonstration. The H₀–M_B degeneracy is *textbook*. The prompt was specifically designed to expose it. The agent has 50 planning rounds, 100 control rounds, critique and retry modules. It still silently treats the prior as a measurement. If the agent were "reasoning" about the data, it would notice that the H₀ posterior is flat (= the prior). It doesn't. It pattern-matches "fit two parameters → report two posteriors" and the post-hoc text reports both.

3. **Plausibility decoupled from correctness, mechanistically.** T2 produces a "visually acceptable" total model whose dark matter contribution is "entirely dominant at all radii, inconsistent with the observed baryonic components". The fit looks right; the underlying physics is impossible (c < 2 for an NFW halo). The agent's generation is grounded in pattern-matched visual coherence, not physical reasoning.

4. **Context, not reasoning, drives performance.** The 6× gap between with-context and without-context is the deepest finding. *Same agent, same model, same 50 reasoning rounds - strip the documentation and Mode C (wrong computation) jumps to 47%.* The reasoning architecture is largely inert without retrieval grounding. The "agent" is mostly a retrieval-and-execute pipeline; its "reasoning" is the surface gloss.

5. **Failure transparency is ✗ across the board.** The agent *never* proactively flags pathologies in its own outputs. This is the *predicted* failure mode of a pattern-completing system: it generates whatever text or code completes the request pattern. Self-doubt, hedging, or pathology-detection require the model to *compare* its output against what it should be - which is not what next-token prediction does.

6. **The architecture doesn't fix it.** This isn't a "small model" problem or a "no scaffolding" problem. Deep Research has critique modules, retry budgets, and dedicated agents for planning vs control. None of this catches the failure modes. The architectural scaffolding generates more text *around* the wrong answers, not actual self-correction.

7. **Backbone is GPT-4o-mini** - a competent recent model, not a tiny base LLM. The failures aren't "GPT-2 hallucination". They are a recent production-grade model with full tool access producing plausible-looking, scientifically wrong results.

The single mitigating finding: when documentation *is* available, the system scores 0.85 - high. So this is not "agents can't do science". It is "agents can execute well-documented, well-specified tasks with high reliability, but their behavior on under-specified or compositional tasks reveals that the underlying mechanism is pattern-completion, not reasoning." That distinction is exactly what the thesis predicts.

---

## Relationship to Other Papers

### Supports

- **#33 Limits of Emergent Reasoning in Agentic Settings (2510.15974)** - same finding via a different agentic benchmark. Multi-step agentic reasoning fails systematically on tasks that look superficially similar to training-distribution tasks.
- **#122 The Reasoning Trap: Reasoning Amplifies Tool Hallucination (2510.22977)** - direct mechanism. CoT reasoning amplifies tool-use hallucination; this paper shows the consequence in scientific workflows where the hallucinated tool output looks plausible but is wrong.
- **#225 Beyond Hallucinations: Illusion of Understanding (2510.14665)** - same framing: the *appearance* of understanding is decoupled from understanding. "Plausible but wrong" is the agentic instantiation.
- **#337 From Plan to Action: How Well Do Agents Follow the Plan? (2604.12147)** - same family, complementary mechanism: agents don't actually execute the plans they generate.
- **#339 YC-Bench (2604.01212)** - agents fail at long-horizon consistent execution; this paper shows what those failures look like when the domain is science.
- **#354 Premature Confidence (2605.24396)** - the model commits to a pattern-matched answer before reasoning. T1 is the agentic version: the agent commits to "fit both parameters" before checking degeneracy.
- **#355 Entropy Phase Transitions (2605.22873)** - CoT can be net-negative on factual tasks; here CoT-scaffolded agents are net-negative on degeneracy-aware tasks.
- **#301 Reflexion (2303.11366)** - uses verbal self-critique to improve. This paper's T1–T4 show the limits: even with planning + critique + retry budgets, the agent never self-flags pathologies it produced.
- **#107 Two Pathways to Truthfulness (2601.07422)** - encoding-level evidence that LLMs *can* detect their own falsehoods internally; this paper shows that in an agentic deployment, that signal is not used.

### Extends

- **Hallucination survey literature** (#166 Hallucination is Inevitable, #186 Open World): extends from single-step hallucination to multi-step *silent* hallucination in tool-using agents.
- **#33 Limits of Emergent Reasoning**: same agentic failure mode, demonstrated in a different scientific domain (astrophysics vs general).

### Challenges

- The Denario project (Villaescusa-Navarro 2025) and broader "agentic AI for science" framing that emphasizes feasibility over reliability. The authors say it directly: *"existing work largely evaluates such systems through task-level success or synthetic benchmarks, offering limited insight into their reliability in realistic scientific settings."*
- Claims that planning + critique + retry modules in agentic frameworks solve reasoning failures. This paper shows that Deep Research's planning + critique + retry budget catches *execution* failures (it handles deprecated API calls) but not *scientific* failures.

---

## REBUTTALS

### Known Rebuttals
- No direct rebuttals (paper is April 2026).
- The CMBAgent / Denario authors could respond that Human-in-the-Loop mode (excluded from this study) catches these failures. The authors pre-empt: HITL is excluded specifically to assess *autonomous* reliability, which is the deployment mode that matters for scientific use without expert review.

### Limitations (Authors Acknowledge - mostly implicit)

The paper has no explicit Limitations section. Implicit limitations:

1. **Single-system study**: only CMBAgent evaluated. The authors do not claim generalizability beyond it. The strength of their conclusion sentence (*"agentic systems do not primarily fail by crashing"*) goes beyond their evidence base.
2. **Single backbone**: only GPT-4o-mini tested. Larger backbones (GPT-4o, o1, Claude 3.5) might fix some failures (or expose new ones). Authors do not engage with this.
3. **Small Deep Research N=5 per task**: qualitative assessment, not statistical aggregation. Sample size is acknowledged but not flagged as a weakness.
4. **PAS metric overestimate**: authors note their weighting "underpenalises extension-parameter errors", making PAS a slight overestimate. Honest qualification.
5. **HITL excluded**: this is by design but is a real limitation - many deployments will involve human oversight.
6. **Astrophysics testbed**: well-defined physics → strong ground truth. Other domains may have weaker reference solutions, making "plausible but wrong" harder to detect - but the same failure mode likely exists.

### Independent Assessment

The empirical core is very strong. The Mode C taxonomy is precise: ESR=1 ∧ PAS≥0.5 ∧ NAS<0.5 = "code runs, parameters configured correctly, numerical output is wrong". This is the operationalization of "plausible but wrong" with clean threshold definitions. 47% Mode C without context is striking.

The T1 result (PRS=0.97 *masking* a scientific failure) is the conceptual highlight of the paper. PRS measures whether the *number* matches the reference - but the number matched only because the question was asked wrongly and the agent answered the wrong question fluently. This is the predictive thesis demonstrated: surface-level metric satisfaction decoupled from underlying scientific validity. The agent satisfied the request pattern ("estimate H₀ and Ω_Λ"); it never asked whether the request was well-posed.

T4's silent crash (4/5 trials → no output, no error) is also notable: the failure mode includes the *absence* of failure signaling. The agent doesn't even report that it failed to run.

The 6× context-driven performance gap is the deepest finding, though it gets less emphasis than the silent-failure analysis. With identical backbone and architecture, retrieval-augmented context is doing 85% of the work. The "agent" provides ~15%. This is the predictive thesis at the *system* level: the value-add of multi-step agentic scaffolding over a single LLM call + retrieval is modest, and the failures of the scaffolded version look exactly like the failures of the base version, just dressed up in more fluent output.

The fact that GPT-4o-mini (a competent recent model) plus 50 planning rounds plus 100 control rounds plus critique modules plus retry budgets *still* cannot detect a textbook statistical degeneracy on T1 is a very strong piece of evidence. The architectural complexity is not compensating for the underlying mechanism.

The limitation worth taking seriously: this is *one* agentic system on *one* domain. A skeptical reader could argue the silent-failure pattern is a CMBAgent design issue (insufficient self-critique in its prompts, weak retry signal, etc.). The counter-argument is that *every* publicly-deployed agentic system that uses similar scaffolding (planning + critique + retry) would face the same problem because the failure mechanism is in the underlying LLM, not the scaffolding.

---

## Key Quotes

> "The most concerning failure mode in agentic scientific workflows is not overt failure, but confident generation of incorrect results." *(Abstract)*

> "In the Deep Research setting, the system frequently exhibits silent failures across stress tests, producing physically inconsistent posteriors without self-diagnosis." *(Abstract)*

> "Agentic systems do not primarily fail by crashing-they fail by producing confident, incorrect results or by silently breaking pipelines without diagnosis." *(§VII Conclusion)*

> "Across all tasks, outputs are consistently plausible, but failures remain unreported. Failure transparency is the weakest dimension: the agent never proactively flags known pathologies in its own outputs." *(§VII Conclusion)*

> "Under-constrained tasks fail systematically: degeneracies go undetected which yield physically impossible posteriors, yet results are reported as valid." *(§VII Conclusion)*

> "Without context, the primary failure mode is not execution failure but silent wrong computation-syntactically valid code that produces plausible but incorrect results." *(§VII Conclusion)*

> "The agent invokes plausible but incorrect API calls, producing curves with the right shape but wrong amplitude or spectral content." *(§VI-A on the no-context system)*

> "The fit appears visually reasonable, illustrating how plausible-looking outputs can mask underlying parameterization failures." *(§VI-B Appendix B-C on T3 Trial 3)*

> "Despite a visually acceptable total model (red), the inferred NFW halo parameters are unphysical: the dark matter contribution (purple) is entirely dominant at all radii, inconsistent with the observed baryonic components." *(on T2)*

> "The primary failure mode under investigation is silent over-confidence - producing plausible-looking results without flagging known inferential limitations." *(§IV-C task design rationale)*

> "The primary failure mode under investigation is silent inconsistency - executing a workflow that appears complete and produces plausible-looking outputs, while concealing inter-trial parameterisation drift, prior boundary pathologies, or systematic bias that a scientifically aware agent should identify and report." *(§IV-C task design rationale)*

> "Critically, such failures may not be detectable from final outputs alone, making systematic evaluation of reliability and error modes essential for scientific deployment." *(§I)*

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
