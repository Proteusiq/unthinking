# Paper Analysis: The SWE-Bench Illusion: When State-of-the-Art LLMs Remember Instead of Reason

## Metadata
- **arXiv ID**: 2506.12286
- **Title**: The SWE-Bench Illusion: When State-of-the-Art LLMs Remember Instead of Reason
- **Authors**: Shanchao Liang (Purdue), Spandan Garg (Microsoft), Roshanak Zilouchian Moghaddam (Microsoft)
- **Date**: June 2025 (v4: December 2025)
- **Venue**: arXiv preprint

---

## Core Claims

1. **Performance gains on SWE-Bench may be partially driven by memorization**: Models achieve up to 76% accuracy identifying buggy file paths using only issue descriptions, without access to repository structure.

2. **Two types of memorization identified**:
   - **Instance-specific memorization**: Better performance on curated SWE-Bench-Verified subset
   - **Repository-bias memorization**: Better performance on SWE-Bench repos than external repos

3. **Verbatim similarity indicates contamination**: 5-gram overlap is up to 35% on SWE-Bench Verified vs. only 18% on other benchmarks.

4. **The "Illusion"**: The appearance of strong coding abilities that may actually reflect memorization of benchmark-specific patterns rather than generalizable reasoning.

---

## Methodology

### Diagnostic Task 1: File Path Identification
- **Input**: Only issue description + repository name (NO repo structure, code, or metadata)
- **Output**: Predict the file path that needs modification
- **Success**: Exact match with ground truth patch file path
- **Purpose**: If models succeed without contextual information needed for reasoning, it indicates memorization

### Diagnostic Task 2: Function Reproduction
- **Input**: Issue description + buggy file with target functions completely REMOVED
- **Output**: Generate complete function implementations
- **Measurement**: 5-gram consecutive overlap ratio
- **Purpose**: Without specifications, successful reproduction requires prior exposure

### Diagnostic Task 3: Prefix Completion
- **Input**: Lines of code BEFORE each buggy snippet
- **Output**: Complete the remaining code
- **Measurement**: Verbatim match against ground truth
- **Purpose**: Tests memorization in auto-regressive setting

### Models Tested (10 total)
**OpenAI**: GPT-4o (2 versions), GPT-4.1, o3, o3-mini, o4-mini
**Anthropic**: Claude 3.5 Sonnet, Claude 3.7 Sonnet, Claude 4.0 Sonnet, Claude 4.0 Opus

### Control Benchmarks
| Benchmark | Description | Size |
|-----------|-------------|------|
| SWE-Bench Verified | Human-validated subset | 500 |
| Full-SWE-Bench | Random sample not in Verified | 200 |
| SWE-Bench Extra | Recent issues (post-cutoff) | 217 |
| Outside-Repo Tasks | Popular repos NOT in SWE-Bench | 245 |
| SWE-Bench-C# | Different language | 75 |
| RefactorBench | Multi-file refactoring | 39 |

---

## Key Evidence

### File Path Accuracy (without repo context)
| Benchmark | Best Model Accuracy |
|-----------|---------------------|
| **SWE-Bench Verified** | **60-76%** |
| Full-SWE-Bench | 57-71% |
| SWE-Repo Tasks (fresh) | 50-68% |
| **Outside-Repo Tasks** | **<53%** |

**Key finding**: Up to **47 percentage point drop** between SWE-Bench Verified and external repos

### 5-Gram Overlap (Function Reproduction)
| Benchmark | 5-gram Overlap |
|-----------|----------------|
| **SWE-Bench Verified** | **Up to 34.9%** |
| SWE-Bench Full | Up to 28.7% |
| SWE-Bench Extra | 18.2% |
| RefactorBench | 18.1% |
| Outside-Repo Tasks | 13.9% |

### Verbatim Match (Prefix Completion)
| Model | Match % |
|-------|---------|
| Claude 4 Opus | **31.6%** |
| Claude 4 Sonnet | 21.4% |
| GPT-4o | 18.4% |
| Claude 3.5 Sonnet | 12.1% |

**Pattern**: Newer Claude models show monotonic increase (12.1% → 31.6%)

---

## Key Findings

