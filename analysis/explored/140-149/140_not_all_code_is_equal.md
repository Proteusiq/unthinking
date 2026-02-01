# Paper Analysis: Not All Code Is Equal: A Data-Centric Study of Code Complexity and LLM Reasoning

## Metadata
- **arXiv ID**: 2601.21894
- **Title**: Not All Code Is Equal: A Data-Centric Study of Code Complexity and LLM Reasoning
- **Authors**: Lukas Twist, Shu Yang, Hanqi Yan, Jingzhi Gong, Di Wang, Helen Yannakoudakis, Jie M. Zhang
- **Date**: January 2026
- **Venue**: ICML

---

## Core Claims

1. **Code fine-tuning yields non-uniform reasoning gains** — improvements vary substantially based on structural complexity of the code
2. **Reasoning gains are non-monotonic** — accuracy peaks at INTERMEDIATE complexity, degrades for both simple and complex code
3. **Mixed-complexity training is rarely optimal** — 83% of experiments show complexity-restricted training beats diverse code
4. **Absolute complexity matters more than dataset construction** — models respond to structural properties, not semantic diversity
5. **High complexity can actively HARM reasoning** — reduces accuracy below even natural language baseline

---

## Methodology

### Experimental Setup
- **Models**: 6 models from 3 families (Qwen 3B/7B/14B, Llama 3B/8B, Mistral 7B)
- **Datasets**: 8,087 samples per split
- **Languages**: Python, JavaScript, Java
- **Benchmarks**: 6 reasoning benchmarks (GSM8K, Math401, Math500, GPQA, BBEH-mini, HLE)

### Complexity Metrics
1. **Cyclomatic Complexity (CC)** — number of independent execution paths (control flow)
2. **Logical Lines of Code (LLOC)** — executable logic independent of formatting

### Two Settings
1. **Solution-driven complexity**: Multiple solutions to SAME problem (CodeNet)
2. **Problem-driven complexity**: Different problems requiring varying complexity (Instruct)

---

## Key Evidence

### Main Quantitative Results

| Finding | Result |
|---------|--------|
| Targeted complexity > Mixed data | **83%** of experiments (20/24 model-dataset combinations) |
| Optimal complexity (Qwen) | CC ≈ **10** |
| Llama correlation with complexity | ρ ≈ **-1.00** (high complexity HARMS reasoning) |
| Mistral behavior | **U-shaped** — benefits from very simple OR very complex |

### Model-Specific Findings

| Model Family | Complexity Response |
|--------------|---------------------|
| **Qwen** | Peaks at intermediate complexity (CC ≈ 10) |
| **Llama** | Near-perfect NEGATIVE correlation — complexity harms |
| **Mistral** | U-shaped — qualitatively different behavior |

### Key Finding: Complexity-Accuracy Relationship

> "Both very simple and very complex code tend to underperform compared to mid-range splits, indicating that structural complexity must fall within a narrow, model-dependent range to be most beneficial."

---

## Relationship to Thesis

### SUPPORTS the thesis:

1. **Surface structural properties dominate**: Models don't extract abstract reasoning principles — they respond to surface features (branching patterns, control flow complexity)

2. **Statistical match matters more than semantic content**: Performance depends on match between training complexity distribution and model capacity

3. **High complexity obscures reasoning signal**: Authors explicitly state complexity can "obscure rather than clarify the reasoning signal" — consistent with shallow pattern learning

4. **Code = implicit CoT scaffold**: Authors frame code complexity as "structural complexity as implicit code chain-of-thought" — but note this scaffold "breaks down" when too complex

5. **Previous gains may be incidental**: Quote: "previously reported gains from large code corpora may stem less from diversity itself, and more from incidental exposure to particular structural properties that happen to suit a given model"

### Key Interpretation

This paper suggests LLMs learn **surface structural patterns** from code, not generalizable reasoning principles:
- Optimal complexity is model-specific (not task-specific)
- Diversity doesn't help — targeted restriction does
- The "reasoning" gained is fragile to complexity mismatch

---

## Relationship to Other Papers

### Supports
- **Paper 135** (Demystifying Long CoT): Both show surfacing hypothesis — training exposes patterns that already exist
- **Paper 137** (CoT Training Mechanisms): Both analyze how training structure affects reasoning
- **Paper 133** (Base Models Know How to Reason): Code complexity "surfaces" latent patterns, doesn't create new ones
- **Paper 108** (WhatCounts): Both show surface properties (semantic content / code structure) determine performance

### Extends
- **Paper 134** (Can ICL Generalize OOD): Code training = learning patterns from specific complexity distribution
- **Interplay (2512.07783)**: RL surfaces pre-existing patterns; code complexity does similar

### Challenges
- Papers claiming code training teaches "reasoning" — this shows it's structure-dependent pattern matching

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper: January 2026)

### Potential Counter-Arguments

1. **Scale effects unknown**: Only 8,087 samples per split — effects may differ at larger scales
2. **Limited metrics**: Only CC and LLOC; other complexity aspects unexplored
3. **Model-specific optima**: Results may not generalize to other architectures
4. **No semantic analysis**: Metrics capture structure, not programming techniques or data flow

### Limitations (Authors Acknowledge)
- Limited to Python, JavaScript, Java
- Only open-weight models tested
- Metrics don't capture semantics
- Small dataset scale

---

## Key Quotes

1. **On non-uniform gains**: "Our results reveal that not all code is equal... improvements vary substantially across models and benchmarks, and depend strongly on the structural complexity of the fine-tuning data."

2. **On diversity assumption**: "This challenges the prevailing assumption that greater diversity or quantity of code is inherently beneficial."

3. **On complexity as scaffold**: "Structural complexity as implicit code chain-of-thought: complex code supplies a similar scaffold through control flow and branching during fine-tuning. However, when structural complexity becomes too high, this scaffold can break down."

4. **On incidental exposure**: "Previously reported gains from large code corpora may stem less from diversity itself, and more from incidental exposure to particular structural properties that happen to suit a given model."

5. **On optimal complexity**: "Restricting training data to an appropriate complexity or length range can yield stronger improvements than training on a large, mixed code corpus."

---

## Critical Assessment

### What this paper shows:
1. Code complexity is a critical variable for reasoning gains
2. Optimal complexity is model-specific, not universal
3. Diversity (mixed complexity) is usually suboptimal
4. Surface structural properties determine effectiveness

### Implications for the thesis:

**SUPPORTS the pattern-matching thesis:**
- Models respond to surface statistics (complexity distribution)
- No evidence of deep compositional learning from code
- "Reasoning gains" are fragile to complexity mismatch
- High complexity obscures rather than enhances — not what you'd expect if models learned generalizable reasoning

**Key insight**: If LLMs truly learned to reason from code, we'd expect:
- Monotonic improvement with more complex (richer) reasoning patterns
- Robustness to complexity variation
- Benefits from diverse training

Instead we see:
- Non-monotonic curves (peaks at intermediate)
- High sensitivity to complexity match
- Targeted restriction beats diversity

This is consistent with models learning surface patterns that must match their capacity, not extracting generalizable reasoning principles.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
