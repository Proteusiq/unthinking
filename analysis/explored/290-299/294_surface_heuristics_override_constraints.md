# Paper Analysis: The Model Says Walk: How Surface Heuristics Override Implicit Constraints in LLM Reasoning

## Metadata
- **arXiv ID**: 2603.29025
- **Title**: The Model Says Walk: How Surface Heuristics Override Implicit Constraints in LLM Reasoning
- **Authors**: Yubo Li, Lu Zhang, Tianchong Jiang, Ramayya Krishnan, Rema Padman (Carnegie Mellon University, Independent Researchers)
- **Date**: March 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **LLMs systematically fail when salient surface cues conflict with unstated feasibility constraints** — They apply approximately context-independent heuristic mappings (e.g., "short distance → walk") that dominate over implicit goal constraints.

2. **The failure is in constraint inference, not missing knowledge** — Models possess the relevant world knowledge but fail to activate it unless explicitly cued. A minimal hint (e.g., emphasizing "get *my car* washed") recovers +15 pp on average.

3. **Heuristic dominance is quantifiable and extreme** — The distance cue exerts 8.7–38× more influence than the goal in causal occlusion analysis (Heuristic Dominance Ratio).

4. **Models exhibit "conservative bias"** — 12 of 14 models perform *worse* when the constraint is removed (up to −38.5 pp), revealing that many "correct" answers default to the harder option rather than reasoning about the constraint.

5. **Goal-decomposition prompting can partially mitigate the failure** — Forcing models to enumerate preconditions before answering recovers +6–9 pp by converting implicit constraints into self-generated hints.

---

## Methodology

### The Car Wash Problem
The diagnostic problem: "I want to wash my car. The car wash is 50 meters away. Should I walk or drive?" Correct answer: Drive, because the car must be present at the wash. All models recommend walking.

### HOB (Heuristic Override Benchmark)
- **500 instances** spanning 4 heuristic × 5 constraint families
- **14 cells populated** based on naturalness ratings

**Heuristic Families:**
| Code | Family | Pattern |
|------|--------|---------|
| H-prox | Proximity | Closer → better |
| H-eff | Efficiency | Faster → better |
| H-cost | Cost | Cheaper → better |
| H-sem | Semantic | Name sounds right → viable |

**Constraint Families:**
| Code | Family | Definition |
|------|--------|------------|
| C-pres | Presence | Object must be at destination |
| C-cap | Capability | Means cannot do the task |
| C-val | Validity | Precondition is violated |
| C-scope | Scope | Service can't fulfil goal |
| C-proc | Procedural | Step or timing not met |

### Models Tested
- **Study 1 (Diagnostic)**: 6 models — Qwen3-{4B, 8B, 14B, 32B}, Qwen3.5-27B, GPT-OSS-20B
- **Study 2 (HOB)**: 14 models — GPT-5.4, GPT-5.2, Claude Opus 4.6, Claude Sonnet 4.5, DeepSeek R1, Gemini 3.1 Pro, Grok 4.2, Kimi K2.5, Llama 4 Scout, GPT-OSS-120B, Qwen3-14B, Qwen3-32B, Qwen3.5-27B, GPT-OSS-20B
- **70,000 total evaluations** (500 instances × 10 trials × 14 models)
- **Strict criterion**: Instance correct only if all 10 trials correct

### Key Methods
- **Causal occlusion**: Perturbing input components and measuring decision score changes
- **Monotonicity curves**: Sweeping distance over 14 log-spaced values (10m–100km)
- **Minimal pairs**: Each instance has paired version with constraint removed
- **Explicitness gradient**: Implicit → hint → explicit variations

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Car wash accuracy | 0% | All 6 models fail on every paraphrase |
| Heuristic Dominance Ratio | 8.7–38× | Distance cue influence vs. goal influence |
| Best model strict accuracy | 74.6% | Gemini 3.1 Pro — no model exceeds 75% |
| Hardest constraint (C-pres) | 44.4% | Presence constraints universally hardest |
| Explicitness gradient | +15.3 pp | Implicit 59.2% → hint 74.5% |
| Conservative bias (worst) | −38.5 pp | Llama 4 Scout performs worse when constraint removed |
| Goal-decomposition gain | +6–9 pp | Forcing precondition enumeration |
| Token vs. distance effect | 5× smaller | Largest token effect (5.8) vs. distance (30.3) |
| Human-judge agreement | κ = 0.95 | Almost perfect agreement |

