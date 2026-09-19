# Paper 394: Prediction-Only Distillation in Linear and Logistic Regression

## Metadata
- **arXiv**: 2607.15450 (v1, 16 Jul 2026)
- **Title**: Prediction-Only Distillation in Linear and Logistic Regression
- **Authors**: Hien Dang, Pratik Patil, Alessandro Rinaldo (Department of Statistics and Data Sciences, University of Texas at Austin)
- **Categories**: math.ST, cs.LG, stat.ML
- **Code**: https://github.com/hhd357/prediction_only_mixing_distillation
- **Stance**: SUPPORTS - distillation is shown to require nothing but query access to a teacher, and the identical procedure is analyzed in ridge regression and run on frozen ResNet features
- **Cluster**: `distillation`
- **Role**: Establishes that the distillation loop is not special to language models. The same procedure, same estimator, same tuning scalar

---

## Core Finding

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  THE TEACHER IS A QUERY ORACLE. NOTHING ELSE IS NEEDED.              │
│                                                                      │
│  What the student is given:                                          │
│    - the ability to call teacher(x) and read the answer              │
│    - a pile of unlabeled inputs                                      │
│                                                                      │
│  What the student is NOT given:                                      │
│    - the teacher's weights            ("its form is unknown")        │
│    - the teacher's training data      ("no longer available")        │
│    - the teacher's hyperparameters    (lambda_t unknown)             │
│    - any ground-truth labels          (none, anywhere)               │
│    - inputs that resemble the task    (isotropic Gaussian works)     │
│                                                                      │
│  Corollary 4.5: draw the fresh inputs from N(0, I_p) - pure          │
│  isotropic noise, unrelated to anything the teacher ever saw -       │
│  and the distilled mixture still strictly beats the teacher for      │
│  EVERY student penalty lambda_s > 0.                                 │
│                                                                      │
│  The capability travels entirely on the output surface.              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Core Claims

1. **Distillation works in the prediction-only regime.** With only query access to a fixed predictor and a stream of fresh unlabeled covariates - no original data, no parameters, no labels - a student can be trained and combined with the teacher to strictly reduce risk.
2. **Strict improvement is generic.** The mixed student beats the teacher for almost every pair of teacher and student regularization levels, including when the fresh covariates are out-of-distribution and even when their covariance is isotropic.
3. **The gain is a one-dimensional post-hoc aggregation.** The whole adaptation reduces to a single real scalar applied after training, with no additional model fitting.
4. **That scalar cannot be learned without labels.** The optimal mixing weight is information-theoretically unidentifiable from teacher queries plus unlabeled covariates; a small labeled calibration set is mandatory.
5. **More unlabeled data is not monotonically better.** The optimal risk is unimodal, not monotone, in the amount of fresh unlabeled data.
6. **The same procedure runs on deep features.** The analysis is carried out in ridge and logistic regression, then applied unchanged to linear probing on frozen ResNet-34 ImageNet features across Caltech-101, Caltech-256, and CIFAR-100.

---

## Methodology

### The loop, stated plainly

```
   1.  X~        <- collect fresh unlabeled inputs (may be OOD, may be noise)
   2.  y1        <- teacher(X~)              query the oracle
   3.  student   <- fit(X~, y1)              pseudo-labels are the only target
   4.  output    <- (1-xi)*teacher + xi*student      one scalar, post hoc
```

Step 3 is the pure-distilled (PD) student: a ridge fit whose *labels are the teacher's predictions*. Step 4 is the contribution - an affine, deliberately non-convex combination. The mixing weight `xi` is real-valued and "need not lie in [0,1]," and empirically it very often does not.

### What is never used

The paper is explicit that the teacher is a black box:

| Quantity | Available? |
|----------|-----------|
| Teacher's predictions on queried points | Yes - the only channel |
| Teacher's functional form | No - "its form is unknown" |
| Teacher's regularization level `lambda_t` | No |
| Teacher's original labeled training data | No - "no longer available" |
| Ground-truth labels on the fresh inputs | No |
| Fresh inputs drawn from the teacher's distribution | Not required |

### Setup

- **Regression experiments**: Communities and Crime (n_t=400, n_s=800, p=99), Blog Feedback (n_t=2619, n_s=5240, p=280), Airfoil (n=1503, p=5). Each run twice: fresh covariates in-distribution, and fresh covariates drawn i.i.d. from N(0, I_p).
- **Classification / linear probing**: frozen ResNet-34 pretrained on ImageNet, softmax linear head, 200 epochs SGD, momentum 0.9, LR decay 0.98, initial LR 0.001 (teacher) / 0.05 (student), NVIDIA T4.
  - Caltech-101: n_t=1500, n_s=4500, n_cal=500, 2000 test
  - Caltech-256: n_t=5000, n_s=15000, n_cal=1000, 6000 test
  - CIFAR-100: n_t=5000, n_s=15000, n_cal=1000, 9000 test
