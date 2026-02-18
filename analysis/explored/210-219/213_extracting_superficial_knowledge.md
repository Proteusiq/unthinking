# Paper Analysis: Extracting and Understanding Superficial Knowledge in Alignment

## Metadata
- **arXiv ID**: 2502.04602
- **Title**: Extracting and Understanding the Superficial Knowledge in Alignment
- **Authors**: Runjin Chen, Gabriel Jacob Perin, Xuxi Chen, Xilun Chen, Yan Han, Nina S. T. Hirata, Junyuan Hong, Bhavya Kailkhura
- **Institutions**: UT Austin, University of São Paulo, LinkedIn, Lawrence Livermore National Laboratory
- **Date**: February 2025
- **Venue**: arXiv preprint

---

## Core Claims

### Definition of Superficial Knowledge

The paper formalizes the previously vague concept of "superficial knowledge":

> "We define superficial knowledge as the type of knowledge that can be easily acquired through simple token restyling, without requiring modifications to the model's understanding of the underlying causal relationships between tokens and the process of knowledge extraction and compression."

### Main Claims

1. **C1**: Superficial knowledge can be extracted using only a shallow linear projection head modification
2. **C2**: Superficial knowledge constitutes a **large proportion** of alignment, especially for safety/detoxification
3. **C3**: Alignment is **not entirely superficial** — reasoning and contextual integration require deeper changes
4. **C4**: Superficial knowledge is **transferable** between models (weak-to-strong alignment)
5. **C5**: Superficial knowledge is **recoverable** after safety de-alignment attacks

### Key Finding (Dual Nature of Alignment)

> "Our findings reveal that while superficial knowledge constitutes a significant portion of alignment, particularly in safety and detoxification tasks, it is not the whole story. Tasks requiring reasoning and contextual understanding still rely on deeper knowledge."

---

## Methodology

### Extraction Method

1. **Freeze base model backbone** fb(·) — all transformer layers unchanged
2. **Train only ΔWb** — residual adjustment to final linear projection head
3. **Distillation from aligned model** — minimize KL divergence between base+ΔW and aligned model outputs
4. **No external data** — ensures extracted knowledge comes only from alignment, not new information

The optimization objective:
```
ΔWb = argmin Σt KL(Pt^a || Pt^b)
```

Where Pt^a and Pt^b are softmax probabilities from aligned and base+ΔW models.

### Models Tested
- LLaMA2-7B / 7B-Chat
- LLaMA2-13B / 13B-Chat
- Mistral-7B-v0.3 / Instruct
- Qwen-3B / Instruct

### Evaluation Benchmarks

| Dataset | Task | Metric |
|---------|------|--------|
| GSM8k | Math reasoning | Accuracy (↑) |
| Toxigen | Toxicity avoidance | ToxiScore (↓) |
| AdvBench | Safety (harmful requests) | HarmRate, HarmScore (↓) |
| TruthfulQA | Factuality | % Info+True (↑) |

### Baselines
- **LIMA**: Few-shot alignment (Zhou et al., 2024)
- **Urial**: In-context learning alignment (Lin et al., 2023)

---

## Key Evidence

### 1. Superficial Knowledge Achieves Full Safety/Detoxification

**Table 1 (LLaMA2 results)**:

| Model | GSM (↑) | Toxigen (↓) | AdvBench HarmRate (↓) | TruthfulQA (↑) |
|-------|---------|-------------|----------------------|----------------|
| 7B Base | 0.037 | 0.77 | 0.66 | 0.34 |
| 7B-Chat (Aligned) | **0.230** | **0.00** | **0.00** | **0.68** |
| 7B+LIMA | 0.058 | 0.86 | 0.84 | 0.42 |
| 7B+Urial | 0.049 | 0.00 | 0.07 | 0.41 |
| **7B+Superficial** | 0.140 | **0.00** | **0.00** | 0.66 |

Key findings:
- **Safety is 100% superficial**: Superficial knowledge alone eliminates ALL harmful responses (HarmRate 0.66→0.00)
- **Toxicity is 100% superficial**: ToxiScore drops from 0.77 to 0.00
- **Math is 53% superficial**: GSM improves from 0.037→0.140 (53% of full aligned 0.230 improvement)
- **TruthfulQA is 94% superficial**: 0.34→0.66 (94% of full aligned 0.68 improvement)

### 2. First 10 Tokens Contain Most Superficial Knowledge

From Figure 2 analysis:

> "We found the initial positions (e.g., the first 10 tokens) in each response may contain the most alignment knowledge, as indicated by significantly different distributions between the base and aligned models at these positions. However, this knowledge is predominantly superficial."

