# Paper Analysis: Contamination-Resistant Benchmarks via KV-Cache Projection

## Metadata
- **arXiv ID**: 2605.19999
- **Title**: LLM Benchmark Datasets Should Be Contamination-Resistant
- **Authors**: Ali Al-Lawati, Jason Lucas, Dongwon Lee, Suhang Wang (Penn State University)
- **Date**: May 2026
- **Category**: cs.CL / cs.LG
- **Stance**: SUPPORTS (with position-paper caveat - proposal + prevalence evidence, not a new controlled capability experiment)

---

## The Problem It Names

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  THE BENCHMAXXING LOOP                                                     │
│                                                                            │
│  public benchmark → leaks into pretraining corpus → model "scores" rise    │
│        ▲                                                  │                 │
│        └────────────── recall masquerades as reasoning ◄──┘                 │
│                                                                            │
│  Measured: how much of the test set the model already saw.                 │
│  NOT measured: whether it can solve the underlying task.                    │
└──────────────────────────────────────────────────────────────────────────┘
```

This paper is a direct attack on the measurement substrate the thesis depends
on. If benchmark scores are contaminated, then "the model reasons" is unfalsifiable
- rising numbers could be pure memorization. The paper documents how bad
contamination is, then proposes a compression scheme to ship contamination-
resistant benchmark material.

---

## Core Claims

1. **Contamination is pervasive and inflates scores.** Cited prevalence reaches
   up to **45%** of samples flagged contaminated in some evaluation sets; up to
   **91.8%** overlap in specific cases; **90%** of certain test items recoverable
   from GPT-3; decontamination removes **16% of MMLU** and **13% of GSM8K**
   estimated-affected items, with corresponding score drops once removed.
2. **Static public benchmarks are structurally doomed.** Any fixed test set
   eventually enters the training corpus; the only durable fixes are dynamic
   regeneration or contamination-resistant distribution.
3. **Contamination-resistant distillation (CRD).** Compress the benchmark's
   context into a projected KV-cache representation that preserves evaluative
   signal while being hard to reverse into verbatim text - so the artifact can be
   distributed without seeding future training corpora with the answers.
4. **Aggressive compression keeps signal.** Using PyramidKV-style projection, a
   100K-token context cache shrinks **~50 GB → ~350 MB** at **0.7% / 12% / 20%**
   retention tiers while retaining usable evaluation fidelity.

---

## Methodology

- **Prevalence audit**: aggregates contamination measurements across MMLU,
  GSM8K, and other public benchmarks (overlap detection, n-gram / membership-
  inference style probes, decontamination-delta).
- **CRD mechanism**: project transformer KV-cache states (key/value tensors per
  layer/head) through a pyramidal compression (PyramidKV) that allocates more
  budget to lower layers; distribute the compressed cache as the benchmark
  artifact rather than raw text.
- **Compression accounting**: 100K-token context → full KV ~50 GB → projected
  ~350 MB; retention sweeps at 0.7%, 12%, 20%.

---

## Key Evidence

| Finding | Number |
|---|---|
| Contamination prevalence (upper cited) | up to **45%** of samples |
| Specific-case overlap | up to **91.8%** |
| GPT-3 test-item recoverability | **90%** |
| MMLU items removed by decontamination | **16%** |
| GSM8K items removed by decontamination | **13%** |
| KV-cache compression (100K ctx) | **~50 GB → ~350 MB** |
| Retention tiers swept | **0.7% / 12% / 20%** |

---

## Critical Analysis

### Relationship to the Thesis

Supports - *foundationally*. The thesis claims LLM "reasoning" is largely
training-distribution recall. This paper's prevalence numbers are exactly the
mechanism by which inflated benchmark scores look like reasoning: when up to 45%
of an eval set is contaminated and removing the overlap drops MMLU/GSM8K
materially, the headline accuracy was partly measuring memorization. That is the
benchmaxxing tell stated quantitatively.

It pairs naturally with ALE (#364): #365 explains *why static benchmarks lie*;
ALE *builds* a contamination-resistant benchmark and shows the recall advantage
evaporating (82% → <10%).

### Honest Caveats (why "with caveat")

- **Position/methods paper, not a capability experiment.** It does not run a
  controlled reasoning test; it documents contamination and proposes a
  distribution format. The thesis-support is about the *measurement substrate*,
  not a new behavioral finding.
- **Architecture-specific.** CRD assumes a transformer KV-cache; the mechanism
  is tied to a particular family and does not generalize to non-KV architectures
  or to closed models whose internals are inaccessible.
- **Resistance ≠ proven irreversibility.** "Hard to reverse" is asserted via
  compression; a formal guarantee that the projected cache cannot leak answers
  into a future corpus is not established. Determined extraction / membership
  inference against the compressed artifact is an open risk.
- **Prevalence numbers are aggregated from prior work** at varying definitions
  of "contamination" - the 45% / 91.8% / 90% figures come from heterogeneous
  measurement regimes and should be read as upper-bound illustrations, not a
  single consistent rate.

---

## Relationship to Other Papers

### Supports
- **RADAR: Data Contamination Detection (#57, 2510.08931)** - detection-side
  counterpart; #365 proposes a prevention/distribution-side fix.
- **How Much Do LLMs Cheat on Benchmarks (#276)** - same diagnosis (scores
  reflect exposure), complementary evidence.
- **GSM-Symbolic (#3)** - perturbation reveals the same recall-not-reasoning gap
  that contamination hides.

### Extended by
- **Agents' Last Exam (#364, 2606.05405)** - the constructive embodiment: a real
  benchmark built to be contamination-resistant where scores collapse.

### Allied position paper
- **PeerBench / Benchmarking is Broken (#366, 2510.07575)** - independent
  argument that static benchmarks measure recall; proposes governance instead of
  a compression artifact.

---

## REBUTTALS

### Known Direct Rebuttals
None found in corpus or on arXiv (recent, May 2026).

### Indirect Counter-Tension
1. **An optimist can grant contamination yet deny it explains the whole gap.**
   Decontamination drops MMLU/GSM8K but does not zero out accuracy - residual
   non-contaminated performance remains, which a capability advocate reads as
   genuine skill. The thesis-relevant claim is narrower: contamination is large
   enough that uncorrected benchmark scores cannot be taken as reasoning evidence.
2. **CRD's own validity is unproven against extraction** - if the compressed
   cache can be inverted, the "contamination-resistant" claim weakens, which would
   blunt its use as a fix (though not its diagnosis).

### Limitations Authors Acknowledge
- Transformer/KV-cache assumption limits applicability.
- Compression-retention tradeoff (0.7%–20%) bounds fidelity.
- Resistance is empirical, not formally guaranteed.

---

## Key Quotes (paraphrased pending verbatim re-pull)
> Decontamination removes a substantial fraction of MMLU (~16%) and GSM8K (~13%)
> items, with corresponding drops in measured accuracy.

> A 100K-token context cache compresses from ~50 GB to ~350 MB under pyramidal
> KV projection while retaining evaluative signal.

---

## Status
- [x] Read (full text via task agent)
- [x] Core claims + numbers extracted
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Critical Note for Thesis
Cite #365 for the *prevalence* numbers that quantify benchmaxxing: up to 45%
contaminated samples; decontamination drops MMLU 16% / GSM8K 13%. Frame it as a
position/methods paper - it establishes that static benchmark scores cannot be
read as reasoning, and motivates the contamination-resistant design that ALE
(#364) implements. Do NOT cite the CRD compression scheme as validated
irreversible; cite the contamination evidence.
