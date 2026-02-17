# Paper Analysis: A Mechanistic Interpretation of Arithmetic Reasoning in Language Models

## Metadata
- **arXiv ID**: 2305.15054
- **Title**: A Mechanistic Interpretation of Arithmetic Reasoning in Language Models using Causal Mediation Analysis
- **Authors**: Alessandro Stolfo, Yonatan Belinkov, Mrinmaya Sachan
- **Institutions**: ETH Zürich, Technion – IIT
- **Date**: May 2023
- **Venue**: ACL 2023

---

## Core Claims

1. LLMs process arithmetic by **conveying operand/operator information** from early layers to the final token via attention
2. **Late MLP modules** (layers 19-20 in GPT-J) produce result-related information
3. The information flow is **specific to arithmetic** — different circuits for arithmetic vs. factual knowledge vs. number retrieval
4. Fine-tuning **induces emergence** of the mid-late MLP activation site for more complex queries
5. Only **9-10% neuron overlap** between arithmetic and factual knowledge circuits (same as random chance)

---

## Methodology

### Causal Mediation Analysis Framework
- Model treated as causal graph: inputs → model components (mediators) → outputs
- Intervene on activations of specific MLP/attention blocks
- Measure change in predicted probabilities (Indirect Effect)

### Experimental Setup
| Parameter | Value |
|-----------|-------|
| Primary model | GPT-J (6B) |
| Validation models | Pythia 2.8B, LLaMA 7B, Goat |
| Operations tested | +, −, ×, ÷ |
| Operand range | 1-300 (single tokens) |
| Query types | 2-operand, 3-operand |

### Key Experimental Design
1. Generate two prompts with different operands but same operator
2. Forward pass on prompt 1, store activations
3. Forward pass on prompt 2, inject prompt 1 activations at specific (layer, position)
4. Measure probability shift toward prompt 1's result

**Critical control**: Also tested with r = r' (same result, different operands) to isolate operand-encoding vs. result-encoding components

---

## Key Experimental Results

### Model Accuracy on Arithmetic
| Model | + | − | × | ÷ | Overall |
|-------|---|---|---|---|---------|
| GPT-J | 69.3% | 78.0% | 82.8% | 40.8% | 67.8% |
| Pythia 2.8B | 57.4% | 77.5% | 64.7% | 40.2% | 59.9% |
| LLaMA 7B | 100% | 99.8% | 100% | 88.7% | 97.2% |
| Goat (fine-tuned) | 100% | 100% | 91.4% | 54.0% | 85.6% |

### Information Flow Discovery
Three primary activation sites identified:
1. **Early MLPs at operand tokens** (layers 1-3): encode operand values
2. **Middle attention at last token** (layers 11-18): transfer information
3. **Late MLPs at last token** (layers 19-20): compute/output results

### Operand vs. Result Encoding (Key Finding)
| Component | Result-varying IE | Result-preserving IE | Encodes |
|-----------|------------------|---------------------|---------|
| Early MLPs (operand tokens) | HIGH | HIGH | Operands |
| Mid attention (last token) | HIGH | HIGH | Operands (transfer) |
| Late MLPs (last token, L19-20) | **HIGH** | **LOW** | **Results** |
| Late MLPs (last token, L14-18) | MEDIUM | HIGH | Operands |

