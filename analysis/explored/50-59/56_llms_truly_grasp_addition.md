# Paper Analysis: Do Large Language Models Truly Grasp Addition?

## Metadata
- **arXiv ID**: 2504.05262
- **Title**: Do Large Language Models Truly Grasp Addition? A Rule-Focused Diagnostic Using Two-Integer Arithmetic
- **Authors**: Yang Yan, Yu Lu, Renjun Xu, Zhenzhong Lan (Zhejiang University, Westlake University)
- **Date**: April 2025 (EMNLP'25 Main)
- **Venue**: EMNLP 2025

---

## Core Claims

1. **LLMs rely on pattern matching, NOT rule learning** — 81.23% mean drop under symbolic transformation
2. **Commutativity is violated** — 1,700+ cases where A+B ≠ B+A
3. **Explicit rule provision DEGRADES performance** — 81.2% average degradation
4. **SFT optimizes pattern matching** — 97.17% numerical but 0% symbolic transfer
5. **Reasoning training helps symbolic generalization** — R1-Distill models show only -5.99% drop

---

## Methodology

### Three Diagnostic Tests

1. **Representation Invariance**: Performance under bijective symbol mappings (7→y, 9→c)
2. **Complexity Scaling**: Accuracy should degrade monotonically with digit count
3. **Commutativity Preservation**: A+B = B+A must hold

### Dataset
- 100,000 two-integer addition problems spanning [0, 2^64]
- Both A+B and B+A variants for commutativity testing
- Symbolic mapping: {u,d,a,i,h,v,e,y,r,c} for digits 0-9

### Models Tested
40+ models including: GPT-4o, Claude-3.5-sonnet, Gemini-2.5-pro, DeepSeek-V3/R1, Llama family, Qwen family, etc.

---

## Key Evidence

### Catastrophic Symbolic Collapse

| Model | Numerical | Symbolic | Drop |
|-------|-----------|----------|------|
| Claude-3.5-sonnet | 99.81% | 7.51% | **-92.30%** |
| Qwen2.5-72B | 96.13% | 6.29% | **-89.84%** |
| gemini-2.0-flash | 98.10% | 9.25% | **-88.85%** |
| DeepSeek-V3 | 98.92% | 16.14% | **-82.78%** |
| gemini-2.5-pro | 99.16% | 55.99% | **-43.17%** (best) |

**Mean drop: -81.23%**

### Commutativity Violations

| Model | Violations (A+B ≠ B+A) |
|-------|------------------------|
| Llama3.3-70b-It | **1,771** |
| gemma-2-27b-it | **1,086** |
| Gemma2-9b-it | 801 |

**Critical finding**: Models use direction-specific memorized patterns, not abstract rules.

### Rule Provision HURTS Performance

| Condition | Average Degradation |
|-----------|---------------------|
| Providing explicit addition rules | **-81.2%** |
| "Explain-and-Do" (model's own terms) | ~0% (maintains baseline) |

**Models can't operationalize abstract principles — prefer pattern matching.**

### Fine-Tuning Results (Qwen2.5-7B-Instruct)

| Method | Numerical | Symbolic | Transfer |
|--------|-----------|----------|----------|
| None (baseline) | 83.00% | 0.58% | Poor |
| SFT (numerical) | **97.17%** | **0.00%** | **ZERO** |
| RL (DPO) | 95.32% | 0.37% | Poor |
| DS-R1-Distill-Qwen-7B | 74.76% | 6.88% | Better |

**SFT achieves highest numerical accuracy but ZERO symbolic transfer.**

### Reasoning Models Show Better Transfer

| Model | Position Numerical | Position Symbolic | Drop |
|-------|-------------------|-------------------|------|
| Standard models | 70-90% | 0-20% | **-70 to -92%** |
| DS-R1-Distill-Llama-8B | 45.54% | 39.55% | **-5.99%** |
| DS-R1-Distill-Llama-70B | 68.91% | 42.94% | **-25.97%** |

**R1-Distilled models show much smaller symbolic degradation.**

---

## Critical Assessment

### What This Paper Shows

1. **Near-perfect numerical accuracy ≠ understanding** — 99.8% accuracy collapses to 7.5% with symbols
2. **LLMs use pattern matching, not algorithms** — commutativity violations prove this
3. **Explicit rules don't help** — models can't operationalize abstract principles
4. **Current training optimizes patterns** — SFT gives 0% transfer
5. **Reasoning training helps somewhat** — R1-Distill shows better (but still imperfect) transfer

### Relevance to Thesis

**STRONGLY SUPPORTS thesis — definitive evidence for pattern matching hypothesis**

This is one of the strongest papers supporting the thesis:
- High numerical accuracy is illusory — collapses under representation change
- Commutativity violations prove models don't understand the operation
- Rule provision hurts because models prefer memorized patterns
- SFT optimizes pattern matching, not understanding

---

## Relationship to Other Papers

### Supports
- **GSM-Symbolic (2410.05229)**: Both show high accuracy hides brittleness
- **Faith and Fate (2305.18654)**: Confirms pattern matching mechanism
- **Semantic Deception (2512.20812)**: Both show addition failures
- **Sequential Enumeration (2512.04727)**: Both show LLMs can't count/compute

### Provides Evidence For
- **"Surfacing hypothesis"**: SFT surfaces patterns, doesn't create understanding
- **Benchmark validity concerns**: High scores reflect pattern recognition

### Key Finding
> "While models achieve impressive scores on complex benchmarks like GSM8k and MATH-500, they fail to demonstrate genuine mathematical understanding... high benchmark scores primarily reflect pattern recognition."

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found (recent paper, EMNLP'25)

### Potential Counter-Arguments

1. **Symbolic mapping is unnatural** — but true understanding should generalize
2. **Addition table in context is confusing** — but commutativity still fails in numerical
3. **R1-Distill shows some transfer** — but still imperfect and requires specific training

### Limitations (Authors Acknowledge)
- Scope limited to addition only
- Symbolic transformation may underestimate naturalistic capabilities
- Focus on SFT/RL may overlook alternative approaches

---

## Key Quotes

> "LLMs appear fundamentally oriented towards memorizing specific patterns rather than abstracting general principles."

> "When presented with human-provided rules that are abstract and generalizable (e.g., 'carry the 1 when sum exceeds 9'), models struggle to operationalize these principles, instead defaulting to their pre-trained pattern-matching mechanisms."

> "These commutativity violations are not isolated errors; they strongly imply that the models rely on direction-specific, memorized patterns rather than on a comprehensive understanding of the addition rules."

> "Current LLM architectures are fundamentally optimized for pattern recognition rather than abstract rule learning."

---

## Relevance to Thesis

**STRONGLY SUPPORTS thesis — one of the strongest evidence papers**

This paper shows:
1. ✓ Near-perfect accuracy is illusory — 99.8% → 7.5% with symbols
2. ✓ Commutativity violations prove no understanding — 1,700+ cases
3. ✓ Rule provision hurts — models can't operationalize abstractions
4. ✓ SFT optimizes patterns — 97.17% numerical, 0% symbolic transfer
5. ✓ Even "reasoning" models only partially improve — R1-Distill still imperfect

**Key insight**: This paper provides the clearest evidence that high benchmark performance reflects pattern matching, not mathematical understanding. The commutativity violation (A+B ≠ B+A in 1,700+ cases) is especially damning — a system that understands addition cannot violate commutativity.

---

## Status
- [x] Read complete (HTML version via Task agent)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**

---

## Verdict: STRONGLY SUPPORTS THESIS (definitive evidence: 99.8% accuracy collapses to 7.5% with symbols; 1,700+ commutativity violations; rule provision hurts; SFT = 0% transfer)
