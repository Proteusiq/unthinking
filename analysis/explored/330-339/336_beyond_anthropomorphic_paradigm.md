# Paper 336: Thinking beyond the anthropomorphic paradigm benefits LLM research

## Metadata
- **arXiv**: 2502.09192 (v2 May 2025)
- **Date**: February 2025
- **Authors**: Lujain Ibrahim (Oxford), Myra Cheng (Stanford)
- **Stance**: Strongly supports thesis — meta-methodological argument for pattern-matching reading

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  ANTHROPOMORPHISM AS METHODOLOGICAL ERROR                            │
│                                                                      │
│  Quantitative: 48% of LLM paper abstracts (Dec 2024) contain        │
│  anthropomorphic framing, up from 40% (Jan 2023).                    │
│  ACL anthology: 5% (2007) → 11% (2022).                              │
│  150% increase overall since 2007.                                   │
│                                                                      │
│  Five anthropomorphic assumptions across LLM lifecycle constrain    │
│  the questions researchers ask and methods they develop.             │
│                                                                      │
│  Non-anthropomorphic reframe: "CoT's effectiveness stems from       │
│  alignment with training data, not a human-like approach to          │
│  reasoning" — random tokens work as well.                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Anthropomorphism is prevalent and accelerating** — 48% of LLM abstracts have anthropomorphic framing (Dec 2024); 150% increase since 2007.
2. **Terminology is tip of iceberg** — the deeper problem is *implicit assumptions* anthropomorphic language encodes.
3. **Five lifecycle assumptions constrain research**:
   - Training should mimic human learning
   - Alignment should have models explicitly reason about values
   - Evaluation should use human-like metrics
   - Behavior should be judged by human normative/intentional standards
   - User interaction mirrors human-human interaction
4. **Anthropomorphic assumptions create blindspots** — biases in evaluation, hinder non-human-analog capabilities, constrain imagination.
5. **Non-anthropomorphic alternatives exist** — byte-level tokenization, latent reasoning, control-theoretic alignment, mechanistic interpretability, teleological/role-play/agent-models framings.
6. **Both-and, not either-or** — anthropomorphism is productive for public communication but harmful as default research framing.

---

## Methodology

### Empirical Component
- **Modified AnthroScore** (Cheng et al. 2024 EACL): log-ratio of RoBERTa probability for replacing entity mentions with "he/she" vs "it"
- **Datasets**:
  - 200,000+ CS arXiv abstracts (Jan 2023 – Dec 2024)
  - 50,000+ ACL Anthology abstracts (2007–2022)
- **Fightin' Words analysis** for anthropomorphism-correlated verbs

### Theoretical Component
Framework organizing 5 lifecycle-stage assumptions, each with (a) limitations of anthropomorphic framing and (b) non-anthropomorphic alternatives.

---

## Key Evidence

### Anthropomorphism Rates
- **LLM papers**: 40% → **48%** (Jan 2023 → Dec 2024)
- **ACL anthology overall**: 5% → 11% (2007 → 2022)
- **150% increase** since 2007

### Highest-Rate Subfields
- Interpretability & Analysis
- Ethics & NLP
- Dialogue Systems

### Lowest-Rate
- Syntax, semantics, discourse/pragmatics (classical NLP)

### High-AnthroScore Verbs
understand, excel, mislead, answer, hallucinate, memorize, teach, learn

### Low-AnthroScore Verbs
propose, outperform, evaluate, implement, leverage, utilize

---

## Anthropomorphic Readings Reframed

| Phenomenon | Anthropomorphic Reading | Non-Anthropomorphic Reframe |
|------------|------------------------|----------------------------|
| Hallucination | "Model is confused/lying" | Next-token predictor produces output readers *normatively judge* as false |
| Sycophancy | "Model wants to please" | Output distribution mirrors prompt; normative label post-hoc |
| Deception | "Model intends to deceive" | Context-bound role-play; simulation of human-like responses |
| CoT | "Model reasons step by step" | Prompt biases toward training-data regions with verbal-reasoning patterns (random tokens work too) |
| Alignment faking | Expressions of "discomfort" = genuine internal state | Learned performance of human-like discomfort from RLHF |
| Instruction tuning | "Must tell model what to do" | Hewitt et al.: non-imperative approaches work equally well |
| MMLU/GSM8K | "Measures reasoning" | McCoy et al. "embers of autoregression" — sensitivity to task frequency, prompt wording |

The **CoT example** is especially strong for the pattern-matching thesis: CoT "stems from alignment with training data, rather than reflecting a human-like or brain-like approach to reasoning."

---

## Key Quotes