- **Corruption**: teacher trained on corrupted one-hot labels at rate rho; student trained on the teacher's soft outputs with the same penalty. Random corruption draws the wrong label uniformly; hierarchical corruption draws it from the same CIFAR-100 superclass.
- **Mixing weight**: selected on the calibration set over a fine grid on [-20, 20].

---

## Key Evidence

### Finding 1: Linear probing on frozen ResNet features - CIFAR-100, hierarchical corruption rho = 0.2

| lambda | 1e-4 | 1e-3.5 | 1e-3 | 1e-2.5 | 1e-2 | 1e-1.5 | 1e-1 | 1e-0.5 | 1e0 |
|--------|------|--------|------|--------|------|--------|------|--------|-----|
| Teacher (%) | 52.8 | 52.9 | 52.9 | 53.2 | 54.0 | 56.1 | **57.7** | 50.4 | 35.9 |
| PD student (%) | 53.1 | 53.8 | 55.0 | 56.1 | **57.3** | 56.8 | 47.3 | 20.8 | 2.3 |
| Optimal PMSD (%) | 54.5 | 54.9 | 55.6 | 56.6 | 57.4 | 57.3 | **59.0** | 54.1 | 43.1 |
| estimated xi | 10.5 | 4.1 | 2.1 | 1.3 | 0.9 | 0.7 | −17.8 | −15.0 | −20.0 |

At `lambda = 1e0` the PD student collapses to **2.3%** while the mixture recovers **43.1%** - driven entirely by a mixing weight pinned at the grid boundary, **−20.0**.

### Finding 2: The pattern holds across seven tables

| Dataset | rho | Teacher best | PD best | PMSD best | PMSD over teacher |
|---------|-----|--------------|---------|-----------|-------------------|
| Caltech-101 | 0.2 | 72.8 | 73.6 | **76.1** | +3.3 |
| Caltech-101 | 0.4 | 69.3 | 69.4 | **72.7** | +3.4 |
| Caltech-101 | 0.6 | 59.8 | 58.3 | **65.5** | **+5.7** |
| Caltech-256 | 0.2 | 67.5 | **68.6** | 68.5 | +1.0 |
| Caltech-256 | 0.4 | 60.3 | 60.9 | **61.5** | +1.2 |
| Caltech-256 | 0.6 | 48.0 | 48.3 | **51.5** | +3.5 |
| CIFAR-100 (random) | 0.4 | 54.2 | 54.0 | **56.1** | +1.9 |

PMSD beats the teacher's best in all seven and the PD student's best in six of seven (the exception: Caltech-256 at rho=0.2, 68.6 vs 68.5). Gains grow with corruption rate on the Caltech sets.

### Finding 3: Improvement with zero new information

The PD student sees **no ground truth at any point**. It is fit purely to the teacher's outputs. Yet it frequently exceeds the teacher - e.g. Caltech-101 rho=0.4, PD 69.4 vs teacher 69.3; CIFAR-100 hierarchical rho=0.4, PD 51.6 vs teacher 51.1.

The stated mechanism in Theorem 6.1 is not learning. It is averaging:

> self-distillation "induces label averaging among highly correlated instances"

A model that gains accuracy while receiving no information it did not already have is being smoothed, not taught.

### Finding 4: Distillation works on meaningless inputs

Corollary 4.5 covers fresh covariates drawn from an isotropic Gaussian - inputs with no relationship to the task or to the teacher's training distribution. Strict improvement holds for **all** `lambda_s > 0` whenever a single non-degeneracy sum is nonzero. The degenerate case requires a polynomial condition of degree at most `4m-1` to vanish, which the authors call "non-generic."

The regression figures instantiate this literally: panel (b) of Figures 8 through 13 draws the fresh unlabeled covariates i.i.d. from N(0, I_p), on both Communities and Crime and Blog Feedback, and the mixture still improves.

### Finding 5: The tuning scalar cannot be learned from the teacher

Proposition H.2 constructs a family of ground truths, indexed by `eta` over the whole real line, that are **observationally identical** given the teacher and the unlabeled sample, yet whose optimal mixing weights equal `eta`. Hence:

> "no estimator based only on unlabeled samples and teacher queries can be uniformly consistent for xi*"

and the authors flag the nature of the obstruction:

> "This is an information-theoretic limitation, not a computational one."

Theorem 5.1 supplies the fix: an independent labeled calibration set, three empirical averages, one closed-form plug-in. Consistency requires only that `n_cal` diverge - "no asymptotic condition involving p/n_cal is required... regardless of the growth rate of p." Calibration sizes used: n_cal = 200 (CIFAR-10), 524 (Blog Feedback), 76 (Airfoil).

