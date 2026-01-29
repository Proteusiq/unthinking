# Paper Analysis: Revisiting Compositional Generalization Capability of LLMs Considering Instruction Following Ability

## Metadata
- **arXiv ID**: 2506.15629
- **Title**: Revisiting Compositional Generalization Capability of Large Language Models Considering Instruction Following Ability
- **Authors**: Yusuke Sakai, Hidetaka Kamigaito, Taro Watanabe
- **Date**: June 2025
- **Venue**: **ACL 2025** (Main Conference)
- **Affiliation**: Nara Institute of Science and Technology (NAIST), Japan

---

## Core Claims

1. **LLMs struggle with ordered concept composition**: Even the best model achieves only ~75% "ordered coverage" when asked to include concepts in a specific order
2. **LLMs understand instructions but can't follow them precisely**: Adding "in the specified order" improves performance, but significant gaps remain
3. **Biases toward specific orderings cause low diversity**: Models produce identical outputs even when concept order changes
4. **This reveals limits of both compositional generalization AND instruction following**

---

## Methodology

### Ordered CommonGen Benchmark
- Based on CommonGen (Lin et al., 2020) — compose sentences containing given concepts
- **Key innovation**: Require concepts to appear in the **specified order**
- Example: Given (dog, catch, throw, frisbee), must include them in that exact sequence

### Dataset Construction
- 192 seed concept sets with 4 concepts each
- Generated all 24 permutations (4!) per set
- Total: 192 × 24 = 4,608 ordered concept sets
- 6 instruction templates × 4,608 = **27,648 evaluation instances**

### Models Tested
**36 LLMs** including:
- Llama3.x (1B to 405B)
- Qwen2/2.5 (0.5B to 72B)
- Gemma2 (2B to 27B)
- Phi3 (mini, small, medium)
- Mistral/Mixtral
- GPT-3.5, GPT-4o
- Gemini Flash/Pro

### Evaluation Metrics
1. **Coverage w/o order**: Concepts included (ignoring order)
2. **Coverage w/ order**: Concepts in correct sequence
3. **Ordered Rate**: % sentences with all concepts in order
4. **Diverse Rate**: Unique sentences / total sentences
5. **Perplexity**: Sentence quality

---

## Key Evidence

### 1. Best Model Achieves Only ~75% Ordered Coverage

| Model | Coverage w/o order | Coverage w/ order | Ordered Rate |
|-------|-------------------|-------------------|--------------|
| Llama3.1-405B | 98.91% | **74.44%** | 75.26% |
| Llama3.3-70B | 97.25% | 66.79% | 68.68% |
| GPT-4o | 95.26% | 42.19% | 44.28% |
| Qwen2-72B | 94.99% | 32.09% | 33.78% |
| Gemini-Pro | 91.50% | 24.07% | 26.31% |

**Key finding**: ~25pp gap between unordered and ordered coverage even for best models.

### 2. Instructions Help But Don't Solve

Adding "in the specified order" to prompts:
- Llama3.1-405B: +55.41pp improvement in ordered coverage
- Llama3.3-70B: +47.34pp improvement
- GPT-4o: +24.50pp improvement

> "Inserting the phrase 'in the specified order' into the instruction improves the ability to follow the specified order, indicating that LLMs understand the intent of the instructions"

But still ~25% gap from perfect performance.

### 3. Models Generate Identical Outputs Despite Different Orders

| Model | Diverse Rate (lower = worse) |
|-------|------------------------------|
| GPT-4o | 52.09% |
| Qwen2-72B | 85.49% |
| Llama3.1-405B | 98.28% |

Many models produce the **same sentence** regardless of concept order permutation:
> "LLMs sometimes generate identical sentences even when the concepts are shuffled"

This is particularly problematic:
> "From the perspective of instruction-following ability, this behavior is inappropriate"

### 4. Biases Toward Preferred Orderings

Models have strong preferences for certain concept orderings:
> "Biases toward specific concept order patterns often lead to low-diversity outputs"

