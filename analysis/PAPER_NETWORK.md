# Paper Network Visualization

## Overview
This document provides a visual network of how the 83 analyzed papers connect to each other.

---

## Core Thesis Papers (Hubs)

These papers are most frequently referenced by others:

```
                                    ┌─────────────────────────────┐
                                    │     FAITH AND FATE          │
                                    │     (2305.18654)            │
                                    │     Compositional failures  │
                                    │     Error propagation       │
                                    └─────────────┬───────────────┘
                                                  │
                    ┌─────────────────────────────┼─────────────────────────────┐
                    │                             │                             │
                    ▼                             ▼                             ▼
    ┌───────────────────────┐     ┌───────────────────────┐     ┌───────────────────────┐
    │   GSM-SYMBOLIC        │     │   ILLUSION OF         │     │   OMEGA               │
    │   (2410.05229)        │     │   THINKING            │     │   (2506.18880)        │
    │   Surface brittleness │     │   (2506.06941)        │     │   Compositional OOD   │
    └───────────────────────┘     │   Complexity collapse │     └───────────────────────┘
                                  └───────────────────────┘
```

---

## Rebuttal Network

```
ILLUSION OF THINKING (2506.06941)
        │
        │◄──── rebuts ────┐
        │                 │
        ▼                 │
┌───────────────┐   ┌─────┴─────────┐
│ AGENTIC GAP   │   │ THINKING      │
│ (2506.18957)  │   │ ISN'T ILLUSION│
│ "execution    │   │ (2507.17699)  │
│  gap"         │   │ "tools help"  │
└───────┬───────┘   └───────────────┘
        │
        │◄──── counter-rebuts ────┐
        │                         │
        ▼                         │
┌───────────────────────┐   ┌─────┴─────────────────┐
│ LIMITS OF INNATE      │   │ LIMITS OF EMERGENT    │
│ PLANNING (2511.21591) │   │ REASONING AGENTIC     │
│ "tools don't always   │   │ (2510.15974)          │
│  help"                │   │ "agentic makes worse" │
└───────────────────────┘   └───────────────────────┘
```

---

## Faithfulness Research Cluster

```
                    ┌─────────────────────────┐
                    │   MEASURING             │
                    │   FAITHFULNESS          │
                    │   (2307.13702)          │
                    │   [Foundational]        │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ COT IN WILD   │     │ REASONING     │     │ FAITHCOT-     │
│ (2503.08679)  │     │ MODELS DON'T  │     │ BENCH         │
│ Natural tests │     │ SAY           │     │ (2510.04040)  │
└───────────────┘     │ (2505.05410)  │     │ Instance-level│
                      └───────┬───────┘     └───────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌───────────────────┐         ┌───────────────────┐
    │ COT MONITORABILITY│         │ ILLUSIONS OF      │
    │ (2510.27378)      │         │ REFLECTION        │
    │ Verbosity metric  │         │ (2510.18254)      │
    └───────────────────┘         └───────────────────┘
```

---

## RL and Surfacing Cluster

```
                    ┌─────────────────────────┐
                    │   INTERPLAY             │
                    │   (2512.07783)          │
                    │   "RL surfaces,         │
                    │    doesn't create"      │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ DEEPSEEK-R1   │     │ s1            │     │ NO FREE LUNCH │
│ (2501.12948)  │     │ (2501.19393)  │     │ (2506.17219)  │
│ RL training   │     │ Budget forcing│     │ RL limits     │
└───────┬───────┘     └───────────────┘     └───────────────┘
        │
        ├─────────────────────────────────────────────┐
        │                                             │
        ▼                                             ▼
┌───────────────────┐                     ┌───────────────────┐
│ HOW LLMS LEARN    │                     │ PCL-REASONER      │
│ TO REASON         │                     │ (2601.14716)      │
│ (2509.23629)      │                     │ Offline RL        │
└───────────────────┘                     └───────────────────┘
```

---

## OOD/Compositional Failure Cluster

```
                    ┌─────────────────────────┐
                    │   PLANNING GAP          │
                    │   (2601.14456)          │
                    │   ID: 82.9% → OOD: 0%   │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ COMPOSITIONAL │     │ COT MIRAGE    │     │ BEYOND        │
│ ARC           │     │ (2508.01191)  │     │ MEMORIZATION  │
│ (2504.01445)  │     │ ID=100%,OOD=0%│     │ (2601.13392)  │
│ Systematicity │     └───────────────┘     └───────────────┘
│ failure       │
└───────────────┘
```

---

## Mechanistic Interpretability Cluster

```
                    ┌─────────────────────────┐
                    │   EMERGENT SYMBOLIC     │
                    │   MECHANISMS            │
                    │   (2502.20332)          │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ ALGORITHMIC   │     │ REASONING     │     │ IOI MINIMAL   │
│ PRIMITIVES    │     │ BEYOND COT    │     │ CIRCUITS      │
│ (2510.15987)  │     │ (2601.08058)  │     │ (2510.25013)  │
└───────────────┘     └───────────────┘     └───────────────┘
```

---

## Test-Time Compute Cluster

