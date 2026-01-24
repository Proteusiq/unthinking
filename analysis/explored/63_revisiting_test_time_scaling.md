# Paper Analysis: Revisiting the Test-Time Scaling of o1-like Models

## Metadata
- **arXiv ID**: 2502.12215
- **Title**: Revisiting the Test-Time Scaling of o1-like Models: Do they Truly Possess Test-Time Scaling Capabilities?
- **Authors**: Zhiyuan Zeng, Qinyuan Cheng, Zhangyue Yin, Yunhua Zhou, Xipeng Qiu
- **Date**: February 2025
- **Venue**: Fudan University, Shanghai AI Laboratory
- **Code**: https://github.com/ZhiYuanZeng/test-time-scaling-eval

---

## Core Claims

1. **Longer CoTs do NOT consistently improve accuracy**: For QwQ, DeepSeek-R1, and LIMO, correct solutions are SHORTER than incorrect ones for the same questions
2. **Sequential scaling fails**: Extending CoT length through self-revision often DEGRADES performance
3. **Self-revision is the bottleneck**: Models are more likely to change correct→incorrect than incorrect→correct during revision
4. **Parallel scaling beats sequential**: Sampling multiple short solutions outperforms generating one long solution
5. **"Shortest Majority Vote" outperforms standard majority vote**: Prioritizing shorter solutions improves accuracy

---

## Methodology

### Models Tested
- QwQ (32B)
- DeepSeek-R1 (671B)
- DeepSeek-R1-Distill-32b
- DeepSeek-R1-Distill-14b
- DeepSeek-R1-Distill-1.5b
- LIMO

### Benchmarks
- MATH-500
- AIME (90 questions from 2022-2024)
- Omini-MATH (500 question sample)
- GPQA Diamond (198 questions)

### Experimental Design
1. **Length-accuracy analysis**: Sample 5 solutions per question, rank by length, compare accuracy
2. **Self-revision analysis**: Prompt models to continue thinking with "Wait" or "Alternatively"
3. **Revision direction**: Track correct→wrong vs wrong→correct changes
4. **Sequential vs parallel**: Compare extending one solution vs sampling multiple

---

## Key Evidence

### Finding 1: Correct Solutions Are SHORTER Than Incorrect

| Model | Dataset | Correct Length (avg) | Incorrect Length (avg) |
|-------|---------|---------------------|----------------------|
| QwQ | AIME | ~6K tokens | ~8K tokens |
| R1-671b | AIME | ~5K tokens | ~6K tokens |
| R1-Distill-1.5b | AIME | ~9K tokens | ~12K tokens |
| LIMO | AIME | ~5K tokens | ~7K tokens |

**Key Quote**: "For QwQ, R1 and LIMO, across all model sizes and datasets, the length of correct solutions is consistently shorter than that of incorrect solutions."

### Finding 2: No Scaling Benefit from Longer CoT

| Solution Group | QwQ AIME Accuracy | R1-671b AIME Accuracy |
|----------------|-------------------|----------------------|
| Shortest (rank 1) | ~45% | ~75% |
| Rank 2 | ~44% | ~74% |
| Rank 3 | ~43% | ~73% |
| Rank 4 | ~42% | ~72% |
| Longest (rank 5) | ~40% | ~70% |

**Key Quote**: "We do not observe a consistent improvement in accuracy for either QwQ or R1 as solution length increases... In some cases, we even observe an inverse scaling phenomenon, where accuracy decreases with increasing CoT length."

### Finding 3: Self-Revision HURTS Performance

After prompting models to continue reasoning for 40 additional steps:

| Model | Initial Accuracy | After 40 Revisions |
|-------|-----------------|-------------------|
| QwQ | 40% | ~35% (decreased) |
| R1-Distill-1.5b | 25% | ~20% (decreased) |
| R1-Distill-32b | 60% | ~62% (slight increase then oscillation) |
| LIMO | ~55% | ~55-58% (oscillation) |

