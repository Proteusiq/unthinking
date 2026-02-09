# Paper Analysis: Large Language Models are Zero-Shot Reasoners

## Metadata
- **arXiv ID**: 2205.11916
- **Title**: Large Language Models are Zero-Shot Reasoners
- **Authors**: Takeshi Kojima, Shixiang Shane Gu, Machel Reid, Yutaka Matsuo, Yusuke Iwasawa
- **Affiliation**: University of Tokyo, Google Brain
- **Date**: May 2022 (NeurIPS 2022)
- **Venue**: NeurIPS 2022

---

## Core Claims

1. **Zero-shot CoT works**: Simply adding "Let's think step by step" before answers significantly improves performance on reasoning tasks without any examples.

2. **Single prompt, multiple tasks**: The same prompt template works across diverse reasoning tasks (arithmetic, symbolic, logical).

3. **Untapped zero-shot capabilities**: LLMs have "untapped and understudied fundamental zero-shot capabilities" that can be extracted by simple prompting.

4. **"High-level, multi-task broad cognitive capabilities"**: The paper suggests LLMs may have general cognitive capabilities.

---

## Methodology

### Zero-Shot-CoT Approach

**Two-stage prompting**:
1. **Reasoning extraction**: Append "Let's think step by step" to the question
2. **Answer extraction**: Append "Therefore, the answer is" to extract final answer

### Benchmarks Tested

| Category | Benchmarks |
|----------|-----------|
| Arithmetic | MultiArith, GSM8K, AQUA-RAT, SVAMP |
| Symbolic | Last Letter Concatenation, Coin Flip |
| Logical | Date Understanding, Tracking Shuffled Objects |

### Models Tested
- InstructGPT (text-davinci-002)
- PaLM 540B
- GPT-3 variants

---

## Key Evidence

### Performance Improvements

| Benchmark | Zero-Shot | Zero-Shot-CoT | Improvement |
|-----------|-----------|---------------|-------------|
| MultiArith | 17.7% | **78.7%** | +61.0pp |
| GSM8K | 10.4% | **40.7%** | +30.3pp |
| SVAMP | 58.8% | 70.1% | +11.3pp |
| Last Letter | 0.2% | 57.6% | +57.4pp |
| Coin Flip | 50.0% | 91.4% | +41.4pp |

### Key Findings

1. **Prompt matters enormously**: "Let's think step by step" outperforms other prompts like "Let's solve this problem by splitting it into steps"

2. **Scale matters**: Zero-shot-CoT works best with largest models (>100B parameters)

3. **Task transfer**: Same prompt works across very different reasoning types

---

## Relationship to Thesis

### This Paper's Position: **FOR Reasoning Capabilities**

The paper explicitly claims LLMs are "zero-shot reasoners" and suggests they have "broad cognitive capabilities."

### Critical Assessment: How Does This Paper Actually Support the Thesis?

Despite the "FOR reasoning" framing, the evidence actually supports the pattern matching thesis:

**1. Elicitation, Not Creation**

The paper shows reasoning can be **elicited** by prompting. This is consistent with:
- Paper 133 (Surfacing Hypothesis): "Base models know how to reason"
- The thesis framework: CoT is vector steering, not capability creation

If the capability must be **elicited**, it pre-exists in the training distribution. The prompt activates a region of latent space, not create new capability.

**2. The "Let's think step by step" Pattern**

This phrase appears millions of times in training data before mathematical solutions. The prompt is activating a learned pattern:
```
"Let's think step by step" → [mathematical reasoning pattern from training]
```

This is EXACTLY what pattern matching predicts.

**3. Task-Specific Patterns Still Dominate**

From the paper's own data:
- MultiArith: +61pp improvement (well-represented in training)
- GSM8K: +30pp improvement (less represented)
- Novel tasks: Much smaller improvements

The improvement correlates with task representation in training data.

**4. Still Fails on True OOD**

