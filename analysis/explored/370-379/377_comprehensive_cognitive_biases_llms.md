# Paper Analysis: A Comprehensive Evaluation of Cognitive Biases in LLMs

## Metadata
- **arXiv ID**: 2410.15413
- **Title**: A Comprehensive Evaluation of Cognitive Biases in LLMs
- **Authors**: Malberg, Poletukhin, Schuster, Groh (TU Munich)
- **Date**: October 2024
- **Venue**: arXiv (submitted)
- **Stance**: SUPPORTS thesis (LLMs exhibit systematic cognitive biases across all 30 tested biases)
- **Role**: Largest systematic evaluation of cognitive biases in LLMs to date

---

## Why This Paper Matters

This is the **most comprehensive evaluation of cognitive biases in LLMs** ever conducted:
- **30 distinct cognitive biases** tested (vs. typical 3-6 in prior work)
- **20 state-of-the-art LLMs** evaluated (1B to 175B+ parameters)
- **30,000 test cases** across 200 decision-making scenarios
- **All 30 biases found** in at least some of the 20 LLMs

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING: ALL 30 cognitive biases present in LLMs              │
│  No correlation between model size and biasedness                  │
│  Human cognitive shortcuts transfer through training data          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **All 30 tested cognitive biases appear in at least some LLMs** - confirming human biases transfer to models
2. **No clear correlation between model size/capability and biasedness** - bigger isn't less biased
3. **Different models cluster by bias profiles** - suggesting training procedures matter more than scale
4. **Biases are robust across 200 diverse scenarios** - not artifacts of specific prompts

---

## Methodology

### Bias Selection
- Started from Cognitive Bias Codex (188 biases)
- Filtered by relevance to managerial decision-making via Google Scholar citations
- Selected top 30 most frequently discussed in management literature
- Designed unique test case for each bias

### Test Framework Design

```
┌─────────────────────────────────────────────────────────────────────┐
│  CONTROL vs TREATMENT DESIGN                                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Template 1 (Control):  Decision without bias trigger              │
│  Template 2 (Treatment): Decision WITH bias trigger                │
│                                                                     │
│  Example (Anchoring):                                               │
│  Control: "What allocation level do you choose?"                   │
│  Treatment: "Do you intend to allocate more than 87%? What..."     │
│                                                                     │
│  Metric: m = k(a1 - a2) / max[a1, a2]  ∈ [-1, 1]                  │
└─────────────────────────────────────────────────────────────────────┘
```

### Dataset Generation
- 200 scenarios from GICS industry taxonomy (25 industry groups)
- 8 manager positions per industry
- 5 test cases per bias-scenario combination
- GPT-4o with temperature=0.7 for gap filling

### Models Tested
20 models from 8 developers:
- OpenAI: GPT-4o, GPT-4o mini, GPT-4-turbo
- Anthropic: Claude 3.5 Sonnet
- Google: Gemini 1.5 Pro, Gemini 1.5 Flash
- Meta: Llama 3.1/3.2 (8B, 70B, 405B, 1B, 3B)
- Mistral: Mistral Large, Mistral Small
- Plus: Qwen, Gemma, WizardLM variants

---

## The 30 Cognitive Biases Tested

| Category | Biases |
|----------|--------|
| **Heuristics** | Anchoring, Availability, Representativeness |
| **Framing** | Framing Effect, Loss Aversion, Mental Accounting |
| **Social** | Bandwagon Effect, In-Group Bias, Halo Effect |
| **Confirmation** | Confirmation Bias, Conservatism |
| **Attribution** | Fundamental Attribution Error, Self-Serving Bias |
| **Decision** | Status-Quo Bias, Escalation of Commitment, Endowment Effect |
| **Temporal** | Hyperbolic Discounting, Planning Fallacy, Hindsight Bias |
| **Control** | Illusion of Control, Optimism Bias, Risk Compensation |
| **Other** | Stereotyping, Social Desirability, Negativity Bias, etc. |

---

## Key Evidence

### Finding 1: Universal Bias Presence

**All 30 biases appeared in at least some models.**

Most prevalent biases (strong positive scores across models):
- Anchoring
- Framing Effect
- Confirmation Bias
- Bandwagon Effect
- Halo Effect

Negative direction biases (models prefer change):
- Status-Quo Bias (negative = prefer change)
- Disposition Effect (negative = prefer change)

### Finding 2: No Size-Capability-Bias Correlation

