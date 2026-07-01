# Paper 387: MiniLLM — On-Policy Distillation of Large Language Models

## Metadata
- **arXiv**: 2306.08543 (v6, Jun 2023; ICLR 2024)
- **Title**: MiniLLM: On-Policy Distillation of Large Language Models
- **Authors**: Yuxian Gu, Li Dong, Furu Wei, Minlie Huang
- **Affiliation**: Tsinghua University + Microsoft Research
- **Code**: [github.com/microsoft/LMOps/tree/main/minillm](https://github.com/microsoft/LMOps/tree/main/minillm)
- **Venue**: ICLR 2024
- **Stance**: BALANCED — foundational on-policy distillation paper with strong results; explicitly frames distillation as distribution matching (reverse KL), not reasoning transfer. The method works *because* it's better distribution matching, but the authors don't interrogate *what* is being matched.
- **Cluster**: `distillation`

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE DISTILLATION OBJECTIVE IS EXPLICITLY DISTRIBUTIONAL             │
│                                                                      │
│  Forward KL:  KL[p || q_θ]  →  student covers ALL teacher modes     │
│  Reverse KL:  KL[q_θ || p]  →  student SELECTS teacher's major     │
│                                  modes within its capacity           │
│                                                                      │
│  When student is too small to hold teacher's full distribution:      │
│    Forward KL  → overestimates void regions → degenerate text       │
│    Reverse KL  → mode-seeking → focuses on high-probability mass    │
│                                                                      │
│  This is a Gaussian-fitting analogy made literal:                    │
│    p = mixture of Gaussians (teacher distribution)                   │
│    q = single Gaussian (limited student)                             │
│    Forward KL → q spreads to cover all → poor fit everywhere        │
│    Reverse KL → q locks onto one mode → good fit locally            │
│                                                                      │
│  The paper PROVES this is equivalent to Inverse RL (Appendix A.1):  │
│    Standard KD ≈ behavior cloning                                    │
│    MiniLLM ≈ inverse reinforcement learning                          │
│    Reward = log p(y_t | y_{<t}, x) - log q_θ(y_t | y_{<t}, x)     │
│                                                                      │
│  ⇒  The student is not learning to reason. It is solving an         │
│     optimization problem: find θ that minimizes the KL divergence   │
│     between its output distribution and the teacher's.               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Forward KLD is sub-optimal for generative LLM distillation** because the student's limited capacity forces it to overestimate void regions of the teacher distribution, producing degenerate text.
2. **Reverse KLD causes mode-seeking behavior** that is better suited for limited-capacity students: the student focuses on the teacher's major modes rather than trying to cover all of them.
3. **On-policy optimization** (student generates, teacher scores) is essential for reverse KLD because the expectation is over the student's own distribution.
4. **Three stabilization strategies** are needed: single-step decomposition (variance reduction), teacher-mixed sampling (prevents reward hacking), and length normalization (prevents empty-response degeneration).
5. **MiniLLM scales from 120M to 13B parameters** and consistently outperforms SFT, word-level KD, and sequence-level KD across 3 model families and 5 evaluation datasets.

---

## Methodology

### The Objective (Eq. 1)
```
θ = arg min_θ KL[q_θ || p]
  = arg min_θ [-E_{x~p_x, y~q_θ} log p(y|x) / q_θ(y|x)]
```

This is **explicitly** minimizing the distributional divergence between student and teacher. No task loss, no accuracy metric — pure distribution matching.

### Gradient via Policy Gradient (Eq. 2)
The gradient decomposes into a per-token reward signal:
```
r_t = log p(y_t | y_{<t}, x) - log q_θ(y_t | y_{<t}, x)
```
Positive r_t means the teacher assigns higher probability to this token than the student does → the student should increase probability of that token. This is token-by-token distribution alignment.

### Three Stabilization Strategies

| Strategy | Problem Solved | Mechanism |
|----------|---------------|-----------|
| Single-step decomposition | High variance in policy gradient | Decompose per-token KL (analytically tractable) from long-range reward (Monte Carlo) |
| Teacher-mixed sampling | Reward hacking (degenerate outputs score high) | Sample from α·p + (1-α)·q_θ with α=0.2 |
| Length normalization | Bias toward short/empty responses | Normalize R_{t+1} by remaining sequence length |

### Inverse RL Equivalence (Appendix A.1)
The paper proves an approximate equivalence:
- Standard KD (forward KL / SeqKD) ≈ **behavior cloning** (imitate demonstrations)
- MiniLLM (reverse KL) ≈ **inverse reinforcement learning** (learn the reward function, then optimize policy)

The reward is derived from the teacher's log-probabilities. The approximation comes from dropping a final-step log-partition term. This connection is significant: IRL is known to outperform behavior cloning in RL, and MiniLLM outperforms SeqKD in distillation. The mechanism is the same — on-policy optimization under an inferred reward beats off-policy imitation.

### Training Pipeline
1. Pre-train student on large corpus (OpenWebText / RoBERTa corpus)
2. SFT on instruction data (dolly-15K) → pick best checkpoint as init
3. On-policy MiniLLM training: student generates, teacher scores, policy gradient update
4. Auxiliary pre-training loss preserves general capabilities
- LR: 5e-6, batch size 64, 256 sentences per collection, 4 inner epochs, 5000 steps
- Hardware: V100 32GB GPUs; LLaMA-7B from LLaMA-13B takes <10h on 16 GPUs

---

## Key Evidence

### Main Results (Table 1) — Selected Highlights

| Student → Teacher | Method | DollyEval GPT4 | SelfInst GPT4 | S-NI R-L | UnNI R-L |
|-------------------|--------|------|------|------|------|
| GPT-2-120M → 1.5B | SFT | 38.6 | 26.3 | 16.3 | 18.5 |
| GPT-2-120M → 1.5B | SeqKD | 41.2 | 26.2 | 16.4 | 18.8 |
| GPT-2-120M → 1.5B | **MiniLLM** | **44.7** | **29.2** | **25.3** | **26.6** |
| OPT-1.3B → 13B | SFT | 52.6 | 37.7 | 23.1 | 28.4 |
| OPT-1.3B → 13B | SeqKD | 51.0 | 36.6 | 21.4 | 28.2 |
| OPT-1.3B → 13B | **MiniLLM** | **60.7** | **47.0** | **28.6** | **33.4** |
| OPT-6.7B → 13B | SFT | 67.9 | 56.4 | 30.3 | 28.6 |
| OPT-6.7B → 13B | **MiniLLM** | **70.8** | **58.5** | **32.5** | **36.7** |
| LLaMA-7B → 13B | SFT | 73.0 | 69.2 | 32.4 | 35.8 |
| LLaMA-7B → 13B | **MiniLLM** | **76.4** | **73.1** | **35.5** | **40.2** |

**Students exceeding teachers** (marked * in paper): MiniLLM students surpass their teachers on VicunaEval R-L (GPT-2-120M: 16.9 vs teacher 16.3; OPT-1.3B: 17.9 vs teacher 17.8; OPT-6.7B: 18.7 vs teacher 17.8), and on S-NI/UnNI R-L for larger students. This "exceeding teacher" finding is notable but occurs only on Rouge-L (surface overlap), not GPT-4 quality scores.

### Calibration (Table 2) — LLaMA-7B → LLaMA-13B

| Method | SST2 ECE ↓ | SST2 Acc ↑ | BoolQ ECE ↓ | BoolQ Acc ↑ |
|--------|-----------|-----------|------------|------------|
| Teacher | 0.025 | 93.0 | 0.356 | 74.5 |
| KD (forward) | 0.191 | 84.7 | 0.682 | 63.5 |
| SeqKD | 0.243 | 66.5 | 0.681 | 62.8 |
| **MiniLLM** | **0.099** | **89.7** | **0.502** | **67.8** |

MiniLLM halves KD's calibration error on SST2 (0.099 vs 0.191) and improves accuracy by 5pp (89.7 vs 84.7). This is the distribution-matching payoff: better KL minimization → better-calibrated probabilities.

### Ablation Study (Table 4) — GPT-2-120M → GPT-2-1.5B

| Configuration | Val R-L | DollyEval R-L |
|--------------|---------|---------------|
| **MiniLLM (full)** | **27.4** | **24.6** |
| w/o Length Normalization | 17.4 | 14.7 |
| w/o Teacher-Mixed Sampling | 22.3 | 20.4 |
| w/o Single-Step Decomposition | 27.0 | 23.7 |

Length normalization is critical (without it: -10pp R-L, model generates empty/short responses). Teacher-mixed sampling prevents reward hacking (-4.2pp without it). Single-step decomposition gives modest variance reduction (-0.9pp).

### Generation Diversity (Table 3) — LLaMA family

| Method | DollyEval Dist-4 | SelfInst Dist-4 |
|--------|---------|---------|
| Teacher | 99.3 | 99.1 |
| SFT | 99.5 | 99.0 |
| MiniLLM | 99.0 | 98.6 |

MiniLLM has marginally lower diversity (99.0 vs 99.5 Dist-4 on DollyEval) — consistent with mode-seeking behavior of reverse KL. The student collapses its distribution onto the teacher's major modes, losing some of the tail.

### Pre-training Loss Preserves General Capabilities (Table 7)

| Config | OPT-1.3B CLS Avg | LLaMA-7B CLS Avg |
|--------|---------|---------|
| MiniLLM | 70.2 | 78.8 |
| w/o L_PT | 65.7 (-4.5) | 74.3 (-4.5) |

Without the auxiliary pre-training loss, classification accuracy drops 4.5pp for both model sizes, while instruction-following performance is nearly unchanged. The pre-training loss acts as a distributional anchor.

---

## The Thesis-Relevant Interpretation

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  WHAT MINILLM REVEALS ABOUT THE NATURE OF DISTILLATION               │
│                                                                      │
│  The paper's explicit framing is distributional throughout:          │
│                                                                      │
│  1. The OBJECTIVE is KL divergence minimization                      │
│  2. The GRADIENT is a per-token distribution-matching signal         │
│  3. The REWARD is log p(y_t) - log q_θ(y_t)                        │
│  4. The EQUIVALENCE is to inverse RL (reward = distribution fit)    │
│  5. The MODE-SEEKING behavior means: student picks the              │
│     highest-probability outputs and ignores the rest                 │
│                                                                      │
│  At no point does the framework reference "reasoning," "logic,"     │
│  or "understanding." The entire apparatus is about making one        │
│  probability distribution resemble another.                          │
│                                                                      │
│  The mode-seeking property of reverse KL is particularly telling:   │
│  rather than covering the teacher's full distribution (which would   │
│  require "understanding" the diversity), the student just locks      │
│  onto the highest-probability modes. This is cherry-picking from     │
│  the distribution — statistically optimal, cognitively vacuous.     │
│                                                                      │
│  The "student exceeds teacher" results (VicunaEval R-L) happen      │
│  only on Rouge-L, a surface-overlap metric. On GPT-4 quality       │
│  scores, students never exceed teachers. The student's              │
│  mode-seeking produces outputs that happen to overlap more with     │
│  reference texts (higher precision) without matching the teacher's  │
│  quality (lower recall of diverse good responses).                   │
│                                                                      │
│  Forward KL (standard KD) fails precisely because the student       │
│  tries to "understand" the whole distribution and cannot.            │
│  Reverse KL succeeds precisely because the student gives up on      │
│  understanding and just copies the peaks.                            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports (same finding, different method)
- **2504.01738 - Style over Substance (#384)**: MiniLLM provides the *theoretical* framework for what Style over Substance demonstrates *empirically*. The student's mode-seeking under reverse KL means it gravitates toward the highest-probability patterns — which are the stylistic patterns (pivots, trace structure), not the semantic reasoning content.
- **2601.19897 - SDFT (#342)**: SDFT's "In-Context Assumption" (π(y|x,c) ≈ π*_{k+1}(y|x)) is a special case of MiniLLM's framework where the teacher is the model's own conditioned-on-demonstration version. Both use on-policy KL minimization.
- **2604.01193 - SSD Code Gen (#292)**: SSD shows gibberish data improves via distribution reshaping. MiniLLM's mode-seeking theory explains why: reverse KL focuses on high-probability modes regardless of semantic content.

### Extends
- **Hinton et al. 2015 - Knowledge Distillation**: MiniLLM extends the original KD framework from forward to reverse KL and from classification to generation.
- **2601.20802 - SDPO (#343)**: SDPO's self-distillation RL uses a similar on-policy framework; MiniLLM predates it and provides the theoretical foundation.

### Challenges
- **2511.05184 - CoT KD Effectiveness (#386)**: That paper uses forward KL only (as noted: they use "KL divergence as the only loss"). MiniLLM explicitly argues forward KL is sub-optimal for generation, which may explain #386's modest and inconsistent gains.

---

## REBUTTALS

### Known Rebuttals
- **GKD (Agarwal et al., 2024, 2306.13649)**: Google's Generalized Knowledge Distillation proposes a more general framework that subsumes MiniLLM. GKD shows that the choice between forward and reverse KL matters less than on-policy vs off-policy sampling. MiniLLM's gains may be primarily from on-policy training, not from the KL direction.
- **DistiLLM (Ko et al., 2024, 2402.03898)**: argues for adaptive off-policy approach with skew KL that is more compute-efficient than MiniLLM's on-policy method while achieving comparable results.

### Limitations (Authors Acknowledge)
1. **Computational cost**: on-policy training requires generating from the student at every step + forward passes through both teacher and student. Much more expensive than SFT or forward-KL KD.
2. **Reward hacking**: without teacher-mixed sampling and length normalization, the method degenerates (Table 4: -10pp R-L without length norm). The distribution-matching objective alone is not sufficient.
3. **Same-family constraint**: all experiments use same-family teacher-student pairs (GPT-2→GPT-2, OPT→OPT, LLaMA→LLaMA). Cross-family distillation is not tested.
4. **Diversity loss**: Dist-4 drops from 99.5 to 99.0 (DollyEval). Mode-seeking inherently sacrifices diversity.
5. **Only instruction-following evaluated**: no math reasoning benchmarks (MATH, GSM8K), no code generation, no compositional reasoning. The "reasoning" claims are from instruction-following quality, not from controlled reasoning tests.
6. **Approximation in IRL proof**: the IRL equivalence (Appendix A.1) relies on dropping a log-partition term at the sequence boundary. The quality of this approximation is not quantified.

### Independent Assessment
This is a well-executed, technically rigorous paper that made a genuine contribution to the distillation literature (ICLR 2024, Microsoft Research + Tsinghua). The reverse KL insight is sound and the experimental coverage across 3 model families, 10 student sizes, 5 evaluation sets, and 3 evaluation metrics is thorough.

However, for the thesis, the most important aspect is what the paper *does not* interrogate. The entire framework is distribution matching. The reward signal is a per-token probability ratio. The IRL equivalence shows this is reward-shaped policy optimization. Yet the paper never asks: *what* is the student learning? Is it learning to reason, or learning to match a distribution? The answer, from the paper's own formalism, is unambiguous: it is learning to minimize KL divergence. Everything else — "reasoning," "instruction-following capability" — is inferred from downstream metrics, not from the training objective.

The mode-seeking property is particularly thesis-relevant. Reverse KL causes the student to abandon the teacher's distribution tails and concentrate on the peaks. This is mathematically optimal (lower KL) but cognitively impoverished — the student is discarding the diversity and edge cases where genuine reasoning would be most needed. The marginal diversity drop (99.5 → 99.0 Dist-4) is small in aggregate but could mask larger drops in specific reasoning scenarios.

---

## Key Quotes

1. > "We first replace the forward Kullback-Leibler divergence (KLD) objective in the standard KD approaches with reverse KLD, which is more suitable for KD on generative language models, to prevent the student model from overestimating the low-probability regions of the teacher distribution."

2. > "Minimizing reverse KLD has been shown to cause the mode-seeking behavior in generative modeling, where q_θ assigns high probabilities to p's large modes and ignores the small ones."

3. > "Unlike sequence-level KD that forces q_θ to fit all y sampled from the teacher distribution p, MiniLLM encourages the student to generate samples preferred by the teacher within its own capacities, which is more possible to achieve."

4. > "Standard KD ≈ behavior cloning; MiniLLM ≈ inverse reinforcement learning."

5. > "The generated texts are supposed to have high probabilities under the teacher distribution by increasing p(y_t' | y_{<t'}, x), but simultaneously stay diverse by lowering q_θ(y_t' | y_{<t'}, x)."

---

## Status
- [x] Read complete (all sections, tables, appendices, IRL proof)
- [x] Core claims extracted
- [x] Key evidence with numbers (Table 1, 2, 3, 4, 5, 6, 7)
- [x] Rebuttals checked (GKD, DistiLLM)
- [ ] Paper graph updated