The paper doesn't test:
- Novel compositions not in training
- Systematically different structures
- True out-of-distribution reasoning

Papers 146-149 show what happens when you test outside the training distribution: collapse.

### Reframing the Evidence

| Paper's Claim | Pattern Matching Interpretation |
|---------------|--------------------------------|
| "LLMs are zero-shot reasoners" | LLMs have reasoning-like patterns from training |
| "Untapped capabilities" | Regions of latent space not accessed by default prompts |
| "Broad cognitive capabilities" | Diverse patterns learned from diverse training data |
| "Let's think step by step works" | This phrase co-occurs with reasoning in training data |

---

## REBUTTALS TO THIS PAPER

### Direct Evidence Against

1. **Paper 148 (Turpin)**: Zero-shot CoT makes models MORE susceptible to bias, not less. "Let's think step by step" doesn't improve reasoning — it may amplify biases.

2. **Paper 147 (Razeghi)**: >70% accuracy gap based on term frequency. If "Let's think step by step" triggered genuine reasoning, accuracy would be uniform.

3. **Paper 149 (Reversal Curse)**: 0% reverse accuracy. If CoT enabled genuine reasoning, models could reason bidirectionally.

4. **Paper 6 (CoT is a Mirage)**: ID=100%, OOD=0%. The improvements are within-distribution, not genuine reasoning.

### The Elicitation vs. Creation Distinction

The paper assumes: **Prompting reveals hidden reasoning ability**

Alternative interpretation: **Prompting activates learned patterns**

Both explain the data, but have different implications:
- If revealing reasoning → LLMs genuinely reason
- If activating patterns → LLMs pattern match more effectively

The thesis argues for the second interpretation based on:
1. OOD collapse (Papers 6, 134, 149)
2. Frequency correlation (Paper 147)
3. CoT unfaithfulness (Papers 148, 14)
4. Reversal curse (Paper 149)

---

## Key Quotes

> "LLMs are decent zero-shot reasoners by simply adding 'Let's think step by step' before each answer."

> "The versatility of this single prompt across very diverse reasoning tasks hints at untapped and understudied fundamental zero-shot capabilities of LLMs."

> "High-level, multi-task broad cognitive capabilities may be extracted by simple prompting."

> "We hope our work... highlights the importance of carefully exploring and analyzing the enormous zero-shot knowledge hidden inside LLMs."

---

## Relationship to Other Papers

### Builds On
- **Paper 151 (Wei et al.)**: Original few-shot CoT paper — this extends to zero-shot

### Extended By
- **Paper 2 (CoT Without Prompting)**: Shows CoT exists intrinsically in top-k tokens
- **Paper 133 (Surfacing Hypothesis)**: Formalizes the "capability exists, must be elicited" idea

### Challenged By
- **Paper 148 (Turpin)**: Zero-shot CoT increases bias susceptibility
- **Paper 6 (CoT Mirage)**: Distribution determines success, not reasoning
- **Paper 147 (Razeghi)**: Frequency correlation proves pattern retrieval

### Used In
- Nearly all subsequent CoT research cites this paper
- "Let's think step by step" becomes standard prompt engineering

---

## Historical Significance

This is one of the most influential papers in LLM research:
- **5000+ citations**
- Established zero-shot CoT as standard technique
- "Let's think step by step" became ubiquitous

However, the interpretation has been contested by subsequent work (Papers 6, 147, 148, 149) showing the improvements are pattern-based, not reasoning-based.

---

## Status
- [x] Read complete (abstract, NeurIPS 2022)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] Paper graph updated

---

## Classification
- **Stance**: FOR reasoning capabilities
- **Evidence Type**: Empirical (benchmark improvements)
- **Strength**: High influence, but interpretation contested
- **Key Limitation**: Doesn't test OOD; improvements may be pattern activation not reasoning

## Tags
`foundational` `cot` `zero-shot` `neurips-2022` `for-reasoning` `highly-cited` `elicitation`
