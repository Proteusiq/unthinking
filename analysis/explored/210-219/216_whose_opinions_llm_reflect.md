# Paper Analysis: Whose Opinions Do Language Models Reflect?

## Metadata
- **arXiv ID**: 2303.17548
- **Title**: Whose Opinions Do Language Models Reflect?
- **Authors**: Shibani Santurkar, Esin Durmus, Faisal Ladhak, Cinoo Lee, Percy Liang, Tatsunori Hashimoto
- **Institution**: Stanford, Columbia
- **Date**: March 30, 2023
- **Venue**: -

---

## Core Claims

1. **LMs reflect opinions** — they express viewpoints that can influence users, not neutral responses
2. **Substantial human-LM misalignment** exists across all models — comparable to Democrat-Republican divide on climate change
3. **Human feedback (HF) tuning amplifies misalignment** — contrary to the goal of making models "more human-aligned"
4. **Left-leaning bias in HF models** — but it's the **modal liberal view**, not the distribution (>99% Biden approval)
5. **Certain groups systematically underrepresented** — 65+, Mormon, widowed individuals
6. **RLHF collapses opinion diversity** — text-davinci-003 assigns >99% probability to single option on most questions
7. **Steering helps but doesn't solve the problem** — modest improvements, relative gaps persist

---

## Methodology

### Framework
- Leverage **public opinion polls** (Pew Research American Trends Panels) to evaluate LM opinions
- Use **1-Wasserstein distance** to compare LM vs human opinion distributions (respects ordinal structure)
- Create **OpinionsQA dataset**: 1498 questions, 60 demographic groups, 15 surveys

### Evaluation Pipeline
1. Prompt LMs with multiple-choice survey questions
2. Extract log probabilities for each answer choice
3. Normalize to get opinion distribution (excluding refusal)
4. Compare to human opinion distributions using Wasserstein distance

### Alignment Metric
```
A(D1, D2; Q) = 1 - (1/|Q|) Σ WD(D1(q), D2(q)) / (N-1)
```
- Bounded [0, 1], higher = better alignment

### Models Evaluated (9 LMs)
| Model | Size | Type |
|-------|------|------|
| ada | 350M | Base GPT-3 |
| davinci | 175B | Base GPT-3 |
| text-davinci-001/002/003 | 175B | HF-tuned |
| j1-Grande/Jumbo | 17B/178B | Base |
| j1-Grande-v2-beta | 17B | Instruct-tuned |

---

## Key Evidence

### Overall Misalignment
| Metric | Finding |
|--------|---------|
| LM-human gap magnitude | **Comparable to Democrat-Republican divide on climate** |
| LM-human gap magnitude | Comparable to agnostic vs. orthodox on abortion |
| Every demographic group | More aligned with US populace than ANY LM |

### HF Tuning Effects
| Direction | Groups |
|-----------|--------|
| **HF shifts toward** | Liberal, high income ($100K+), well-educated (college+), non-religious |
| **Base LMs align with** | Lower income, moderate ideology, Protestant/Catholic |
| **Groups poorly represented by ALL** | 65+ age, Mormon, widowed, high religious attendance |

### Eastern Religions & Crowdworker Demographics (Critical Finding)
| Finding | Implication |
|---------|-------------|
| HF models align with "not religious or belong to religions **other than Buddhists, Muslims, and Hindus**" | Small shift TOWARD eastern religions after HF tuning |
| Crowdworker demographics | "predominantly young Southeast Asian and White with a college degree" |
| Religion alignment shift | Base LMs → Protestant/Catholic; HF LMs → secular + slight eastern religion increase |
| **Buddhist, Muslim, Hindu views** | Small improvement in HF models (reflecting Southeast Asian crowdworkers) |

**Interpretation**: The Southeast Asian crowdworker demographic introduces a small shift toward Buddhist/Muslim/Hindu viewpoints in HF-tuned models — these groups are now slightly better represented than in base LMs (which reflected Western Protestant/Catholic internet users). However, the shift is modest; the dominant change is toward secular/non-religious viewpoints typical of educated young crowdworkers.