**Interpretation**: When results are kept the same (r = r'), the late MLPs (L19-20) show dramatically reduced effect — they specifically encode the **result**, not operands.

### Neuron Overlap Analysis (Layer 19)
| Task Pair | Top-400 Neuron Overlap |
|-----------|----------------------|
| Arithmetic (Arabic) vs Arithmetic (Words) | **50%** |
| Arithmetic vs Number Retrieval | 22-23% |
| Arithmetic vs Factual Knowledge | **9-10%** (= random baseline) |

**Key insight**: Arithmetic circuits are distinct from factual knowledge circuits.

### Three-Operand Queries & Fine-tuning
- Pre-trained Pythia 2.8B: 0.9% accuracy (cannot do 3-operand)
- After fine-tuning: 39.7% accuracy
- **Emergence observed**: The mid-late MLP activation site appears only after fine-tuning

---

## Authors' Limitations (Section: Limitations)

> "The scope of our work is investigating arithmetic reasoning and we experiment with the four fundamental arithmetic operators."

> "Our work focuses on synthetically-generated queries that are derived from natural language descriptions of the four basic arithmetic operators."

> "A limitation of our work concerns the analysis of different attention heads. In our experiments, we consider the output of an attention module as a whole."

---

## Critical Analysis for Thesis

### Does This Challenge the Pattern Matching Thesis?

**Classification**: BALANCED — shows mechanistic structure but doesn't prove reasoning

### What This Paper Actually Shows

1. **Localized processing**: Arithmetic is processed by specific circuits (late MLPs)
2. **Distinct from retrieval**: 9-10% overlap with factual knowledge = different mechanisms
3. **Result computation**: Late MLPs specifically encode results, not just operands

### What This Paper Does NOT Show

1. **Whether this is "reasoning" or sophisticated lookup**
   - Simple arithmetic (1-300) could be memorized/interpolated
   - The "computation" could be pattern matching on learned associations
   - No test of novel arithmetic (e.g., numbers never seen in training)

2. **Generalization to complex reasoning**
   - Only tests 2-operand and simple 3-operand queries
   - No test of multi-step reasoning, proofs, or novel problem types
   - Authors acknowledge: "provides a starting point to explore more complex forms"

3. **Whether the model "understands" arithmetic**
   - Finding a circuit doesn't mean it implements the algorithm humans use
   - Could be a compressed lookup table or interpolation scheme
   - 40% accuracy on division suggests pattern matching, not algorithmic understanding

### The Embers Connection

This paper is **compatible with Embers findings**:
- GPT-J only 67.8% accurate on basic arithmetic (1-300)
- Division is worst (40.8%) — the least common operation in training data
- LLaMA 7B at ~100% could reflect more arithmetic in training data
- **Frequency in training → better circuits** is pattern matching, not reasoning

### Key Critical Points

1. **Small number range**: 1-300 single-token numbers only. This is the range most likely memorized during training.

2. **No algorithmic generalization test**: Would these circuits work for numbers outside training distribution?

3. **The "computation" interpretation is inference**: Finding that layer 19 MLPs encode results doesn't mean they're computing — they could be retrieving.

4. **Fine-tuning creates circuits**: The 3-operand experiment shows circuits emerge from training, suggesting they're learned associations, not innate computational capacity.

---

## Relationship to Other Papers

### Same Methodology Family
- **Geometry of Truth (2310.06824)**: Also uses causal mediation, similar limitations
- **Space and Time (2310.02207)**: Linear probing on LLaMA, same concerns about probing ≠ using

### Related Mechanistic Work
- **Progress Measures for Grokking (Nanda et al.)**: Referenced; shows algorithm learning in small models
- **ROME/MEMIT (Meng et al.)**: Knowledge editing uses similar causal tracing

### Supports Pattern Matching View
- **Embers of Autoregression**: Frequency-performance correlation explains why division is worst
- **Razeghi et al. 2022**: Pretraining term frequencies affect numerical reasoning — cited by authors

---

## REBUTTALS TO THIS PAPER

### The "Computation vs Retrieval" Problem
1. Simple arithmetic in range 1-300 is likely heavily represented in training
2. Finding circuits doesn't distinguish computation from memorized lookup
3. Division being worst (40.8%) suggests retrieval — division is less common in training

### The Probing Fallacy Applies
1. Causal mediation shows information FLOW, not computation
2. Late MLPs could be retrieving results, not computing them
3. The experiment design cannot distinguish these hypotheses

### Missing Critical Tests
1. **Out-of-distribution numbers**: Would circuits work for 10,000 + 25,000?
2. **Novel operations**: Would the same circuits handle modular arithmetic?
3. **Algorithmic consistency**: Does the model use the same "algorithm" for all problems?

### The Fine-tuning Reveals Pattern Matching
- Circuits emerge FROM training
- Pre-trained model cannot do 3-operand (0.9%)
- After seeing examples, circuits appear (39.7%)
- This is learning associations, not acquiring reasoning capacity

---

## Key Quotes

> "Our experimental results indicate that LMs process the input by transmitting the information relevant to the query from mid-sequence early layers to the final token using the attention mechanism. Then, this information is processed by a set of MLP modules, which generate result-related information that is incorporated into the residual stream."

> "The overlaps between the top neurons for the arithmetic operations and the factual predictions (between 9% and 10%) are not larger than for random rankings."

> "In the non-fine-tuned version of the model, the only relevant activation site, besides the early layers at the operand tokens, is the very last layer at the last token. In the fine-tuned model, on the other hand, we notice the emergence of the mid-late MLP activation site."

> "Answering correctly this type of questions [3-operand] represents a challenging task for pre-trained language models, and we observe poor accuracy (below 10%) with GPT-J."

---

## Verdict: Does This Challenge the Thesis?

**Classification**: BALANCED

**Reasoning**:
1. Shows LLMs have localized circuits for arithmetic — interesting mechanistic finding
2. But doesn't distinguish computation from sophisticated retrieval
3. The small number range (1-300) is likely memorized
4. Division being worst (40.8%) supports frequency-based pattern matching
5. Circuits emerging from fine-tuning = learned associations, not reasoning

**What this paper actually shows**: LLMs develop specific circuits for arithmetic that are distinct from factual knowledge retrieval. Information flows from early layers to late MLPs that output results. But whether this is "computation" or "retrieval of learned associations" remains an open question.

---

## Implications for Thesis

This paper is **compatible with** the pattern matching thesis:

| Their Finding | Pattern Matching Interpretation |
|---------------|--------------------------------|
| Late MLPs encode results | Could be retrieving learned associations |
| Distinct from factual knowledge | Different patterns for different domains |
| Division is worst (40.8%) | Division is least common in training data |
| Fine-tuning creates circuits | Learning associations, not reasoning |
| Small number range (1-300) | Likely memorized during pretraining |

**Key insight**: Finding a circuit doesn't prove it implements an algorithm. The circuit could implement a compressed lookup table learned from training data statistics.

---

## Status

- [x] Read complete
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