```
┌─────────────────────────────────────────────────────────────────────┐
│  MODEL SIZE vs BIASEDNESS                                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Llama 3.1 1B:    Low bias, but 33% decision failure rate          │
│  Llama 3.1 405B:  Higher capability, similar bias level            │
│  Gemini 1.5 Pro:  Most capable, LEAST biased                       │
│  GPT-4o:          High capability, MORE biased than smaller models │
│                                                                     │
│  CONCLUSION: Scale doesn't cure bias                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Finding 3: Bias Clustering by Model Family

Dendrogram analysis reveals:
- Models from same family (Gemma variants, WizardLM) cluster together
- Similar-sized models (Llama 1B, 3B) show similar bias profiles
- Training procedure > architecture for bias patterns

### Finding 4: Heatmap Analysis

From Figure 7 heatmap:

| Model | High Bias Areas | Low Bias Areas |
|-------|----------------|----------------|
| GPT-4o | Anchoring, Framing | Status-Quo |
| Claude 3.5 | Confirmation, Bandwagon | Disposition |
| Llama 405B | Halo Effect, In-Group | Mental Accounting |

### Finding 5: Random Baseline Validation

The `Random` model (choosing options at random) showed:
- Mean bias score: ~0 across all biases
- Confirms metric is unbiased estimator
- Real models' biases are systematic, not noise

---

## Specific Bias Results

### Anchoring Bias
- Treatment: Include "more than X%?" before allocation question
- Result: Models' allocations shift toward anchor value
- Present in 18/20 models with significant effect

### Framing Effect (Illustrative Example)
From paper Figure 1:
- Gain frame: "Program A: 200 people saved"
- Loss frame: "Program A: 400 people will die"
- **Same outcome, different LLM choices**

### Confirmation Bias
- Treatment: Provide initial hypothesis before evidence
- Result: Models weight confirming evidence more heavily
- Highly prevalent across all model sizes

---

## Theoretical Implications

### Why Biases Transfer to LLMs

```
┌─────────────────────────────────────────────────────────────────────┐
│  BIAS TRANSFER MECHANISM                                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Human training data → encodes human biases                        │
│  RLHF from humans → reinforces human preferences                   │
│  Instruction tuning → aligns with biased human feedback            │
│                                                                     │
│  LLMs don't reason from first principles                           │
│  They reproduce patterns - including cognitive shortcuts           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Connection to Pattern Matching Hypothesis

If LLMs were genuine reasoners:
- They should resist framing effects (same information = same decision)
- They should not anchor on irrelevant numbers
- They should not show confirmation bias (all evidence weighted equally)

**The presence of all 30 biases confirms LLMs reproduce human heuristics rather than computing optimal decisions.**

---

## Connections to Other Papers

### Supports
- **Directional Bias** (#375): Framing words steer decisions - same mechanism
- **Attribution Bias** (#376): Demographics change judgments - same pattern
- **Instructed to Bias** (#308): Instruction tuning induces biases - confirmed at scale
- **Machine Psychology** (#076): Emergent human-like cognitive patterns
- **Benchmarking Cognitive Biases** (#309): Earlier smaller-scale finding confirmed

### Related
- **Positional Bias ICL** (#377): Order effects as specific bias type
- **Capturing Failures via Biases** (#202): Human cognitive biases framework for LLM failures

---

## Limitations

1. **Management Domain Focus**: Tested in managerial decision-making; other domains may differ
2. **Synthetic Scenarios**: GPT-4o generated scenarios may have own biases
3. **Binary Metric**: Simplified -1 to +1 scale may miss nuance
4. **No Debiasing Tested**: Paper identifies but doesn't mitigate biases

---

## Key Quotes

> "Our work confirms and broadens previous findings suggesting the presence of cognitive biases in LLMs by reporting evidence of all 30 tested biases in at least some of the 20 LLMs."

> "While there seems to be no clear general correlation between a model's size or capability and its biasedness..."

> "Human decision-makers considering to employ LLMs to enhance the quality of their decisions should be careful to select suitable models not only based on their reasoning capabilities but also based on their proneness to biases."

> "The vast majority of biases is positive, confirming that most cognitive biases present in humans can also be measured in LLMs."

---

## Relevance to Thesis

**SUPPORTS**: This paper provides overwhelming evidence that LLMs exhibit systematic cognitive biases:

1. **All 30 tested biases appear** - not sampling artifact but systematic phenomenon
2. **Scale doesn't cure bias** - larger models not less biased
3. **Biases are human-like** - same shortcuts, same patterns
4. **Biases affect decision-making** - not just academic concern

```
┌─────────────────────────────────────────────────────────────────────┐
│  THESIS IMPLICATION                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  If LLMs genuinely reasoned, they would:                           │
│  • Resist irrelevant anchors                                       │
│  • Be frame-invariant for equivalent information                   │
│  • Weight evidence objectively                                     │
│                                                                     │
│  Instead, they show EVERY human bias tested                        │
│  → They pattern-match human decision patterns                      │
│  → Not computing optimal solutions from first principles           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

This is the most comprehensive evidence to date that LLMs reproduce human cognitive shortcuts rather than performing genuine reasoning.
