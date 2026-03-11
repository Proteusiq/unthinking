# Paper Analysis: Can You Trust LLM Judgments? Reliability of LLM-as-a-Judge

## Metadata
- **arXiv ID**: 2412.12509
- **Title**: Can You Trust LLM Judgments? Reliability of LLM-as-a-Judge
- **Authors**: Kayla Schroeder, Zach Wood-Doughty (Northwestern University)
- **Date**: Dec 2024

---

## Core Claims

1. **Single-shot LLM evaluations are fundamentally unreliable** — a single output is just one sample from a probability distribution, creating "fixed randomness" that systematically misleads
2. **Inter-rater reliability is insufficient for LLM judges** — doesn't account for inherent randomness; varies wildly (0.167 to 1.00) with different seeds
3. **McDonald's omega provides rigorous reliability measurement** — internal consistency across multiple replicated evaluations is the appropriate measure
4. **Temperature setting does not universally improve reliability** — optimal temperature varies by model AND task
5. **Performance-reliability trade-off exists** — models optimized for benchmark performance may sacrifice judgment reliability

---

## Methodology

**Framework**: Uses McDonald's omega (ω) from psychometrics to measure internal consistency reliability.

```
ω = (Σλᵢ)² / [(Σλᵢ)² + Σθᵢᵢ + 2Σθᵢⱼ]
```

**Experimental Design**:
- **Benchmarks**: BBH (hard), SQuAD (easier), MT-Bench (multi-turn) — 55 questions
- **Judge models**: Starling-LM-7B-beta, Gemma-1.1-7b-it, Meta-Llama-3-8B-Instruct
- **Procedure**: Each judge evaluated same 5 responses **100 times**, varying only random seed
- **Temperature levels**: 1.0, 0.75, 0.5, 0.25, 0

---

## Key Evidence

```
┌─────────────────────────────────────────────────────────────────────┐
│                INTER-RATER RELIABILITY VARIABILITY                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Just by changing the random seed:                                  │
│                                                                     │
│  IRR ranges from 0.167 to 1.000                                     │
│                                                                     │
│  "This disconcertingly wide range demonstrates that inter-rater     │
│   reliability is highly sensitive to random seed variation"         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### McDonald's Omega by Model and Benchmark

| Model | BBH | SQuAD | MT-Bench | Interpretation |
|-------|-----|-------|----------|----------------|
| Gemma-1.1-7b (temp=0.25) | 0.803 | 0.770 | 0.637 | Good / Questionable |
| Starling-LM-7B (temp=0.75) | 0.713 | 0.639 | 0.618 | Acceptable / Questionable |
| Meta-Llama-3-8B (temp=0.25) | 0.661 | 0.533 | 0.421 | Questionable / Unacceptable |

### Reliability Interpretation Scale

| Reliability | Interpretation |
|-------------|----------------|
| α > 0.9 | Excellent |
| 0.9 > α > 0.8 | Good |
| 0.8 > α > 0.7 | Acceptable |
| 0.7 > α > 0.6 | Questionable |
| 0.6 > α > 0.5 | Poor |
| α < 0.5 | Unacceptable |

| Finding | Number | Context |
|---------|--------|---------|
| IRR variation | 0.167 → 1.00 | Same evaluation, different seeds |
| Worst omega score | 0.421 | Meta-Llama on MT-Bench (Unacceptable) |
| Best omega score | 0.803 | Gemma on BBH (Good) |
| Binary judgment omega | >0.989 | With ground truth provided (Excellent) |
| Temperature=0 omega | 1.000 | False reliability via determinism |
| Replications used | 100 | Per judgment prompt |

### Temperature Does NOT Uniformly Improve Reliability

```
┌─────────────────────────────────────────────────────────────────────┐
│                 TEMPERATURE EFFECTS ARE MODEL-SPECIFIC              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Meta-Llama-3-8B on MT-Bench:                                       │
│    temp=1.0  → ω = 0.590                                            │
│    temp=0.25 → ω = 0.421  (WORSE at lower temperature!)             │
│                                                                     │
│  Gemma on BBH:                                                      │
│    temp=1.0  → ω = 0.723                                            │
│    temp=0.25 → ω = 0.803  (Better at lower temperature)             │
│                                                                     │
│  Temperature=0 gives ω=1.0 but this is "fixed randomness"           │
│  — determinism masks variability, doesn't eliminate it              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Performance vs Reliability Trade-off

