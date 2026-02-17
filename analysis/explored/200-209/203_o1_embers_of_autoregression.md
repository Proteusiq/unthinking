# Paper Analysis: When Optimized for Reasoning, Does It Still Show Embers of Autoregression?

## Metadata
- **arXiv ID**: 2410.01792
- **Title**: When a language model is optimized for reasoning, does it still show embers of autoregression? An analysis of OpenAI o1
- **Authors**: R. Thomas McCoy, Shunyu Yao, Dan Friedman, Mathew D. Hardy, Thomas L. Griffiths
- **Institutions**: Yale University, OpenAI, Princeton University
- **Date**: October 2024
- **Note**: Same authors as "Embers of Autoregression" (2309.13638) — this is the follow-up testing o1

---

## Core Claims

1. **o1 still shows embers of autoregression** — despite being optimized for reasoning
2. **Output probability sensitivity persists** — o1 performs better on high-probability outputs
3. **Task frequency effects reduced but not eliminated** — visible when tasks are challenging
4. **Thinking tokens reveal hidden difficulty** — o1 uses more tokens for hard cases even when accuracy is similar
5. **Optimizing for reasoning mitigates but doesn't overcome** probability sensitivity

---

## Key Results

### Output Probability Sensitivity

o1 shows the **same qualitative pattern** as GPT-4 — just quantitatively better:

| Task | High-Prob Accuracy | Low-Prob Accuracy | Gap |
|------|-------------------|-------------------|-----|
| Shift cipher | 92% | 47% | **45%** |
| Article swapping | ~100% | ~60% | ~40% |
| Reversal | High | Lower | Significant |
| Pig Latin | High | Lower | Significant |

**This is on DETERMINISTIC tasks** — probability should not matter, but it does.

### Task Frequency Effects

On standard datasets, o1 appears to eliminate frequency effects:

| Task | Common Variant | Rare Variant | GPT-4 Gap | o1 Gap |
|------|----------------|--------------|-----------|--------|
| Acronyms (1st vs 2nd letter) | 100% | 99.9% | 73% | ~0% |
| Sorting | ~100% | ~100% | 48% | ~0% |
| Linear functions | ~100% | ~100% | 33% | ~0% |

**BUT** when tasks are made harder (ceiling effects removed):

| Task (Hard Version) | Common | Rare | Gap |
|---------------------|--------|------|-----|
| Sorting (all words start with 'i') | Higher | Lower | **Significant** |
| Shift cipher (low-prob outputs) | Higher | Lower | **Significant** |

> "o1 shows substantially less sensitivity to task frequency than the other LLMs... However, there still is evidence of task frequency effects in some cases, namely when the tasks are made more challenging."

### Thinking Tokens Reveal Hidden Difficulty

Even when accuracy is ~equal, o1 uses **more tokens** for hard cases:

| Condition | Thinking Tokens |
|-----------|-----------------|
| High-prob output | Fewer |
| Low-prob output | **More** |
| Common task (acronyms) | ~100 |
| Rare task (acronyms) | **~2000** |

> "For both shift cipher decoding and acronyms, o1 uses far more tokens for the rare task variant than the common one... These cases show that it is possible for o1 to display a difference in difficulty as quantified by the number of tokens that are used even when the relevant accuracies show no variation."

---

## Mechanism: Why Do Embers Persist?

The authors identify two potential sources:

1. **Generation process** — Any system optimized for statistical prediction is biased toward high-probability text
2. **Chain-of-thought selection** — If o1 considers multiple chains and picks one, probability may influence the selection (favoring "plausible" = high-probability answers)

> "It is not clear what modeling enhancements would suffice to fully overcome the limitations that we have highlighted. One potential solution would be to incorporate model components that do not involve probabilistic judgments in any way, such as modules that execute Python code."

---

## Relationship to Other Papers

### Direct Follow-up To
- **Embers of Autoregression (2309.13638)** — Same authors, tests if o1 fixes the issues. Answer: No.

### Supports
- **Faith and Fate (2305.18654)** — Compositional failure at distribution boundaries
- **GSM-Symbolic (2410.05229)** — Surface changes break performance
- **Illusion of Thinking (2506.06941)** — Reasoning models still have limits
- **Can LLMs Reason and Plan (2403.04121)** — LLMs = approximate retrieval

### Extends
- **DeepSeek-R1 (2501.12948)** — Both test reasoning-optimized models; both find limitations
- **Survey of Test-Time Compute (2501.02497)** — More compute doesn't fix fundamental issues

### Provides Evidence For
- **The surfacing hypothesis** — RL surfaces capabilities, doesn't create reasoning
- **Pattern matching thesis** — Even o1 is probability-driven

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"o1 is much better"** — True quantitatively, but the QUALITATIVE pattern is identical
2. **"These are edge cases"** — The authors deliberately designed experiments to test fundamentals
3. **"Future reasoning models will fix this"** — Authors note "it is not clear what modeling enhancements would suffice"

### Limitations (Authors Acknowledge)

- Only tested o1-preview, not full o1
- Exact o1 architecture unknown
- One author (Shunyu Yao) works at OpenAI (but didn't contribute to speculation about how o1 works)

---

## Key Quotes

> "o1—like previous LLMs—is sensitive to the probability of examples and tasks, performing better and requiring fewer 'thinking tokens' in high-probability settings than in low-probability ones."

> "These results show that optimizing a language model for reasoning can mitigate but might not fully overcome the language model's probability sensitivity."

> "The sparks of AGI that LLMs may be producing continue to be accompanied by embers of autoregression."

> "It is not clear what modeling enhancements would suffice to fully overcome the limitations that we have highlighted."

---

## Implications for Thesis

### Direct Support for Pattern Matching View

1. **Reasoning optimization doesn't eliminate probability bias** — The fundamental limitation is architectural
2. **More thinking ≠ better reasoning** — o1 just works harder on hard cases, still biased
3. **Ceiling effects hide the problem** — Only visible when tasks are challenging enough
4. **The embers are structural** — Rooted in autoregression itself, not just training

### The Teleological Argument

The paper explicitly frames this through "teleological analysis":
> "Developing a complete teleological analysis of an AI system requires consideration of all types of optimization that have been applied to that system."

Even with reasoning optimization, the next-word prediction foundation still shapes behavior.

---

## Evidence Quality Assessment

| Criterion | Assessment |
|-----------|------------|
| Same authors as original | ✅ Continuity, same methodology |
| Controlled experiments | ✅ Same tasks, fair comparison |
| Tests strongest counter | ✅ o1 is the best reasoning model |
| Quantitative results | ✅ Specific numbers, clear gaps |
| Mechanism proposed | ✅ Two potential explanations |

**Verdict**: High-quality follow-up that tests the strongest counter-argument (o1) and finds the thesis still holds.

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