### Finding 6: More unlabeled data can make it worse

Proposition H.1, in the isotropic same-penalty setting: the optimal risk is **strictly increasing on (0, 1+lambda) and strictly decreasing on (1+lambda, infinity)**, with a unique maximum at `gamma_s = 1 + lambda`.

```
  risk
   |          ,-.
   |        ,'   `.          <- peak at gamma_s = 1 + lambda
   |      ,'       `.
   |    ,'           `--.
   |__,'                  `----
   +------------------------------> gamma_s = p / n_s
     more unlabeled data <---
```

> "the optimal PMSD risk is not globally monotone in the amount of unlabeled data"

There is also a null case: at the ridge-optimal teacher penalty `lambda* = gamma_t * sigma^2 / r^2`, the gain is exactly zero for **every** amount of unlabeled data.

### Finding 7: Classification thresholds

| Theorem | Condition | Result |
|---------|-----------|--------|
| 6.1 | rho < 0.5 | PD student reaches 100(1−rho)% accuracy; some xi gives the mixture **100%** |
| 6.2 | rho < 0.5 | Removes the `rho_1` ceiling of prior work; mixture reaches **100%** |
| 6.3 | rho > 0.5 | PD student and twice-distilled student both reach **0%**; mixture with xi > 1 reaches **100%** |

Theorem 6.3 is the sharpest: when the teacher is wrong more often than right, distillation yields a student with **zero** accuracy, and the *only* thing that recovers it is extrapolating past the student with a scalar greater than 1. A dial, applied after the fact.

---

## Relevance to the Thesis

### The equivalence proof

The corpus argues that "reasoning" in LLMs is a fitted surface. The standing objection is that LLM distillation is doing something richer than classical estimator fitting. This paper is the cleanest available answer, because it carries a single procedure across the whole range without modification:

```
   ridge regression  ─┐
   logistic regression├─> SAME loop, SAME scalar, SAME guarantees
   frozen ResNet-34  ─┘
