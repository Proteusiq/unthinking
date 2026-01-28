# Paper Analysis: Language Models, Like Humans, Show Content Effects on Reasoning Tasks

## Metadata
- **arXiv ID**: 2207.07051
- **DOI**: 10.1093/pnasnexus/pgae233
- **Title**: Language models show human-like content effects on reasoning tasks
- **Authors**: Ishita Dasgupta, Andrew K. Lampinen, Stephanie C. Y. Chan, Hannah R. Sheahan, Antonia Creswell, Dharshan Kumaran, James L. McClelland, Felix Hill
- **Date**: July 2022 (arXiv), July 2024 (PNAS Nexus)
- **Venue**: PNAS Nexus (peer-reviewed)
- **Source**: Reddit recommendation (GitHub issue #16)
- **Affiliation**: Google DeepMind, Stanford University

---

## Core Claims

1. **LLMs show human-like content effects on reasoning tasks** — Both humans and models reason more accurately when semantic content supports the logical inference
2. **This is NOT a flaw unique to LLMs** — Humans show the same pattern; it's a fundamental feature of systems that learn from real-world data
3. **Three logical tasks show consistent pattern**: Natural Language Inference, Syllogisms, and Wason Selection Task all demonstrate content effects
4. **LM confidence correlates with human response times** — Lower-level processing similarities exist beyond just accuracy patterns
5. **Abstract reasoning is "graded and content-sensitive" in BOTH humans and models** — Challenges the view that "true reasoning" must be content-independent

---

## Methodology

### Tasks
1. **Natural Language Inference (NLI)**: Simple logical comparisons (X is bigger than Y)
2. **Syllogisms**: Judge validity of logical arguments with believable/unbelievable conclusions
3. **Wason Selection Task**: Classic logic puzzle testing conditional reasoning

### Conditions for Each Task
- **Belief-consistent**: Semantic content supports logical inference
- **Belief-violating**: Semantic content conflicts with logical inference
- **Nonsense**: No semantic content (nonwords)

### Models Tested
- Chinchilla
- PaLM 2-M, PaLM 2-L
- Flan-PaLM 2
- GPT-3.5
- Gemini models (supplementary)

### Human Comparison
- Directly comparable human data collected with same stimuli
- Novel datasets to avoid training contamination

---

## Key Evidence

### Natural Language Inference
- Both humans and models: **high accuracy (~90%+)**
- Minimal content effects (simple task)
- Item-level correlation between human and model accuracy: **t(832) = 3.49, p < .001**

### Syllogisms (KEY FINDING)

| Condition | Human Pattern | LLM Pattern |
|-----------|---------------|-------------|
| Believable conclusion, Valid argument | High accuracy | High accuracy |
| Believable conclusion, Invalid argument | **90% say "valid" (wrong!)** | Same bias |
| Unbelievable conclusion, Invalid argument | Better accuracy | Better accuracy |
| Unbelievable conclusion, Valid argument | Sometimes say "invalid" (wrong) | Same bias |

**Significance**: All models and humans show significant content effects (all z ≥ 2.25 or χ² > 6.39, all p ≤ 0.01)

### Wason Selection Task

| Population | Arbitrary Rules | Realistic Rules |
|------------|-----------------|-----------------|
| Humans (overall) | Near chance | Near chance |
| Humans (slow responders, >80s) | Near chance | **Above chance** |
| Large LLMs | Above chance | **Significantly better** |

- Content advantage significant for: Chinchilla, PaLM 2-L, GPT-3.5 (all z > 2.2, all p < 0.03)
- **Human accuracy correlates with response time**: z = 4.44, p < 0.001

### Model Confidence ↔ Human RT Correlation
- Even controlling for task variables and accuracy:
  - NLI: **t(655) = -3.39, p < .001**
  - Syllogisms: **t(353) = -2.03, p < .05**
- Models more confident on problems humans answer faster

---

## Relationship to Thesis

### STRONGLY SUPPORTS the Thesis

**The thesis**: "LLM reasoning is practical but fundamentally predictive—pattern matching from training distributions, not genuinely generative reasoning"

This paper provides **direct evidence** that:

1. **LLMs rely on semantic patterns from training** — Content effects prove that models don't perform "pure" logical reasoning; they use learned semantic associations
2. **This is the SAME as human reasoning** — Authors explicitly note that humans are also "imperfect reasoners" who "reason most effectively about situations consistent with their understanding of the world"
3. **Pattern matching is the mechanism** — Quote: "Thus, abstract reasoning may be a graded, content-sensitive capacity in both humans and models"

### Key Quotes Supporting Thesis

> "The implicit assumption in these critiques is that reasoning should be a purely algebraic, syntactic computation over symbols from which 'all meaning had been purged'... In this work, we emphasize how *both* humans and language models rely on content when answering reasoning problems—using simple heuristics in some contexts, and answering more accurately about frequently occurring situations."

> "Language models also perform imperfectly on logical reasoning tasks and more often fail in situations where humans fail—when stimuli become too abstract or conflict with prior expectations."

> "Like humans, models answer more accurately when the semantic content of a task supports the logical inferences."

### Implications for the Thesis

1. **"Pattern matching" is not a bug, it's a feature** — Both humans and LLMs do it
2. **Distribution-bounded performance** — Performance depends on alignment with training/experience
3. **Content effects = evidence against genuine reasoning** — If reasoning were truly abstract, content wouldn't matter

---

## Relationship to Other Papers

### Supports

| Paper | How |
|-------|-----|
| **Faith and Fate (2305.18654)** | Both show distribution-bounded reasoning; semantic content matters |
| **GSM-Symbolic (2410.05229)** | Both show that changing content/framing affects reasoning performance |
| **Interplay (2512.07783)** | Both show capabilities come from training distribution |
| **Unveiling Causal Reasoning (2506.21215)** | Both show familiar situations → better performance |
| **Shortcut Learning (2410.13343)** | Both show models exploit semantic shortcuts |

### Extends

| Paper | How |
|-------|-----|
| **System 1/2 Alignment (2502.12470)** | Both connect to dual-process theory; this paper provides human comparison data |
| **Measuring Faithfulness (2307.13702)** | Both show reasoning depends on content, not just logic |

### Provides Framework For

| Concept | Framework |
|---------|-----------|
| **Pattern matching thesis** | Content effects = direct evidence of pattern matching |
| **Human-LLM alignment** | Both systems show same biases → same underlying mechanism? |

### Challenges (Slightly)

| Paper | How |
|-------|-----|
| **Claims that LLMs "can't reason"** | Authors argue content effects don't mean "not reasoning" — humans show them too |

---

## REBUTTALS TO THIS PAPER

### Potential Limitations

1. **Google DeepMind authors** — Potential incentive to defend LLM capabilities
2. **Limited task diversity** — Three tasks may not generalize to all reasoning
3. **Wason task: LLMs outperform humans** — This could be seen as evidence FOR LLM reasoning
4. **Correlation ≠ mechanism** — Similar patterns don't prove same underlying process

### Author Acknowledgments

- "The fact that language models similarly mix content into their reasoning does not prove that they do so for the same reasons as humans"
- Human-LM differences exist, especially on Wason task error patterns
- Chain-of-thought can reduce content effects in some cases

### Counter-Argument to Consider

One could argue that showing LLMs behave like humans is evidence FOR reasoning, not against it. However:
- The paper shows both systems are IMPERFECT reasoners
- Both fail when content conflicts with logic
- This supports the thesis that both rely on pattern matching, not abstract reasoning

---

## Key Quotes

> "Abstract reasoning is a key ability for an intelligent system... However, human abstract reasoning is also imperfect. Human reasoning is affected by our real-world knowledge and beliefs, and shows notable 'content effects'"

> "Humans reason more reliably when the semantic content of a problem supports the correct logical inferences."

> "LMs reflect many of the same qualitative human patterns on these tasks—like humans, models answer more accurately when the semantic content of a task supports the logical inferences."

> "The fact that language models sometimes rely on 'simple heuristics'... have been cited to 'raise questions on the extent to which these models are *actually reasoning*'... In this work, we emphasize how *both* humans and language models rely on content when answering reasoning problems"

> "Reasoning may be a graded, content-sensitive capacity in both humans and models."

---

## Assessment

### Independent Assessment

This paper provides **high-quality, peer-reviewed evidence** that:
1. LLMs show human-like content effects on reasoning tasks
2. This pattern is consistent across multiple tasks and models
3. Lower-level processing (confidence, RT) also shows correlations

The paper is methodologically strong:
- Novel stimuli to avoid contamination
- Direct human comparison
- Multiple models tested
- Peer-reviewed in PNAS Nexus

### Stance Classification: **SUPPORTS**

The paper strongly supports the thesis that LLM reasoning is pattern matching:
- Content effects prove dependence on training distribution
- Same patterns as humans suggest same mechanism (learned associations)
- Failures on unfamiliar/abstract content = distribution-bounded

### Caveats

The authors frame their findings positively ("LLMs are like humans") rather than critically ("LLMs are just pattern matching"). However, the evidence itself supports the pattern matching interpretation regardless of framing.

---

## Status
- [x] Read complete (PMC version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
- [ ] data.js updated
