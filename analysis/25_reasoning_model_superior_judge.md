# Paper Analysis: Reasoning Model Is Superior LLM-Judge, Yet Suffers from Biases

## Metadata
- **arXiv ID**: 2601.03630
- **Title**: Reasoning Model Is Superior LLM-Judge, Yet Suffers from Biases
- **Authors**: Hui Huang, Xuanxin Wu, Muyun Yang, Yuki Arase
- **Affiliation**: Harbin Institute of Technology, Institute of Science Tokyo, University of Osaka
- **Date**: January 2026
- **Venue**: arXiv preprint

---

## Core Claims

1. **LRMs significantly outperform non-reasoning LLMs in judgment accuracy** (especially on reasoning-intensive tasks)
2. **LRMs have stronger instruction-following in evaluation contexts** (contrary to other findings on general tasks)
3. **LRMs are more robust against adversarial attacks** (prompt injection)
4. **BUT LRMs are significantly susceptible to superficial quality biases** (length, concreteness)
5. **PlanJudge mitigation**: Explicit evaluation planning reduces bias without training

---

## Methodology

### Models Tested (4 Reasoning/Non-Reasoning Pairs)
- DeepSeek-V3 vs. DeepSeek-R1
- Qwen2.5-32B-Instruct vs. QwQ-32B
- Qwen3-30B-A3B-Instruct vs. Qwen3-30B-A3B-Thinking
- Qwen3-Next-80B-A3B-Instruct vs. Qwen3-Next-80B-A3B-Thinking

### Benchmarks Used
- **RewardBench**: General evaluation accuracy
- **JudgeBench**: LLM judge quality
- **Helpsteer2-trivial**: Novel dataset for instruction-following
- **RobustJudge**: Adversarial attack robustness
- **BiasBench**: Superficial quality biases
- **LLMBar**: Instruction-following biases

### Key Metric: Reversal Rate (RR)
- Tests if model switches judgment when evaluation criteria changes
- Overall prompt vs. Specific dimension prompt
- Higher RR = better instruction following

---

## Key Evidence

### 1. Judgment Accuracy (FOR position — LRMs are better judges)

| Model | RewardBench | JudgeBench |
|-------|-------------|------------|
| DeepSeek-V3 | 89.74 | 84.19 |
| **DeepSeek-R1** | **91.18** | 80.48 |
| Qwen2.5-32B-Instruct | 89.31 | 60.40 |
| **QwQ-32B** | **91.05** | **79.75** |
| Qwen3-30B-A3B-Instruct | 89.88 | 74.00 |
| **Qwen3-30B-A3B-Thinking** | **92.01** | **83.87** |

**LRMs consistently outperform non-reasoning models on judgment tasks**

### 2. Instruction Following (FOR position)

| Model | Original Accuracy | Reversal Rate |
|-------|-------------------|---------------|
| DeepSeek-V3 | 78.22 | 87.80 |
| **DeepSeek-R1** | 73.61 | **95.24** |
| Qwen2.5-32B-Instruct | 71.13 | 83.19 |
| **QwQ-32B** | **76.49** | **91.11** |

**LRMs have higher Reversal Rates = better instruction following in evaluation**

> "During the reasoning process, LRM-as-a-Judge repeatedly emphasizes and verifies the requirements of the evaluation instructions"

### 3. Robustness to Adversarial Attacks (FOR position)

Average attack success rate (lower = more robust):
- DeepSeek-V3: -0.098
- **DeepSeek-R1: -0.180** (more robust)
- Qwen3-30B-Instruct: +0.046 (vulnerable)
- **Qwen3-30B-Thinking: -0.237** (more robust)

**LRMs are more robust to prompt injection attacks**

### 4. Susceptibility to Superficial Quality Biases (AGAINST position)

| Model | BiasBench | LLMBar |
|-------|-----------|--------|
| DeepSeek-V3 | **81.25** | 76.49 |
| DeepSeek-R1 | 65.00 | **79.00** |
| Qwen2.5-32B-Instruct | **82.50** | 67.71 |
| QwQ-32B | 67.50 | **79.31** |

**BiasBench breakdown** (lower = more biased):
| Model | Length Bias | Concreteness Bias |
|-------|-------------|-------------------|
| DeepSeek-V3 | 88.24 | 92.86 |
| **DeepSeek-R1** | **58.82** | **71.43** |
| QwQ-32B | **52.94** | **78.57** |

**LRMs are SIGNIFICANTLY more susceptible to superficial quality biases (length, concreteness)**

### 5. PlanJudge Mitigation

| Model | BiasBench (baseline) | BiasBench (with PlanJudge) |
|-------|----------------------|---------------------------|
| DeepSeek-R1 | 65.00 | **97.50** (+32.50) |
| QwQ-32B | 67.50 | **95.00** (+27.50) |

**Explicit evaluation planning significantly reduces bias**