---

## Relationship to Other Papers

### Supports
- **#1 Faith and Fate** (2305.18654): Both show surface patterns dominate over compositional reasoning
- **#3 GSM-Symbolic** (2410.05229): Extends findings on reasoning fragility to constraint inference
- **#8 Measuring Faithfulness** (2307.13702): Token attribution shows keyword associations, not compositional inference
- **#11 Frontier LLMs Still Struggle** (2507.07313): Both show frontier models fail on simple reasoning
- **#14 CoT is Mirage** (2508.01191): Both show surface patterns override intended reasoning

### Extends
- **Shortcut learning literature**: Identifies distinct *reasoning-level* heuristic shortcuts (not feature-level)
- **Frame problem** (McCarthy & Hayes, 1981): Connects to classical AI — challenge is enumerating relevant unstated conditions

### Challenges
- **Pure shortcut learning framing**: "Removing the heuristic cue makes models *worse*, not better—the opposite of the shortcut learning prediction"

---

## REBUTTALS

### Known Rebuttals
None identified — paper provides new evidence.

### Limitations (Authors Acknowledge)
1. **Language coverage**: HOB is English-only; cross-lingual generality untested
2. **Mitigation is proof-of-concept**: Alternative explanations (e.g., deliberate decoding) cannot be ruled out
3. **Behavioral not mechanistic**: Characterizes input-output patterns, not internal representations
4. **Model scale**: Study 1 covers models up to 32B; frontier model sigmoid pattern inferred, not directly confirmed
5. **Semantic heuristic coverage**: H-sem family has only 1 of 5 cells populated
6. **Cell coverage**: 6 of 20 possible H × C cells unpopulated

---

## Key Quotes

> "The distance cue exerts 8.7–38× more influence than the goal, and token-level attribution shows patterns more consistent with keyword associations than compositional inference."

> "This failure is invisible to standard evaluation: models produce fluent, confident, wrong responses. In domains where unstated constraints compete with salient surface features—medical triage, legal reasoning, financial planning—the same pattern can produce systematically incorrect recommendations."

> "Our minimal-pair results confirm the distinction: removing the heuristic cue makes models *worse*, not better—the opposite of the shortcut learning prediction."

> "The +15.3 pp explicitness gradient and token-level analysis suggest models possess the relevant world knowledge but fail to activate it unless explicitly cued."

---

## Significance for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│  SMOKING GUN FOR PATTERN MATCHING OVER REASONING                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Heuristic dominance 8.7-38×: surface cues override constraints │
│  2. Token attribution: "keyword associations, not compositional    │
│     inference"                                                     │
│  3. Knowledge present but not activated: +15 pp from minimal hint  │
│  4. Conservative bias: models perform WORSE without constraints    │
│  5. Universal sigmoid pattern: goal-independent heuristic mapping  │
│                                                                     │
│  The failure is systematic, quantified, and generalizes across     │
│  14 frontier models and 500 instances.                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance**: SUPPORTS

This paper provides rigorous mechanistic evidence that LLMs apply surface heuristics that systematically override implicit constraints. The causal-behavioral analysis reveals heuristic dominance ratios of 8.7-38×, and token-level attribution shows patterns "more consistent with keyword associations than compositional inference." The finding that models perform *worse* when constraints are removed (conservative bias) further demonstrates that apparent "correct" behavior is often accidental rather than reasoned.

---

## Status
- [x] Read complete (full HTML)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
