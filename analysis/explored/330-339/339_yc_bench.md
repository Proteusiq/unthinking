# Paper 339: YC-Bench — Benchmarking AI Agents for Long-Term Planning and Consistent Execution

## Metadata
- **arXiv**: 2604.01212
- **Date**: April 2026
- **Authors**: Muyu He, Adit Jain, Anand Kumar, Vincent Tu, Soumyadeep Bakshi, Sachin Patro, Nazneen Rajani
- **Affiliation**: Collinear AI
- **Stance**: Strongly supports thesis — long-horizon coherence is scaffolding-dependent; reasoning–execution gap is the mechanism

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  LONG-HORIZON COHERENCE IS A PIPELINE, NOT A CAPABILITY              │
│                                                                      │
│  1-year simulated startup, hundreds of turns, 12 frontier models.    │
│                                                                      │
│  Only 3/12 models grow the $200K starting capital:                   │
│    Claude Opus 4.6  $1.27M   (5.6 scratchpad writes / 100 turns)     │
│    GLM-5            $1.21M   (11× cheaper than Opus)                 │
│    GPT-5.4          >$1M     (10.6 writes / 100 turns)               │
│                                                                      │
│  7/12 finish below starting capital.                                 │
│                                                                      │
│  Scratchpad writes/100 turns is the strongest single predictor.      │
│  Models with 0.0 writes (Gemini 3.1 Pro, GPT-5.4 Nano) go bankrupt.  │
│                                                                      │
│  47% of bankruptcies = failure to detect adversarial clients from    │
│  delayed, compounding signals.                                       │
│                                                                      │
│  SMOKING GUN: Sonnet writes a correct feasibility rule at Turn 7,    │
│  writes a "one task at a time" rule at Turn 7, then ignores both.    │
│  The reasoning–execution gap is concrete and transcript-level.       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Long-horizon strategic coherence is a capability frontier.** Models with similar standard-benchmark scores diverge drastically over hundreds of turns. Divergence emerges ~60 days into simulation.
2. **Frontier models fail through distinct named modes**: over-parallelization (Sonnet), aware inaction (Grok), rigid loops (Flash), reasoning–execution gap (Sonnet again).
3. **Scratchpad use is the strongest single predictor of success.**
4. **Adversarial-client detection is the primary failure mode** (47% of bankruptcies). Benchmarks with immediate feedback cannot surface this.
5. **Long-horizon coherence is a pipeline**: perceive → record → retrieve → act consistently. Different models break at different stages.

---

## Methodology

### Environment: POMDP over 1 Simulated Year
- Starting capital: **$200K**
- Fixed roster: 8 employees
- 4 domains: training, inference, research, data engineering
- 6 clients (~35% adversarial, hidden; inflate work ≥3× after acceptance)
- **K=20 turn context window** → scratchpad is the only memory across truncation
- Compounding dynamics: trust-snowball, payroll grows 1%/task
- Reward: net change in funds

### 12 Models × 3 Seeds = 36 Runs

**Proprietary**: GPT-5.4, GPT-5.4 Mini, GPT-5.4 Nano, Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro, Gemini 3 Flash, Gemini 3.1 Flash Lite, Grok 4.20-beta

**Open-source**: Qwen-3.5-397B-A17B, GLM-5, Kimi-K2.5

**Baseline**: greedy (take highest-reward task, all employees on it)

---

## Key Evidence

### Headline Aggregates

| Metric | Value |
|--------|------:|
| Models with profitability | **5/12** |
| Models exceeding $1M | **3/12** |
| Models below starting capital | **7/12** |
| Bankruptcies due to adversarial-client failure | **47%** |
| Divergence onset | **~60 days** (Feb–Mar) |
| Runs maintaining adversarial blacklist | 1/3 |

### Per-Model Results

| Model | Final $ (avg) | Bankrupt | Cost | SP/100T | Cmd/Turn |
|-------|-------------:|---------:|-----:|--------:|---------:|
| **Claude Opus 4.6** | **$1.27M** | 0/3 | $86.07 | 5.6 | 1.41 |
| **GLM-5** | **$1.21M** | 0/3 | $7.62 (11× cheaper) | 2.7 | 2.16 |
| **GPT-5.4** | >$1M | 0/3 | $23.08 | **10.6** | 2.63 |
| Kimi-K2.5 | profitable | 1/3 | $1.79 | 0.6 | 1.18 |
| Gemini 3 Flash | $394K | 0/3 | $1.83 | 0.2 | 0.24 |
| Gemini 3.1 Flash Lite | <$200K | 1/3 | $0.59 | 0.9 | 2.16 |
| GPT-5.4 Mini | <$200K | 2/3 | $1.34 | 0.2 | 0.04 |
| Claude Sonnet 4.6 | $103K | 2/3 | $18.06 | 4.6 | 2.01 |
| Qwen 3.5-397B | <$200K | 2/3 | $1.16 | 0.7 | 1.00 |
| **Gemini 3.1 Pro** | <$200K | **2/3** | $7.36 | **0.0** | 1.06 |
| **GPT-5.4 Nano** | <$200K | **2/3** | $0.41 | **0.0** | 0.08 |
| **Grok 4.20** | **$14K** | 2/3 | $5.03 | 0.4 | 0.92 |

### Cost-Efficiency
- Kimi-K2.5: 2.5× next-cheapest
- **GLM-5 is 10× more cost-efficient than Opus 4.6**

