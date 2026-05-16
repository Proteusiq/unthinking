# Paper 349: Learned or Memorized? Quantifying Memorization Advantage in Code LLMs

## Metadata
- **arXiv**: 2604.13997
- **Date**: April 2026
- **Authors**: Djiré Albérick Euraste, Kaboré Abdoul Kader, Jordan Samhi, Earl T. Barr, Jacques Klein, Tegawendé F. Bissyandé
- **Affiliation**: University of Luxembourg, UCL, AI4D/CITADEL
- **Venue**: ICSE 2026
- **Stance**: Balanced — confirms memorization is real and task/model-dependent (StarCoder 0.8 on APPS), but surprise finding that CVEFixes and Defects4J show LOW memorization advantage (<0.1 and 0.2-0.4) challenges blanket "LLMs just memorize" claims. The spectrum view (memorization↔generalization is continuous) is more nuanced than either extreme.

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  MEMORIZATION IS REAL BUT TASK- AND MODEL-DEPENDENT                  │
│                                                                      │
│  8 code LLMs × 19 benchmarks × 5 task families                      │
│                                                                      │
│  PERTURBATION SENSITIVITY (higher = more memorized):                 │
│    Code Summarization:     <0.3  (strongest generalization)          │
│    Code Generation:        0.2-0.4 (most models robust)             │
│    Program Repair:         0.2-0.8 (benchmark-dependent)            │
│    Vulnerability Detection: <0.1 to >0.8 (widest variance)          │
│    Test Generation:        0.4-0.7 (weakest generalization)         │
│                                                                      │
│  SURPRISE FINDINGS:                                                  │
│    CVEFixes: <0.1 across ALL models (p<0.001)                        │
│      → despite being widely suspected of leakage                    │
│    Defects4J: 0.2-0.4 vs other repair at 0.5-0.8 (p<0.01)           │
│      → also lower memorization than assumed                         │
│                                                                      │
│  CONFIRMATION:                                                       │
│    StarCoder on APPS: ~0.8 (known training data, p<0.01)             │
│      → method correctly detects known contamination                 │
│                                                                      │
│  MODEL DIFFERENCES:                                                  │
│    StarCoder:  highest sensitivity, most memorization-prone          │
│    QwenCoder:  <0.4 consistently, best generalizer                   │
│    Instruction-tuned: consistent generalization advantages           │
│                                                                      │
│  → "memorization vs generalization is not binary but a spectrum"     │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Memorization advantage is task-dependent**: code summarization generalizes well (<0.3), test generation does not (0.4-0.7)
2. **CVEFixes and Defects4J are NOT heavily memorized**: contrary to community suspicion, sensitivity <0.1 and 0.2-0.4 respectively
3. **StarCoder's APPS contamination confirmed**: 0.8 sensitivity on benchmark known to be in training data
4. **Model architecture matters more than scale**: QwenCoder (<0.4 consistently) vs StarCoder (~0.8 peaks) despite similar sizes
5. **Instruction tuning helps generalization**: WizardCoder, Magicoder show consistent advantages
6. **Memorization is a spectrum**: not binary, different tasks have inherent "generalization boundaries"
7. **Alternative interpretation for CVEFixes**: high duplication may push noise tolerance outward — "locally constrained generalization to the immediate neighborhood of a memorized datum"

---

## Methodology

