# Paper Analysis: Lexical Hints of Accuracy in LLM Reasoning Chains

## Metadata
- **arXiv ID**: 2508.15842
- **Title**: Lexical Hints of Accuracy in LLM Reasoning Chains
- **Authors**: Arne Vanhoyweghen, Brecht Verbeken, Andres Algaba, Vincent Ginis
- **Date**: August 2025
- **Venue**: arXiv preprint (Vrije Universiteit Brussel, Harvard University)

---

## Core Claims

1. **Lexical uncertainty markers in CoT predict errors** — words like "guess", "stuck", "hard", "likely", "probably" reduce accuracy odds by up to 40%
2. **CoT length only predicts accuracy on intermediate-difficulty benchmarks** — no signal on very hard tasks (HLE: ~9% accuracy)
3. **Models are poorly calibrated** — report high confidence even when wrong (Claude 3.7 Sonnet: 84.6% calibration error on HLE)
4. **Uncertainty markers are MORE predictive than confidence markers** — errors easier to predict than correct responses
5. **Simple lexical rules outperform sophisticated confidence-based schemes** — just 5 "harmful" words achieve MCC=0.215-0.305

---

## Methodology

### Models & Benchmarks
- **Models**: DeepSeek-R1, Claude 3.7 Sonnet
- **Benchmarks**: 
  - Omni-MATH (4,428 math problems, ~70% accuracy — saturated)
  - Humanity's Last Exam (HLE) (2,088 questions, ~9% accuracy — frontier)

### Analysis Features
1. **CoT length** (word count)
2. **Intra-CoT sentiment volatility** (emotional shifts during reasoning)
3. **Lexicographic analysis** (individual word impact on accuracy)
4. **Hedging rate** (proportion of sentences with hedging expressions)

### Key Finding: "Harmful" Words
Words most strongly associated with REDUCED accuracy:
- **Uncertainty**: "guess", "likely", "probably", "possibly"
- **Difficulty**: "hard", "complex", "complexity"
- **Confusion**: "stuck", "miss", "depend", "beyond", "help", "direction"

---

## Key Evidence

### Poor Calibration (Critical for Thesis)
| Dataset | Model | Accuracy | Calibration Error |
|---------|-------|----------|-------------------|
| HLE | DeepSeek-R1 | 8.6% | **78.1%** |
| HLE | Claude 3.7 Sonnet | 9.2% | **84.6%** |
| Omni-MATH | DeepSeek-R1 | 72.5% | 20.1% |
| Omni-MATH | Claude 3.7 Sonnet | 69.1% | 29.0% |

**Key insight**: Models report ~90% confidence while achieving ~9% accuracy on HLE.

### Lexical Predictors of Errors
- Hedging correlation with errors:
  - DeepSeek on Omni-MATH: r = -0.24 (p<0.001)
  - Claude on Omni-MATH: r = -0.14 (p<0.001)
  - DeepSeek on HLE: r = -0.10 (p<0.001)
  
- **"Harmful" words reduce accuracy by up to 40%** relative to baseline

### CoT Length: NOT Universally Predictive
- **Omni-MATH**: Longer CoT = lower accuracy (Claude loses 3%/1000 words, DeepSeek loses 6.2%)
- **HLE**: NO relationship between length and accuracy

**Quote**: "CoT length predicts correctness only for benchmarks of intermediate difficulty—that is, tasks within the model's demonstrated capabilities but not yet saturated."

### Prediction Performance
- Simple 5-word rule (mark wrong if ANY harmful word appears):
  - HLE: MCC = 0.215
  - Omni-MATH: MCC = 0.305
- Self-reported confidence thresholding:
  - HLE: MCC = 0.085
  - Omni-MATH: MCC = 0.065

**Lexical markers are 2.5-4.7x more predictive than self-reported confidence.**

---

## Relationship to Thesis

### STRONGLY SUPPORTS the thesis:

1. **CoT as surface signaling, not deep reasoning**: The fact that surface-level lexical markers ("guess", "stuck") predict errors better than the model's own confidence indicates the CoT is a surface-level artifact, not a faithful trace of reasoning.

2. **Metacognitive incompetence**: 84.6% calibration error means models have NO IDEA when they're wrong. If they could genuinely reason, they would have better metacognition about their own uncertainty.

3. **Pattern-matching signatures**: The "harmful" words are exactly what a pattern-matching system would produce when it fails to find a good pattern match — it hedges and expresses confusion. A genuine reasoner might have different signatures.

4. **Faithfulness problems**: The paper explicitly notes "an LLM's CoT may not always faithfully reflect the model's reasoning process" — this is central to the thesis.