> "While anthropomorphism can be productive, the field has become overly reliant on it; advancing LLM research requires moving beyond our default dependence on anthropomorphic thinking."

> "CoT prompting, while appearing to 'do' verbal reasoning, in reality biases models toward parts of the training distribution where verbal reasoning patterns—such as explanations of solutions—are prevalent, improving performance... This suggests CoT's effectiveness stems from alignment with the training data, rather than reflecting a human-like or brain-like approach to reasoning."

> "This term [hallucination] obscures the mechanisms behind these phenomena: at risk of oversimplification, this behavior arises from the nature of language models as next-token predictors. Generated outputs are then labeled as hallucinations upon the reader's normative judgment of whether or not they are useful."

> "It is unclear if these signals genuinely reflect a model's 'internal state,' or if they are merely learned behaviors resulting from post-training using human-like traits. This makes it challenging to distinguish 'genuine' (mis)alignment from a learned performance of human-like discomfort or hesitation."

> "Complex behaviors like deception and self-awareness can be understood as sophisticated simulations rather than true cognitive states." (citing Shanahan 2023)

> "[Anthropomorphism is] so pervasive that many of my colleagues don't realize how pernicious it is." (Dijkstra, 1985)

---

## Relationship to Other Papers

### Direct Ancestor
- **Anthropomorphization (#281, 2305.14784)** — Shanahan et al. role-play paper; this paper extends terminology → assumptions
- **AnthroScore (Cheng et al. 2024 EACL)** — co-author's prior metric

### Strongly Supports
- **Faith and Fate (#1, 2305.18654)** — provides methodological warrant for why surface benchmark success masks pattern-matching
- **GSM-Symbolic (#3, 2410.05229)** — same teleological approach
- **McCoy "embers of autoregression" (2309.13638, 2410.01792)** — explicitly cited; pattern-matching reading of benchmark success
- **Reasoning Theater (#325, 2603.05488)** — CoT-performativity consistent with random-tokens-work-too
- **Consciousness Cluster (#327, 2604.13051)** — provides framework: "I am conscious" is next-token prediction + RLHF learned performance, not evidence of internal state

### Reframes
- **Alignment Faking (#279, 2412.14093)** — discomfort signals may be learned performances
- **Shutdown Resistance (#326, 2509.14260)** — "self-preservation" assumes a self; reframe as context-bound simulation of training-distribution patterns

---

## REBUTTALS

### Authors' Acknowledged Limitations
1. AnthroScore is imperfect proxy — captures linguistic surface only
2. Score sensitivities conflate domain vocabulary ("train", "prompt") with anthropomorphism
3. Five assumptions are illustrative, not exhaustive
4. Not a ban — anthropomorphism useful for public communication
5. Does not claim empirical falsification of reasoning claims — surveys and synthesizes existing work

### Why STRONGLY SUPPORTS Thesis
1. **Central mechanism claim aligns with thesis** — hallucination, sycophancy, deception, CoT, alignment signals all reframed as emerging from next-token prediction over training distribution, not internal states
2. **Endorses McCoy "embers of autoregression"** lineage — strongest pattern-matching evidence
3. **Explicitly challenges CoT-as-reasoning** — random-tokens-work-too finding
4. **Provides philosophical warrant** — anthropomorphic interpretations *assume the conclusion*; pattern-matching is parsimonious default

---

## Implications for Thesis

```
┌─────────────────────────────────────────────────────────────────────┐
│                    STRONGLY SUPPORTS THESIS                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. META-METHODOLOGICAL WARRANT                                     │
│     Provides philosophical case for pattern-matching interpretation │
│     as default; burden on anthropomorphic readings to justify       │
│                                                                     │
│  2. QUANTITATIVE MEASUREMENT OF FRAMING BIAS                        │
│     48% of LLM papers anthropomorphize — this is a measurable      │
│     systematic bias in the literature                               │
│                                                                     │
│  3. REFRAMES THE ENTIRE PERSONA CLUSTER                             │
│     Shutdown resistance = "self-preservation" assumes a self        │
│     Consciousness claims = RLHF-learned performance                 │
│     Emergent misalignment = next-token distribution shift           │
│     All of these reframes are pattern-matching-consistent           │
│                                                                     │
│  4. CoT AS TRAINING-DISTRIBUTION ALIGNMENT                          │
│     "CoT's effectiveness stems from alignment with training data,   │
│     rather than reflecting a human-like approach to reasoning"      │
│     Directly endorses Reasoning Theater / random-tokens findings    │
│                                                                     │
│  5. FIELD-LEVEL DIAGNOSTIC                                          │
│     The literature has a systematic anthropomorphic bias. This      │
│     paper is the instrument that measures it.                       │
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
