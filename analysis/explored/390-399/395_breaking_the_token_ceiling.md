# Paper 395: Breaking the Token Ceiling

## Metadata
- **arXiv**: 2609.12303 (v1, 11 Sep 2026)
- **Title**: Breaking the Token Ceiling: Distilling Smaller, Stronger Byte Models
- **Authors**: Kalyani Marathe (UW, work done at Meta FAIR), Artidoro Pagnoni (Meta FAIR), Tomasz Limisiewicz, Margaret Li, Mike Lewis, Luke Zettlemoyer, Srinivasan Iyer (Meta FAIR / UW) — joint first authors Marathe and Pagnoni
- **Stance**: BALANCED - a capabilities paper that succeeds at making small models better, while documenting a transfer mechanism that is pure logit transport and a loss function blind to what it is optimizing for
- **Cluster**: `distillation`
- **Role**: Shows what the teacher's "knowledge" physically is when you have to store it

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE TEACHER'S KNOWLEDGE IS A FILE, AND MOST OF IT IS DELETED        │
│                                                                      │
│  To distill offline you must serialize the teacher's outputs.        │
│  For Llama 3-8B at 2T tokens, stored in float32:                     │
│                                                                      │
│      2T x 4 bytes x 128,256 logits  =  1.026 EXABYTES                │
│                                                                      │
│  This is not storable, so practitioners truncate to top-k.           │
│  The controlled study here keeps k = 600.                            │
│                                                                      │
│      kept:      600 of 128,256 logits    (0.47%)                     │
│      discarded: 127,656 per token        (99.53%)                    │
│                                                                      │
│  Throw away 99.5% of the teacher's output distribution and the       │
│  "capability" still transfers well enough to beat the supervised     │
│  baseline. The byte-vocabulary variant stores all 260 values and     │
│  needs no truncation at all - which is the paper's actual result.    │
│                                                                      │
│  A capability that survives being truncated, dumped to disk, and     │
│  replayed offline is a table of numbers.                             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Token logits can be converted to byte logits in one teacher forward pass**, via Marginalize-It (approximate) and End-Of-Token (exact). Prior exact methods required multiple passes and were computationally prohibitive.
2. **Token models win early and plateau; byte models start worse and reach a higher ceiling.** Token-1B leads at low FLOPs on all eight benchmarks; byte variants improve at a steeper rate and overtake.
3. **Distilled End-Of-Token-1B raises the asymptotic ceiling by 4.0 points** over distilled Token-1B (52.4% vs 48.4%), on extrapolated scaling laws.
4. **Efficiency**: matches the token-distillation asymptote with 6.35x less unique text and 5.19x less logit storage, while eliminating top-k truncation entirely.
5. **Bits-per-byte is not a valid cross-scheme metric.** Lower BPB does not imply a better model when tokenization or objective differ.

---

## Methodology

### The distillation objective

```
   L_KD  =  alpha * L_KL  +  (1 - alpha) * L_CE

   L_KL  =  forward KL, teacher -> student, over the stored distribution
   L_CE  =  ordinary cross-entropy against ground-truth tokens
```

Purely **offline**: logits are pre-dumped, then replayed. There is no on-policy or student-sampled distillation anywhere in the paper. The numeric value of `alpha` used for the "Distilled" runs is never stated - a missing experimental detail worth flagging.

### Model configurations (layer-parameter matched)

| Property | Token-1B | Bytes-1B | End-Of-Token-1B |
|----------|----------|----------|-----------------|
| Model dim / FFN / layers / heads | 2048 / 5632 / 25 / 16 | same | same |
| **Vocabulary** | **128,256** | **260** | **261** |
| Layer params | 1,284,608,000 | 1,284,608,000 | 1,284,608,000 |
| **Total params** | **1.81B** | **1.28B** | **1.28B** |
| Sequence length | 2,048 | 9,216 | 11,264 |
| **FLOPs per unit** | 8.18e9 | 8.81e9 | 9.44e9 |
| FLOPs per token of text | 8.18e9 | 39.65e9 | **51.92e9** |

Token-1B carries 0.53B more total parameters than the byte models purely in its embedding table. Teacher throughout: **Llama 3-8B**, validation BPB **0.85511**.

### The storage arithmetic that sets k = 600

| Side | Representation | Bytes per BPE token |
|------|----------------|---------------------|
| Token (sparse) | k float32 values + k int32 indices + 1 int32 token | 4k + 4k + 4 |
| Byte (dense, full) | 260 float32 x 4.5 byte positions + 4.5 int16 | 4,680 + 9 |

