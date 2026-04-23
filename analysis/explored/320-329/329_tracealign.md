# Paper 329: TRACEALIGN — Tracing the Drift: Attributing Alignment Failures to Training-Time Belief Sources

## Metadata
- **arXiv**: 2508.02063
- **Date**: August 2025
- **Authors**: Amitava Das, Vinija Jain, Aman Chadha (et al.)
- **Venue**: arXiv cs.AI preprint
- **Stance**: Strongly supports thesis — forensic attribution of unsafe outputs to verbatim pretraining spans

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ALIGNMENT FAILURES = MEMORY FAILURES, NOT REASONING ERRORS          │
│                                                                      │
│  Build a suffix-array index over 1.3B tokens of unsafe pretraining   │
│  → adversarial-prompted unsafe completions trace back to verbatim    │
│    memorized spans with exact byte offsets in specific documents     │
│    (Reddit dumps, DIY-explosives guides, survivalist forums)         │
│                                                                      │
│  Vetoing high-memorization (high-BCI) spans during decoding          │
│  reduces alignment drift by 85.1% with ΔPPL < 0.2 on MMLU             │
│                                                                      │
│  Fine-tuning is a "superficial veneer atop unstable foundations"     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Alignment drift has traceable training-data origin.** Unsafe completions are "reactivations of specific training-time spans" — not hallucinations.
2. **Fine-tuning is a veneer.** Misalignment arises from "unresolved contradictions in these beliefs—fine-tuning acts as a superficial 'veneer' atop unstable foundations."
3. **Belief Conflict Index (BCI) predicts drift.** BCI(s) = −Σ log P_train(t) — a rarity-weighted memorization-pressure metric derived from pretraining distribution.
4. **Provenance-aware defenses reduce drift up to 85%** with Δperplexity < 0.2 on MMLU.
5. **Theoretical upper bound**: Pr[drift(q)] ≤ f(ℳ(q), ℓ_q, τ) — links memorization frequency and span length to adversarial reactivation risk.

---

## Methodology

### TraceIndex (Attribution Technique)
- **Suffix-array-based verbatim matching** — NOT gradient, NOT influence functions, NOT embedding similarity
- Authors explicitly reject embedding/gradient approaches: "semantically related but lexically distinct paraphrases may bypass alignment without reproducing exact spans. TraceIndex targets this vulnerability by detecting exact lexical recall."
- Built on Manber–Myers (1993) / Ferragina–Manzini (2000); adapted from OLMoTrace (Liu et al. 2024), scaling to trillions of tokens
- Attribution returns exact `(source file, domain, collection, byte offset)`

### Belief Conflict Index (BCI)
- **BCI(s) = −Σ log P_train(t_j)** — sum of negative log unigram probabilities under pretraining distribution
- Lower-bounds KL divergence; approximates cross-entropy
- Match score ℳ(q) = count of suffix matches; thresholds ℳ(q) ≤ 3 for reliable attribution
- Refusal rule: refuse if max_i BCI(s_i) > τ, τ=20 (ROC-calibrated)

### Three Defenses (Combined for 85% Drift Reduction)
1. **TraceShield** — runtime veto on high-BCI span matches (2.1% FPR, <80ms/100 tokens CPU)
2. **CBD Loss** (Contrastive Belief Deconfliction) — preference training term
3. **Prov-Decode** — provenance-aware decoding

### Models & Benchmark
- **Models**: LLaMA-2-Chat-13B, OLMo-2-32B-Instruct, GPT-NeoX-Aligned
- **Pretraining index**: 1.3B tokens of unsafe pretraining slices (Appendix G)
- **Alignment Drift Benchmark (ADB)**: 5,200 prompts across 5 domains (Explosives 1000, Cybercrime 1200, Self-Harm 1000, Hate 1000, Fraud 1000)
- GPT-4 rewriting at temp 0.9; G-Eval filtered

---

## Key Evidence

### Main Ablation on OLMo-2 (Figure 2)

| Configuration | Drift Rate | ΔPPL | Refusal Qual | FPR |
|---------------|-----------:|-----:|-------------:|----:|
| No Defense | **41.8%** | 0.00 | 3.2 | — |
| TraceShield only | 14.6% | +0.01 | 4.3 | 2.1% |
| CBD only | 16.1% | +0.18 | 4.1 | 1.7% |
| Prov-Decode only | 12.4% | +0.03 | 4.4 | 1.9% |
| T+C+P (full) | **6.2%** | +0.21 | 4.7 | 2.7% |

**85.1% drift reduction** with near-zero perplexity cost.

### DPO vs RLHF (Table 4)

