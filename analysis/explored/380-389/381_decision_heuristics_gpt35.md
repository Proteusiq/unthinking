# Paper Analysis: Decision Heuristics Similar to Humans

## Metadata
- **arXiv ID**: 2305.04400
- **Title**: Do Large Language Models Show Decision Heuristics Similar to Humans? A Case Study Using GPT-3.5
- **Authors**: Gaurav Suri, Lily R. Slater, Ali Ziaee, Morgan Nguyen
- **Date**: May 2023
- **Stance**: Supports thesis - LLMs exhibit same cognitive biases as humans, suggesting language patterns encode heuristics rather than rational reasoning

---

## Core Finding

```
┌─────────────────────────────────────────────────────────────────────┐
│  LLMs inherit human cognitive biases from training data.           │
│  This suggests they learn language patterns that ENCODE biases,    │
│  not reasoning processes that PRODUCE them.                        │
│                                                                     │
│  4/4 classic decision heuristics found in ChatGPT (GPT-3.5):       │
│  • Anchoring                                                        │
│  • Representativeness                                               │
│  • Framing Effect                                                   │
│  • Endowment Effect                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Why This Paper Matters

Human cognitive biases arise from specific cognitive and affective processes:
- **Anchoring**: Insufficient adjustment from initial values
- **Representativeness**: Judging by similarity, ignoring base rates
- **Framing**: Loss aversion, risk preference shifts
- **Endowment**: Ownership-based value inflation

LLMs **lack these cognitive processes** but show **identical biases**. This implies:
1. Biases are encoded in language patterns, not computed
2. LLMs learn to predict biased responses, not reason about decisions
3. "Human-like" behavior ≠ human-like cognition

---

## Methodology

Four controlled studies comparing ChatGPT to human participants:

| Study | Heuristic | What It Tests |
|-------|-----------|---------------|
| 1 | **Anchoring** | Influence of random anchors on numerical estimates |
| 2 | **Representativeness & Availability** | Conjunction fallacy, anecdotal influence |
| 3 | **Framing Effect** | Positive vs negative presentation of identical info |
| 4 | **Endowment Effect** | Owned vs found item valuation |

---

## Key Evidence

### Study 1: Anchoring Heuristic
- ChatGPT influenced by random anchors when making estimates
- Same anchoring effect observed in human participants
- LLM has no reason to be anchored (no cognitive adjustment mechanism)

### Study 2: Representativeness & Availability
- ChatGPT judged P(A∩B) > P(A) - the conjunction fallacy
- Erroneously influenced by salient anecdotal information
- Mirrors human heuristic reasoning patterns

### Study 3: Framing Effect
- Same item rated more efficacious when features presented positively
- Both presentations contained identical information
- LLM has no loss aversion mechanism, yet shows framing bias

### Study 4: Endowment Effect
- Owned item valued higher than newly found identical item
- LLM has no psychological ownership mechanism
- Pattern matching human response patterns

---

## Theoretical Implications

### The Language-as-Bias-Carrier Hypothesis

> "The fact that an LLM - which lacks these [cognitive and affective] processes - also shows such effects invites consideration of the possibility that language may play a role in generating these effects in humans."

```
┌─────────────────────────────────────────────────────────────────────┐
│  TWO INTERPRETATIONS                                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. COGNITIVE VIEW: Biases arise from mental processes              │
│     → Prediction: LLMs shouldn't show biases (no such processes)    │
│     → Result: FALSE - LLMs DO show biases                           │
│                                                                     │
│  2. LINGUISTIC VIEW: Biases are encoded in language patterns        │
│     → Prediction: LLMs should show biases (pattern matching)        │
│     → Result: TRUE - confirms pattern-based prediction              │
│                                                                     │
│  CONCLUSION: LLMs predict biased language, not reason with bias     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Limitations

1. **Single model**: Only GPT-3.5 (ChatGPT) tested
2. **Prompt sensitivity**: Results may vary with prompting
3. **Causal mechanism**: Can't definitively distinguish pattern-matching from reasoning
4. **Temporal**: May 2023 - pre-o1, pre-DeepSeek-R1

---

## Relevance to Thesis

### Supports "Reasoning is Pattern Prediction"

This paper provides evidence that LLMs:
1. **Match human biases** without human cognitive mechanisms
2. **Learn to predict** what biased humans would say
3. **Inherit training data patterns** rather than compute decisions

### Connection to Broader Findings

The bias inheritance finding connects to:
- **Blue-Seven phenomenon** (Latent State Persistence) - human priors persist
- **30 Cognitive Biases** (2410.15413) - systematic bias presence across models
- **Sycophancy** (multiple papers) - learned pleasing patterns

---

## Graph Links

### Builds On
- Kahneman & Tversky (1974) - original heuristics and biases research
- Human cognitive bias literature

### Related Findings
- **30 Cognitive Biases in LLMs** (2410.15413) - extended to 30 biases, 20 models
- **Latent State Persistence** (2505.10571) - blue-seven as inherited bias
- **Sycophancy papers** - learned human-pleasing patterns

### Extends To
- AI safety implications - biases may persist despite alignment
- Debiasing research - can't remove biases without understanding mechanism

---

## Key Quotes

> "Heuristics and related decision effects in humans are thought to be driven by cognitive and affective processes such as loss aversion and effort reduction."

> "The fact that an LLM - which lacks these processes - also shows such effects invites consideration of the possibility that language may play a role in generating these effects in humans."

---

## Status
- [x] Read (abstract + structure)
- [x] Analyzed
- [x] Evidence extracted (limited - abstract only)
- [x] Graph links identified
- [x] Cross-referenced with corpus