Equating the two gives k = 4685/8 = 585.625, rounded to **600**. This is the entire reason the comparison is fair, and it is also the clearest statement in the literature of what offline distillation physically consists of: a budget negotiation over how much of a probability table you can afford to keep on disk.

### Setup

- **Data**: Llama-2 pretraining mixture, up to 1 trillion bytes. Max scales reached: Token Supervised 500B, Token Distilled 220B, all byte runs 880B.
- **Optimizer**: AdamW, beta 0.9/0.95, cosine schedule, 10% warmup, independent weight decay 1e-4, grad clip 1.0.
- **LRs swept**: 1e-3, 4e-3, 8e-3; main text reports 4e-3.
- **Hardware**: 64 H200s per run, global batch ~0.5M units.
- **Benchmarks (8)**: ARC-Easy, ARC-Challenge, HellaSwag, PIQA (MCQA); MBPP, Natural Questions (generation); Flores en-de, de-en (translation, BLEU).

---

## Key Evidence

### Finding 1: The headline is extrapolated; the measured result is a rounding error

Asymptotic predictions, LR=4e-3, averaged over 6 benchmarks:

| Method | Asymptotic BPB | Asymptotic Avg. Acc. |
|--------|----------------|----------------------|
| Token Supervised | 0.9568 | 46.0 |
| Token Distilled | 0.9407 | 48.4 |
| Bytes Supervised | 0.8967 | 51.2 |
| Marginalize-It Distilled | 0.9016 | 50.5 |
| Bytes w/ eot Supervised | 0.8891 | 51.6 |
| **End-Of-Token Distilled** | 0.8983 | **52.4** |

Actual trained checkpoints at max data scale, LR=4e-3:

| Model | Data | HellaSwag | PIQA | ARC-E | ARC-C | MBPP | NQ | **Avg** |
|-------|------|-----------|------|-------|-------|------|-----|---------|
| Llama-3.2-1B | 9T | 64.3 | 75.3 | 66.1 | 36.6 | 27.0 | 5.7 | **45.9** |
| Gemma 2b | 3T | 71.4 | 78.1 | 72.2 | 41.9 | 28.0 | 10.5 | **50.3** |
| Token Distilled | 220B | 64.2 | 75.7 | 66.4 | 36.3 | 10.6 | 13.0 | **44.4** |
| End-Of-Token Distilled | 880B | 67.1 | 71.7 | 68.3 | 36.9 | 11.2 | 12.7 | **44.6** |

```
┌──────────────────────────────────────────────────────────────────────┐
│  CLAIMED                          vs     MEASURED                    │
├──────────────────────────────────────────────────────────────────────┤
│  EoT Distilled beats Token               EoT 44.6 vs Token 44.4      │
│  Distilled by 4.0 points                 = +0.2 points               │
│                                                                      │
│  Beats Llama-3.2-1B by 6.5,              Loses to Llama-3.2-1B       │
│  Gemma-3-1B by 8.1, Gemma 2B by 2.1      (45.9) and Gemma 2B (50.3)  │
└──────────────────────────────────────────────────────────────────────┘
```

Every headline win is an extrapolation of two chained fitted curves evaluated at infinite compute. The open-weight numbers being compared against are measured.

### Finding 2: Robustness is one-sided

On a second validation dataset (Appendix E), the gap between distilled EoT and distilled Token narrows from **4.0 to 1.8** points; Marginalize-It Distilled (48.9) merely **ties** Token Distilled (48.7); and at LR=1e-3 the ordering **reverses** - Token Distilled 49.2 beats EoT Distilled 48.6. Leave-one-out analysis shows the byte asymptotes - the headline numbers - have the largest spread of any curves fitted.

The authors state the consequence themselves: "the choice of the validation dataset can alter the cross-over points of the training curves and as a result the perception of a better model."

### Finding 3: The mechanism is confounded

EoT's advantage has two causes, and the paper does not separate them. Inserting an end-of-token marker every ~4.5 bytes costs **30.94% additional FLOPs per unit of data** (51.92e9 vs 39.65e9 per token). The authors describe this as "an unintended but remarkable consequence" that "turns out to further improve asymptotic performance." The supervised eot ablation isolates only +0.4 of it (51.6 vs 51.2).

So the "ceiling" being broken is moved by two things at once: exactness of the stored distribution, and simply spending more compute per unit of text.

### Finding 4: The ceiling is a property of the container

| What changed | Effect on the ceiling |
|--------------|----------------------|
| Vocabulary 128,256 -> 260 | No top-k truncation needed; 5.19x less storage |
| Adding one eot symbol (260 -> 261) | Exact distribution preservation; +30.94% FLOPs/unit |
| FLOPs per token of text | "the amount of FLOPs spent on a fixed amount of data... affects the asymptotic BPB" |

