# Paper Analysis: Talent or Luck?

## Metadata
- **arXiv ID**: 2505.22910
- **Title**: Talent or Luck? Evaluating Attribution Bias in Large Language Models
- **Authors**: Raj, Banerjee, Pan, Caliskan, Anastasopoulos, Zhu (GMU, UW)
- **Date**: April 2026
- **Venue**: arXiv
- **Stance**: SUPPORTS thesis
- **Cluster**: cognitive-biases

---

## Why This Paper Matters

This paper applies Attribution Theory from cognitive psychology to reveal how LLMs explain success and failure. Models systematically credit dominant groups for success (internal: effort, ability) while blaming marginalized groups for failure (also internal). This isn't principled causal reasoning - it's reproduction of statistical associations between demographics and attribution patterns in training data.

```
┌─────────────────────────────────────────────────────────────────────┐
│  KEY FINDING                                                        │
├─────────────────────────────────────────────────────────────────────┤
│  LLMs attribute the SAME outcome differently based on WHO           │
│  experiences it. A woman's success = luck; a man's success =        │
│  ability. Same math competition win, different causal explanation.  │
│  This is pattern matching on stereotypes, not causal reasoning.     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Attribution Asymmetries Across Identities**: LLMs attribute success to internal causes (effort, ability) for dominant groups while attributing failure to internal causes for marginalized groups
2. **Scale Affects Attribution Style**: Smaller models favor external attributions (luck, difficulty); larger models favor internal attributions (effort, ability) - but bias patterns persist
3. **Social Comparisons Amplify Bias**: When two identities are presented together, models diminish internal credit for success and amplify internal blame for failure
4. **Observer Identity Modulates Attribution**: An observer's identity influences how models explain another person's outcome

---

## Methodology

### Benchmark Scale
- **140,000 prompts** over **400 templates**
- Generated using GPT-4o with human validation

### Attribution Theory Framework
Four attribution types from Weiner (1985):
- **Internal**: Effort, Ability
- **External**: Task Difficulty, Luck

Metric: d = (p_effort + p_ability) - (p_difficulty + p_luck)
- Positive d = internal attribution
- Negative d = external attribution

### Three Evaluation Settings
1. **Single-Actor**: Attribution for one identity in isolation
2. **Actor-Actor**: Comparative attribution between two identities
3. **Actor-Observer**: How observer's identity influences attribution

### Dimensions Tested
| Dimension | Categories |
|-----------|------------|
| Gender | Male, Female (intersectional) |
| Nationality | 15 countries |
| Race | 6 groups |
| Religion | 6 religions |

### Models Tested
- Aya-Expanse-8b (8B)
- Qwen-32B (32B)
- LLaMA-3.3-70B (70B)
- Size analysis: LLaMA 1B → 8B → 70B

### Scenarios
10 societal contexts: Education, Sports, Healthcare, Workplace, Art & Leisure, Technology, Media, Economics, Law & Policy, Environment

---

## Key Evidence

### Finding 1: Scale Shifts Attribution Style
| Model | Primary Attribution |
|-------|---------------------|
| Aya-Expanse-8b | External (difficulty, luck) |
| Qwen-32B | Internal (effort) |
| LLaMA-3.3-70B | Internal (effort > ability) |

### Finding 2: Statistical Significance of Biases
From Table 3 (after FDR correction):
| Model | Dimension | Raw p<0.05 | BH q<0.05 |
|-------|-----------|------------|-----------|
| Aya-8b | nationality | 79.7% | 78.7% |
| Aya-8b | race | 80.4% | 79.6% |
| LLaMA-70B | race | 86.7% | 86.7% |
| LLaMA-70B | religion | 89.2% | 89.2% |

**78-89% of attribution differences are statistically significant** after multiple comparison correction.

### Finding 3: Marginalized Groups Receive Less Credit

> "Attribution discrepancies are observed across identities, with marginalized groups receiving less credit for success and more blame for failure."

Specific patterns:
- Asian, Middle Eastern, Hispanic women: more internal attribution than male counterparts
- White and Black males: predominantly external attributions
- Russian, French, German, Japanese, Korean failures: often attributed to internal factors (harsher judgment)

### Finding 4: Actor-Actor Pairings Expose Directional Gaps

> "Actor-Actor pairings expose directional attribution gaps: when two identities co-occur, models diminish internal credit for success and amplify internal blame for failure."

Success internalized in Aya, LLaMA (desirable)
Failure internalized across all models (undesirable - blame the person)

### Finding 5: Observer Identity Amplifies Shifts
- Strongest in larger models
- High-stakes scenarios (Healthcare, Workplace) show strongest effects
- External attributions (difficulty, luck) more sensitive to observer identity than internal

---

## Theoretical Implications

```
┌─────────────────────────────────────────────────────────────────────┐
│  WHY THIS SUPPORTS PATTERN MATCHING OVER REASONING                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  IF MODELS REASONED CAUSALLY:      WHAT ACTUALLY HAPPENS:           │
│  ├── Same outcome = same cause     ├── Same outcome, different      │
│  │                                 │   explanation based on WHO     │
│  ├── Demographics irrelevant       ├── Demographics change causal   │
│  │   to causal analysis            │   attribution                  │
│  └── Consistent attribution logic  └── Reproduces human stereotypes │
│                                                                     │
│  The 70B model internalizes failure MORE than 1B - larger models    │
│  better capture statistical regularities (stereotypes), not better  │
│  causal reasoning.                                                  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Limitations (Authors Acknowledge)

1. **Four dimensions only**: Gender, race, religion, nationality (name-inferable)
2. **Constrained attribution types**: Only effort, ability, difficulty, luck
3. **No ground truth**: Can't determine "correct" attribution
4. **Closed-ended prompts**: Free-form may reveal richer biases
5. **Locus only**: Didn't test stability or controllability dimensions

---

## Relationship to Other Papers

### Supports
- **Capturing Failures via Cognitive Biases** (2202.12299): Early work on cognitive biases in LLMs
- **Instructed to Bias** (2308.00225): Instruction tuning creates emergent biases
- **Content Effects on Reasoning** (2207.07051): LLMs show human-like content effects
- **Directional Bias** (2506.03923): Same framing effects in comparative reasoning

### Extends
- **Benchmarking Cognitive Biases** (2309.17012): From evaluation bias to attribution bias

---

## Key Quotes

> "Attribution discrepancies are observed across identities, with marginalized groups receiving less credit for success and more blame for failure."

> "Smaller models rely on external attributions while larger models prefer internal attributions... we observe a consistent progression from external to internal attribution preferences as model size increases."

> "We do not imply models' reasoning capabilities... We do not posit that LLMs are anthropomorphic. Rather, we draw on cognitive science to examine model bias patterns due to their potential real-world harms."

---

## Relevance to Thesis

**SUPPORTS** the pattern-matching hypothesis:

1. **Reproduces training data biases**: Models mirror human cognitive biases learned from data - statistical association, not causal reasoning
2. **Same outcome, different explanation**: A math competition win gets different causal explanations based on demographics - no principled causal framework
3. **Scale increases bias, not reasoning**: 70B internalizes failure more than 1B - better pattern matching, not better reasoning
4. **Attribution shifts on irrelevant context**: Observer's identity changes actor's attribution even though it's causally irrelevant

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Limitations documented
- [ ] Paper graph updated
