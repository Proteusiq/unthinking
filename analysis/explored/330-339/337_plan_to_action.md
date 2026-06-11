# Paper 337: From Plan to Action - How Well Do Agents Follow the Plan?

## Metadata
- **arXiv**: 2604.12147
- **Date**: April 2026
- **Authors**: Shuyang Liu, Saman Dehghan, Jatin Ganhotra, Martin Hirzel, Reyhaneh Jabbarvand
- **Affiliation**: UIUC + IBM
- **Stance**: Strongly supports thesis - agents fall back on memorized training workflows rather than following instructed plans

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE PLAN IS ADVISORY; THE TRAINING IS ARCHITECTURE                  │
│                                                                      │
│  16,991 SWE-agent trajectories across 4 LLMs × 8 plan variants.      │
│                                                                      │
│  Without a plan, agents "fall back on workflows internalized during  │
│  training." Many of these workflows are contaminated patches         │
│  recalled verbatim.                                                  │
│                                                                      │
│  With a plan, agents sometimes solve MORE issues when the plan is    │
│  REMOVED - because the instructed plan blocks access to the          │
│  memorized correct patch by forcing a reproduction test that fails.  │
│                                                                      │
│  A subpar plan is worse than no plan. Augmenting a good plan with    │
│  useful phases DEGRADES performance when those phases conflict with  │
│  the model's internal training-distribution workflow.                │
│                                                                      │
│  On contamination-resistant SWE-bench Pro, plan compliance drops     │
│  13% - direct evidence that Verified-benchmark compliance was        │
│  memorization-driven.                                                │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Plan compliance is untested territory.** Without it, *"it is impossible to assess whether a solution was reached through correct strategic reasoning or through other means, e.g., data contamination or overfitting to a benchmark."*
2. **Agents fall back on internalized training workflows when no plan is given.** The workflows are "often incomplete, overfit, or inconsistently applied."
3. **Bad plans are worse than no plans.** Removing a single phase (No Reproduction / No Validation) causes larger drops than removing the entire plan.
4. **Augmenting plans with useful phases can DEGRADE performance** when the phases conflict with the model's internal strategy.
5. **The real research gap is teaching models to follow plans, not encoding plans into them.** *"This requires teaching models to reason and act adaptively, rather than memorizing workflows."*

---

## Methodology

### Scale
- **16,991 trajectories** across 4 LLMs × 8 plan variants × SWE-bench Verified (500) + SWE-bench Pro (266→31 resolvable) × 3 repeats

### LLMs
- GPT-5 mini (frontier reasoning)
- DeepSeek-R1 (open reasoning)
- DeepSeek-V3 (open general)
- Devstral-small 24GB (distilled coding)

### Plan Alphabet Φ = {N, R, P, V}
- **N** = Navigation (locate buggy code)
- **R** = Reproduction (reproduce the bug)
- **P** = Patch (write the fix)
- **V** = Validation (verify fix)

### 8 Plan Variations

| # | Setting | Formulation | Type |
|---|---------|-------------|------|
| 1 | Standard | ⟨N, R, P, V⟩ | Baseline |
| 2 | No Plan | - | Reduction |
| 3 | No Reproduction | ⟨N, ¬R, P, V⟩ | Reduction |
| 4 | No Validation | ⟨N, R, P, ¬V⟩ | Reduction |
| 5 | + Regression Tests | ⟨R_G, N, R, P, V, V_G⟩ | Augmentation |
| 6 | + Change Summary | ⟨N, R, P, V, S⟩ | Augmentation |
| 7 | Reordered | ⟨N, P, R, V⟩ | Reordering |
| 8 | Periodic Reminder | plan re-injected every 5 steps | Repeating |

### Plan-Compliance Metric (PC, novel)

Trajectory mapped to symbolic Langutory over Φ. Geometric mean of three sub-metrics:

```
PC = (PPC · POC · PPF)^(1/3)

PPC (Phase Compliance)  = |Φ ∩ observed phases| / |Φ|      coverage
POC (Order Compliance)  = LIS(first_occurrences) / m       ordering
PPF (Phase Fidelity)    = |Φ| / |Φ ∪ observed phases|      out-of-plan penalty
```

---

## Key Evidence

### Plan Compliance Under Standard Plan

| Model | Pattern |
|-------|---------|
| Devstral-small | High PPC, POC; low PPF (many out-of-plan actions) |
| GPT-5 mini | Lower PPC/POC; skips Reproduction on easy problems |
| DeepSeek-V3 | PPF=0.99 (on-plan) but skips/reorders phases |
| DeepSeek-R1 | Lowest compliance overall |

### Mann–Whitney U Test (compliance ↔ resolution)

| Model | p-value | Direction |
|-------|--------:|-----------|
| Devstral-small | 1e-5 | Significant positive |
| DeepSeek-R1 | 0.032 | Significant positive |
| DeepSeek-V3 | 0.60 | Positive, not significant |
| **GPT-5 mini** | **0.285** | **NEGATIVE** - unresolved trajectories are more compliant |

GPT-5 mini adaptively skips Reproduction on easy problems. Plan-compliant reasoning trace is **decoupled** from task success.

### No-Plan Unlocks Memorized Patches (Finding 7)

