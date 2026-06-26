# Paper 386: Effectiveness of Chain-of-Thought in Distilling Reasoning

## Metadata
- **arXiv**: 2511.05184 (v1, Nov 2025)
- **Title**: Effectiveness of Chain-of-Thought in Distilling Reasoning Capability from Large Language Models
- **Authors**: Cong-Thanh Do, Rama Doddipatla, Kate Knill
- **Affiliation**: Toshiba Europe (Cambridge Research Lab) + University of Cambridge
- **Stance**: SUPPORTS - CoT rationales improve white-box KD, but the improvements are modest, inconsistent across tasks, and the mechanism is distributional (KL divergence matching), not reasoning transfer
- **Cluster**: `distillation`

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  COT IN WHITE-BOX KD: MODEST GAINS, INCONSISTENT PATTERN            │
│                                                                      │
│  Setup: Teacher → KL divergence → Student                            │
│  Compare: vanilla KD vs KD+CoT (rationales in training data)        │
│                                                                      │
│  Qwen-7B → Qwen-1.8B (BBH average):                                │
│    Base:      17.77%                                                 │
│    KD:        23.10%  (+30.0% relative)                              │
│    KD+CoT:    24.44%  (+37.5% relative)                              │
│    Teacher:   47.38%                                                 │
│                                                                      │
│  Llama2-13B → Llama2-7B (BBH average):                              │
│    Base:      39.44%                                                 │
│    KD:        39.22%  (-0.56% relative — KD HURTS)                   │
│    KD+CoT:    41.50%  (+5.22% relative)                              │
│    Teacher:   49.95%                                                 │
│                                                                      │
│  Llama2-13B → TinyLlama-1.1B (BBH average):                        │
│    Base:      27.96%                                                 │
│    KD:        26.48%  (-5.29% relative — KD HURTS)                   │
│    KD+CoT:    29.23%  (+4.54% relative)                              │
│    Teacher:   49.95%                                                 │
│                                                                      │
│  KEY: CoT adds +1.3pp to +2.3pp absolute on BBH average.            │
│  Vanilla KD alone can HURT performance (Llama2 experiments).         │
│  Students reach ~50% of teacher performance at best.                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **CoT rationales improve white-box KD effectiveness** for natural language reasoning and understanding tasks, with average relative gains of +37.5% (Qwen), +5.2% (Llama2-7B), and +4.5% (TinyLlama) on BBH.
2. **Vanilla white-box KD without CoT can hurt performance** on average for Llama2-based experiments (-0.56% and -5.29% relative), while KD+CoT rescues it.
3. **Improvements are not universal** - CoT helps on some BBH tasks but hurts on others, even within the same model family.
4. **The distillation mechanism is pure KL divergence** between teacher and student output probabilities - explicitly a distribution-matching objective.

---

## Methodology

### White-box KD Setup
- **Loss function**: KL divergence only between teacher and student output probability distributions (no SFT loss, no task-specific loss)
- **Temperature**: τ = 1
- **Training**: 20,000 steps over 10 epochs, best checkpoint selected across all intermediate saves
- **LoRA**: rank=32, alpha=32, dropout=0.1 (for Llama2-7B student)
- **Hardware**: single NVIDIA A100 80GB, ~30 hours per training

### Models
| Role | Qwen Experiment | Llama2 Experiment |
|------|-----------------|-------------------|
| Teacher | Qwen-7B | Llama2-13B-Chat |
| Student | Qwen-1.8B | Llama2-7B, TinyLlama-1.1B |

### Data
- **CoT-Collection dataset**: 1.84M rationales from FLAN collection across 1,060 tasks
- Split: 1.44M training, 0.4M validation
- Rationales augmented using OpenAI Codex
- **KD+CoT**: training instances include rationales (intermediate reasoning steps)
- **Vanilla KD**: same instances with rationales filtered out

### Evaluation
- **BIG-Bench Hard (BBH)**: 27 tasks across 4 categories
- Few-shot prompting with CoT (3 demonstrations) at inference for ALL models
- Exact-match accuracy, temperature=0.2

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Qwen: KD+CoT vs base (BBH avg) | 24.44% vs 17.77% (+37.5% rel) | Strongest relative gain, but still only 24.44% absolute |
| Qwen: KD+CoT vs vanilla KD | 24.44% vs 23.10% (+1.34pp) | CoT adds modest absolute improvement over vanilla KD |
| Llama2-7B: vanilla KD hurts | 39.22% vs 39.44% (-0.56% rel) | Distribution matching WITHOUT CoT actively degrades performance |
| Llama2-7B: KD+CoT rescues | 41.50% vs 39.44% (+5.22% rel) | CoT prevents distribution matching from hurting |
| TinyLlama: vanilla KD hurts | 26.48% vs 27.96% (-5.29% rel) | Smaller student suffers more from vanilla distribution matching |
| TinyLlama: KD+CoT rescues | 29.23% vs 27.96% (+4.54% rel) | CoT recovers and slightly exceeds baseline |
| Task-level inconsistency (Qwen) | Boolean: 43.2→34.8 (-19.4%) | KD+CoT HURTS some tasks significantly |
| Task-level inconsistency (Qwen) | Tracking 7-obj: 0→11.6 (+11.6pp) | KD+CoT dramatically helps other tasks |
| Teacher vs best student gap | 47.38% vs 24.44% (Qwen) | Student reaches only ~52% of teacher performance |
| Inference speed advantage | TinyLlama: 20% of teacher time | Distilled models much faster, same parameter count as base |

