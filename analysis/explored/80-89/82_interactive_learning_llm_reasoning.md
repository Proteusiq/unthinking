# Paper Analysis: Interactive Learning for LLM Reasoning (ILR)

## Metadata
- **arXiv ID**: 2509.26306
- **Title**: Interactive Learning for LLM Reasoning
- **Authors**: Hehai Lin, Shilei Cao, Sudong Wang, Haotian Wu, Minzhi Li, Linyi Yang, Juepeng Zheng, Chengwei Qin
- **Affiliations**: HKUST (Guangzhou), Sun Yat-sen University, NUS, SUSTech
- **Date**: September 2025
- **Venue**: Under review
- **Code**: https://github.com/linhh29/Interactive-Learning-for-LLM-Reasoning

---

## Core Claims

1. **Multi-agent learning improves individual reasoning**: Unlike prior work that improves MAS performance, ILR enhances each LLM's independent problem-solving ability
2. **Dynamic interaction outperforms static strategies**: Adaptively choosing cooperation vs competition based on question difficulty beats pure cooperation or pure competition
3. **Idea3 enhances robustness of stronger LLMs**: The three-stage interaction (Idea Sharing, Idea Analysis, Idea Fusion) makes stronger models more robust to noise from weaker peers
4. **Up to 5% improvement over single-agent learning**: Consistent gains across multiple models and benchmarks

---

## Methodology

### Framework: ILR (Interactive Learning for LLM Reasoning)

Two key components:
1. **Dynamic Interaction**: Adaptively selects cooperation or competition based on question difficulty
2. **Perception Calibration**: Integrates peer's reward distribution into each LLM's reward function

### Models Tested
| Model | Parameters | Group Assignments |
|-------|------------|-------------------|
| Llama-3.1-8B-Instruct | 8B | Group1, Group2 |
| Qwen2.5-7B-Instruct | 7B | Group1, Group3 |
| Qwen2.5-14B-Instruct | 14B | Group2, Group3 |

### Groups
- **Group1**: Different series, same scale (Llama-8B + Qwen-7B)
- **Group2**: Different series, different scale (Llama-8B + Qwen-14B)
- **Group3**: Same series, different scale (Qwen-7B + Qwen-14B)

### Question Difficulty Estimation
Uses **Item Response Theory (IRT)**:
```
P(q,i) = 1 / (1 + e^(-1.7 × (γᵢ - Dq)))
```
Where:
- γᵢ = model's reasoning ability (measured on validation set)
- Dq = question difficulty (estimated via self-ranking)
- If P < 0.5 → Cooperation
- If P ≥ 0.5 → Competition

### Idea3 Interaction Framework
Three stages mimicking human discussion:
1. **Idea Sharing**: Each LLM proposes its solution
2. **Idea Analysis**: Each LLM analyzes peer's solution (critical evaluation)
3. **Idea Fusion**: Synthesize insights into refined answer

### Perception Calibration
Integrates peer's reward distribution into own reward:
```
R̄ᵢ,ₖ = Rᵢ,ₖ + Σₗ clip((Rᵢ,ₖ - Rₗ,avg) / (Rₗ,max - Rₗ,min), -1/(m-1), 1/(m-1))
```

Then applies standard **GRPO** for optimization.

### Training Data
- **Training**: MATH dataset (11,000 samples)
- **Validation**: 1,000 samples (for γᵢ estimation)
- **Test**: MATH-500

### Evaluation Benchmarks
- GSM8K
- MATH-500
- Minerva Math
- Olympiad Bench
- AIME 2024 & 2025
- MBPP (code, out-of-domain)

---

## Key Evidence

### Main Results (Accuracy %)

#### Llama-3.1-8B-Instruct
| Method | GSM8K | MATH-500 | Minerva | Olympiad | AIME | Avg |
|--------|-------|----------|---------|----------|------|-----|
| Base | 82.87 | 49.80 | 22.79 | 13.63 | 1.67 | 34.15 |
| GRPO | 85.60 | 54.00 | 26.47 | 20.89 | 5.00 | 38.39 |
| **ILR-Group1** | **89.39** | **55.80** | **30.15** | **22.22** | **10.00** | **41.51** |

**Improvement**: +3.12% over GRPO (strongest baseline)

#### Qwen2.5-7B-Instruct
| Method | Avg |
|--------|-----|
| Base | 51.76 |
| PPO (best baseline) | 53.75 |
| **ILR-Group3** | **54.59** |

#### Qwen2.5-14B-Instruct
| Method | Avg |
|--------|-----|
| Base | 55.57 |
| PPO (best baseline) | 58.27 |
| **ILR-Group3** | **59.30** |

### AIME Performance (Complex Reasoning)
| Model | GRPO | ILR | Improvement |
|-------|------|-----|-------------|
| Llama-3.1-8B | 5.00% | **10.00%** | **2× better** |
| Qwen2.5-7B | 16.67% | **18.33%** | +1.66% |
| Qwen2.5-14B | 20.00% | **23.33%** | +3.33% |