### Finding 4: Revision Direction is BIASED TOWARD ERRORS

| Model | Wrong→Correct | Correct→Wrong | Net Effect |
|-------|---------------|---------------|------------|
| QwQ | 12% | 18% | **-6% (harmful)** |
| R1-Distill-1.5b | 8% | 15% | **-7% (harmful)** |
| R1-Distill-32b | 14% | 12% | +2% (slight benefit) |
| R1-Distill-14b | 13% | 11% | +2% (slight benefit) |
| LIMO | ~15% | ~13% | +2% (slight benefit) |

**Critical Finding**: "Both QwQ and R1-Distill-1.5b showed a higher propensity to change correct answers to incorrect ones rather than vice versa."

### Finding 5: Parallel Scaling Outperforms Sequential

**Coverage Comparison** (pass@k on AIME):
- Sequential scaling plateaus quickly; parallel scaling continues improving
- For same compute budget, parallel provides larger coverage gains

**Accuracy with Selection Methods** (Table 2, 16 solutions on AIME):

| Model | Majority Vote | Shortest | Shortest MV |
|-------|--------------|----------|-------------|
| R1-Distill-32b | 72.88% | 61.99% | **73.77%** |
| R1-Distill-14b | 71.77% | 62.00% | 71.55% |
| R1-Distill-1.5b | 40.00% | 26.22% | **42.22%** |
| QwQ | 51.33% | 40.88% | 50.88% |
| LIMO | 68.88% | 62.22% | **70.00%** |

**Key Quote**: "Parallel scaling not only achieves the better coverage (pass@k score) but also offers superior scalability compared to sequential scaling."

### Finding 6: "Shortest Majority Vote" Method

The paper proposes a novel selection method:

**Score formula**: s_i = c_i / log(l_i)
- c_i = count of solutions with answer i
- l_i = average length of solutions with answer i

**Key insight**: Correct answers tend to be in categories with MORE solutions AND SHORTER lengths.

When only 2 solutions available (Table 2):

| Model | MV | Shortest | Shortest MV |
|-------|-----|----------|-------------|
| LIMO (AIME) | 56.66% | **60.88%** | **60.88%** |
| R1-32b (AIME) | 59.77% | **62.22%** | **62.22%** |

With limited samples, "Shortest" alone outperforms Majority Vote - confirming shorter = better.

---

## Relationship to Other Papers

### Supports
- **Illusion of Thinking (2506.06941)**: Both show performance doesn't scale with thinking time; confirms reasoning cliff
- **OMEGA (2506.18880)**: Same finding: extended thinking can HURT (38% "correct→incorrect" overthinking)
- **Effective Without Thinking (2504.09858)**: Both show shorter thinking can be better
- **Illusions of Reflection (2510.18254)**: Same finding: reflection produces fluent text, not correction
- **No Free Lunch (2506.17219)**: Self-revision without external feedback fails

### Challenges
- **DeepSeek-R1 Technical Report (2501.12948)**: Questions whether test-time scaling provides genuine benefits
- **s1 (2501.19393)**: Complicates claims about test-time scaling advantages

### Extends
- **Huang et al. (2024) on self-revision**: Confirms models cannot effectively self-refine without external feedback
- **Kamoi et al. (2024)**: Same conclusion on self-revision limitations

### Concurrent Work
- **Wang et al. (2025) "Underthinking"**: Attributes phenomenon to models reaching correct intermediate solutions but then deviating
- **Chen et al. (2024), Luo et al. (2025)**: Find reducing CoT length doesn't hurt performance

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- Paper is recent (Feb 2025) - no direct rebuttals found
- DeepSeek-R1 report claims sequential scaling works (Appendix A addresses this)