```

The theory is developed for linear and logistic regression. It is then applied unchanged to linear probing on deep network features, and the predicted behavior shows up in the accuracy tables. The analysis transfers because the object is the same object. Nothing about the procedure needed to know whether the thing being distilled was a violent-crime rate, an airfoil sound pressure level, or an image class.

### What "query access is sufficient" implies

The teacher's weights are unknown. Its training data is gone. Its hyperparameters are unknown. Its inputs need not be meaningful. Everything that makes the teacher *a particular model* is unavailable, and distillation still works. The only channel is `x -> y`.

If a capability survives transfer through a channel that carries nothing but the input-output map, then the capability is the input-output map.

### The knob

The single most telling empirical detail is the estimated mixing weight: it ranges from **+13.0** to the grid boundary **−20.0**, and negative values are common at higher penalties. A negative weight means the final predictor is extrapolated *away* from the student, past the teacher - a direction with no interpretation as combining two sources of knowledge. It is a variance-reduction dial being turned to whatever value a calibration set says minimizes residuals. That is the actual content of "the student learned from the teacher."

### Failure modes are estimator failure modes

| Failure | What kind of failure this is |
|---------|------------------------------|
| More unlabeled data raises risk (Prop H.1) | Aspect-ratio effect, peaking at `gamma_s = 1+lambda` |
| Zero gain at `lambda*` | The teacher is already at its stationary point |
| PD student at 2.3% (CIFAR-100, lambda=1) | Over-regularization collapse |
| Cannot beat an optimally tuned teacher | Shrinkage cannot add information |

None is an inferential mistake. Every one is a statement about a fit.

---

## REBUTTALS

### Known Rebuttals
None identified. Published July 2026; no arXiv responses found.

### Limits the Authors Themselves Impose

This paper constrains the thesis-relevant reading in ways worth stating plainly:

1. **Distillation is not free.** The headline "prediction-only" regime cannot tune itself. Labels are required for calibration, and the obstruction is information-theoretic.
2. **The gains are modest.** +1.0 to +5.7 accuracy points across the linear-probing tables. Real, replicated, not transformative.
3. **Nothing is recovered that the teacher lost.** "PMSD cannot in general recover the information in the original labeled sample." Fresh unlabeled data "need not recover information lost in the teacher, regardless of the fresh sample size."
4. **A strong geometric assumption carries the classification results.** Assumption B forces unit-norm features with exactly zero cross-class Gram entries and constant within-class correlation, chosen so that "the data separable with respect to their unobserved ground-truth classes" - i.e. a perfect classifier is assumed to exist. The authors defend it only by citing empirical validation on six datasets by Jeong and Chung (2025).
5. **Covariances must commute.** Assumption A(c) requires simultaneous diagonalizability of the teacher and fresh covariance matrices.
6. **The classification results are asymptotic population statements** with an idealized teacher making exactly `floor(n*rho)` errors per class.

### Counter-Considerations

The obvious objection to reading this as evidence for the thesis: linear and logistic regression are not language models, and demonstrating that *ridge* distillation is estimator arithmetic says nothing about whether *LLM* distillation is. That objection would be decisive if the paper stopped at theory. It does not - the same procedure is run on frozen ResNet-34 representations with the predicted qualitative behavior, which is the bridge. It remains true that no transformer is distilled here, and the extension to autoregressive generation is not made by these authors.

A second objection: "label averaging among correlated instances" is arguably what *any* learner does, including humans generalizing from examples, so calling it mere smoothing begs the question. The reply is narrower than the general claim - what this paper establishes is that the improvement requires no new information, and therefore cannot be the acquisition of anything. Whether the teacher's original capability is more than a surface is a separate question this paper does not settle.

---

## Relationship to Other Papers

### Supports
- **#392 Beyond Trajectory Imitation (2606.24064)**: the general case of what #392 observes. #392 finds that changing the label content changes what transfers; this paper shows the entire transfer is a function of the label surface and nothing else.
- **#384 Style over Substance (2504.01738)**: gives the statistical reason a student can improve on style-only traces with wrong answers - improvement from smoothing requires no correct information.
- **#395 Breaking the Token Ceiling (2609.12303)**: the engineering counterpart. This paper proves query access is sufficient in principle; #395 serializes exactly that query output to disk at exabyte scale and trains against it.

### Extends
- **#387 MiniLLM (2306.08543)**: MiniLLM optimizes the divergence used when a student fits a teacher's distribution. This paper strips the setting to its minimum - no data, no parameters, no labels - and asks what remains sufficient.
- **#292 Simple Self-Distillation (2604.01193)**, **#342 Self-Distillation for Continual Learning (2601.19897)**: supplies the theoretical account of why self-distillation gains appear at all, and bounds them (zero gain at the optimally tuned teacher).

### Challenges
- **#385 Distilled Reasoning Representations (2503.03730)**: that paper looks for representational signatures of distilled reasoning. This one shows the transfer channel carries only predictions, which constrains what any such signature can be evidence of.

---

## Key Quotes

> "In many practical deployments, however, the labeled training data are no longer available, and one has access only to the trained predictor and fresh unlabeled covariates."

> "In the prediction-only regime considered here, we can query the teacher at any input but need not know the explicit form of f_{lambda_t} or its regularization parameter lambda_t. Thus, we observe only the teacher's predictions at the queried points."

> "We show that this risk is strictly smaller than the teacher risk for almost every pair of teacher and student regularization levels, including when the fresh covariates are out-of-distribution and even when their covariance is isotropic."

> "This approach is operationally attractive: it requires no access to the original labeled data and reduces adaptation to a one-dimensional post hoc aggregation problem, with no additional model fitting."

> "Although its form is unknown, we can query its predictions."

> "This is an information-theoretic limitation, not a computational one."

> "prediction mixing can exploit fresh unlabeled data to improve a fixed teacher, and a small labeled sample can make this improvement operational, but PMSD cannot in general recover the information in the original labeled sample."

---

## Interaction Diagram

```
┌──────────────────────────────────────────────────────────────────────────┐
│          Prediction-Only Distillation (Jul 2026)                         │
│          Dang, Patil, Rinaldo · UT Austin · math.ST                      │
│                                                                          │
│  CHANNEL: query access only. No weights, no data, no labels, no          │
│           requirement that the inputs mean anything                      │
│  RESULT:  strict improvement for almost every penalty pair               │
│  COST:    one scalar, unidentifiable without labels; unimodal in n_s     │
│  RANGE:   ridge -> logistic -> frozen ResNet-34 linear probing           │
└──────────────────────────────────────────────────────────────────────────┘
        │                      │                         │
        │ statistical basis    │ engineering             │ constrains
        │ for                  │ counterpart             │
        ▼                      ▼                         ▼
┌──────────────────┐  ┌──────────────────────┐  ┌─────────────────────────┐
│ Style over       │  │ Breaking the Token   │  │ Distilled Reasoning     │
│ Substance (#384) │  │ Ceiling (#395)       │  │ Representations (#385)  │
│                  │  │                      │  │                         │
│ wrong answers    │  │ dumps the query      │  │ transfer channel is     │
│ still help:      │  │ outputs to disk at   │  │ predictions only -      │
│ smoothing needs  │  │ exabyte scale, fits  │  │ bounds what a repr.     │
│ no correctness   │  │ against the file     │  │ signature can show      │
└──────────────────┘  └──────────────────────┘  └─────────────────────────┘
```

---

## Status
- [x] Read complete
- [x] Core claims extracted
- [x] Key evidence with numbers
- [x] Rebuttals checked
- [x] Paper graph updated