5. **Key quote**: "This miscalibration masks silent failure modes and undermines the reliability of LLMs in open-ended settings."

### Implications for "Alignment as Mascara":

The Claude vs DeepSeek comparison is revealing:
- Claude produces **longer, more optimistic** CoTs
- But has **WORSE calibration** (84.6% vs 78.1% on HLE)
- Same lexical uncertainty fingerprint despite different styles

**This supports "alignment as mascara"** — Claude's more polished, confident presentation is cosmetic, not substantive. The underlying uncertainty pattern is the same.

---

## Relationship to Other Papers

### Supports
- **Paper 129** (Overthinking in LRMs): Both find CoT length inversely correlated with accuracy
- **Paper 130** (Underthinking in LRMs): Complements findings on CoT length dynamics
- **Paper 122** (Illusions of Confidence): Both document severe miscalibration
- **Paper 136** (Chain of Thoughtlessness): Both show CoT doesn't reliably help on hard tasks
- **Paper 132** (Stop Anthropomorphizing): Supports that CoT tokens ≠ reasoning traces

### Extends
- **Paper 135** (Demystifying Long CoT): This paper provides lexical analysis that 135 lacks
- **Paper 09** (Reasoning Models Don't Say What They Think): Adds calibration evidence

### Challenges
- Papers claiming CoT improves reasoning — this shows CoT is often just hedging

---

## REBUTTALS TO THIS PAPER

### Search for Direct Rebuttals
- No direct arXiv rebuttals found (paper is recent: August 2025)

### Potential Counter-Arguments
1. **"Harmful words correlate with hard problems, not model uncertainty"**: The authors acknowledge this: "correlation is not causation: those uncertainty markers could simply be more common around tougher, hidden problems in general."

2. **"RLHF suppresses true uncertainty expression"**: The paper notes Claude's optimism bias may be "an alignment artefact" — models may be trained NOT to express uncertainty even when uncertain.

3. **"Simple lexical rules might not generalize"**: Cross-benchmark performance is lower than in-benchmark, suggesting some overfitting to specific benchmark characteristics.

### Limitations (Authors Acknowledge)
- English-only analysis
- Fixed hedging lexicon
- OpenAI o3-mini used for sentiment analysis (brings its own biases)
- HLE grading depends on LLM-human agreement

---

## Key Quotes

1. **On miscalibration**: "On benchmarks where LLMs currently achieve low accuracy, such as Humanity's Last Exam (HLE), they often report high self-confidence, reflecting poor calibration."

2. **On lexical predictors**: "Tokens such as guess, stuck, and hard reduce accuracy odds by up to 40% relative to baseline."

3. **On CoT length**: "CoT length predicts correctness only for benchmarks of intermediate difficulty—that is, tasks within the model's demonstrated capabilities but not yet saturated."

4. **On unfaithfulness**: "Although it has been shown that an LLM's CoT may not always faithfully reflect the model's reasoning process..."

5. **On uncertainty asymmetry**: "Uncertainty indicators in the CoT are consistently more salient than high-confidence markers, making errors easier to predict than correct responses."

6. **On practical implications**: "A lightweight rule, i.e. mark an answer wrong if any of the top 5 harmful words appears in its CoT, otherwise classify as correct, achieves MCC = 0.215 on HLE and 0.305 on Omni-Math."

---

## Critical Assessment

### What this paper shows:
1. Surface-level lexical features predict correctness better than sophisticated methods
2. CoT is a noisy, often unfaithful signal of underlying computation
3. Models are severely miscalibrated — they don't know what they don't know
4. Longer CoT ≠ better reasoning (especially on hard tasks)

### Implications for the thesis:
- **Strong support**: If reasoning were genuine, we'd expect:
  - Good metacognition (calibration)
  - Faithful CoT that reflects actual reasoning steps
  - Improvement with more "thinking" (longer CoT)
  
  Instead we see:
  - Terrible metacognition (80%+ calibration error)
  - Surface lexical markers better than model confidence
  - No benefit from longer CoT on hard problems

### The "guess/stuck/hard" pattern:
This is exactly what pattern-matching looks like when it fails:
- Can't find a good match → expresses uncertainty via learned phrases
- These phrases are TRAINED IN from human data expressing uncertainty
- The model doesn't "feel" uncertain — it produces uncertainty tokens when pattern matching fails

---

## Status
- [x] Read complete (HTML version)
- [x] Core claims extracted
- [x] Methodology documented
- [x] Key evidence with numbers
- [x] Cross-references identified
- [x] **Rebuttals checked**
- [x] **Paper graph updated**