```
                    ┌─────────────────────────┐
                    │   SURVEY TEST-TIME      │
                    │   COMPUTE               │
                    │   (2501.02497)          │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ INFERENCE-TIME│     │ EFFECTIVE     │     │ REVISITING    │
│ SCALING       │     │ WITHOUT       │     │ LLM REASONING │
│ (2504.00294)  │     │ THINKING      │     │ VIA IB        │
│ Microsoft     │     │ (2504.09858)  │     │ (2507.18391)  │
└───────────────┘     └───────────────┘     └───────────────┘
```

---

## Pattern Matching Evidence Cluster

```
┌─────────────────────────────────────────────────────────────────┐
│                    STRONGEST EVIDENCE                           │
└─────────────────────────────────────────────────────────────────┘

┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
│ LLMS TRULY GRASP  │     │ SHORTCUT          │     │ UNVEILING CAUSAL  │
│ ADDITION          │     │ LEARNING          │     │ REASONING         │
│ (2504.05262)      │     │ (2410.13343)      │     │ (2506.21215)      │
│ 99.8%→7.5%        │     │ Inverse scaling   │     │ 99.1%→69.2%       │
│ symbolic collapse │     │ >40% drops        │     │ temporal test     │
└───────────────────┘     └───────────────────┘     └───────────────────┘
        │                         │                         │
        └─────────────────────────┴─────────────────────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │   KUP MEMORIZATION      │
                    │   (2504.12523)          │
                    │   ALL methods <2%       │
                    │   on reasoning          │
                    └─────────────────────────┘
```

---

## Multi-Agent / Interactive Learning Cluster

```
┌───────────────────┐           ┌───────────────────┐
│ SOCIETIES OF      │           │ INTERACTIVE       │
│ THOUGHT           │           │ LEARNING ILR      │
│ (2601.10825)      │           │ (2509.26306)      │
│ Multi-agent sim   │           │ Co-learning       │
└─────────┬─────────┘           └─────────┬─────────┘
          │                               │
          └───────────────┬───────────────┘
                          │
                          ▼
            ┌─────────────────────────┐
            │   HOW LLMS LEARN TO     │
            │   REASON (2509.23629)   │
            │   GRPO training         │
            └─────────────────────────┘
```

---

## Paper Count by Cluster

| Cluster | Count | Key Finding |
|---------|-------|-------------|
| **Faithfulness** | 12 | CoT often unfaithful (40-60%) |
| **Compositional/OOD** | 15 | ID success, OOD collapse |
| **RL/Surfacing** | 10 | RL reorganizes, doesn't create |
| **Mechanistic** | 8 | Identifiable circuits exist |
| **Test-Time Compute** | 7 | Scaling has limits |
| **Pattern Matching** | 10 | Strong evidence for thesis |
| **Rebuttals** | 6 | Debate on tool augmentation |
| **Other** | 15 | Various supporting evidence |

---

## Cross-Cluster Links

### Most Connected Papers (by citation count in graph)

| Rank | Paper | Incoming Links | Outgoing Links | Total |
|------|-------|----------------|----------------|-------|
| 1 | **Faith and Fate** (2305.18654) | 25+ | 5 | 30+ |
| 2 | **Illusion of Thinking** (2506.06941) | 15+ | 3 | 18+ |
| 3 | **GSM-Symbolic** (2410.05229) | 12+ | 4 | 16+ |
| 4 | **OMEGA** (2506.18880) | 10+ | 5 | 15+ |
| 5 | **Interplay** (2512.07783) | 10+ | 4 | 14+ |
| 6 | **Planning Gap** (2601.14456) | 8+ | 4 | 12+ |
| 7 | **Measuring Faithfulness** (2307.13702) | 10+ | 2 | 12+ |
| 8 | **DeepSeek-R1** (2501.12948) | 8+ | 3 | 11+ |

---

## Thesis Support Summary

```
                         ┌─────────────────────┐
                         │   THESIS:           │
                         │   LLM reasoning is  │
                         │   pattern matching  │
                         │   from training     │
                         │   distribution      │
                         └──────────┬──────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
         ▼                          ▼                          ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ COMPOSITIONAL   │      │ FAITHFULNESS    │      │ SURFACING       │
│ FAILURE         │      │ GAPS            │      │ HYPOTHESIS      │
│ (15 papers)     │      │ (12 papers)     │      │ (10 papers)     │
│                 │      │                 │      │                 │
│ • ID works      │      │ • CoT ≠ process │      │ • RL doesn't    │
│ • OOD fails     │      │ • 40-60% unfaith│      │   create        │
│ • 0% novel      │      │ • Decorative    │      │ • Pre-training  │
│                 │      │                 │      │   bounds        │
└─────────────────┘      └─────────────────┘      └─────────────────┘

         │                          │                          │
         └──────────────────────────┼──────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │ EVIDENCE WEIGHT:          │
                    │ ~56 SUPPORT, ~9 CHALLENGE │
                    │ ~18 BALANCED              │
                    └───────────────────────────┘
```

---

## Legend

```
──────►  supports / confirms
──rebuts──►  challenges / rebuts
──extends──►  builds on / extends
◄────────►  bidirectional relationship
```

---

*Last updated: 2026-01-24*
*Total papers in network: 83*