### Ablation Study
| Component | Llama (Group1) | Qwen-7B (Group1) | Qwen-14B (Group3) |
|-----------|----------------|------------------|-------------------|
| Full ILR | 41.51 | 54.44 | 59.30 |
| DI-only | 39.12 | 53.95 | 58.57 |
| PC-only | 40.14 | 54.04 | 58.07 |

Both components contribute to performance.

### Multi-Agent Inference Analysis
| Model | Single | Debate | Idea3 |
|-------|--------|--------|-------|
| Llama-8B (weaker) | 49.80 | **64.00** | 63.40 |
| Qwen-14B (stronger) | 81.20 | 79.20 | **82.00** |

**Key finding**: 
- Debate benefits **weaker** LLMs (direct guidance from stronger)
- Idea3 benefits **stronger** LLMs (critical evaluation filters noise)

### Dynamic Interaction Analysis
| Cooperation Ratio | Llama-8B | Qwen-7B |
|-------------------|----------|---------|
| 0.0 (pure competition) | ~39% | ~53% |
| 0.5 | ~40% | ~54% |
| 1.0 (pure cooperation) | ~39% | ~53% |
| **IRT (dynamic)** | **~41%** | **~54%** |

> "Relying solely on competition or cooperation is suboptimal for ILR"

---

## Relationship to Other Papers

### Supports
| Paper | How |
|-------|-----|
| **Societies of Thought (2601.10825)** | Both show multi-agent interaction improves reasoning |
| **Interplay (2512.07783)** | Both show training can surface capability |
| **How LLMs Learn to Reason (2509.23629)** | Both use GRPO-style optimization |

### Challenges
| Paper | How |
|-------|-----|
| **Illusions of Reflection (2510.18254)** | ILR shows reflection CAN help (with proper framing) |

### Extends
| Paper | How |
|-------|-----|
| **GRPO (DeepSeekMath)** | Extends with perception calibration for multi-agent |
| **Prior multi-agent training** | Focuses on individual capability, not MAS performance |

### Does Not Address
| Paper | Gap |
|-------|-----|
| **OMEGA (2506.18880)** | No OOD/compositional generalization testing |
| **Planning Gap (2601.14456)** | No planning or truly novel task testing |
| **Faith and Fate (2305.18654)** | No analysis of whether learned patterns transfer |

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct rebuttals found as of analysis date

### Potential Counter-Arguments
1. **Still within distribution**: All training and testing on MATH-style problems
2. **Modest improvements**: 3-5% gains may be within noise
3. **No mechanism analysis**: Why does interaction help? Could be data augmentation effect
4. **Groups with similar models work better**: Suggests capability transfer, not reasoning creation

### Limitations (Authors Acknowledge)
1. "Excessive initial performance disparities may lead to imbalanced interactions"
2. "The observed performance differences [between groups] are modest"
3. Limited to mathematical and code benchmarks

---

## Key Quotes

### On Multi-Agent Learning Value
> "To the best of our knowledge, we are the first to investigate whether multi-agent learning can more effectively enhance an LLM's independent reasoning capability compared to single-agent learning"

### On Idea3 Robustness
> "Idea3 enhances the robustness of stronger LLMs by making them less susceptible to low-quality responses generated from weaker LLMs during multi-agent communication"

### On Dynamic Interaction
> "Relying solely on competition or cooperation is suboptimal for ILR, underscoring the necessity of adaptive interaction in multi-agent learning"

### On Balanced Grouping
> "Models achieve stronger results when paired with peers of more similar initial reasoning ability"

---

## Critical Assessment

### Strengths
1. **Novel framing**: Focus on individual capability, not MAS performance
2. **Principled approach**: IRT for difficulty estimation
3. **Comprehensive ablation**: Each component analyzed
4. **Open code**: Reproducible

### Weaknesses
1. **No OOD testing**: All in-distribution (MATH family)
2. **Modest gains**: 3-5% could be noise or data augmentation
3. **No mechanistic analysis**: WHY does it work?
4. **Limited models**: Only 7B-14B scale

### Verdict: BALANCED

**Why BALANCED**:
- Shows multi-agent interaction can improve individual models
- But all gains are within distribution
- No evidence this creates NEW reasoning capability
- Could be sophisticated data augmentation or pattern sharing

**Key insight for thesis**:
> The finding that "models achieve stronger results when paired with peers of more similar initial reasoning ability" suggests **pattern transfer** rather than **reasoning creation**. Models learn from each other's solutions (patterns), not from genuine reasoning collaboration.

**Supports surfacing hypothesis**: Multi-agent training surfaces capability through exposure to peer patterns, not through reasoning development.

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] Rebuttals checked
- [ ] Paper graph updated
