# Paper Analysis: Expanding Computation Spaces of LLMs at Inference Time

## Metadata
- **arXiv ID**: 2509.24884
- **Title**: Expanding Computation Spaces of LLMs at Inference Time
- **Authors**: Yoonna Jang, Kisu Yang, Isabelle Augenstein
- **Affiliations**: University of Copenhagen, Korea University, VAIV Company
- **Date**: September 2025
- **Venue**: arXiv (preprint)

---

## Core Claims

1. **Filler tokens work at inference time (no training needed)**: Unlike prior work that trains with pause tokens, this paper shows benefits from simply inserting filler tokens at test time.

2. **Token type matters, but many work**: Tested 6 token types — period (.), newline (\n), space, tab, pad, dash — all can provide benefits depending on model and task.

3. **Smaller models benefit most**: Up to +12.4 percentage points for SmolLM2-1.7B-Instruct; larger models see minimal gains.

4. **Position is critical**: Filler tokens must be placed **before** "Answer:" — if placed after, the model predicts more filler tokens instead of the answer.

5. **There's an optimal count**: 16-256 tokens works well; beyond 1024 tokens, performance collapses to ~20%.

---

## Methodology

### Token Types Tested
| Token | Symbol | Description |
|-------|--------|-------------|
| Space | `' '` | Single space character |
| Enter | `'\n'` | Newline character |
| Tab | `'\t'` | Tab character |
| Period | `'.'` | Full stop |
| Pad | `<pad>` | Padding token |
| Dash | `'-'` | Hyphen/dash |

### Insertion Format
```
[Question] [Filler tokens...] Answer: [Output]
```
Filler tokens placed **immediately before** the "Answer:" prompt.

### Tasks
| Dataset | Task Type | Samples |
|---------|-----------|---------|
| MMLU | Open-domain QA | 14,079 |
| ARC Challenge | Science QA | 1,172 |
| GSM8K | Math reasoning | 1,819 |
| MATH-500 | Advanced math | 500 |

### Models
- SmolLM2-1.7B-Instruct
- Gemma-3-4B-it
- Llama-3.1-8B-Instruct
- OLMo-2-1124-13B
- Qwen2.5-14B-IT
- Qwen2.5-32B-Instruct

---

## Key Evidence

### MMLU Results — THE KEY TABLE
| Model | Baseline | Best Token | Best # | Best Accuracy | Improvement |
|-------|----------|------------|--------|---------------|-------------|
| **SmolLM2-1.7B** | 40.6% | Period (.) | 64-256 | **53.0%** | **+12.4 pp** |
| Gemma-3-4B | 60.0% | Space | 32 | 57.6% | -2.3 pp |
| Llama-3.1-8B | 65.0% | Space | 512 | 67.5% | +2.5 pp |
| Qwen2.5-14B | 78.7% | Period | 1024 | 78.7% | ~0 pp |
| Qwen2.5-32B | 82.5% | Space | 32-64 | 82.7% | +0.3 pp |

**Key finding**: Smaller models benefit dramatically; larger models saturate.

### ARC Challenge Results
| Model | Baseline | Best Token | Best # | Best Accuracy | Improvement |
|-------|----------|------------|--------|---------------|-------------|
| **SmolLM2-1.7B** | 42.7% | Enter (\n) | 256 | **52.9%** | **+10.2 pp** |
| Llama-3.1-8B | 78.6% | Space | 128 | 81.1% | +2.5 pp |

### Token Count Sweet Spot
| # Tokens | Effect |
|----------|--------|
| 16-64 | Good improvements |
| 128-256 | Often optimal |
| 512-1024 | Diminishing returns |
| >1024 | **Performance collapses to ~20%** |

### Pad Token Behavior
- `<pad>` severely degrades performance beyond 64 tokens
- **Exception**: Llama-3.1-8B works well with `<pad>` because it uses `<eos>` as pad token

---

## Relationship to Thesis

### SUPPORTS (Moderately)

1. **Any filler token works (mostly)**: Period, newline, space, tab — content doesn't matter, computation does. Supports "computational workspace" hypothesis.

