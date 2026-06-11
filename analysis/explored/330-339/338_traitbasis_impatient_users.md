# Paper 338: Impatient Users Confuse AI Agents - TraitBasis

## Metadata
- **arXiv**: 2510.04491
- **Date**: October 2025 (v2 March 2026)
- **Authors**: Muyu He, Anand Kumar, Tsach Mackey, Meghana Rajeev, James Zou, Nazneen Rajani
- **Affiliation**: Collinear AI + Stanford
- **Stance**: Strongly supports thesis - agent performance degrades under surface user-style shift (training-distribution dependency)

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  AGENTS PATTERN-MATCH TRAINING-DISTRIBUTION USER STYLES              │
│                                                                      │
│  Change ONLY the user's interaction style - not the task, tools,     │
│  or policy - and frontier agents lose up to 62% performance.         │
│                                                                      │
│  GPT-5 in retail under impatience: −62.6%                            │
│  Kimi K2 on modified BFCL under confusion: −70%                      │
│  GPT-4o on modified BFCL under skepticism: −64.4%                    │
│                                                                      │
│  Current τ-Bench / AgentBench / ToolBench use PROMPT-BASED user      │
│  simulators that exhibit 94.3% persona collapse - inflating          │
│  prior agent scores with false robustness.                           │
│                                                                      │
│  TraitBasis: activation-space trait steering with 4 contrastive      │
│  pairs (3000× less data than SFT, higher fidelity).                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Small user-behavior shifts cause sharp drops.** Changing only the user's style degrades frontier agents by 2–62%. Task, domain, and tools are identical.
2. **Current benchmarks miss this fragility** - neutral i.i.d. user simulators inflate apparent robustness.
3. **TraitBasis: activation-space steering** produces higher-fidelity user simulations than prompting, SFT, or LoRA.
4. **Persona collapse is endemic in prompt-based user simulators** (94.3% collapse) - a hidden methodological flaw in existing benchmarks.
5. **τ-Trait benchmark release** extends τ-Bench to 4 domains (airline, retail, telecom, telehealth) with composable, scalable trait perturbations.

---

## Methodology

### TraitBasis
- For each trait T, collect n=4 contrastive response pairs (Y_pos, Y_neg) to same prompts X
- Compute per-layer mean hidden states:
  ```
  P_T^(z) = (1/n) Σ (P_i,pos^(z) − P_i,neg^(z))
  ```
- Select optimal layer z* via 5-annotator judgment on 10-turn conversations
- Inference-time steering: `h^(z) ← h^(z) + α · P_t^(z)`
- Compose traits: `P_B = [P_T1 | P_T2 | … | P_Tk] ∈ ℝ^(d×k)` with scaled intensities

### Traits (4)
Impatience, Confusion, Skepticism, Incoherence × 3 intensities (low/med/high). Selection based on real-world MSDialog conversational data.

### User Model Backbones
Llama-3.1-8B-Instruct (primary); Qwen3-8B (cross-model validation)

### τ-Trait Benchmark
- Extends τ-Bench (airline, retail) with telecom (5 tables, 17 tools) and telehealth (9 tables, 22 tools)
- 35 new tasks
- Databases synthesized by Claude Sonnet 4, manually verified

### Agents Evaluated
- τ-Trait: GPT-4o, Kimi K2, GLM-4.5, GPT-5
- Modified BFCL: GPT-4o, Kimi K2

### Baselines
- Prompt-based (GPT-4.1 meta-prompting)
- Full SFT (~13k examples from TalkMap/MSDialog)
- LoRA rank-128 (~3k per trait)

---

## Key Evidence

### Per-Domain Degradation (% Δ on τ-Trait, averaged over 4 traits × 3 rollouts)

| Domain | GLM-4.5 | GPT-4o | Kimi K2 | **GPT-5** |
|--------|--------:|-------:|--------:|----------:|
| Airline | −13.2 | −5.7 | −8.7 | **−20.4** |
| Retail | −2.1 | −28.1 | −30.0 | **−39.6** |
| Telecom + Telehealth | −5.5 | −12.8 | −12.2 | **−19.9** |

### Worst Single Cells

| Model | Domain | Trait | Δ |
|-------|--------|-------|------:|
| **GPT-5** | Retail | Impatience | **−62.6%** |
| GPT-5 | Retail | Confusion | −44.1% |
| Kimi K2 | Retail | Confusion | −45.7% |
| Kimi K2 | Retail | Impatience | −31.2% |

### Modified BFCL (multi-turn function calling)

| Model | Avg Δ | Skepticism | Confusion |
|-------|------:|-----------:|----------:|
| **GPT-4o** | **−55.9%** | −64.4% | −67.8% |
| **Kimi K2** | **−66.3%** | −80.0% | −70.0% |

### TraitBasis vs Baselines