- **Perturbation Sensitivity Hypothesis (PSH)**: memorized content causes abrupt performance cliff under minor perturbations; generalized content degrades gradually
- **Memorization advantage**: ma(M,x,y) = |p_θ(y|x) - p_θ(y|x'(x))| — performance gap between likely-seen and unseen inputs
- **Sensitivity metric**: max over consecutive perturbation levels of performance drop — captures the maximum "cliff"
- **Perturbation methods**:
  - NL→Code: BART-based controlled paraphrasing (5 progressive levels)
  - Code→Code/NL: Progressive variable renaming to random nonces
- **Statistical tests**: Mann-Whitney U with Bonferroni correction, α=0.05; paired t-tests; Kruskal-Wallis
- **Models**: 8 code LLMs (DeepSeek-Coder-V2 16B, Qwen2.5-Coder 14B, StarCoder2 15B, CodeLlama 13B, Codestral 22B, OpenCoder 8B, WizardCoder 33B, Magicoder 7B)
- **Benchmarks**: 19 across 5 task families
- **Repetition**: 5 perturbation levels × 3 prompts per level; process repeated 3 times; temperature 0.3, top_k 0.5

---

## Key Evidence

| Finding | Number | Context |
|---|---|---|
| StarCoder on APPS sensitivity | ~0.8 | Known training data, p<0.01 |
| CVEFixes sensitivity | <0.1 | All 8 models, p<0.001 (Kruskal-Wallis) |
| Defects4J sensitivity | 0.2-0.4 | vs other repair 0.5-0.8, p<0.01 |
| QwenCoder consistency | <0.4 | Across most benchmarks |
| Test vs code generation gap | 0.4-0.7 vs 0.2-0.4 | p<0.001 (paired t-test) |
| ConDefects sensitivity | median ~0.7 | Highest among program repair |
| Code summarization | <0.3 | Lowest sensitivity of any task |
| Cross-benchmark correlation (test gen) | r>0.85 | Pearson across TestEval/QuixBugs/BigCodeBench |

---

## Relationship to Other Papers

### Supports
- **#3 GSM-Symbolic (2410.05229)** — Perturbation sensitivity confirms: when you change surface form while preserving semantics, memorized models collapse. Same principle, code domain.
- **#245 Extracting Books (2601.02671)** — Confirms memorization is real and extractable; sensitivity method validates extraction-based findings
- **#348 Comparative Memorization (2603.21658)** — StarCoder's high sensitivity aligns with Chen et al.'s finding that StarCoder has highest memorization rate and weakest noise robustness

### Challenges (weakly)
- **#245, #246** — CVEFixes <0.1 and Defects4J 0.2-0.4 suggest that some code benchmarks accused of contamination may actually reflect genuine generalization
- "LLMs just memorize" narrative — instruction-tuned models show consistent generalization advantages; QwenCoder generalizes across the board
- **#348** — The "locally constrained generalization" interpretation for CVEFixes suggests a middle ground between memorization and generalization that neither extreme captures

### Extends
- **#348** — Adds task-level analysis (which tasks memorize?) to Chen et al.'s model/family-level analysis
- **#350 How Much Do LMs Memorize** — Complementary: Morris et al. measure capacity bits; Euraste et al. measure task-level sensitivity

---

## REBUTTALS

### Known/potential rebuttals
- **Single perturbation type for code**: only variable renaming (alpha-renaming to nonces). Semantic perturbations could reveal different patterns. Authors acknowledge.
- **Unknown training data**: cannot definitively prove contamination, only provide "strong evidence." Perturbation sensitivity is a proxy.
- **CVEFixes alternative**: the "locally constrained generalization" interpretation means CVEFixes LOW sensitivity could be deep memorization with high noise tolerance, not genuine generalization. The method may not distinguish these cases.
- **Temperature 0.3**: non-zero temperature adds stochasticity; different temperatures could shift sensitivity distributions.
- **LLMs can tolerate substantial input noise** (Cao et al.): perturbation may not push models beyond tolerance threshold for some memorized instances.

### Limitations (authors acknowledge)
- Single code perturbation type (variable renaming)
- Incomplete knowledge of training data
- Benchmark selection not exhaustive
- Model version specificity (snapshot of current capabilities)
- Semantic perturbations left to future work

---

## Key Quotes

1. *"CVEFixes showed consistently low values below 0.1. These findings challenge prevailing concerns about these datasets' validity for evaluating code LLMs"* — Section 4
2. *"memorization versus generalization is not a binary distinction but rather a spectrum"* — Section 5
3. *"It is possible that very high duplication of a particular datum may train models to tolerate more noise around that datum, achieving a sort of locally constrained generalization to the immediate neighborhood of a memorized datum"* — Discussion
4. *"simply scaling up model size or training on more data may be less effective than thoughtful architectural design and training methodology"* — Conclusions
5. *"The consistent generalization advantages of instruction-tuned models may suggest that alignment techniques may improve not only safety but also fundamental generalization capabilities."* — Discussion

---

## Critical Assessment

### Why this is balanced
This paper provides evidence in both directions:

**For the thesis**: StarCoder's 0.8 on APPS proves memorization is real and method detects it. Test generation (0.4-0.7) shows models struggle to generalize in tasks requiring deep semantic understanding. Task-dependent memorization is consistent with "pattern matching where patterns exist, confabulation where they don't."

**Against the thesis**: CVEFixes <0.1 and Defects4J 0.2-0.4 are genuinely surprising — these benchmarks that the community suspected of contamination show low memorization advantage. This suggests code LLMs may have learned generalizable patterns for vulnerability detection and bug repair. Instruction tuning consistently helps, suggesting training methods can build genuine generalization.

### The "locally constrained generalization" caveat
The authors' own hedge is important: highly duplicated data may create noise-tolerant memorization that looks like generalization. If CVEFixes appears in many variations across training data, the model may tolerate perturbations without truly understanding vulnerability patterns. This interpretation would flip the finding back toward the thesis.

### Net interpretation
Balanced. Memorization is real, task-dependent, and model-dependent. Some evidence of genuine generalization (CVEFixes), but with caveats. The spectrum view (not binary) is the most honest characterization.