Instances uniquely resolved under No Plan (deterministic subset in parens):
- GPT-5 mini: 34 (4)
- Devstral-small: 28 (16)
- DeepSeek-V3: 23 (4)
- DeepSeek-R1: 11 (7)

Authors' diagnosis: *"The solution under No Plan can be due to data contamination… The instructed plan, however, overrides it, and the agent attempts to generate a reproduction test, which fails."*

### Subpar Plan > No Plan (Finding 8)

Removing a single phase worse than removing the whole plan. DeepSeek-R1 collapsed: **349 instances** terminated with malformed tool calls in the No Reproduction setting.

### Reordering Has Negligible Effect (RQ5.1)

Reordered plan (N-P-R-V) → 38.3% → 38.0% success on deterministic subset. Devstral-small **ignored the reordering** and did reproduction before patching anyway.

### Periodic Reminders Help (RQ5.2)

Re-injecting the plan every 5 steps improves success consistently (Lost-in-the-Middle compensation).

### SWE-bench Pro: 13% Compliance Drop (RQ6)

On the contamination-resistant benchmark, plan compliance drops 13% on average. Phase flow shifts: models give up on reproduction early. Direct evidence that Verified-benchmark compliance was memorization-driven.

---

## Key Quotes

> "Without such an analysis-determining the extent agents comply with a given plan-it is impossible to assess whether a solution was reached through correct strategic reasoning or through other means, e.g., data contamination or overfitting to a benchmark."

> "Without an explicit plan, agents fall back on workflows internalized during training, which are often incomplete, overfit, or inconsistently applied."

> "A subpar plan hurts performance even more than no plan at all."

> "This suggests that different models internalize problem-solving processes differently, depending on their training. In the absence of global plans, the encoded strategy takes over the reasoning to solve the problem."

> "This requires teaching models to reason and act adaptively, rather than memorizing workflows."

> "Therefore, plan compliance may not be rooted in their ability to follow plan instructions or the plan positively impacting their reasoning to accomplish the task."

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (#1, 2305.18654)** - structural analog: agents pattern-match workflows rather than reason about them
- **GSM-Symbolic (#3, 2410.05229)** - plan variation is a symbolic perturbation; a reasoner would adapt, a pattern-matcher reverts
- **Reasoning Theater (#325, 2603.05488)** - GPT-5 mini's negative compliance-success correlation is CoT performativity: the trace is decoupled from the action
- **TRACEALIGN (#329, 2508.02063)** - provides behavioral version of memorization attribution; TRACEALIGN is forensic, this is observational

### Builds On
- Liu et al. 2025 (Process-centric analysis) - Langutory methodology
- Liang et al. 2025 "SWE-bench illusion: when state-of-the-art LLMs remember instead of reason"
- Prathifkumar et al. 2025 "Does SWE-bench-Verified test agent ability or model memory?"

### Provides Real-World Mechanism For
- **Dive into Claude Code (2604.14228)** 1.6%/98.4% ratio: small harness changes (plan phases) cause large swings, often larger than model differences. The harness dominates because the model cannot be trusted to adapt to instructions.

---

## REBUTTALS

### Authors' Acknowledged Limitations
1. Only SWE-agent scaffold tested
2. Only 4 LLMs
3. Phase-level abstraction is coarse
4. SWE-bench Pro sample tiny (31 of 266)
5. Langutory mapping may be noisy for out-of-plan actions

### Why STRONGLY SUPPORTS
A reasoning-first interpretation predicts:
- Plan compliance should correlate positively with success across all models → **violated for GPT-5 mini**
- Augmenting a good plan with useful phases should help → **violated**
- Reordering a plan should produce different execution → **violated (Devstral ignores)**
- Removing the plan should hurt more than removing a single phase → **violated**
- Compliance should not drop on contamination-resistant benchmarks → **violated (13% drop)**

All five violations are simultaneous. The model isn't reasoning about the plan; it's pattern-matching to its training distribution.

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STRONGLY SUPPORTS THESIS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. AGENTS EXECUTE MEMORIZED WORKFLOWS                              │
│     - 4 models, 4 different compliance patterns under same plan     │
│     - Each model's pattern maps to its training distribution        │
│                                                                     │
│  2. SMOKING GUN: REMOVING PLAN UNLOCKS MEMORIZED PATCHES            │
│     - GPT-5 mini: 34 extra issues resolved WITHOUT plan             │
│     - The plan blocks access to memorized correct answer            │
│                                                                     │
│  3. PLAN AS SYMBOLIC PERTURBATION                                   │
│     - Standard plan works (matches training workflow)               │
│     - Modified plan breaks (off-distribution instruction)           │
│     - Classic GSM-Symbolic pattern at agent level                   │
│                                                                     │
│  4. 13% COMPLIANCE DROP ON CONTAMINATION-RESISTANT BENCHMARK        │
│     Verified-benchmark compliance was memorization, not reasoning   │
│                                                                     │
│  5. HARNESS > MODEL                                                 │
│     Plan-variant swing often larger than model-variant swing        │
│     Direct corroboration of Dive into Claude Code 1.6%/98.4%        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Status
- [x] Read complete (via task agent on full HTML)
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