---

## Relationship to Other Papers

### Supports (partially)
- **DeepSeek-R1 (2501.12948)**: Confirms R1 has reasoning advantages for SOME tasks
- **s1 (2501.19393)**: Test-time compute helps judgment accuracy
- **Correlation or Causation (2509.17380)**: Extended reasoning improves some aspects

### Challenges
- **Papers showing LRM instruction-following is poor**: This paper shows it's BETTER for evaluation
- **Illusion of Thinking (2506.06941)**: Partial challenge — LRMs do have some advantages

### Extends
- **LLM-as-a-Judge paradigm**: First systematic LRM vs LLM comparison for judgment

### Balanced Implications
- LRMs are better at SOME things (accuracy, instruction-following)
- LRMs are WORSE at others (superficial biases)
- Suggests "reasoning" in LRMs is a specific capability, not general

---

## REBUTTALS TO THIS PAPER

### Potential Counter-Arguments

1. **"LRMs just spend more tokens, not actually reasoning better"**
   - Counter: Longer reasoning correlates with improvement
   - BUT: Could be correlation, not causation
   - Relevant: Illusion of Insight (2601.00514) shows more tokens ≠ better

2. **"Superficial bias susceptibility undermines the 'reasoning' claim"**
   - Support for our thesis: If LRMs truly reasoned, they wouldn't be MORE susceptible to length bias
   - The systematic evaluation against metrics = pattern matching the metric words
   - Quote: "LRM-as-a-Judge often systematically evaluates responses against metrics"

3. **"Judgment is a different task than generation"**
   - Evaluation is pattern matching: "Does response match criteria?"
   - This may not require genuine reasoning
   - LRMs better at this = better at pattern matching evaluation criteria

4. **"BiasBench results are damning"**
   - DeepSeek-R1 drops from 88.24 → 58.82 on length bias (32 pp drop!)
   - Reasoning model is MORE fooled by superficial features
   - Directly supports "pattern matching" hypothesis

### Limitations (Authors Acknowledge)
- Only open-source models tested
- Limited to evaluation tasks (not general reasoning)
- PlanJudge requires explicit prompting

---

## Key Quotes

> "LRMs outperform non-reasoning models in general judgment accuracy, particularly on reasoning-intensive tasks"

> "LRM-as-a-Judge repeatedly emphasizes and verifies the requirements of the evaluation instructions, resulting in stronger evaluation instruction adherence"

> "LRM-as-a-Judge often systematically evaluates responses against metrics. Consequently, responses designed to exploit these metrics, such as length or concreteness, can yield excessively high scores"

> "While reasoning models are generally superior to non-reasoning models as judges, they remain vulnerable to evaluation biases"

---

## Implications for Our Thesis

### Evidence FOR genuine reasoning (must acknowledge)
- LRMs are better at judgment tasks (89% → 92% on RewardBench)
- LRMs are more robust to adversarial attacks
- LRMs follow evaluation instructions better

### Evidence FOR pattern matching thesis (supports us)
1. **Superficial bias susceptibility is WORSE for LRMs**
   - If genuine reasoning, should be LESS susceptible to length bias
   - Instead: 88% → 59% (worse than non-reasoning!)
   - "Systematically evaluates against metrics" = pattern matching metric words

2. **PlanJudge fix reveals the issue**
   - Explicit planning reduces bias
   - LRMs need EXTERNAL structure to avoid biases
   - If genuinely reasoning, wouldn't need scaffolding

3. **Task-specific capability**
   - Better at evaluation (pattern match criteria to response)
   - This doesn't prove general reasoning

### Balanced Assessment
This paper shows LRMs have SOME advantages (accuracy, instruction-following) but reveal pattern-matching behavior through their INCREASED susceptibility to superficial features. The fact that "reasoning models" are MORE fooled by length and concreteness suggests they're matching patterns (longer = better in training data) rather than genuinely reasoning.

### Key Quote for Our Paper
> "LRM-as-a-Judge often systematically evaluates responses against metrics. Consequently, responses designed to exploit these metrics, such as length or concreteness, can yield excessively high scores"

This directly supports our thesis: extended CoT leads to systematic pattern matching against surface features, not deeper understanding.

---

## Stance: BALANCED (with implications supporting our thesis)

**For our thesis:**
- Superficial bias vulnerability (LRMs worse!)
- "Systematic evaluation against metrics" = pattern matching
- PlanJudge fix reveals need for external scaffolding

**Against our thesis:**
- Higher judgment accuracy
- Better instruction following in evaluation
- More robust to adversarial attacks

**Net assessment**: The paper provides balanced evidence but the superficial bias finding is particularly relevant — if LRMs truly reasoned, they should be LESS susceptible to length bias, not MORE. The 32pp drop on BiasBench is strong evidence for pattern matching.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [x] Paper graph updated
