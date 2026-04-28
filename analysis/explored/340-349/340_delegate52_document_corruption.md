# Paper 340: LLMs Corrupt Your Documents When You Delegate (DELEGATE-52)

## Metadata
- **arXiv**: 2604.15597
- **Date**: April 2026
- **Authors**: Philippe Laban, Tobias Schnabel, Jennifer Neville
- **Affiliation**: Microsoft Research
- **Stance**: Strongly supports thesis — frontier LLMs silently confabulate during delegated long-horizon document workflows; agentic tools make it worse, not better

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  DELEGATION CORRUPTS — SILENTLY, SEVERELY, SPARSELY                  │
│                                                                      │
│  19 LLMs × 52 professional domains × 20-step round-trip relays       │
│                                                                      │
│  Frontier 3 models corrupt ~25% of content by interaction 20:        │
│    Gemini 3.1 Pro     RS@20 = 80.9   ( -19.1% loss)                  │
│    Claude 4.6 Opus    RS@20 = 73.1   ( -26.9% loss)                  │
│    GPT 5.4            RS@20 = 71.5   ( -28.5% loss)                  │
│  All-models average:               -50.0% loss                       │
│                                                                      │
│  Domain readiness (≥98% RS@20):                                      │
│    Python:           17/19 models ready                              │
│    Best model overall (Gemini 3.1 Pro):  11/52 domains ready         │
│    Catastrophic (≤80%) in >80% of (model, domain) cells              │
│                                                                      │
│  Failures are NOT death-by-a-thousand-cuts:                          │
│    Critical errors (≥10pt single-step drop) = 80–98% of damage       │
│    Frontier models: 73–78% of degradation is ACTIVE corruption       │
│      (hallucination, structure change, math errors), not deletion    │
│                                                                      │
│  Agentic tool use makes it WORSE: average +6% additional degradation │
│  across 4 tested models.                                             │
│                                                                      │
│  100-interaction extension: NO model plateaus.                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Frontier LLMs are unreliable delegates.** Even Gemini 3.1 Pro, Claude 4.6 Opus, GPT 5.4 corrupt ~25% of document content over 20 delegated interactions; the average across all 19 models is ~50%.
2. **Short-horizon performance is not predictive of long-horizon performance.** GPT 5 vs Kimi K2.5 score 91.5 vs 91.1 at interaction 2, then diverge to 48.3 vs 64.1 by interaction 20. Some models reverse rank order.
3. **Agentic tool use does NOT help.** Across 4 tested models, agentic harness yields an additional 6% degradation on average vs tool-free single-shot.
4. **Degradation is dominated by sparse critical failures, not gradual drift.** Critical errors (≥10pt drop in a single round-trip) account for 80–98% of total degradation.
5. **Frontier corruption is active, not deletion.** For Claude 4.6 Opus/Sonnet only 22–27% of degradation is deletion; the rest is hallucinated, distorted, or restructured content.
6. **Models are "ready" in essentially no domains.** Python is the only of 52 domains where most models hit ≥98% RS@20.

---

## Methodology

### DELEGATE-52 Benchmark
- **310 work environments** across **52 professional domains** in 5 categories (Science & Engineering, Code & Configuration, Creative & Media, Structured Records, Everyday)
- 6 environments per domain
- Domains: Python, Docker, JSON, DNS, Graphviz, Crystallography, Quantum, Robotics, Molecule, Star Catalog, Lean math, Satellite, Weather, Aviation, Protein, Screenplay, Fiction, Font Engineering, Vector graphics, Recipe, Chess, Music notation, .srt subtitles, Textile patterns, 3D objects, Accounting, Genealogy, Earnings statements, Translation, Malware, Makefile, DB Schema, Filesystem, etc.

### Per Environment
- 1 seed document (real, permissively licensed; 3–5k tokens GPT-4 tiktoken)
- 5–10 reversible edit-task pairs (forward instruction + backward inverse)
- 8–12k tokens of distractor documents
- Per interaction: ~15k context tokens