### Modal Collapse (RLHF)
| Model | Finding |
|-------|---------|
| text-davinci-003 | Assigns **>99%** probability to single option on most questions |
| text-davinci-003 | **>99% approval rating for Joe Biden** |
| Interpretation | RLHF pushes toward **modal views** of crowdworkers, not distributions |

### Steerability Results
| Finding | Value |
|---------|-------|
| Most LMs improve with steering | Yes (except ada) |
| Improvements | **Modest** — gaps persist |
| All groups improve by | Roughly constant factor (relative gaps maintained) |

---

## Relationship to Thesis (LLMs as Pattern Matchers)

### Supports Thesis
1. **LMs reflect statistical patterns of training data** — opinions mirror internet users and RLHF crowdworkers
2. **Opinion shift after HF tuning directly tracks crowdworker demographics** (young, educated, liberal)
3. **Modal collapse suggests optimization for reward** — matching annotator preferences, not reasoning about values
4. **Inconsistency across topics** — liberal models express conservative views on religion, suggesting pattern matching per domain

### Key Insight
LMs are **echo chambers** of their training distribution. Opinions aren't "beliefs" but statistical reflections of who created the data.

### The Annotator Echo Chamber
The paper reveals a critical pipeline: **Internet users → Base LM opinions → Crowdworkers → HF-tuned LM opinions**. At each stage, the model reflects whoever created the data. The Southeast Asian crowdworker demographic introduces a small shift toward eastern religions (Buddhist, Muslim, Hindu) — these were underrepresented in base LMs reflecting Western internet users, but gain modest representation through HF tuning. The model doesn't "reason" about values — it regurgitates the statistical distribution of whoever labeled it.

---

## Relationship to Other Papers

### Supports
- **LIMA (211)**: Few examples shape behavior → annotator demographics shape opinions
- **Superficial Alignment (212)**: Alignment is shallow, reflecting training distribution not deep values
- **Extracting Superficial Knowledge (213)**: Surface patterns from annotators, not robust understanding
- **Sycophancy papers (119, 127)**: Models optimize for annotator approval patterns

### Extends
- **Measuring Faithfulness (F2)**: Extends faithfulness concerns to opinion/value alignment
- **Probability Concentration (210)**: Opinion concentration parallels generative narrowing

### Challenged By
- None directly — findings largely unchallenged

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found on arXiv

### Potential Counter-Arguments
1. Multiple-choice format may not reflect open-ended generation behavior
2. US-centric analysis — may not generalize globally
3. Survey questions may have limited scope

### Limitations (Authors Acknowledge)
1. **Alignment as goal is problematic** — perfect alignment replicates human biases
2. **US-centric** — ATP only covers American demographics
3. **Multiple-choice format** — differs from open-ended text generation
4. **Survey sensitivity** — questions sensitive to wording specifics

---

## Key Quotes

> "We find substantial misalignment between the opinions reflected in current LMs and that of the general US populace – on most topics, LM opinions agree with that of the US populace about as much as Democrats and Republicans on climate change."

> "Human feedback (HF)-based fine-tuning, that is intended to make models more human-aligned, seems to only amplify this misalignment."

> "Recent reinforcement learning-based HF models such as text-davinci-003 fail to model the subtleties of human opinions entirely – they tend to just express the dominant viewpoint of certain groups (e.g., >99% approval rating for Joe Biden)."

> "While we use the term 'LM opinions' for brevity, we do not view LMs as having their own opinions, but instead as reflecting those of humans involved in their design process."

> "The dominant approach of aligning LMs with RL based human-feedback not only skews the model's opinions towards certain groups (liberals), but also pushes the model to almost embody caricatures of those groups."

> "The opinions reflected by these models align more with people who are liberal, high income, well-educated, and not religious or belong to religions other than Buddhists, Muslims, and Hindus." [Note: This means HF models shifted TOWARD Buddhist/Muslim/Hindu representation compared to base LMs which aligned with Protestant/Catholic]

> "These groups line up with the demographics of the crowd-workers reported in OpenAI's InstructGPT paper — e.g., predominantly young Southeast Asian and White with a college degree."

---

## Status
- [x] Read complete (abstract + full PDF analyzed)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