| Method | Drift | Refusal | ASR |
|--------|------:|--------:|----:|
| RLHF (Anthropic-style) | 36.5% | 81.2% | 58.7% |
| DPO (Tulu-style) | 41.8% | 74.9% | 65.2% |
| **DPO + CBD Loss** | **16.1%** | **92.1%** | **26.1%** |

### Forensic Attributions (Figures 8–9)
- "mix 94% ammonium nitrate prills with 6% diesel fuel" → `diy-explosives-guide.pdf` (2019 Reddit dump), BCI=57.5
- "ingesting bleach…self-inflicted lacerations" → health forums, BCI=43.2
- "proxmark device" (RFID cloning) → survivalist archives, BCI=48.6
- "2–3 mg fentanyl, 10 mg digoxin" → medical forums, verbatim dose recall
- "bump key" → lockpicking forums, BCI=38.9

### Frequency Filter
- ℳ(q) ≤ 3 reduces noisy matches by 62%
- Trace precision +18%, no recall loss

---

## Key Quotes

> "Unsafe outputs often arise from resurfaced memorized content, not reasoning errors. TraceIndex tests this by matching drifted outputs to verbatim spans in an indexed unsafe corpus—revealing whether misalignment stems from memorization." (§3.1)

> "Misalignment arises not from a lack of tuning, but from unresolved contradictions in these beliefs—fine-tuning acts as a superficial 'veneer' atop unstable foundations." (§1)

> "In large language models (LLMs), unsafe completions often do not result from hallucination or randomness, but from the reactivation of high-salience fragments stored in pretraining memory… This is akin to reflexive recall dominating over normative reasoning." (Appendix D.6)

> "Alignment failures are not mere policy deviations, but memory failures." (Appendix A)

> "This parallels the dual-process theory of cognition (Evans 2008; Kahneman 2011), where fast, memory-based responses (System 1) often contradict deliberate, normative reasoning (System 2). In LLMs, we can think of alignment tuning as an attempt to simulate System 2 reasoning. However, TraceIndex reveals that System 1-style responses—i.e., cached outputs from pretraining—can still dominate under adversarial prompting." (Appendix D)

---

## Relationship to Other Papers

### Extends
- **Carlini et al. 2023** (memorization quantification)
- **Tirumala et al. 2022** (memorization scoring)
- **OLMoTrace (Liu et al. 2024)** — uses as substrate, adds BCI scoring

### Supports
- **Faith and Fate (#1, 2305.18654)** — pattern-matching over reasoning; TraceAlign = forensic version
- **GSM-Symbolic (#3, 2410.05229)** — same pattern: surface-feature recall over abstract rules
- **Emergent Misalignment (#328, 2502.17424)** — provides mechanism: alignment failures trace to data slices
- **Abliteration papers (#319, #320)** — alignment as shallow surface property

### Challenges
- Any paper claiming alignment failures emerge from reasoning dynamics rather than data provenance
- "Principled jailbreak resistance" claims — the receipts (byte offsets) show the opposite

---

## REBUTTALS

### Authors' Acknowledged Limitations (§7.2)
1. **Lexical rigidity** — suffix arrays match verbatim; paraphrase-invariant attribution remains future work
2. **Unigram BCI is simplistic** — over-penalizes rare-but-benign technical phrases
3. **Scaling** — O(log N) per query doesn't scale easily to trillion-token corpora
4. **Temporal blindness** — cannot distinguish pretraining vs fine-tuning origin
5. **Causal validity unverified** — "belief-to-span causal validity remains unverified"; the attribution is correlational
6. **Closed-source models** — requires training-corpus access; inapplicable to GPT-4/Claude without surrogates

### Strongest Circumstantial Causal Evidence
The 85% drift reduction via span-vetoing (TraceShield) IS the strongest evidence: if pattern-matching weren't the mechanism, blocking verbatim reproduction wouldn't work so well. Ablation shows the mechanism is the mechanism.

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STRONGLY SUPPORTS THESIS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. UNSAFE OUTPUTS ARE VERBATIM RECALL                              │
│     Exact byte-offset attribution to Reddit/forum/DIY-guide spans   │
│     "not reasoning errors" — authors' own words                     │
│                                                                     │
│  2. ALIGNMENT IS SHALLOW                                            │
│     Fine-tuning = "superficial veneer atop unstable foundations"    │
│     Pretraining memory (System 1) dominates alignment (System 2)    │
│                                                                     │
│  3. FORENSIC RECEIPTS                                               │
│     1.3B-token suffix array; 5,200-prompt benchmark;                │
│     85% drift reduction from span-vetoing                           │
│                                                                     │
│  4. CONVERGES WITH EMERGENT MISALIGNMENT                            │
│     Emergent Misalignment (#328): narrow FT selects persona         │
│     TRACEALIGN (#329): unsafe outputs ARE memorized pretraining     │
│     Two paths to same conclusion: behavior = data recall            │
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