---

## The Distribution-Matching Interpretation

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  WHAT THIS PAPER REVEALS ABOUT DISTILLATION                          │
│                                                                      │
│  The paper uses ONLY KL divergence as the distillation loss:         │
│                                                                      │
│    L = KL(P_teacher || P_student)                                    │
│                                                                      │
│  This is EXPLICITLY distribution matching. No task loss, no          │
│  reward, no reasoning objective. Just: make the student's output     │
│  distribution look like the teacher's.                               │
│                                                                      │
│  The CoT rationales help because they give the teacher MORE          │
│  tokens to produce probabilities over — more distribution signal     │
│  for the student to match. The rationales are not teaching           │
│  reasoning; they are providing a RICHER DISTRIBUTION to copy.        │
│                                                                      │
│  Evidence for this interpretation:                                   │
│    1. Gains are modest (+1-2pp absolute) despite 1.84M rationales   │
│    2. Improvements are INCONSISTENT across tasks                     │
│    3. Vanilla KD HURTS on Llama2 (wrong distribution to match?)     │
│    4. Student reaches only ~50% of teacher (distribution capacity?) │
│    5. The authors themselves note: "CoT ELICITS the teacher's        │
│       reasoning capability" — it surfaces a distribution, not        │
│       transfers understanding                                        │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports (same finding, different method)
- **2504.01738 - Style over Substance (#384)**: Style over Substance shows distilled models learn style not substance. This paper shows the same via white-box KD: CoT rationales provide more distribution signal but transfer is modest and inconsistent.
- **2305.18654 - Faith and Fate (#1)**: student models reach ~50% of teacher, consistent with capacity-limited pattern matching rather than reasoning transfer.
- **2410.05229 - GSM-Symbolic (#3)**: inconsistent task-level gains parallel GSM-Symbolic's finding that LM performance is pattern-dependent, not reasoning-dependent.

### Extends
- **2306.08543 - MiniLLM**: explicitly builds on MiniLLM framework. KD+CoT extends MiniLLM's on-policy distillation with CoT rationale data.

### Challenges
- None directly. The paper's own results challenge the premise that CoT distillation reliably transfers reasoning (gains are inconsistent and modest).

---

## REBUTTALS

### Known Rebuttals
None identified (Nov 2025 paper from Toshiba/Cambridge).

### Limitations (Authors Acknowledge)
1. **Improvements are not universal** across all BBH tasks - the authors repeatedly note this.
2. **Architecture dependency**: Qwen experiments show clear gains; Llama2 experiments show vanilla KD hurts, suggesting model family sensitivity.
3. **Single benchmark**: only BBH evaluated. No math-specific benchmarks (MATH500, AIME), no coding benchmarks.
4. **Same tokenizer requirement**: teacher and student must share vocabulary, limiting model family combinations.
5. **Temperature τ=1**: no ablation on temperature, which is known to significantly affect KD.
6. **Best-of-20 checkpoint selection**: selecting the best intermediate checkpoint across 20,000 steps inflates reported numbers relative to practical deployment.

### Independent Assessment
This is a competent engineering paper that inadvertently provides evidence for the distribution-matching thesis. The authors frame CoT distillation as "transferring reasoning capability," but the mechanism is pure KL divergence minimization. The modest and inconsistent gains (+1-2pp absolute) suggest CoT rationales provide marginal additional distributional signal rather than teaching the student to reason. The most telling result: vanilla KD (distribution matching without CoT) actually *hurts* performance in Llama2 experiments, suggesting that matching the wrong distribution is worse than no distillation at all.

---

## Key Quotes

1. > "We use Kullback-Leibler (KL) divergence as the only loss in the distillation loss to keep the KD step pure with only information flowing from the teacher model."

2. > "While improvements are not universal, the KD+CoT approach is observed to enhance performance across several natural language reasoning and understanding tasks."

3. > "CoT elicits the teacher LLM's reasoning capability, which are then effectively distilled into the student model during the distillation process."

4. > "The vanilla white-box KD does not outperform the baseline [in Llama2 experiments]. In contrast, the KD+CoT method improves average performance."

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [ ] Paper graph updated