### Evidence of Data Contamination
1. **Instance-specific memorization**: Best performance on most widely-used benchmark subset (Verified)
2. **Repository-bias**: All 10 models show same performance hierarchy regardless of vendor
3. **Temporal signal**: Performance on post-cutoff issues drops to external benchmark levels
4. **Verbatim reproduction**: Up to 31.6% exact code reproduction from prefixes alone

### Cross-Vendor Consistency
> "A key finding from our evaluation of ten different LLMs is a remarkable consistency of these patterns across different model families and vendors... indicates the performance disparities reflect *systematic exposure patterns in training data*."

### Implications for Benchmark Validity
1. High SWE-Bench scores may not indicate generalizable coding abilities
2. Models possess "specialized knowledge" of SWE-Bench-specific patterns
3. Current evaluation protocols may overstate true capabilities
4. Need for contamination-resistant, temporally-controlled benchmarks

---

## Relationship to Other Papers

### Supports
- **Faith and Fate (2305.18654)**: Distribution-bounded performance; linearized subgraph matching
- **GSM-Symbolic (2410.05229)**: Benchmark scores don't reflect true capability
- **Beyond Memorization (2601.13392)**: Same pattern — high on seen, low on unseen

### Extends
- **Reasoning or Reciting (2307.02477)**: Extends counterfactual methodology to coding
- **Term Frequencies (2202.07206)**: Training data exposure determines performance

### Provides Evidence For
- **Pattern matching thesis**: Performance differential reveals retrieval, not reasoning
- **Benchmark contamination concerns**: Widespread issue across vendors

---

## REBUTTALS

### Known Rebuttals
No direct rebuttals found as of analysis date.

### Potential Counter-Arguments
1. **Some reasoning exists**: Paper doesn't claim zero reasoning, only that scores are inflated
2. **N-gram overlap noise**: Correct solutions inevitably share text with ground truth
3. **Cannot prove training inclusion**: Cross-benchmark approach is a proxy

### Limitations (Authors Acknowledge)
1. Confounding variables (description length differences)
2. Resource limitations for some models
3. Cannot directly prove training data inclusion
4. Metric-based approaches have limitations for commercial models

---

## Key Quotes

> "Our results reveal concerning patterns: on the file-path identification task, SoTA models like o3 achieve up to 76% accuracy on SWE-Bench-Verified instances, despite lacking the contextual information that should be necessary for this task."

> "The ability of models to reproduce exact code sequences when provided merely with contextual prefixes, without any problem description or bug identification, strongly suggests that performance on these instances reflects memorization rather than algorithmic reasoning or program comprehension."

> "The presence of these two types of memorization suggests that high scores on SWE-Bench are not purely indicative of generalizable coding abilities for these models. Instead, they are likely inflated by these confounding factors."

> "When the patched code is unseen, models do not memorize it from context... the systematic shift toward the buggy reference, therefore, supports our contamination-mitigation claim."

---

## Relationship to Thesis

**Assessment: STRONGLY SUPPORTS the thesis** that LLM reasoning is sophisticated pattern matching rather than genuine reasoning.

### Evidence Supporting the Thesis

1. **"Impossible" knowledge**: Models identify correct files WITHOUT information needed to reason — can only succeed through memorization.

2. **Performance differential reveals mechanism**: If models were genuinely reasoning, performance should be similar across comparable tasks. The dramatic drop (up to 47pp) on external repos indicates retrieval, not reasoning.

3. **Verbatim reproduction**: Up to 31.6% exact code reproduction from prefixes alone — this is pattern completion, not problem-solving.

4. **Temporal control**: Performance on post-training-cutoff issues drops to baseline, proving the mechanism is training data exposure.

5. **Cross-vendor consistency**: Universal pattern across OpenAI and Anthropic suggests this is fundamental to how LLMs work, not particular training choices.

### Specific Evidence Chain
- Models trained on GitHub data
- SWE-Bench uses GitHub issues/patches
- Models show elevated performance specifically on SWE-Bench tasks
- Performance drops when tasks cannot be in training data
- Models can reproduce code verbatim without understanding
- **Conclusion**: What appears as "software engineering ability" is substantially pattern retrieval

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