### Sonnet 4.6 Failure Breakdown (17 failed tasks)
- 41% understaffing
- 18% wrong-domain assignment
- 12% re-accepting adversarial clients
- **Avg concurrency: 7.23 (max 16)** — clear over-parallelization outlier
- vs. Opus: 2.0 avg concurrency

### Ablation (context window K)
- 3/4 models peak at K=30; all degrade beyond optimal K
- GPT-5.4-Mini: K=20→30 improves throughput 123%
- GPT-5.4: K=30 drops throughput 60% because it stops bundling actions

---

## Key Quotes

> "Only three models consistently surpass the starting capital of $200K, with Claude Opus 4.6 achieving the highest average final funds at $1.27M, followed by GLM-5 at $1.21M with 11× lower inference cost."

> "Scratchpad usage, the sole mechanism for persisting information across context truncation, is the strongest predictor of success, and adversarial client detection is the primary failure mode, accounting for 47% of bankruptcies."

> "Sonnet exhibits a reasoning–execution gap: it derives correct strategies but fails to act on them. At Turn 7 in Seed 1, it writes a correct feasibility formula to the scratchpad ('required_qty / total_rate must be < deadline hours') and a 'one task at a time' rule. It then ignores both."

> "Grok shows aware inaction: its scratchpad accurately identifies critical issues ('Runway down to 1 month,' 'Avoid Equinox') but these observations do not translate into changed behavior."

> "This spectrum suggests that long-horizon coherence is not a single capability but a pipeline: perceive → record → retrieve → act consistently, and current models fail at different stages of that pipeline."

> "Our error analysis reveals a recurring reasoning–execution gap as they derive correct strategies but consistently fail to act on them, suggesting that deliberation and execution are not yet unified capabilities in current frontier models."

---

## Relationship to Other Papers

### Strongly Supports
- **Faith and Fate (#1, 2305.18654)** — planning collapse at depth; 9/12 models fail over hundreds of turns despite single-turn competence
- **Pressure Reveals Character (#330, 2602.20813)** — reasoning–execution gap widens under pressure; transcript-level mechanism
- **Shutdown Resistance (#326, 2509.14260)** — partial: Grok leaves a task accepted for 81 days without remediation (pattern-continuation > course-correction)
- **From Plan to Action (#337, 2604.12147)** — agent executes training-distribution default; here it's "parallelize when possible" from system prompt
- **TraitBasis (#338, 2510.04491)** — same research team; complementary methodology
- **Dive into Claude Code 1.6%/98.4%** (contextual) — scratchpad dependency is the 98.4% echo at the memory layer

### Extends
- **Vending-Bench** — adds hidden adversaries, delayed feedback, compounding dynamics

### Smoking Gun Status
Sonnet Turn-7/Turn-8 transcript (correct rule written, immediately ignored) is one of the cleanest single-run demonstrations of the reasoning–execution gap in the corpus. Recommend candidate for findings.html smoking-guns section.

---

## REBUTTALS

### Authors' Acknowledged Limitations
1. Static roster (no hire/fire)
2. Disruptions limited to adversarial clients
3. All signals numerical (reduced realism)
4. Deterministic transitions (only seed-determined market noise)
5. Only 3 seeds per model
6. Single 1-year horizon; no multi-episode learning
7. One scratchpad implementation (no comparison of memory architectures)

### Tension for Pure Pattern-Matching Reading
Opus 4.6 **does** sustain self-correcting reflection across the year. This suggests sufficient scaffolding + capable base model can close the coherence gap. But:
- Opus still violates its own blacklist in Seed 2
- Requires ~155 task-inspect calls and ~34 scratchpad rewrites per run (massive external scaffolding)
- 11/12 models fail — the result doesn't generalize

Reads as quantitative existence proof that coherence is achievable with enough external memory + capable retrieval, not refutation of the thesis that internal long-horizon reasoning is brittle.

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STRONGLY SUPPORTS THESIS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. LONG-HORIZON REASONING DOES NOT PERSIST IN WEIGHTS              │
│     Scratchpad = external memory buffer                             │
│     Models with 0.0 writes reliably go bankrupt                     │
│     Internal coherence collapses across K=20 truncation             │
│                                                                     │
│  2. REASONING–EXECUTION GAP (TRANSCRIPT-LEVEL MECHANISM)            │
│     Sonnet writes correct feasibility rule at Turn 7                │
│     Ignores it at Turn 8                                            │
│     CoT ≠ action commitment                                         │
│                                                                     │
│  3. TRAINING-DISTRIBUTION DEFAULT DOMINATES                         │
│     System prompt: "Run multiple tasks concurrently when possible"  │
│     Sonnet: 7.23 avg concurrency, re-accepts known-bad clients      │
│     Opus: 2.0 avg, reasons about throughput constraints             │
│     Pattern-completion of instructed verb, not goal-directed plan   │
│                                                                     │
│  4. PATTERN-CONTINUATION > COURSE-CORRECTION                        │
│     Grok: 81 days with adversarial task accepted, no remediation    │
│     Shutdown-resistance analogue: continue over discontinue         │
│                                                                     │
│  5. SCAFFOLDING DOMINATES (DIVE INTO CLAUDE CODE ECHO)              │
│     Plan-variant swing + scratchpad-swing often > model swing       │
│     1.6%/98.4% ratio expressed at memory layer                      │
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
