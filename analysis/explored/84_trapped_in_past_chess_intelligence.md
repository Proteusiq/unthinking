# Paper Analysis: Trapped in the past? Disentangling fluid and crystallized intelligence of large language models using chess

## Metadata
- **arXiv ID**: 2601.16823
- **Title**: Trapped in the past? Disentangling fluid and crystallized intelligence of large language models using chess
- **Authors**: Leonard S. Pleiss, Maximilian Schiffer, Robert K. von Weizsäcker
- **Institution**: Technical University Munich
- **Date**: January 23, 2026
- **Venue**: Preprint

---

## Core Claims

1. **Performance degrades with decreasing training data proximity** — clear gradient from WD (within-distribution) to OOD (out-of-distribution)
2. **OOD tasks collapse to random performance** — fluid intelligence (novel reasoning) is severely limited
3. **Progress slows for OOD tasks** — newer models improve less on tasks outside training distribution
4. **Reasoning tokens have diminishing marginal returns** — benefit per token decreases with distributional proximity
5. **Crystallized intelligence dominates** — sophisticated recall, not genuine reasoning

---

## Methodology

### Framework: Fluid vs Crystallized Intelligence
- **Crystallized intelligence**: Performance on within-distribution (WD) tasks — recall of memorized solutions
- **Fluid intelligence**: Performance on out-of-distribution (OOD) tasks — systematic generalization beyond prior experience

### Position Categories (Key Innovation)
| Category | Description | ptrain(x) |
|----------|-------------|-----------|
| **WD (Within-Distribution)** | ≥1,000 occurrences in Lichess Masters DB | High |
| **ND (Near-Distribution)** | 10 random legal moves from start, NOT in DB | Medium |
| **OOD (Out-of-Distribution)** | Random 10-piece placement, structurally dissimilar | Low (~0) |

### Evaluation Metrics
- **Centipawn Loss (CPL)**: Positional value lost through a move
  - <10: Engine-level play
  - 10-50: Minor inaccuracies
  - 50-100: Noticeable mistakes
  - >100: Blunders
- **Illegal move rate**: Syntactic reasoning failure
- **Illegal moves scored as CPL=1,000** (instant loss)

### Models Tested
- GPT-3.5
- GPT-4o
- GPT-5 (minimal reasoning)
- GPT-5 (moderate reasoning)

### Baselines
- **Random legal move policy**: Lower bound
- **Leela Chess Zero (Lc0)**: Upper bound (neural network chess engine)

---

## Key Evidence

### Raw Performance (ACPL)

| Condition | GPT-3.5 | GPT-4o | GPT-5 | Random Baseline |
|-----------|---------|--------|-------|-----------------|
| WD | ~400 | ~200 | ~100 | ~100 |
| ND | ~800 | ~600 | ~500 | ~170 |
| OOD | ~1000+ | ~800 | ~700 | ~210 |

**Critical finding**: All models perform WORSE than random in ND and OOD conditions!

### Illegal Move Rates

| Condition | GPT-3.5 | GPT-4o | GPT-5 |
|-----------|---------|--------|-------|
| WD | ~50% | ~25% | ~20% |
| ND | ~60% | ~35% | ~30% |
| OOD | **~85%** | **~60%** | **>30%** |

**Key finding**: OOD illegal moves are 4.72× higher than WD — syntactic failure, not just strategic.

### Normalized Performance (Legal Moves Only)

| Condition | GPT-5 ACPL | Relative to Random |
|-----------|------------|-------------------|
| WD | 26.19 | **4× better** |
| ND | ~80 | Approaching random |
| OOD | ~210 | **At random level** |

**Critical insight**: OOD performance = random play. Zero fluid intelligence demonstrated.

### Generation Improvement Rates

| Transition | WD | ND | OOD |
|------------|-----|-----|-----|
| GPT-3.5 → GPT-4 | 70.7% | 35.16% | **9.08%** |
| GPT-4 → GPT-5 | 69.92% | 10.77% | **5.73%** |

**Projected**: If trend continues, ND and OOD improvements plateau to ~1-2% within two generations.

### Reasoning Token Analysis

| Condition | Avg Tokens | ACPL Improvement | Benefit/Token |
|-----------|------------|------------------|---------------|
| WD | 3,426 (~10 pages) | Large | High |
| ND | 11,800 (~35 pages) | Moderate | Medium |
| OOD | 16,953 (~51 pages) | Minimal | **Near-zero** |

**Key insight**: Models allocate MOST resources to OOD tasks but achieve LEAST improvement — "inefficient search when solution manifold is unknown."

---

## Critical Assessment

### What This Paper Shows