Nothing about reasoning, understanding, or capability appears in this list. The asymptotic ordering of the six curves is determined by vocabulary size, how much probability mass survives serialization, and compute per unit of text.

### Finding 5: The loss cannot see what the benchmarks measure

The paper's most durable contribution is an argument that cross-entropy constrains only the probability placed on the target, never the ranking of everything else:

> "BPB is a function of only one number per position: the probability the model places on the target token, p_correct... BPB is completely blind to how the remaining mass 1 − p_correct is arranged among the other vocabulary items. Downstream accuracy, in contrast, depend on whether the target is the argmax."

The worked example (Appendix G.1): target "Where's my tiramisu?", 7 tokens spanning 20 bytes. Two models both place p_correct = 0.4 at every position, so both have **BPB = 0.462**. Model A ranks the target first everywhere (**7/7**, 100% accuracy). Model B has a single distractor at 0.5 everywhere and decodes "There'd be calzone!" (**0/7**, 0% accuracy).

```
   identical loss    ->    100% accuracy
                     ->      0% accuracy
```

Empirically confirmed at scale: all Bytes-1B and End-Of-Token-1B models surpass the Token Supervised BPB curve at ~1.8e21 FLOPs while performing **worse on every benchmark**.

### Finding 6: The teacher's own ceiling is never reached

Teacher Llama 3-8B validation BPB: **0.85511**. The best student asymptote is 0.8891 (Bytes w/ eot Supervised). No student, distilled or supervised, extrapolates to the teacher's loss.

---

## Relevance to the Thesis

### What offline distillation physically is

Strip the framing and the pipeline is:

```
  1.  run the teacher over a corpus
  2.  write its output distribution to disk        <- 1.026 EB uncompressed
  3.  delete 99.53% of it                          <- keep top-600 of 128,256
  4.  train a smaller model to match the file      <- forward KL, offline
```

Step 3 is the one that matters for the thesis. The teacher is not present during training. It has been reduced to a truncated table of floating-point numbers, and the student fits that table. Whatever is transferred is, by construction, exactly what survived serialization and truncation.

The paper's own contribution is to observe that a 256-symbol vocabulary makes truncation unnecessary - you can store the *whole* distribution. This is framed as an engineering win, and it is. It is also a statement that the object being transferred is small enough to hold in 260 float32 values per position.

### The loss does not optimize for the thing

Finding 5 is the sharpest thesis-relevant result in the paper, and it is the authors' own. A training objective that constrains `p_correct` while remaining blind to the arrangement of the remaining mass can be driven to any level without the model's decoded output being correct - demonstrated at 100% versus 0% on a worked example, and observed at scale where byte models win on loss and lose on all eight benchmarks.

This is what fitting a surface looks like from the inside: the quantity being minimized and the quantity being claimed come apart, and the paper has to add "this final calibration step while determining the quality of a language model before real-world deployment" to reconnect them.

### Why this is BALANCED, not SUPPORTS

The paper genuinely works. Distillation beats supervised training on the same budget in most configurations; the logit-conversion methods are a real contribution; the efficiency numbers are substantial and not extrapolated. A capabilities paper that succeeds is not evidence that capabilities are illusory.

What it supplies to the thesis is mechanism and a caution, not a negative result: the transfer channel is a truncated file, the ceiling moves with vocabulary and compute, and the training objective provably fails to track downstream behavior. Those observations are compatible with distillation being useful.

---

## REBUTTALS

### Known Rebuttals
None identified; published September 2026.

### Weaknesses Not Fully Acknowledged

1. **Extrapolation carries every headline.** The 4.0, 6.5, 8.1, and 2.1 point claims, the 6.35x data saving, and all crossover FLOPs come from evaluating chained fitted curves at infinite compute. Measured: +0.2 points, and both distilled models lose to Llama-3.2-1B.
2. **`alpha` is never reported.** The mixing coefficient between KL and cross-entropy in the distillation loss appears in Equation 3 and then never again with a number.
3. **Machine translation has no numbers.** Two of the eight headline benchmarks are reported only as plots; no BLEU table appears in the paper.
4. **The headline average uses 6 benchmarks, not 8.** MT is excluded because it is BLEU-scored.
5. **Marginalize-It distillation can underperform its own supervised baseline** - the authors note this "potentially because it uses an approximation of the teacher distribution."

### Limitations (Authors Acknowledge)