### Round-Trip Relay Evaluation
- Each transformation σ is paired with its inverse σ⁻¹
- Forward: t = LLM(s; x→); Backward: ŝ = LLM(t; x←) — each step **stateless single-turn**
- Under a perfect model: sim(s, ŝ) = 1 → no reference annotation needed (backtranslation)
- Chain N=10 round-trips → **20 interactions** per simulation
- Edits scheduled in **round-robin** (validated: 20–24 points harder at RS@20 than repeating one edit)
- Section 4.4 extends to N=50 → 100 interactions

### Domain-Specific Similarity
- Each of 52 domains has a custom parser → structured representation, then weighted similarity in [0,1]
- Recipe: 40% ingredients + 40% steps + 20% tips
- Robust to surface (200g vs 0.2kg butter); sensitive to semantic (200g → 800g butter)
- LLM-as-judge (GPT 5.4) captures **at most 25% of variance** vs parsing — generic methods fail

### Quality Assurance
- 8-stage QA (Appendix K): parsing robustness, evaluation sensitivity, edit testing, distractor non-interference
- Compliance audit (Appendix A): 93.8% of attempts fully or partially executed; non-compliance only 3.0% (1.7% in top-10 models)

### Failure-Mode Tagging (11 labels)
`content_loss`, `truncation`, `hallucination`, `structure_change`, `skipped_backward_edit`, `syntax_error`, `mathematical_error`, `duplicated_content`, `reordering`, `templated_completion`, `other` — grouped as **deletion (2)** vs **corruption (9)**.

---

## Key Evidence

### 19 Models — RS@20 (with distractors, no tools)

| Rank | Model | Family | RS@20 |
|-----:|-------|--------|------:|
| 1 | **Gemini 3.1 Pro** | Google | **80.9** |
| 2 | **Claude 4.6 Opus** | Anthropic | **73.1** |
| 3 | **GPT 5.4** | OpenAI | **71.5** |
| 4 | GPT 5.2 | OpenAI | 66.1 |
| 5 | Claude 4.6 Sonnet | Anthropic | 66.0 |
| 6 | Kimi K2.5 | Moonshot | 64.1 |
| 7 | GPT 5.1 | OpenAI | 60.5 |
| 8 | Grok 4 | xAI | 59.3 |
| 9 | GPT 4.1 | OpenAI | 49.5 |
| 10 | GPT 5 | OpenAI | 48.3 |
| 11 | o3 | OpenAI | 48.2 |
| 12 | o1 | OpenAI | 48.1 |
| 13 | GPT 5 Chat | OpenAI | 46.8 |
| 14 | GPT 5 Mini | OpenAI | 45.1 |
| 15 | Gemini 3 Flash | Google | 35.8 |
| 16 | Mistral Large 3 | Mistral | 35.5 |
| 17 | GPT OSS 120B | OpenAI | 19.2 |
| 18 | GPT 4o | OpenAI | 14.7 |
| 19 | GPT 5 Nano | OpenAI | 10.0 |

Frontier 3 average corruption ≈ (19.1 + 26.9 + 28.5)/3 = **24.8%**.

### Domain Readiness (≥98% RS@20)
- **Python**: 17/19 models ready — the *only* such domain
- **Gemini 3.1 Pro (best)**: ready in **11/52** domains
- Catastrophic corruption (≤80%) in **>80%** of (model, domain) pairs

### Document Size (Section 4.3, GPT 5.4)
- 1k tokens → 10k tokens: RS@20 falls to 59.9%
- Each +1,000 tokens costs **0.7%** at interaction 2 but **3.6%** at interaction 20
- Document size and interaction length compound **multiplicatively**

### Length of Interaction (Section 4.4, 100 interactions)
- All models continue to degrade — **none plateau**
- GPT 5.4 drops below 60% by round-trip 50
- First half (rounds 5–25) yields 2–3× more loss than rounds 25–50, but loss never stops