2. **No training needed**: This is pure inference-time effect — the model already has the capability, just needs the computational depth.

3. **Smaller models benefit most**: Suggests larger models already have sufficient computational depth; smaller models need the extra workspace.

4. **Position > content**: Where you put filler tokens matters more than what they are — it's about computation flow, not semantics.

### Key Insight for Thesis

This paper shows that **off-the-shelf models** can benefit from filler tokens without any training. This means:
- The capability to use extra computation is **already learned during pretraining**
- The benefit comes from **additional transformer forward passes**, not from semantic content
- This is consistent with "CoT works because of computation, not reasoning"

### Caveat
The paper doesn't test whether truly random gibberish works — all tested tokens are valid vocabulary items. The "any token" claim is limited to these 6 types.

---

## Relationship to Other Papers

### Directly Supports
- **Dot by Dot (#161, 2404.15758)**: Both show filler tokens provide computational benefit independent of content
- **Pause Tokens Training (#195, 2310.02226)**: This paper shows benefits even WITHOUT training (unlike Goyal et al.)
- **Seq-VCR (#196, 2411.02344)**: Complementary — Seq-VCR needs training, this works at inference only

### Extends
- **Lanham et al. (2023)**: They found filler tokens don't help; this paper shows they DO help with right placement and count
- Resolves apparent contradiction: position and count matter

### Challenges (Partially)
- **Pause Tokens Training (#195)**: Claims training is required; this shows inference-time benefits exist (but smaller than with training)

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **Limited token variety**: Only tested 6 token types — all valid vocabulary items. Doesn't test truly random character sequences.

2. **Benefits concentrated in small models**: Qwen2.5-32B sees only +0.3 pp improvement. May not scale.

3. **Task-specific**: Benefits vary by task; some token types hurt performance on some tasks.

4. **Collapse at scale**: Beyond 1024 tokens, performance drops to 20%. Fragile.

5. **Not true reasoning**: Benefits could be from regularization effects or format matching, not additional "reasoning."

### Limitations (Authors Acknowledge)
- "Appropriate token types and counts vary" — no universal solution
- Benefits diminish with larger models
- Pad token behavior is model-specific
- Performance collapses with too many tokens

---

## Key Quotes

> "Across models, we observe accuracy improvements of **up to 12.372 percentage points**."

> "For the SmolLM model, the **period token yields the best overall performance on MMLU**, while the **enter token is most effective on ARC**."

> "Smaller models benefit most, up to 12.372 percentage points in SmolLM2-1.7B-Instruct, **indicating that these spaces act as additional computational capacity rather than redundant input**."

> "**Placing filler tokens directly before the final 'Answer:' token is most effective.** If many filler tokens follow 'Answer:', the model is more likely to predict another filler token as the next token."

> "Attention maps reveal that expanded spaces often **continue the original attention mechanism** and sometimes **focus on questions or answer options**, suggesting **meaningful computation for problem-solving**."

> "Only from mid to late Stage 2 [of pretraining] does performance approach and slightly exceed the baseline, suggesting that **the model needs sufficient exposure to diverse data** before it can effectively leverage filler tokens."

---

## Critical Assessment

### What This Paper Adds

1. **Inference-time benefits**: Unlike Seq-VCR and Pause Tokens Training, this works without any training
2. **Token type comparison**: First systematic comparison of 6 token types
3. **Scaling analysis**: Shows smaller models benefit more
4. **Attention analysis**: Provides mechanistic insight via attention maps

### Limitations for Thesis

- Doesn't test truly random/gibberish tokens
- Benefits are smaller than with training (compare +12pp inference-only vs +99pp Seq-VCR)
- Doesn't explain WHY different tokens work differently

### Stance: SUPPORTS (Moderately)

The paper supports the computational workspace hypothesis — filler tokens provide additional computation, and the content matters less than the position and count. However, it's a weaker signal than Seq-VCR because:
- Benefits are smaller
- Doesn't test truly arbitrary tokens
- Benefits diminish with scale

---

## Status
- [x] Read complete (via task agent extraction)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