1. **Inference cost is unaddressed and unfavorable.** EoT runs 11,264-token sequences against the token model's 2,048. "End-Of-Token-1B models remain significantly expensive at inference time... this is beyond the scope of this study."
2. **Byte models saw less data at equal compute**: "overall our byte models use much less data compared to token based models for the same compute budget."
3. **Some large runs repeat data**: "we also note that some of our larger training runs epoch."
4. **Fitting is sensitive.** Leave-one-out shows "Token curves on average demonstrate little spread compared to Bytes and Bytes w/ eot methods."
5. **Validation set choice changes conclusions** (quoted above).
6. **Dense transformers only**, fixed ~1.28B layer parameters, 8 benchmarks.
7. **Byte-to-byte distillation dynamics are unknown**: "understanding the training dynamics of distilling large byte transformers into smaller ones remains an open question."

---

## Relationship to Other Papers

### Supports
- **#394 Prediction-Only Distillation (2607.15450)**: the engineering realization of that paper's theoretical claim. #394 proves query access to a teacher's outputs is sufficient; this paper physically dumps those outputs to disk, truncates them, and trains against the file.
- **#168 Predictable Compression Failures (2509.11208)**: same subject from the information side - what survives compression and what does not.
- **#24 Chain Of Thought Compression (2601.21576)**: shares the finding that a quantity being optimized and a capability being claimed can diverge.

### Extends
- **#387 MiniLLM (2306.08543)**: MiniLLM established divergence choice for LM distillation. This paper keeps forward KL, moves the problem to the vocabulary axis, and confronts the storage cost MiniLLM's on-policy setting avoids. Notably, the on-policy distillation literature is **not cited** anywhere in this paper - the treatment is exclusively offline.
- **#386 CoT KD Effectiveness (2511.05184)**: both examine what a student actually receives from a teacher's outputs.

### Challenges
- **Benchmark-as-capability assumptions throughout the corpus**: the BPB-blindness result (identical loss, 100% vs 0% decoded accuracy) is a general caution against reading a training metric as a capability measure.

---

## Key Quotes

> "The biggest pain point of using offline distillation to train small language models is the storage cost of the teacher logits. Each BPE token of a Llama3-8B model, for instance, produces 128256 logit values. A billion parameter model overtrained to 2T tokens, for instance, would require and 2T×4×128256 bytes = 1.026048 Exabytes assuming float32 datatype. To circumvent this storage problem, researchers store only the top-k logits per token, where k typically is of the order of several hundreds."

> "By operating over a small vocabulary of ≈256 bytes instead of the ≈100K tokens they circumvent the need for top-k truncation during logit dumping, reducing logit storage costs to roughly one-fifth."

> "BPB is completely blind to how the remaining mass 1−p_correct is arranged among the other vocabulary items... two models can share an identical BPB while decoding completely different text."

> "Although all of the Bytes-1B and End-Of-Token-1B models surpass the Token Supervised BPB training curve, they exhibit worse downstream task performance across benchmarks."

> "Inserting <eot> tokens also has an unintended but remarkable consequence: the ≈30.94% additional compute it spends per unit of data... turns out to further improve asymptotic performance relative to Marginalize-It method."

> "the choice of the validation dataset can alter the cross-over points of the training curves and as a result the perception of a better model."

---

## Interaction Diagram

```
                  ┌──────────────────────────────────────┐
                  │  Prediction-Only Distillation (#394) │
                  │  query access to outputs suffices    │
                  └──────────────────┬───────────────────┘
                                     │ realized physically
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│           Breaking the Token Ceiling (Sep 2026)                          │
│           Marathe, Pagnoni, ... Lewis, Zettlemoyer, Iyer · Meta FAIR/UW  │
│                                                                          │
│  Teacher Llama 3-8B -> logits dumped to disk (1.026 EB uncompressed)     │
│  -> truncated to top-600 of 128,256 (99.53% discarded)                   │
│  -> student fits the file, offline forward KL                            │
│                                                                          │
│  Ceiling moves with VOCABULARY and FLOPS/unit, not with capability       │
│  BPB blind to rank: identical loss, 100% vs 0% decoded accuracy          │
│  Headline +4.0 is extrapolated; measured is +0.2                         │
└──────────────────────────────────────────────────────────────────────────┘
        │                      │                         │
        │ compression          │ metric-capability       │ extends
        │ survivorship         │ divergence              │
        ▼                      ▼                         ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ Predictable      │  │ CoT Compression      │  │ MiniLLM (#387)          │
│ Compression      │  │ (#24)                │  │                         │
│ Failures (#168)  │  │                      │  │ on-policy distillation  │
│                  │  │ optimized quantity   │  │ literature NOT cited;   │
│ what survives    │  │ diverges from        │  │ treatment is purely     │
│ the squeeze      │  │ claimed capability   │  │ offline                 │
└──────────────────┘  └──────────────────────┘  └─────────────────────────┘
```

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