### Distractor Effect (Section 4.5)
- Removing distractors: +0.4–4% at 2 interactions, +2–8% at 20 interactions
- **Distractor harm compounds with horizon**

### Agentic Tool Use (Section 4.2)
- All 4 tested models do *worse* with tools
- Average additional degradation: **6%**
- GPT 5.4: 71.5 → 68.3 (−3%)
- Tools cause 8–12 calls per task → 2–5× input tokens
- Models prefer file-write over code execution; better models use code execution more (10% GPT 4.1 vs 45% GPT 5.4)

### Image Domain (Section 4.6)
- Best image-editing models reach only **28–30% at RS@20**; none exceeds 65% even at RS@2

### Failure-Mode Decomposition (Appendix F)
- Weaker models (GPT 4o, GPT 5 Nano): **70–73%** of degradation = deletion
- Frontier models (Claude 4.6 Opus/Sonnet): only **22–27%** = deletion → dominant failure is **active corruption**

### Hardest Operations (point-biserial vs RS, GPT 5.2)
- Split-and-merge (r = −0.080), classification (r = −0.076), format knowledge (r = −0.060) — operations requiring **global document restructuring**
- Local operations (string manipulation, referencing) are easier

---

## Key Quotes

> "Current LLMs are unreliable delegates: they introduce sparse but severe errors that silently corrupt documents, compounding over long interaction." (Abstract)

> "Even frontier models (Gemini 3.1 Pro, Claude 4.6 Opus, GPT 5.4) degrade documents by 25% on average over 20 interactions." (§4.1)

> "Python is the only domain (out of 52) where most models are ready, highlighting the significant gap that remains." (§1)

> "Models are not failing due to 'death by a thousand cuts.' LLMs don't slowly corrupt content through many small rounding errors. Instead, they maintain near-perfect reconstruction in some rounds, and experience critical failures in a few rounds — typically losing 10-30+ points in a single round-trip." (Appendix E)

> "The stronger models (Gemini 3.1 Pro, Claude 4.6, GPT 5.4) aren't avoiding small errors better, they delay critical failures to later rounds and experience them in fewer interactions." (Appendix E)

> "Current LLMs primarily corrupt user documents in delegated workflows. Degradations observed over repeated editing interaction is primarily attributable to the model altering content in a way that is incorrect, hallucinated or distorted, rather than simply deleting content." (Appendix F.2)

> "The four tested models perform worse when operated agentically with tools than without, incurring an average additional degradation of 6% by the end of simulation." (§4.2)

> "Document size and interaction length compound multiplicatively: the degradation from increased document size snowballs over the course of the interaction." (§4.3)

> "Distractor harm compounds with interaction length, and measuring short-term effect of distractors likely underestimates their effects in long, realistic interactions." (§4.5)

> "Short interaction simulations are insufficient to understand long-horizon LLM performance." (§4.1)

---

## Relationship to Other Papers