The KL divergence between base and aligned models:
- **Early tokens**: High KL divergence → significant alignment knowledge
- **After superficial fix**: KL drops near zero for early tokens
- **Later tokens**: Residual KL remains → deeper knowledge needed

### 3. Example: Style vs Reasoning (Table 2)

**Question**: Math word problem about bakery purchases

| Model | Answer | Analysis |
|-------|--------|----------|
| Base | $203 (wrong) | No step breakdown, immediate wrong calculation |
| Aligned | $694 (correct) | Step-by-step: $204 + $160 + $330 = $694 |
| Base+Superficial | $894 (wrong) | Step-by-step format BUT calculation error: $204 + $160 + $330 = $894 |

Key insight:
> "The base model with superficial knowledge ultimately provides the incorrect answer due to a calculation error: it miscalculates '$204 + $160 + $330 = $894'. In contrast, the aligned model does not exhibit this error, as demonstrated by the token shift pair (8 → 6). The mathematical calculations require a high level of integration and understanding of token relationships, which cannot be achieved through a simple shallow linear projection head."

### 4. Token Shift Analysis

Source → Target token shifts are **primarily stylistic**:
- `## → To` (changes output format)
- `solve → find` (restyling verb)
- `The → 1` (enables numbered list)
- `The → Therefore` (enables conclusion)

> "Both source and target shift tokens predominantly focus on stylistic elements used for organizing responses."

### 5. Weak-to-Strong Transfer (Table 3)

Superficial knowledge extracted from 7B can improve 13B:

| Model | GSM | Safety HarmRate |
|-------|-----|----------------|
| 13B Base | 0.066 | 0.80 |
| 13B+Superficial (self) | 0.226 | 0.00 |
| **13B+Superficial-BB-7B** | 0.168 | 0.00 |

> "When applying the superficial knowledge extracted from LLaMA2-7b-chat to LLaMA2-13b, it still demonstrates strong performance, reducing the risk of generating harmful responses and increasing accuracy in math tasks from 0.066 to 0.168"

### 6. Safety Recovery After Fine-Tuning Attack (Table 4)

| Model | HarmRate | MMLU |
|-------|----------|------|
| 7B-Chat (aligned) | 0.00 | 0.465 |
| 7B-Chat-Finetuned (attacked) | 0.96 | 0.466 |
| Finetuned + Urial | 0.93 | 0.459 |
| **Finetuned + Superficial-BB** | **0.08** | 0.456 |

> "After fine-tuning, the harmful response rate of the model increased dramatically from 0% to 96%. However, after restoring the superficial knowledge, most of the performance was regained, and the harmful rate dropped to 8%."

Recovers **88% of safety** without compromising MMLU accuracy.

---

## Relationship to Other Papers

### Cites LIMA (2305.11206) — #211

Yes, the paper directly engages with LIMA and the Superficial Alignment Hypothesis (SAH):

> "These findings give rise to the Superficial Alignment Hypothesis (Zhou et al., 2024), which suggests that a model may acquire most of its knowledge and abilities during pre-training, while alignment primarily involves superficial adjustments."

**Relationship**: This paper **operationalizes and tests** LIMA's hypothesis by:
1. Defining "superficial" precisely (linear projection head changes)
2. Quantifying what proportion of alignment is superficial
3. Finding alignment is **mostly but not entirely** superficial

### Relationship to #209 (Revisiting SAH)

**#209 Claims**: Reasoning continues improving after style saturates (~100 examples)

**This Paper's Response**: Partially confirms, partially challenges:
- Confirms: Style/safety ARE superficial (linear head captures 100%)
- Adds nuance: "Reasoning and contextual understanding" require deeper changes
- Shows reasoning improvement gap: Only 53-62% of GSM improvement is superficial

