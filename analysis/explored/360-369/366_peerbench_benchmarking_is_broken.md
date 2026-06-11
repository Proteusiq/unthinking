# Paper Analysis: PeerBench - Benchmarking Is Broken

## Metadata
- **arXiv ID**: 2510.07575
- **Title**: Benchmarking is Broken - Don't Let AI be its Own Judge (PeerBench)
- **Authors**: Zerui Cheng, Stella Wohnig, Ruchika Gupta, Samiul Alam, Tassallah Abdullahi, João Alves Ribeiro, Christian Nielsen-Garcia, Saif Mir, Siran Li, Jason Orender, Seyed Ali Bahrainian, Daniel Kirste, Aaron Gokaslan, Mikołaj Glinka, Carsten Eickhoff, Ruben Wolff (multi-institution, 16 authors)
- **Date**: Oct 2025
- **Category**: cs.CL / cs.AI
- **Stance**: SUPPORTS (with position-paper caveat - a governance proposal backed by a leakage probe, not a new controlled capability experiment)

---

## The Core Indictment

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  "SUPERHUMAN" ON QA          but          FAILS ON OOD                     │
│  ----------------------                   ------------------               │
│  GPT-4 can INFER masked MMLU              Out-of-distribution variants      │
│  answers at 57% - without the             of the same questions collapse,   │
│  question's actual content                revealing "lack of true           │
│                                            understanding"                    │
│                                                                            │
│  Diagnosis: the score measures leakage + pattern recall, not competence.   │
└──────────────────────────────────────────────────────────────────────────┘
```

PeerBench attacks the same substrate as #365 but from governance rather than
compression: if a model can guess answers it was never shown, and "superhuman"
QA scorers fall apart out-of-distribution, then the benchmark is measuring
contamination and surface pattern-matching, not reasoning. The fix proposed is
institutional, not algorithmic.

---

## Core Claims

1. **Benchmarks are broken by leakage + self-judging.** Static public benchmarks
   leak into training data; using AI to judge AI compounds the problem (no
   independent ground truth).
2. **Leakage is demonstrable.** GPT-4 infers **masked MMLU answers at ~57%**
   accuracy - recovering the correct option without being given the question's
   substantive content, evidence the items (or their structure) are memorized.
3. **"Superhuman" is an artifact.** Models that post superhuman QA numbers
   "fail on OOD, revealing a lack of true understanding" - the headline tracks
   distribution coverage, not generalizable skill.
4. **Don't let AI be its own judge.** LLM-as-judge inherits the same blind spots
   and contamination as the systems it evaluates; it cannot supply the
   independent ground truth benchmarking needs.
5. **PeerBench: a community-governed, proctored alternative.** A live, continuously
   refreshed, human-in-the-loop "proctored exam" platform with community
   governance - sealed/rotating items, controlled administration, and peer
   review to keep the test surface uncontaminated and the judging independent.

---

## Methodology

- **Leakage probe**: mask the answer-bearing content of MMLU items and test
  whether a frontier model (GPT-4) can still recover the correct option;
  ~57% recovery is reported as a contamination/structural-leakage signal.
- **OOD critique**: surveys/cites cases where superhuman QA models degrade on
  out-of-distribution reformulations of the same tasks.
- **Proposal**: design principles for a proctored, community-governed live
  benchmark (sealed item pools, rotation, human oversight, independent judging)
  rather than a static leaderboard with LLM judges.

---

## Key Evidence

| Finding | Number |
|---|---|
| GPT-4 infers masked MMLU answers | **~57%** |
| Authors (peer-validation signal) | **16**, multi-institution |
| OOD degradation of "superhuman" QA | qualitative (cited cases) |

---

## Critical Analysis

### Relationship to the Thesis

Supports. Two thesis-critical claims are stated explicitly:
- **57% masked-answer inference** is the benchmaxxing tell in miniature - the
  model "knows" the answer without the question, i.e., it is recalling the test,
  not solving it.
- **"Superhuman on QA, fails OOD, lacks true understanding"** is almost a verbatim
  statement of the thesis's compositional-failure pillar (ID success ≠ OOD
  generalization).

It triangulates with #365 (prevalence/compression), #364 (constructive
contamination-resistant benchmark), and the broader Pillar-1 compositional-failure
cluster.

### Honest Caveats (why "with caveat")

- **Position paper.** The central contribution is a *governance design*
  (PeerBench), not a new controlled experiment. Its empirical content is the
  single masked-MMLU leakage probe; the OOD claims are largely cited, not
  freshly run here.
- **Proposal unvalidated at scale.** A community-governed proctored platform has
  not been shown to be tamper-proof, scalable, or free of its own incentive
  failures (who governs the governors; sustainability of human proctoring).
- **57% needs its baseline.** Masked-MMLU inference above chance is meaningful,
  but the contamination-vs-format-priors decomposition (4-option structure, answer
  distribution priors) matters for how much of the 57% is true leakage vs prior.
- **"Don't let AI judge AI" is partly self-undercutting** for any scalable
  benchmark - the proposed human-in-the-loop path trades throughput for
  independence, an unproven tradeoff.

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic (#3)** - OOD reformulation collapses scores; PeerBench
  generalizes the critique to QA benchmarks.
- **How Much Do LLMs Cheat on Benchmarks (#276)** - shared "scores = leakage"
  diagnosis.
- **Comprehension Without Competence (#19 area)** - "superhuman score, no
  understanding" is the split-brain pattern.

### Allied position paper
- **Contamination-Resistant Benchmarks (#365, 2605.19999)** - independent
  argument, algorithmic fix (KV compression) vs PeerBench's governance fix.

### Embodied by
- **Agents' Last Exam (#364, 2606.05405)** - the constructive answer: a fresh,
  verifiable, mostly-private benchmark where leakage cannot inflate scores.

---

## REBUTTALS

### Known Direct Rebuttals
None found in corpus or on arXiv.

### Indirect Counter-Tension
1. **Capability optimists dispute the masked-inference framing** - some masked-MMLU
   recovery is attributable to legitimate world knowledge and answer-format priors,
   not pure contamination; 57% therefore overstates "leakage" if uncorrected.
2. **LLM-as-judge defenders** note that with rubrics and ensembling, AI judging
   correlates well with humans on many tasks; the blanket "don't let AI judge AI"
   may be too strong for low-stakes evaluation.
3. **Governance proposals are easy to state, hard to sustain** - the fix is the
   paper's weakest, least-tested part.

### Limitations Authors Acknowledge
- Empirical evidence is a single leakage probe; PeerBench is a proposal.
- Human-in-the-loop proctoring has scalability costs.

---

## Key Quotes (paraphrased pending verbatim re-pull)
> GPT-4 can infer masked MMLU answers at roughly 57% accuracy, indicating
> leakage of benchmark content into training.

> Models reported as superhuman on QA fail on out-of-distribution variants,
> revealing a lack of true understanding.

> Don't let AI be its own judge - AI evaluating AI inherits the same
> contamination and blind spots it is meant to detect.

---

## Status
- [x] Read (full text via task agent)
- [x] Core claims + numbers extracted
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Critical Note for Thesis
Cite #366 for two clean quotes: GPT-4 inferring masked MMLU at 57% (recall, not
reasoning) and "superhuman on QA, fails OOD, lacks true understanding" (Pillar 1
in the authors' own words). Frame as a position paper - its empirical core is one
leakage probe and the PeerBench governance proposal is unvalidated. It is
strongest as corroboration of the benchmaxxing diagnosis (#364, #365), not as
standalone controlled evidence.
