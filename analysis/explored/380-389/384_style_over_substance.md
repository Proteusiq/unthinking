# Paper 384: Style over Substance

## Metadata
- **arXiv**: 2504.01738 (v3, Apr 2025)
- **Title**: Style over Substance: Distilled Language Models Reason Via Stylistic Replication
- **Authors**: Philip Lippmann, Jie Yang
- **Affiliation**: Delft University of Technology
- **Stance**: SUPPORTS (strongly) - distilled models replicate reasoning *style* not reasoning *ability*; synthetic traces with wrong answers still improve performance
- **Cluster**: `distillation`

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  STYLE IS THE SIGNAL, NOT SUBSTANCE                                  │
│                                                                      │
│  Experiment: take a WEAKER model (GPT-4o), hard-code reasoning      │
│  style (pivots: "Wait", "Let me check", "What if") into its         │
│  outputs, and distill into student models.                           │
│                                                                      │
│  Result: students trained on SYNTHETIC style-only traces             │
│  match students trained on EMERGENT R1 traces.                       │
│                                                                      │
│  Llama 3.2 3B on MATH500:                                           │
│    Base:   36.4%                                                     │
│    ST-HC:  64.2%  (synthetic style from GPT-4o)                      │
│    ST:     68.4%  (emergent traces from R1)                          │
│                                                                      │
│  The killer ablation:                                                │
│    ST-HC-W (style + WRONG answers): 48.2%  (still +12pp over base)  │
│    ST-NT   (correct answers, NO traces): 40.6%                      │
│                                                                      │
│  ⇒  Style alone > correct answers alone                             │
│  ⇒  Distillation transfers output PATTERNS, not REASONING           │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Distilled reasoning improvements rely heavily on stylistic patterns** present in reasoning traces, not on the semantic reasoning content itself.
2. **Synthetic traces replicating only structural and lexical patterns** of RLM traces achieve comparable downstream reasoning performance to genuine emergent traces.
3. **Even reasoning traces leading to wrong answers improve performance** when they maintain correct stylistic structure - style alone enhances problem-solving over base models.
4. **Four pivot types characterize successful reasoning traces**: realization ("Wait"), verification ("Let me check"), exploration ("What if"), and integration ("Now I see how") - these are lexical markers, not cognitive operations.

---

## Methodology

### Trace Analysis (17K traces from R1)
- Systematically analyzed 17K successful reasoning traces from DeepSeek-R1
- Categorized using cognitive science framework (Newell & Simon, 1972): problem framing, exploration, verification, synthesis
- Found 96.1% of successful traces contain at least 3 of 4 pivot categories
- Unsuccessful traces lack pivots or show limited diversity

### Dataset Construction
- **Seed data**: 31,586 question-answer pairs from OlympicArena, AGIEval, LiveCodeBench v4, NuminaMATH, OmniMath (math, coding, science, logic)
- **ST (SmolTraces)**: emergent reasoning traces from R1 (the strong teacher)
- **ST-HC (SmolTraces-HardCoded)**: synthetic traces from GPT-4o using a structured prompt that hard-codes the 4 pivot types and 4 reasoning stages
- **Both datasets aligned**: 18,242 samples each after filtering and downsampling
- **ST-HC-W**: ST-HC traces modified to lead to wrong answers (via GPT-4o-mini)
- **ST-NT**: question-answer pairs only, no reasoning traces
- **SBS**: step-by-step CoT baseline (standard "think step-by-step" prompt)

### Models Finetuned
- Llama 3.2 3B, Ministral 8B, Qwen2.5 32B
- SFT with AdamW, 5 epochs, cosine annealing, 8×H100 GPUs
- Learning rates scaled by model size: 6e-5 (3B), 4e-5 (8B), 1e-5 (32B)

### Evaluation Benchmarks
- MATH500 (500 competition math problems)
- AIME2024 (30 competition math problems)
- GPQA Diamond (198 hard science questions)

---

## Key Evidence

| Finding | Number | Context |
|---------|--------|---------|
| Llama 3B: Base → ST → ST-HC (MATH500) | 36.4% → 68.4% → 64.2% | Synthetic style traces 94% as effective as emergent R1 traces |
| Ministral 8B: Base → ST → ST-HC (MATH500) | 52.8% → 78.2% → 77.0% | Near-identical; style replication matches R1 distillation |
| Qwen 32B: Base → ST → ST-HC (MATH500) | 76.8% → 89.0% → 83.4% | Larger gap at 32B, but still +6.6pp from style alone |
| Ministral 8B: Base → ST → ST-HC (AIME) | 10.0% → 33.3% → 33.3% | Identical performance from synthetic vs emergent traces |
| Wrong-answer ablation: ST-HC-W vs base (MATH500, 3B) | 48.2% vs 36.4% | +11.8pp from style alone, even with WRONG final answers |
| Wrong-answer ablation: ST-HC-W vs base (MATH500, 8B) | 62.8% vs 52.8% | +10.0pp from wrong-answer stylistic traces |
| Wrong-answer ablation: ST-HC-W vs base (MATH500, 32B) | 80.2% vs 76.8% | +3.4pp even at 32B scale |
| No-trace ablation: ST-NT vs base (MATH500, 3B) | 40.6% vs 36.4% | Only +4.2pp from correct answers alone (no traces) |
| Style > substance comparison (3B, MATH500) | ST-HC-W 48.2% > ST-NT 40.6% | Wrong answers + style beats correct answers + no style |
| SBS vs ST-HC (3B, MATH500) | 45.8% vs 64.2% | Generic CoT far worse than structured pivots; the specific style matters |
| Pivot presence in successful traces | 96.1% have ≥3 of 4 categories | Structural pattern is near-universal in successful R1 traces |
| GPT-4o teacher: base vs HC-prompted | 75.4% vs 81.2% (MATH500) | Even the teacher improves +5.8pp from the structured prompt |