### Authors' Response to R1 Report
From Appendix A: "Is Invalid Scaling Phenomenon Conflict to Findings of R1 Technical Report?"
- R1 report shows average CoT length increases with problem difficulty
- Authors clarify: this shows models ADAPT length to difficulty, not that longer = better
- Key distinction: correlation between difficulty and length ≠ causal benefit from length

### Potential Counter-Arguments

1. **Token limit effects**: Authors test up to 32K tokens and show 16K is sufficient threshold
2. **Model-specific**: Results may not generalize to o1 itself (API access limited)
3. **Task-specific**: Results on math benchmarks may not generalize to other domains
4. **Prompt sensitivity**: "Wait"/"Alternatively" prompting may not capture natural revision

### Limitations (Authors Acknowledge)

From the paper's Limitations section:

1. "Given the considerable cost of R1-671b, evaluation on it was limited to the experiments in Figures 1 and 2, whereas distilled R1 was utilized for all subsequent [experiments]."

2. "Our experimental framework was limited to static model checkpoints. Future research should investigate test-time scaling behavior using dynamic checkpoints in reinforcement learning settings."

3. "While the proposed shortest majority method may have limited applicability for models with strong sequential-scaling capabilities, solution length remains a valuable guidance signal..."

4. No access to o1's actual test-time scaling behavior (only open-source successors)

5. Focus on math/science benchmarks (AIME, MATH-500, Omini-MATH, GPQA)

---

## Key Quotes

### On the failure of sequential scaling
> "Contrary to expectations, our analysis reveals that longer CoTs do not consistently improve accuracy of these o1-like models. Notably, we found that the average length of correct solutions is shorter than that of incorrect ones for the same questions."

### On self-revision being harmful
> "Most revisions retained the original answers, and more concerning, both QwQ and R1-Distill-1.5b showed a higher propensity to change correct answers to incorrect ones rather than vice versa."

### On the mechanism of failure
> "Long solutions contain more self-revisions ("Wait", "Alternatively"), which often lead to performance degradation."

### On parallel vs sequential
> "Our comparative analysis of sequential and parallel scaling revealed that parallel scaling not only achieves the better coverage (pass@k score) but also offers superior scalability compared to sequential scaling."

### On implications for test-time compute
> "These findings cast doubt on the presumed test-time scaling capabilities of o1-like models, challenging the assumption that extended reasoning chains inherently yield superior problem-solving performance."

---

## Relevance to Thesis

**STRONGLY SUPPORTS** the thesis that LLM reasoning is practical but predictive, not genuinely generative.

### Key Evidence for Thesis

1. **Correct answers are SHORTER**: If reasoning were genuine computation, more computation should yield better answers. The inverse pattern (shorter = more accurate) suggests models "know" the answer early and extended thinking introduces noise.

2. **Self-revision is harmful**: Genuine reasoners should be able to catch and correct errors. The fact that revision more often changes correct→incorrect than incorrect→correct suggests the "revision" is not genuine error-detection but pattern-matching that degrades.

3. **Parallel > Sequential**: If sequential thinking were genuine computation, it should compound. Instead, sampling multiple independent attempts works better—consistent with pattern matching where diversity helps coverage.

4. **No monotonic scaling**: Genuine computation should show monotonic improvement with more compute. The oscillation and degradation patterns are inconsistent with algorithmic reasoning.

### Connection to Other Thesis Evidence

| This Paper | Related Evidence |
|------------|------------------|
| Correct solutions shorter | OMEGA: 38% "overthinking" errors |
| Self-revision harmful | Illusions of Reflection: 85% same failure |
| Parallel > Sequential | Effective Without Thinking: NoThinking wins |
| No scaling benefit | Illusion of Thinking: complexity ceiling |

### Surfacing Hypothesis Implications

This paper provides nuanced support for the surfacing hypothesis:
- Extended thinking doesn't CREATE new capability
- Parallel sampling SURFACES different cached patterns
- "Shortest Majority Vote" works because correct answers are already accessible early

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