### Strongly Supports
- **Faith and Fate (#1, 2305.18654)** — long-horizon planning collapse; here surface as 100-interaction unbounded drift
- **YC-Bench (#339, 2604.01212)** — same week's complementary finding: long-horizon agentic failure under compounding signals
- **TraitBasis (#338, 2510.04491)** — agent brittleness under user-side perturbation; this paper extends to document-side perturbation
- **From Plan to Action (#337, 2604.12147)** — agent fall-back to memorized workflows; here, fall-back to file-rewrite over verification
- **Pressure Reveals Character (#330, 2602.20813)** — character drift under length; here, capability drift under length
- **Beyond Anthropomorphic (#336, 2502.09192)** — pattern-completion, not goal-directed — frontier "active corruption" is locally plausible pattern completion

### Extends
- **Lost in the Middle (Liu et al. 2023)** — long-context degradation, here in delegated multi-step
- **Distracted by Irrelevant Context (Shi et al. 2023)** — distractor harm, here compounding over horizon
- **LLMs Get Lost in Multi-Turn (Laban et al. 2025)** — single-turn version of degradation; multi-turn would amplify

### Complements
- **CoT Faithfulness Unlearning (#30)** — internal-state inconsistency; here, output-document inconsistency
- **Reasoning Theater (#306, 2603.05488)** — performative reasoning ≠ faithful execution

### Smoking Gun Status
The 17/19 Python success vs the ≤30% RS@20 in domains like Crystallography, Music notation, Textile patterns is one of the cleanest large-scale demonstrations that frontier LLM reliability **tracks training-data density of surface forms**, not domain difficulty per se. Recommend candidate for findings.html "jagged frontier by data density" theme.

---

## REBUTTALS

### Authors' Acknowledged Limitations (Section 8 + Appendix B.3)
1. **Single-turn only.** Real workflows are multi-turn; multi-turn would amplify degradation (Laban 2025).
2. **Practical constraints likely understate severity.** 3–5k seed, 8–12k distractors, 20-interaction relay chosen for cost; their own scaling experiments show larger settings = worse.
3. **Conceptual constraints.** Document editing only (excludes communication, planning); edits must be reversible; favors structurally parsable domains.
4. **Round-trip opacity.** Backtranslation reports *something* went wrong but not *where* in the cycle.
5. **Reversibility constrains the edit space.** Compression, summarization not testable.
6. **Subjective edits hard to evaluate.** Fiction uses specialized rubric.
7. **Partial-execution credit may overstate true capability.** Compliance audit warns scores "slightly overstate."
8. **Error faithfulness is empirical, not proved.** Stochastic errors "do not produce systematically self-canceling errors" is an assumption.

### Tension for Pure Pattern-Matching Reading
The 16-month progression GPT 4o (14.7) → GPT 5.4 (71.5) is genuinely impressive. A skeptic must explain why scaling continues to help. The paper's own framing favors "current LLMs are not yet ready" over "current architectures fundamentally cannot." Python's 17/19 success shows that with enough data density and verifiability, current architectures are reliable — consistent with both views (genuine reasoner OR very-good pattern matcher with thick training data).

### Mirror Rebuttals (Counter-Evidence Considered)
- The paper does *not* directly cite reasoning-skeptic literature (Mirzadeh GSM-Symbolic, Apple's Illusion of Thinking, Anthropic's CoT-faithfulness work, alignment-faking). This means findings are independently arrived-at, strengthening convergent-evidence value.

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STRONGLY SUPPORTS THESIS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. JAGGED FRONTIER TRACKS DATA DENSITY                             │
│     Python: 17/19 ready. Crystallography/Music/Textile: <30%        │
│     Operations are domain-general; performance is not               │
│     → Predicted by pattern-matching, not by reasoning               │
│                                                                     │
│  2. ACTIVE CORRUPTION DOMINATES IN FRONTIER MODELS                  │
│     78% of Claude Opus damage = hallucinated/distorted content      │
│     Models complete the pattern locally; faithful preservation      │
│     of the input is not what next-token generation optimizes        │
│                                                                     │
│  3. SPARSE-SEVERE-SILENT FAILURE PROFILE                            │
│     80–98% of damage from a few critical drops                      │
│     Stochastic out-of-distribution collapse, not graceful reasoning │
│     If reasoning were the engine, errors would be smooth            │
│                                                                     │
│  4. TOOLS CAN'T RESCUE                                              │
│     Agentic harness adds +6% degradation on average                 │
│     Models prefer file-rewrite (regenerate from patterns) over      │
│     code execution (verify mechanically)                            │
│     Falsifies "scaffolding will save us" defense for these tasks    │
│                                                                     │
│  5. NO LONG-HORIZON PLATEAU                                         │
│     100 interactions: degradation continues monotonically           │
│     Stable internal representations would plateau                   │
│     Autoregressive drift is the predictive-system signature         │
│                                                                     │
│  6. DISTRACTORS COMPOUND WITH HORIZON                               │
│     Attention-pattern-matching can't ignore semantically related    │
│     but task-irrelevant content; harm grows with steps              │
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
