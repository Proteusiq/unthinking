# Paper Analysis: PCL-Reasoner-V1.5: Advancing Math Reasoning with Offline Reinforcement Learning

## Metadata
- **arXiv ID**: 2601.14716
- **Title**: PCL-Reasoner-V1.5: Advancing Math Reasoning with Offline Reinforcement Learning
- **Authors**: Yao Lu, Dengdong Fan, Jianzheng Nie, Fan Xu, Jie Chen, Bin Zhou, Yonghong Tian (Peng Cheng Laboratory, Peking University)
- **Date**: January 2026
- **Venue**: Technical Report
- **Code/Models**: https://huggingface.co/PCL-Reasoner/V1.5

---

## Core Claims

1. **Offline RL is competitive with online RL**: Offline RL provides superior training stability and efficiency compared to online RL methods like GRPO
2. **State-of-the-art for Qwen2.5-32B post-training**: 90.9% on AIME 2024, 85.6% on AIME 2025
3. **RL specifically improves long-CoT reasoning**: Performance gains are concentrated in problems requiring long reasoning chains
4. **Training stability advantages**: Offline RL eliminates feedback loops that cause instability in online RL

---

## Methodology

### Training Pipeline
```
Qwen2.5-32B → SFT (on DeepSeek-R1-0528 distilled data) → PCL-Reasoner-V1 → Offline RL → PCL-Reasoner-V1.5
```

### SFT Phase
- **Data**: 666K samples from AM-DeepSeek-R1-0528-Distilled (mathematical subset)
- **Source**: Distilled from DeepSeek-R1-0528
- **Max sequence length**: 32K tokens
- **Batch size**: 128
- **Learning rate**: 6×10⁻⁵ → 1×10⁻⁷ (cosine decay)
- **Epochs**: 4

### Offline RL Phase
- **Data Source**: Nemotron-Post-Training-Dataset-v1 (mathematical subset)
- **Filtering**: 
  - Only questions where average answer length > 32K tokens
  - Excluded questions where all 8 answers were correct
  - Final: 6,068 difficult questions
- **Inference**: 8 candidate answers per question using PCL-Reasoner-V1
- **Verification**: Qwen3-32B assigns binary rewards (R=1 correct, R=-1 incorrect)
- **Final dataset**: 30,215 samples (14,512 positive, 15,703 negative)

### RL Loss Function
```
L(θ) = -Σᵢ Rᵢ πθ(yᵢ|xᵢ)
```

Where policy value uses geometric mean of token probabilities:
```
πθ(y|x) = exp(1/|y| Σₜ log pθ(yₜ|x, y<t))
```

### Training Details
- **Steps**: 800
- **Batch size**: 128
- **Learning rate**: 1×10⁻⁶ → 1×10⁻⁷
- **Format**: FP16 (not BF16) for numerical precision
- **Hardware**: 8 nodes × 8 Huawei Ascend 910C NPUs

---

## Key Evidence

### Main Results (pass@1)
| Model | AIME 2024 | AIME 2025 |
|-------|-----------|-----------|
| DeepSeek-R1 | 79.8% | 70.0% |
| **DeepSeek-R1-0528** | **91.4%** | **87.5%** |
| QwQ-32B | 79.5% | 69.5% |
| DeepSeek-R1-Distill-Qwen-32B | 72.6% | 49.6% |
| OpenReasoning-Nemotron | 89.2% | 84.0% |
| **PCL-Reasoner-V1 (SFT only)** | 85.7% | 84.2% |
| **PCL-Reasoner-V1.5 (SFT+RL)** | **90.9%** | **85.6%** |

### Response Length Analysis
| Model | AIME 2024 (avg tokens) | AIME 2025 (avg tokens) |
|-------|------------------------|------------------------|
| PCL-Reasoner-V1 | 22,535 | 25,993 |
| PCL-Reasoner-V1.5 | **30,560** (+36%) | **39,835** (+53%) |

### Accuracy by Response Length (AIME 2024 & 2025)
| Response Length | V1 (SFT) | V1.5 (SFT+RL) |
|-----------------|----------|---------------|
| < 16K tokens | Similar | Similar |
| 16K-32K tokens | Moderate | Better |
| **≥ 32K tokens** | **Poor** | **Dramatically better** |

> "The SFT model (PCL-Reasoner-V1) performs poorly on problems requiring long CoTs (≥32K). In contrast, the RL-trained model shows a dramatic improvement in accuracy specifically on questions requiring long-CoT reasoning"