Example finding:
- When given different permutations of (dog, frisbee, catch, throw)
- Models tend to reorder to their "preferred" canonical form
- Ignoring the instruction to maintain specified order

### 5. Perplexity vs. Instruction Following Trade-off

Models that try harder to follow order instructions produce higher perplexity (less natural) sentences:

| Model | Ordered Rate | Perplexity |
|-------|--------------|------------|
| Qwen2-72B | 33.78% | **48.68** (best) |
| Llama3.1-405B | 75.26% | 61.49 |
| Gemma2-2B | 29.55% | 159.99 |

> "LLMs capable of generating sentences with lower perplexity while adhering to the specified order are more likely to produce commonsensical and coherent sentences"

---

## Key Quotes

### On fundamental limitation
> "Even the most instruction-compliant LLM achieved only about 75% ordered coverage, highlighting the need for improvements in both instruction-following and compositional generalization capabilities"

### On understanding vs. execution
> "While LLMs generally understand the intent of instructions, biases toward specific concept order patterns often lead to low-diversity outputs or identical results even when the concept order is altered"

### On compositional generalization
> "LLMs perform well when test data resembles training examples but fail to generalize to patterns beyond their observed data"

### On human vs. LLM capability
> "Humans, capable of the 'infinite use of finite means', can compose sentences following any specified order of concepts, regardless of the arrangement of the words themselves"

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Both show LLMs follow learned patterns over instructions
- **Compositional-ARC (2504.01445)**: Both show compositional generalization failure
- **Iterative ICL Algebraic (2509.01267)**: Both show instruction override fails
- **GSM-Symbolic (2410.05229)**: Both show distribution-bounded performance

### Extends
- **CommonGen (Lin et al., 2020)**: Adds order constraint to evaluation
- **Instruction following benchmarks**: Novel angle via ordered generation

### Provides Evidence For
- **Pattern matching thesis**: Models prefer canonical orderings from training
- **Instruction following limitations**: Understanding ≠ execution

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (June 2025, ACL 2025) — no direct rebuttals found

### Potential Counter-Arguments

1. **Task is somewhat artificial**: Natural language doesn't often require strict ordering
2. **Best model still achieves 75%**: Substantial capability exists
3. **Perplexity trade-off is expected**: Following unnatural orders produces unnatural text

### Limitations (Authors Acknowledge)

> "We conducted evaluations in zero-shot settings to highlight differences in inductive reasoning ability"

- Only English language
- Zero-shot only (few-shot might help)
- Greedy decoding (temperature might help diversity)

---

## Relevance to Thesis

**SUPPORTS** — Paper provides evidence that LLMs cannot override learned patterns to follow explicit instructions.

### Evidence FOR Thesis (Pattern Matching)

1. **75% ceiling**: Even best models fail 25% of the time on explicit instruction
2. **Same outputs despite different orders**: Models default to preferred patterns
3. **Understanding ≠ execution**: LLMs "understand" instruction but can't follow it
4. **Biases toward specific orderings**: Training distribution dominates over instructions

### Evidence AGAINST Thesis

1. **Instructions do help**: +55pp improvement shows some instruction following
2. **Best models reach 75%**: Substantial capability exists
3. **Scale helps**: 405B >> 8B on this task

### Key Insight for Synthesis

This paper demonstrates a specific form of **instruction-pattern conflict**:
- When instructions conflict with learned patterns (canonical word orderings)
- LLMs default to patterns ~25% of the time even when explicitly instructed otherwise

This is similar to:
- Iterative ICL (can't override operator precedence)
- GSM-Symbolic (can't ignore surface features)
- Faith and Fate (follows learned patterns)

### Integration with Thesis

The finding that models produce **identical outputs for different permutations** is particularly damning:
- This means the model is ignoring the instruction entirely
- The "preferred ordering" from training dominates
- Even 405B models do this ~2% of the time (Diverse Rate 98.28%)

The **Diverse Rate** metric is novel and useful for detecting pattern fixation:
- Low Diverse Rate = model ignoring input variations
- Same pattern matching behavior seen in other papers

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