---

## The Distribution-Matching Interpretation

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  WHY THIS MATTERS FOR THE THESIS                                     │
│                                                                      │
│  Teacher (R1)  ──generates──>  Reasoning Traces                      │
│                                    │                                 │
│                          ┌─────────┴──────────┐                      │
│                          │                    │                       │
│                     SUBSTANCE             STYLE                      │
│                     (semantic             (pivots,                    │
│                      reasoning)           structure,                  │
│                          │                length)                     │
│                          │                    │                       │
│                     Student learns:      Student learns:              │
│                     almost nothing       almost everything            │
│                          │                    │                       │
│                     Evidence:            Evidence:                    │
│                     ST-NT +4.2pp         ST-HC-W +11.8pp             │
│                                                                      │
│  The student model matches the OUTPUT DISTRIBUTION of the teacher.   │
│  That distribution is characterized by structural patterns           │
│  (token length, pivot frequency, backtracking markers), not by       │
│  "reasoning ability." The math is all you need.                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Relationship to Other Papers

### Supports (same finding, different method)
- **2305.18654 - Faith and Fate (Dziri et al.)**: linearized subgraph matching, not systematic reasoning. Style over Substance shows the *distillation* version: students match trace patterns, not reasoning procedures.
- **2410.05229 - GSM-Symbolic (Mirzadeh et al.)**: cited directly. LMs rely on memorized patterns rather than generalizable reasoning. Style replication is the distillation analogue.
- **2604.01193 - Self-Distillation Code Gen (#292)**: sibling distillation paper. SSD shows 62% gibberish data still improves code gen via distribution reshaping. Style over Substance shows style-only traces achieve same effect.
- **2601.19897 - SDFT (#342)**: the In-Context Assumption works because the model already had the distribution - conditioning just surfaces it. Style over Substance shows the *what* being surfaced is patterns, not reasoning.
- **2404.15758 - Dot by Dot (Pfau et al.)**: CoT benefits from computation, not task decomposition. Style traces provide computation tokens without meaningful decomposition.
- **2312.01552 - URIAL / Superficial Alignment**: alignment is surface-level pattern matching. Reasoning distillation is the same - surface-level style matching.

### Extends
- **Wei et al. 2023 - Chain of Thought**: CoT prompts improve performance. Style over Substance decomposes *what* about CoT helps: it's the structural markers, not the reasoning content.
- **DeepSeek R1 (2501.12948)**: R1's reasoning traces are the training data. This paper shows what students actually learn from them: style, not substance.

### Challenges
- **Claims that distillation transfers "reasoning ability"**: any paper claiming distilled models "learn to reason" from teacher traces is challenged by the finding that wrong-answer traces with correct style outperform correct-answer traces without style.

---

## REBUTTALS

### Known Rebuttals
None identified at time of analysis (Apr 2025 paper). Likely future challenges:

1. **Benchmark-specific effect**: MATH500, AIME, and GPQA are all well-studied benchmarks. The style effect might not transfer to truly novel problems.
2. **The traces still contain correct intermediate reasoning**: the authors acknowledge "we do not claim that style alone improves reasoning as the body of the traces still contains correct reasoning up until the answer." The ST-HC-W ablation modifies only the final answer, not intermediate steps.
3. **Scale effects unclear**: at 32B, the gap between ST and ST-HC widens (89.0% vs 83.4%), suggesting substance matters more at scale.

### Limitations (Authors Acknowledge)
1. **Traces contain correct intermediate steps**: "we do not claim that style alone improves reasoning as the body of the traces still contains correct reasoning up until the answer" - the style effect is additive, not exclusive.
2. **Domain coverage**: math-heavy evaluation; science and coding benchmarks less emphasized.
3. **Teacher quality confound**: GPT-4o is not a trivial model; ST-HC traces still carry some genuine reasoning from a strong model, just without the R1-style emergent trace structure.
4. **Limited model families tested**: 3 models from 3 families. Effect might vary across architectures.
5. **Single evaluation metric**: pass@1 accuracy. No analysis of pass@k, diversity, or calibration.

---

## Key Quotes

1. > "We find that models trained on the synthetic traces achieve comparable performance, indicating that distilled reasoning abilities rely significantly on surface-level patterns."

2. > "Surprisingly, we observe an increase in performance even when the synthetic traces are altered to lead to the wrong answer."

3. > "These results underscore that stylistic consistency significantly influences LM reasoning capabilities, providing an explanation for the effectiveness of reasoning distillation from RLMs to regular LMs."

4. > "Unlike traditional distillation methods relying predominantly on sample correctness, our results suggest that explicitly transferring a specific output structure is important."

5. > "Models finetuned on ST-HC-W consistently outperform the base instruction-tuned models across all evaluation benchmarks. This demonstrates that learning the stylistic patterns of reasoning enhances problem-solving capabilities even when the training data's final conclusion is incorrect."

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [ ] Paper graph updated