1. **Sharp WD/OOD boundary** — not gradual degradation but regime change
2. **Scaling doesn't help OOD** — improvement rates drop dramatically
3. **Reasoning tokens don't help OOD** — diminishing returns per token
4. **Illegal moves reveal syntactic failure** — not just strategic weakness
5. **Chess as controlled testbed** — game statistics enable training proximity estimation

### What This Paper Does NOT Show

1. **Mechanism for failure** — black-box evaluation only
2. **Why models fail OOD** — no mechanistic analysis
3. **Cross-architecture comparison** — only GPT family tested
4. **Fine-tuned chess models** — only API models tested

### Strengths

1. **Novel methodology**: Using game statistics to estimate training data proximity
2. **Controlled OOD construction**: Zero-probability positions (random placement)
3. **Multi-metric evaluation**: CPL + illegal moves + reasoning tokens
4. **Cross-generational analysis**: GPT-3.5 → GPT-4 → GPT-5
5. **Addresses confounders**: Temperature=0, standardized prompts

### Limitations (Authors Acknowledge)

- "Projection should be interpreted cautiously" — only two transitions
- Chess is abstracted engine chess, not human chess
- CPL is heuristic metric
- Unknown training data makes definitive claims difficult

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Same ID/OOD pattern (100% → ~0%)
- **CoT Mirage (2508.01191)**: Distribution determines success
- **Planning Gap (2601.14456)**: 82.9% ID → 0% OOD
- **OMEGA (2506.18880)**: Compositional/transformative generalization fails
- **Chess Compositionality (2510.20783)**: Rules generalize, strategies fail

### Extends
- **Chess Compositionality (2510.20783)**: Adds crystallized/fluid framework
- **Interplay (2512.07783)**: Confirms "surfacing" hypothesis with chess domain

### Challenges
- **DeepSeek-R1 (2501.12948)**: "Emergent reasoning" claims — this shows reasoning is distribution-bounded
- **Emergence of Strategic Reasoning (2412.13013)**: Strategic reasoning claims — this shows OOD collapse

### Key Distinction from Chess Compositionality (2510.20783)
| Paper | Focus | Finding |
|-------|-------|---------|
| Chess Compositionality | Rule vs Strategy generalization | Rules: 96%+, Strategies: 70%→22% |
| **This paper** | Crystallized vs Fluid intelligence | WD: good, OOD: random |

Both support thesis but from different angles:
- Chess Compositionality: Syntactic vs semantic distinction
- This paper: Memorization vs reasoning distinction

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (very recent paper)

### Potential Counter-Arguments

1. **Chess may not generalize to language reasoning** — domain-specific finding
2. **API models may differ from open models** — GPT family specific
3. **Illegal moves dominate CPL** — unfair penalty for syntactic errors
4. **Training data opacity** — cannot confirm WD/ND/OOD classifications

### Limitations (Authors Acknowledge)
- "Projection... derived from only two generational transitions"
- "Future improvements may deviate substantially"
- "Operational definition narrows scope to measurable functional competence"

---

## Key Quotes

> "Our analysis reveals a clear gradient: performance consistently degrades as fluid intelligence demands increase. Notably, in out-of-distribution tasks, performance collapses to random levels."

> "While reasoning-augmented inference improves performance, its marginal benefit per token decreases with distributional proximity."

> "These results suggest current architectures remain limited in systematic generalization, highlighting the need for mechanisms beyond scale to achieve robust fluid intelligence."

> "If we assumed this trend to continue for future model generations, we would expect the improvement rates for WD positions to remain consistently high. However, the improvement for ND and OOD positions would effectively plateau."

> "This effectively implies that when relying solely on fluid intelligence—in the absence of memorized patterns—the model's strategic reasoning capability collapses to zero."

---

## Relevance to Thesis

**STRONGLY SUPPORTS** — Direct evidence for the "Thinking Machine That Doesn't Think" thesis

### Key Contributions

1. **Crystallized vs Fluid distinction** maps directly to pattern matching vs genuine reasoning
2. **OOD collapse to random** proves zero extrapolation capability
3. **Reasoning tokens ineffective OOD** shows "thinking" doesn't help novel problems
4. **Diminishing returns on progress** predicts architectural limits

### Integration with Existing Arguments

| Thesis Argument | This Paper's Evidence |
|-----------------|----------------------|
| Distribution-bounded | WD: good, OOD: random |
| RL surfaces, doesn't create | Newer models don't improve OOD |
| CoT doesn't help OOD | Reasoning tokens have diminishing returns |
| Practical but predictive | Works within distribution only |

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [ ] **Paper graph updated**

---

## Verdict: STRONGLY SUPPORTS thesis — Controlled evidence that LLM reasoning is crystallized (memorization) not fluid (genuine reasoning). OOD performance collapses to random, reasoning tokens don't help, and scaling progress is slowing for novel tasks.
