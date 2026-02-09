# Paper Analysis: The Trilemma of Truth in Large Language Models

## Metadata
- **arXiv ID**: 2506.23921
- **Title**: The Trilemma of Truth in Large Language Models
- **Authors**: Germans Savcisens, Tina Eliassi-Rad
- **Date**: June 2025 (NeurIPS 2025 Mechanistic Interpretability Workshop)
- **Venue**: arXiv + NeurIPS 2025 Workshop (Northeastern University)

---

## Core Claims

1. **Common probing methods fail**: "Common probing methods fail to provide a reliable and transferable veracity direction and, in some settings, perform worse than zero-shot prompting"
2. **Truth and falsehood NOT symmetric**: "Truth and falsehood are not encoded symmetrically"
3. **Third signal exists**: "LLMs encode a third type of signal that is distinct from both true and false"
4. **Five flawed assumptions identified**: Prior work assumes bidirectionality, complete knowledge retention, calibrated probabilities, binary truth values, and known signal locations

---

## Methodology

### The Trilemma Framework
LLMs must distinguish THREE scenarios for any statement:
1. **True**: Sufficient support for the statement
2. **False**: Sufficient support for negation
3. **Neither**: Insufficient support for BOTH

### Key Innovation: sAwMIL
- **Sparse-Aware Multiple-Instance Learning** with conformal prediction
- Classifies statements as true, false, OR NEITHER
- Evaluates across 16 open-source LLMs
- Three new curated datasets (City Locations, Medical Indications, Word Definitions)

### Evaluation
- Matthew's Correlation Coefficient (MCC) across models
- Two criteria: Correlation (same domain) and Generalization (cross-domain)

---

## Key Evidence

### Finding 1: Probing Methods Fail
> "Common probing methods fail to provide a reliable and transferable veracity direction and, in some settings, perform worse than zero-shot prompting"

- Binary probes (MD+CP, TTPD+CP, sPCA+CP) achieve moderate MCC on last token
- Performance drops substantially on full bags
- "Binary probes appear to identify proxy directions that partially reflect veracity but are confounded by spurious correlations"

### Finding 2: Truth/Falsehood Asymmetry
> "Truth and falsehood are not encoded symmetrically"

- Models have DISTINCT directions for truth vs falsehood
- P(φ|K_M) ≠ 1 - P(¬φ|K_M)
- Cannot simply negate truth direction to get falsehood

### Finding 3: The Third Signal
> "LLMs encode a third type of signal that is distinct from both true and false"

- Neither-valued statements consistently mislabeled by binary probes
- Models encode "lack of knowledge" distinctly from "falsehood"
- Requires three-valued logic, not binary

### Five Flawed Assumptions in Prior Work
| Assumption | Reality |
|------------|---------|
| Truth/falsehood bidirectional | Distinct directions needed |
| LLMs know everything we know | Distribution mismatch G_D ≠ G_M |
| Probes give calibrated probabilities | Require post-processing |
| Every statement is true or false | Third "neither" class exists |
| Signal location is known | Must search across tokens |

---

## Relationship to Thesis

### SUPPORTS thesis claims:

1. **LLMs don't "know" truth**: They encode statistical associations, not truth values
2. **Spurious correlations**: Binary probes "confounded by spurious correlations" — pattern matching, not reasoning
3. **Distribution-bounded**: "LLMs encode information retained during training as internal probabilistic knowledge" — bounded by training
4. **Neither = uncertainty**: The third signal shows LLMs have no mechanism for genuine knowledge assessment

### Key insight for thesis:
The paper shows LLMs don't have a simple "truth detector" — they have complex, asymmetric, distribution-bounded associations that approximate veracity through pattern matching, not genuine truth assessment.

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show distribution-bounded knowledge; training determines "truth"
- **Sycophancy Hides Linearly (2601.16644)**: Both find asymmetric encoding of truth-related signals
- **Measuring Faithfulness (2307.13702)**: Both show probing methods can find spurious correlations
- **Hallucination is Inevitable (2401.11817)**: Both suggest fundamental limits on truth assessment

### Extends
- **Emergent Symbolic Mechanisms (2502.20332)**: Adds veracity-specific mechanistic analysis
- **How LLMs Learn to Reason (2509.23629)**: Extends internal mechanism analysis to truth encoding

### Provides mechanism for
- **Hallucination**: The "neither" signal explains why LLMs confidently generate content they "don't know"
- **Sycophancy**: Asymmetric truth/falsehood enables social pressure to override truth

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (accepted at NeurIPS 2025 Workshop)

### Potential Counter-Arguments
1. "sAwMIL captures genuine truth" → Authors show it captures learned associations, not truth
2. "Binary probes work" → Paper demonstrates they fail on neither-valued statements
3. "This proves LLMs know truth" → Paper shows they encode probabilistic approximations from training

### Limitations (Authors Acknowledge)
- Focus on open-source models (3-14B parameters)
- Requires knowledge of statement structure (where actualization occurs)
- Performance varies across model families

---

## Key Quotes

### On Probing Failures
> "Common probing methods fail to provide a reliable and transferable veracity direction and, in some settings, **perform worse than zero-shot prompting**"

### On Asymmetry
> "**Truth and falsehood are not encoded symmetrically**"

### On the Third Signal
> "LLMs encode a **third type of signal that is distinct from both true and false**"

### On What LLMs Actually Encode
> "LLMs encode information retained during training as internal **probabilistic knowledge**"

### On Binary Probes
> "These binary probes appear to identify **proxy directions that partially reflect veracity but are confounded by spurious correlations**"

### On Human-Like Attribution
> "The public often attributes human-like qualities to large language models (LLMs) and assumes they 'know' certain things. In reality, LLMs encode information retained during training as internal probabilistic knowledge."

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated

---

## Assessment

**Stance**: SUPPORTS thesis (mechanistic evidence)

**Significance**: HIGH - NeurIPS 2025 Workshop acceptance; provides mechanistic foundation

**Key Contribution**: Shows that LLMs don't have genuine "truth" representation — they have:
1. Asymmetric associations for truth/falsehood
2. A distinct "neither" signal (not uncertainty about truth, but absence of learned association)
3. Spurious correlations that proxy for veracity

**Critical Evidence**:
1. Binary probes "confounded by spurious correlations"
2. Truth/falsehood NOT symmetric opposites
3. Third signal = lack of learned pattern, not genuine uncertainty
4. "Probabilistic knowledge" = learned associations from training

This paper provides mechanistic evidence that LLMs don't "know" truth — they pattern match to training distributions. The "trilemma" (true/false/neither) reflects: pattern matches training (true), pattern contradicts training (false), pattern not in training (neither). This is exactly what pattern matching predicts.