| Metric | Gemma | Starling | Llama |
|--------|-------|----------|-------|
| Chatbot Arena Rank | Lowest | Middle | Highest |
| Judgment Reliability | Highest | Middle | Lowest |

The ranking **inverts** — models optimized for performance may sacrifice reliability.

---

## Relationship to Other Papers

### Supports
- **LLM-as-a-Judge Survey (2411.15594)**: Confirms unreliability with rigorous psychometric framework
- **Faith & Fate (2305.18654)**: Pattern matching produces inconsistent judgments across seeds
- **GSM-Symbolic (2410.05229)**: Same fragility pattern — small changes cause large variation

### Extends
- **LLM-as-a-Judge Survey**: Provides quantitative reliability framework (McDonald's omega) missing from survey

### Challenges
- Claims that temperature=0 settings produce "reliable" evaluations — it's deterministic but not reliable

---

## REBUTTALS

### Known Rebuttals
- **Binary judgments are more reliable**: Head-to-Tail benchmark with ground truth achieved ω > 0.989
- **Some models are better**: Gemma shows "Good" reliability on structured tasks

### Limitations (Authors Acknowledge)

1. **Benchmark scope**: Only tested on BBH, SQuAD, MT-Bench
2. **Domain-specific tolerance**: "Different domains have varying tolerances for variability"
3. **Upper bound estimates**: Non-responses treated as same category, inflating reliability
4. **No domain-specific thresholds**: Practical guidelines left for future work

---

## Key Quotes

> "Current LLM-as-a-judge methods, relying on single outputs, mask inherent judgment variability, creating a **false sense of reliability**... This 'fixed randomness' poses risks, especially in high-stakes applications like medical AI evaluation."

> "Even with deterministic settings, a single LLM output remains a sample from the model's probability distribution, subject to inherent randomness. This results in 'fixed randomness,' which can lead to significant limitations."

> "The overall reliability scores are troubling. Adhering to the widely accepted reliability rule of thumb, Starling-LM-7B-beta and Meta-Llama-3-8B-Instruct exhibited **questionable reliability** across benchmarks, with SQuAD and MT-Bench results consistently falling **below the acceptable range**."

---

## Thesis Relevance

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CRITICAL IMPLICATION                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Single-shot LLM evaluations create "a false sense of reliability"  │
│                                                                     │
│  The problem is NOT just bias (as Survey #267 showed)               │
│  It's FUNDAMENTAL UNRELIABILITY:                                    │
│                                                                     │
│    Same prompt + same model + different seed = different judgment   │
│                                                                     │
│  Most LLM judges show "QUESTIONABLE" to "UNACCEPTABLE" reliability  │
│  (ω = 0.42 - 0.80, where 0.7 is minimum acceptable)                 │
│                                                                     │
│  If judgment varies randomly across seeds, what does the            │
│  judgment even MEAN? It's not measuring a stable property.          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Stance: SUPPORTS THESIS**

This paper provides rigorous psychometric evidence that:
1. LLM judgments are fundamentally unreliable — not just biased, but inconsistent
2. Temperature=0 creates "fixed randomness" — determinism masks the problem
3. Performance and reliability are inversely related — better models may be worse judges
4. Single-shot evaluations should not be trusted for important decisions

Combined with Survey #267 (biases) and this paper (inconsistency), the LLM-as-a-Judge paradigm is doubly compromised: biased AND unreliable.

---

## Status
- [x] Read complete (full HTML)
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [ ] Paper graph updated