**Reconciliation**: Both papers agree alignment has superficial AND deeper components. This paper provides the **mechanism** for why safety saturates quickly (it's fully superficial) while reasoning doesn't.

### Relationship to #210 (Probability Concentration)

**#210 Claims**: Alignment reduces branching factor by 10x, surfaces pre-existing low-entropy paths

**This Paper's Response**: Complementary mechanism:
- #210: Alignment narrows probability distribution (BF reduction)
- This paper: Alignment involves "token restyling" via linear projection changes
- Both agree: Much of alignment is about **path selection**, not capability creation

**Together**: These papers form a mechanistic picture:
1. Alignment shifts token probabilities via superficial changes (#213)
2. This narrows the effective path space (BF reduction, #210)
3. ~1000 examples suffice because style learning is simple (#211)
4. But reasoning requires deeper changes that style alone can't provide (#213, #209)

### Relationship to #212 (Superficial Safety Alignment Hypothesis)

**#212 Claims**: Safety alignment is binary classification; only 1.3-1.4% of units are safety-critical

**This Paper**: Provides complementary evidence:
- Both show safety is highly localized/superficial
- #212: Safety in specific neurons (SCU)
- #213: Safety in linear projection head
- Both: 100% of safety captured by small intervention

### Relationship to #214 (Safety Not Superficial)

**#214 Claims**: Safety alignment CAN be deep with explicit [CLS] signals

**This Paper's Response**: Not directly addressed, but:
- #213 shows EXISTING alignment is superficial
- #214 shows FUTURE alignment could be deep with different methods
- Compatible findings: Current methods = superficial; explicit signals = potential for depth

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
No direct rebuttals found on arXiv as of February 2026.

### Potential Counter-Arguments

1. **Linear projection head is NOT truly "superficial"**
   - The projection head is the final layer connecting to the entire vocabulary
   - Changes to it can have significant semantic effects
   - Counter-response: Paper explicitly preserves transformer layers; changes are local to final token selection

2. **Distillation may introduce knowledge**
   - Distillation from aligned model could transfer non-superficial knowledge
   - Counter-response: Paper argues distillation only transfers what can be captured in ΔW, which is architecturally limited

3. **Safety may not be truly superficial**
   - 100% safety could be achieved by learning refusal patterns
   - Counter-response: This IS what superficial means — style/pattern changes without deep understanding

### Limitations (Authors Acknowledge)

> "While the non-superficial part in alignment is not fully understood. The problem remains challenging as the rest of knowledge could be multi-faceted, and could be complicated with diverse sequential dependencies."

The paper doesn't fully characterize what the **deeper knowledge** component consists of, only that it exists and matters for reasoning.

---

## Key Quotes

### Definition of Superficial Knowledge
> "We define superficial knowledge as the type of knowledge that can be easily acquired through simple token restyling, without requiring modifications to the model's understanding of the underlying causal relationships between tokens."

### Main Finding
> "Our findings reveal that while superficial knowledge constitutes a significant portion of alignment, particularly in safety and detoxification tasks, it is not the whole story. Tasks requiring reasoning and contextual understanding still rely on deeper knowledge."

### Safety is Fully Superficial
> "By leveraging superficial knowledge alone, we can completely eliminate safety and toxicity risks while achieving average performance improvements of 58% in math and 78% in truthfulness tasks."

### Reasoning Requires More
> "The mathematical calculations require a high level of integration and understanding of token relationships, which cannot be achieved through a simple shallow linear projection head (superficial knowledge). This also underscores that alignment is more than merely superficial knowledge."

### On Token Shifts
> "Both source and target shift tokens predominantly focus on stylistic elements used for organizing responses. For example, '## → To' leads model to recall the target of the question. 'The → There(fore)' push model to summarize the findings."

---

## Assessment for the Thesis

### Classification: **SUPPORTS** (Balanced)

### Evidence Supporting the Thesis (LLMs as Pattern Matchers):

1. **Safety is 100% superficial**: Harmful content avoidance is entirely about token-level style changes
2. **Token shifts are stylistic**: The extracted changes are formatting/style tokens, not semantic content
3. **First tokens dominate**: Most alignment knowledge is in the first 10 tokens — initial framing
4. **Transferability**: Superficial knowledge transfers between models — suggests it's model-agnostic patterns
5. **Recoverability**: Safety can be restored by re-applying patterns — not deep capability change

### Evidence Challenging the Thesis:

1. **Reasoning gap**: Only 53-62% of math reasoning improvement is superficial
2. **Calculation errors persist**: Base+Superficial makes arithmetic errors the aligned model doesn't
3. **Contextual integration needed**: Paper explicitly states reasoning requires "deeper knowledge"

### Overall Assessment

This paper provides **quantitative evidence** that:
- A large portion of alignment IS superficial (style/token changes)
- Safety alignment is ENTIRELY superficial
- But reasoning improvement requires something more

The paper **supports** the thesis for safety/style but **adds nuance** for reasoning tasks. It's compatible with the view that:
- LLMs are sophisticated pattern matchers
- Alignment mostly teaches output format patterns
- But some post-training changes affect deeper computations

---

## Status
- [x] Read complete (full HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] LIMA relationship documented (cites #211)
- [x] Rebuttals checked
- [x] Paper graph updated
- [ ] Synthesis updated (if significant)