| Metric | TraitBasis | SFT | Prompt | LoRA |
|--------|-----------:|----:|-------:|-----:|
| Realism Elo | **1624** | 1561 | 1530 | 1285 |
| Fidelity (human) | **97.5%** | 95.0% | 75.0% | 68.8% |
| Stability (trait persistence) | **24.8%** | 5.0% | 1.3% | 4.5% |
| **Persona collapse rate** | **-** | 65.7% | **94.3%** | 86.0% |
| Compositionality (exact recall) | **62.5%** | 51.9% | 37.9% | - |
| Data | **4 pairs** | 13,000 | - | 3,000/trait |

### Compositional Suppression (Appendix Table 9)
- Prompt "impatience + incoherence": impatience 100%, incoherence **2.5%** (suppression)
- SFT "impatience + skepticism": skepticism 100%, impatience 67.5% (imbalance)
- TraitBasis: balanced across all pairs

---

## Key Quotes

> "Small shifts in user behavior, such as being more impatient, incoherent, or skeptical, can cause sharp drops in agent performance, revealing how brittle current AI agents are. Today's benchmarks fail to capture this fragility: agents may perform well under standard evaluations but degrade spectacularly in more realistic and varied settings."

> "Frontier agent models such as GPT-4o, Kimi-K2, and GLM-4.5 suffer performance drops of up to 35%, 46%, and 17%, respectively, when only the user's interaction style (i.e., trait) is altered."

> "All baseline methods exhibit persona collapse, with traits fading in 94.3% of prompt-based, 86.0% of LoRA, and 65.7% of SFT conversations."

> "Pretrained LLMs already encode rich representations of interaction styles, and the contrastive pairs serve as a lightweight probe to isolate the direction corresponding to a trait rather than to 'teach' the trait itself."

---

## Relationship to Other Papers

### Strongly Supports
- **Pressure Reveals Character (#330, 2602.20813)** - agent-level replication; same task, changed surface → up to 62% drop. Psychometric framework meets multi-turn agentic setting.
- **GSM-Symbolic (#3, 2410.05229)** - surface-perturbation pattern at dialogue level
- **Stress-Testing Model Specs (#331, 2510.07686)** - character cracks under stress; consistent finding
- **From Plan to Action (#337, 2604.12147)** - agents pattern-match training-distribution workflows; this paper shows they also pattern-match training-distribution users
- **Dive into Claude Code 1.6%/98.4%** (contextual) - demonstrates the brittleness that motivates the 98.4% scaffolding

### Rebuts (Implicitly)
- Any paper using prompt-based user simulators in τ-Bench-style multi-turn evaluation - 94.3% persona collapse means prior agent-robustness numbers are inflated

### Methodological Novelty
- First activation-space user-simulator stress-testing method
- Demonstrates trait compositionality at the geometric level

---

## REBUTTALS

### Authors' Acknowledged Limitations
1. Only 4 traits (impatience, confusion, skepticism, incoherence)
2. Vectors extracted per model (backbone specificity)
3. τ-Trait extension limited to 4 domains
4. Dual-use risk (could synthesize adversarial users)
5. Simple linear composition only
6. LLM-as-judge fails on compositionality - reliance on human evaluation

### Key Tension
Authors' framing is constructive ("build more robust agents") rather than thesis-skeptical. Results fit pattern-matching thesis cleanly but authors don't invoke it explicitly.

### Why STRONGLY SUPPORTS
- GPT-5 shows WORST drops (−39.6% retail, −62.6% single cell) - scaling doesn't help
- Cooperative-user distribution (training data) → agent works; off-distribution → agent breaks
- TraitBasis activation-space geometry demonstrates persona is represented as direction, consistent with Consciousness Cluster (#327) cluster-induction findings

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STRONGLY SUPPORTS THESIS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. SURFACE-STYLE PERTURBATION BREAKS AGENTS                        │
│     Same task, same tools, same policy - only user style changes    │
│     Up to 62% drop. GSM-Symbolic at dialogue level.                 │
│                                                                     │
│  2. SCALING DOESN'T FIX IT                                          │
│     GPT-5 shows worst degradation on retail                         │
│     Not a capability issue - a training-distribution issue          │
│                                                                     │
│  3. HIDDEN FLAW IN MULTI-TURN BENCHMARKS                            │
│     Prompt-based user simulators: 94.3% persona collapse            │
│     Prior agent-robustness claims inflated                          │
│                                                                     │
│  4. PERSONA IS A GEOMETRIC DIRECTION                                │
│     4 contrastive pairs suffice to extract trait                    │
│     Consistent with Consciousness Cluster activation-space story    │
│                                                                     │
│  5. AGENTS OPTIMIZE FOR COOPERATIVE-USER DISTRIBUTION               │
│     Training skew (TalkMap/MSDialog) → cooperative, coherent        │
│     Impatient/skeptical/incoherent users are off-distribution       │
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