---

## Online vs Offline RL Analysis

### Advantages of Offline RL (Authors' Claims)
| Aspect | Online RL | Offline RL |
|--------|-----------|------------|
| **Training Stability** | Sensitive to reward collapse/divergence | Decoupled, no feedback loops |
| **Computational Efficiency** | Bottleneck at inference | Higher throughput (vLLM, continuous batching) |
| **Engineering Simplicity** | Complex orchestration (verl, OpenRLHF) | Two sequential phases |
| **Experimentation Cost** | Re-run entire cycle per config | "Infer once, train many" |

### Disadvantages of Offline RL (Authors Acknowledge)
1. **Bounded Performance**: "Limited by the quality of the best examples within its static dataset"
2. **Distribution Mismatch**: Divergence between sampling policy and training policy

### Authors' Counter-Arguments
> "Offline RL is best suited for refining models that already possess a strong performance baseline (e.g. after SFT)"

> "RL is typically applied to SFT models, which already possess strong performance. Therefore, only a small fraction of the parameter space needs to be tuned in the RL phase"

---

## Relationship to Other Papers

### Supports
| Paper | How |
|-------|-----|
| **Interplay (2512.07783)** | Both show RL surfaces capability from base model, doesn't create |
| **DeepSeek-R1 (2501.12948)** | Builds on R1 through distillation; validates RL approach |
| **How LLMs Learn to Reason (2509.23629)** | Both show RL improves through policy reorganization |

### Challenges
| Paper | How |
|-------|-----|
| **No Free Lunch (2506.17219)** | Shows offline RL CAN work well (contradicts "RLIF degrades reasoning") |

### Extends
| Paper | How |
|-------|-----|
| **GRPO (DeepSeekMath)** | Proposes offline alternative to online GRPO |

### Provides Evidence For
| Claim | Evidence |
|-------|----------|
| **Surfacing hypothesis** | RL improves long-CoT specifically, suggesting patterns exist but need activation |
| **Distillation works** | High performance from distilled data |

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found as of analysis date

### Potential Counter-Arguments
1. **Depends entirely on DeepSeek-R1-0528 distillation**: Not independent capability creation
2. **Only tested on AIME**: Narrow benchmark (30 problems per year)
3. **No OOD testing**: Same distribution as training (math olympiad)
4. **Longer responses ≠ better reasoning**: Could be verbosity, not insight

### Limitations (Authors Acknowledge)
1. "Offline RL is generally limited by the quality of the best examples within its static dataset"
2. "Unlike the 'self-correction' or 'emergence' seen in R1-Zero, it cannot iteratively discover increasingly complex reasoning paths"

---

## Key Quotes

### On Offline RL
> "We challenge this conventional wisdom and argue that offline RL is a strong alternative for fine-tuning reasoning LLMs"

### On Performance Source
> "RL training leads to a substantial increase in the average response length on both benchmarks. This behavioral shift suggests that RL encourages the model to engage in more extensive and deliberate reasoning"

### On Bounded Performance
> "Offline RL is generally limited by the quality of the best examples within its static dataset. Unlike the 'self-correction' or 'emergence' seen in R1-Zero, it cannot iteratively discover increasingly complex reasoning paths"

---

## Critical Assessment

### Strengths
1. **Strong results**: SOTA for Qwen2.5-32B post-training
2. **Practical method**: Simpler than online RL
3. **Open release**: Model, data, and code available
4. **Honest about limitations**: Acknowledges bounded performance

### Weaknesses
1. **Entirely dependent on distillation**: Not original capability
2. **Narrow evaluation**: Only AIME benchmarks
3. **No generalization testing**: No OOD or compositional tests
4. **Longer ≠ better**: Correlation not causation

### Verdict: FOR (Partial) — Challenges thesis but with caveats

**Why FOR (Partial)**:
- High accuracy (90.9%) suggests genuine capability
- RL does improve specific reasoning (long-CoT)

**Why with caveats**:
- Completely dependent on DeepSeek-R1 distillation
- No evidence of OOD generalization
- Longer responses may be memorized patterns, not reasoning
- Authors explicitly state: "cannot iteratively discover increasingly complex reasoning paths"

**Key insight for thesis**:
> The paper actually SUPPORTS the surfacing hypothesis: "RL encourages the model to engage in more extensive and deliberate reasoning" — but this is reorganizing existing patterns from DeepSeek-R1 distillation, not creating new reasoning capability.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
