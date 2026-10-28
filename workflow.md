# Paper Analysis Workflow

Steps to analyze a new paper and update the literature review.

---

## Prerequisites

- Read `AGENTS.md` for methodology rules
- Triage `papers/toevaluate.md` to promote papers to `papers/toread.md`
- Check `papers/paper_list.md` for existing papers
- Run `git status` and `make deploy-check` before starting. If the baseline is not clean, fix that first so a later failure is known to be yours

## Rules That Prevent Corpus Damage

These exist because a past "numbering fix" deleted three analyses while the graph still pointed at them.

1. **Never renumber or rename an existing analysis file.** The filename number is only a unique slot. It does not need to match `paper_list.md`, which is numbered independently. Renaming breaks `analysisUrl` in `docs/js/nodes.js`, the corpus index and external links.
2. **Never delete an analysis file to fix a number.** To remove a paper on purpose, delete its node, its links, its `paper_list.md` row and its file in the same commit.
3. **Append at the next free slot.** Take the highest number under `analysis/explored/` and add one (see Step 4).
4. **If you must move a file,** update `analysisUrl` in `nodes.js` in the same commit, then run `node scripts/validate-docs.js`.
5. **Never skip `make deploy-check`.** It fails on a node whose `analysisUrl` does not resolve to a file, on corpus drift and on out-of-sync counts.

---

## Step 0: Triage (Periodic)

Auto-discovered papers land in `papers/toevaluate.md`. Periodically review and:

**Promote to `toread.md` if:**
- Directly tests reasoning claims with controlled experiments
- Provides new quantitative evidence (not just benchmarks)
- Challenges OR supports the thesis
- High-impact - present strong case for, against or balance view towards the thesis.

**Discard if:**
- Tangentially related (mentions reasoning but doesn't test it)
- Overlaps significantly with already-analyzed papers
- Domain-specific application without generalizable insights
- No empirical evidence (opinion/position papers)

Log decisions in `toevaluate.md` Triage Log table.

---

## Step 1: Select Paper

1. Pick paper from `papers/toread.md` (prioritize high-priority papers)
2. Note the arXiv ID and expected stance

---

## Step 1.5: Check for Duplicates

**MANDATORY**: Before analyzing any paper, check if it's already in the corpus.

```bash
make lookup Q=<arxiv_id>
```

**If found**: Paper is already analyzed. Skip it and pick another.

**If not found**: Safe to proceed.

Example:
```bash
$ make lookup Q=2309.12288
Found 1 match(es):

  ID: 149
  arXiv: 2309.12288
  Title: The Reversal Curse
  ...
WARNING: Paper already in corpus!
```

You can also search by title keywords:
```bash
make lookup Q="reversal curse"
make lookup Q="two-hop"
```

---

## Step 2: Qualify Paper

Before deep reading, verify relevance:

- [ ] Is it about LLM reasoning/thinking?
- [ ] Does it provide empirical evidence (not just opinion)?
- [ ] Is it relevant to thesis (supports, challenges, or provides mechanism)?

If NO to any, skip and note why in `papers/toread.md`.

---

## Step 3: Read Full Paper

**CRITICAL**: Read the COMPLETE paper - this is non-negotiable.

- **NEVER** stop at "enough information" - read the ENTIRE paper
- **ALWAYS** fetch the full HTML version at `https://arxiv.org/html/{arxiv_id}`
- If HTML is truncated, use task agents to process the full saved content
- If you haven't read the full paper, you haven't read the paper

**Checklist**:
- [ ] Read abstract
- [ ] Read introduction
- [ ] Read methodology (ALL of it)
- [ ] Read results with actual numbers
- [ ] Read discussion/analysis
- [ ] Read limitations section
- [ ] Read conclusion
- [ ] Note key quotes throughout

**If HTML version unavailable (404):**
1. Note in analysis file: "⚠️ INCOMPLETE - HTML not available"
2. Try PDF at `https://arxiv.org/pdf/{arxiv_id}`
3. If PDF cannot be parsed, mark analysis as **INCOMPLETE**
4. Add to Status section: `- [ ] **Read complete** ⚠️ INCOMPLETE`
5. Add action item: "Download PDF manually and re-analyze"
6. Do NOT mark paper as fully analyzed in `paper_list.md`

---

## Step 3.5: Extract Evidence (Before Writing)

**PAUSE before writing the analysis.** Extract all quantitative evidence first.

### Evidence Extraction Checklist

- [ ] **Find all statistical tables** in Results and Appendix
- [ ] **Extract exact numbers**: p-values, effect sizes, confidence intervals
- [ ] **Note sample sizes**: N, trials, conditions, models tested
- [ ] **Record model configurations**: temperatures, versions, prompts
- [ ] **Identify failure cases**: what breaks, at what threshold
- [ ] **Flag missing stats**: claims without quantitative support

### Create a Scratch List

Before writing, create a bullet list of key numbers:

```
Evidence extracted from [Paper Title]:
- Main effect: H=97.54, p=6.6e-22, ε²=0.65
- At threshold (n=3): r=0.27, p=0.048 (barely significant)
- With noise: performance drops to chance (r=-0.03 at n=1)
- Model comparison: GPT-4 d'>2.0 at n=3, open-source d'≈0
- Sample: 50 blocks × 24 trials × 3 conditions = 3,600 trials
```

### Quality Gate

Do NOT proceed to writing until you can answer:
1. What is the **strongest** quantitative evidence?
2. What is the **weakest** or missing evidence?
3. What are the **exact experimental conditions**?

---

## Step 4: Create Analysis File

Create `analysis/explored/XX-X9/XX_paper_name.md` using the **next free number**. Never reuse or shift an existing number (see "Rules That Prevent Corpus Damage").

```bash
# highest number in use
find analysis/explored -name '*.md' | sed -E 's|.*/([0-9]+)_.*|\1|' | sort -n | tail -1
```

The bin folder is the number's tens group:
- `397` → `390-399/`
- `400` → `400-409/` (create the folder)
- Numbers below 100 use `00-09/` ... `90-99/`

The heading is `# Paper Analysis: Title`, as in the canonical `00_faith_and_fate.md`. Do not put a number in the heading: numbers go stale when files move. After the file exists, the `analysisUrl` in Step 8a must point to this exact path.

Following template:

```markdown
# Paper Analysis: [Title]

## Metadata
- **arXiv ID**: 
- **Title**: 
- **Authors**: 
- **Date**: 

---

## Core Claims
1. 
2. 
3. 

---

## Methodology

---

## Key Evidence
| Finding | Number | Context |
|---------|--------|---------|

---

## Relationship to Other Papers
### Supports
### Challenges
### Extends

---

## REBUTTALS
### Known Rebuttals
### Limitations (Authors Acknowledge)

---

## Key Quotes

---

## Status
- [ ] Read complete
- [ ] Core claims extracted
- [ ] Key evidence with numbers
- [ ] Rebuttals checked
- [ ] Paper graph updated
```

---

## Step 5: Update Paper List

Append one row to the table in `papers/paper_list.md`, matching the existing rows:

```markdown
| 397 | 2605.13829 | May 2026 | Paper Title | Supports |
```

Columns are `# | arXiv ID | Date | Title | Stance`. Stance is `Supports`, `Challenges` or `Balanced`. The `#` is the next row number in this file. It is independent of the analysis filename number, so do not try to make them match.

Do not edit the `> N papers analyzed | ...` header by hand: `make sync-counts` rewrites it.

---

## Step 6: Update Paper Graph

Add relationships to `analysis/paper_graph.md`:

```markdown
### [Paper Title] (arXiv ID)
- **Supports**: [list papers this supports]
- **Challenges**: [list papers this challenges]
- **Extended by**: [list papers that extend this]
```

---

## Step 7: Update Synthesis

If paper provides significant evidence, update `analysis/synthesis.md`:

- Add to evidence table
- Update stance count
- Add to relevant argument section

---

## Step 8: Update Website Data

### 8a. Add Node to `docs/js/nodes.js`

All fields are REQUIRED:

```javascript
{
  id: 'XXXX.XXXXX',              // arXiv ID
  title: 'Paper Title',          // Full title
  shortTitle: 'Short Name',      // Display name for graph
  date: 'Mon YYYY',              // e.g., 'May 2023'
  stance: 'supports',            // supports | challenges | balanced
  cluster: 'compositional',      // Thematic cluster
  coreArgument: '...',           // Paper's claim (NO CAPS EMPHASIS)
  keyEvidence: ['...'],          // 3-4 findings with specific numbers
  keyQuotes: ['...'],            // 1-2 direct quotes from paper
  analysisUrl: 'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/XX-XX/XX_paper_name.md'
}
```

**Node guidelines:**
- `coreArgument`: Paper's own language, one sentence, NO ALL CAPS emphasis
- `keyEvidence`: Include specific numbers (e.g., `'100% vs 66% on 3SUM'`)
- `keyQuotes`: Extract from "Key Quotes" section of analysis file
- `analysisUrl`: Link to the full analysis markdown file

### 8b. Add Links to `docs/js/links.js`

Aim for **3-5 outgoing links** per paper. Every link MUST have a description.

```javascript
{
  source: 'XXXX.XXXXX',          // This paper (newer/citing)
  target: 'YYYY.YYYYY',          // Referenced paper (older/cited)
  type: 'supports',              // supports | extends | rebuts | challenges
  description: 'CoT benefits from computation, not task decomposition'
}
```

**Link types** (only use these four - others have no CSS styling):

| Type | When to Use |
|------|-------------|
| `supports` | Findings reinforce the target paper's claims |
| `extends` | Builds on target paper with new methods/scope |
| `rebuts` | Directly contradicts target paper's conclusions |
| `challenges` | Provides evidence that weakens target paper's claims |

**Writing descriptions** - answer: "What specific relationship exists between these two papers?"

The description is the most valuable part of a link. It tells the reader *how* two papers
relate, not just *that* they relate. Compare:

**Weak** (Grasp Addition → Faith & Fate):
```javascript
{ source: '2504.05262', target: '2305.18654', type: 'supports',
  description: 'Pattern matching, no abstract rules' }
```
- 5 words - barely more than the type badge
- Generic - could describe half the corpus
- No mechanism - what did this paper specifically find?
- Wastes the paper's rich evidence (99.8%→7.5%, commutativity violations)

**Strong** (Dot by Dot → Faith & Fate):
```javascript
{ source: '2404.15758', target: '2305.18654', type: 'supports',
  description: 'CoT benefits from computation, not task decomposition' }
```
- Specific mechanism - computation vs task decomposition
- Tells you something you didn't know from the type badge alone
- Unique - no other link in the corpus has this description

**More strong examples:**
```
'Proves formal separation conjectured in Dot by Dot'
'Both show meaningless tokens replace CoT; Seq-VCR explains via representation collapse'
'Extends sycophancy analysis to reasoning models with 4800 judgments'
'99.8%→7.5% with symbolic repr; commutativity violations prove memorized patterns'
```

**The test:** if you swap the paper names and the description still sounds right,
it's too generic. A good description only makes sense for *this specific pair*.

**Description rules:**
- 30-100 characters, one sentence, no trailing period
- Name the specific mechanism, finding, or number that connects the papers
- No generic phrases ("related work", "similar findings", "both about X")
- No type echoing ("supports the claim..." - badge already says SUPPORTS)
- No ALL CAPS emphasis
- Each description must be unique across all links for a paper

**Choosing what to link** (priority order):
1. Papers this one directly cites or rebuts
2. Papers with shared experimental methodology
3. Papers with same finding via different method (strongest evidence)
4. Papers in same cluster with contrasting conclusions

### 8c. Nothing else to regenerate

`docs/js/data.js` derives `meta.totalAnalyzed` (and the stance counts) from `nodes.js`
with getters, so there is no count to bump there. The landing constellation and the
network graph both read `nodes.js` + `links.js` at load and lay themselves out in the
browser, so a new node and its links are the entire UI change.

Three things do need running, because the galaxy reads a different file and the graph links to files on disk:

```bash
make corpus                    # analysis/index/corpus.json + apps/galaxy/public/corpus.json + papers.duckdb
make sync-counts               # every hardcoded count
node scripts/validate-docs.js  # duplicate ids, orphan links, analysisUrl -> file on disk
make deploy-check              # runs the checks above plus the galaxy typecheck and build; must be clean
```

`validate-docs.js` fails if any node's `analysisUrl` points at a file that does not exist. It warns, and does not fail, on link targets that are not nodes: those are intentional "cited, not tracked" references.

See "Updating the Visualizations" in `AGENTS.md` for the field contract and the
auto-derived values.

---

## Step 9: Rebuild the Index & Sync All Counts

Any edit under `analysis/explored/` changes `analysis/index/corpus.json` (at minimum the `word_count`), which has a second copy at `apps/galaxy/public/corpus.json`. Do NOT hand-edit counts or hand-copy the JSON - the Makefile keeps both copies and every hardcoded count aligned:

```bash
make corpus        # rebuild corpus.json AND copy it to apps/galaxy/public/
make sync-counts   # rewrite all hardcoded counts: README badges/prose, findings
                   # stance cards, galaxy, synthesis, rebuttals, AGENTS, workflow
make deploy-check  # fails on corpus drift, out-of-sync counts or a broken analysisUrl (run this last)
```

These targets cover the README badges/folder-count, the findings stance cards and the findings batch distribution automatically. Only the *content* judgment calls below still need a manual edit:

### 9a. Update `docs/pages/findings.html` content (when a paper is significant):

1. **Theme tables** - Add the paper to the relevant theme section if it provides significant evidence
2. **Smoking guns** - Update if the paper provides stronger evidence than existing entries

Run `cd docs && npm run format` after editing.

---

## Step 10: Commit Changes

Run `make deploy-check` first; it must be clean. Stage the regenerated `corpus.json` AND the galaxy copy alongside the analysis.

```bash
git add analysis/explored/                 # the new analysis
git add papers/paper_list.md papers/toread.md
git add analysis/paper_graph.md analysis/synthesis.md analysis/rebuttals.md
git add docs/js/nodes.js docs/js/links.js
git add docs/pages/findings.html           # if updated
git add analysis/index/ apps/galaxy/public/corpus.json   # regenerated by `make corpus`
git add README.md AGENTS.md workflow.md apps/galaxy/    # rewritten by `make sync-counts`
git status --short                          # nothing unexpected, nothing left behind
git commit -m "Add analysis: [Paper Title] (arXiv ID)

- Stance: SUPPORTS/CHALLENGES/BALANCED
- Key finding: [one line summary]
- Connections: [papers it relates to]"
git push origin main
```

---

## Step 11: Remove from To-Read

Remove analyzed paper from `papers/toread.md` or mark as done.

---

## Quick Reference

| File | Purpose |
|------|---------|
| `AGENTS.md` | Methodology rules |
| `papers/toevaluate.md` | Raw auto-discovered papers (staging) |
| `papers/toread.md` | Curated papers ready for analysis |
| `papers/paper_list.md` | Master list of analyzed papers |
| `analysis/explored/` | Individual paper analyses |
| `analysis/synthesis.md` | Main thesis synthesis |
| `analysis/paper_graph.md` | Paper relationships |
| `analysis/paper_network.md` | Network visualization + cluster counts |
| `analysis/rebuttals.md` | Rebuttal tracking matrix |
| `docs/js/nodes.js` | Paper node definitions |
| `docs/js/links.js` | Relationship link definitions |
| `docs/js/data.js` | Meta + combines nodes/links |
| `docs/pages/findings.html` | 400-paper synthesis (themes, smoking guns, patterns) |

---

## Automation

<!-- PAUSED: Stopping at 160 papers to dive deep with existing corpus
- **Daily at 8am UTC**: GitHub Action searches arXiv for new papers
- **Auto-creates**: `papers/toevaluate.md` entries with relevance assessment
- **Auto-creates**: GitHub issue notifying of new papers
- **Manual**: Triage `toevaluate.md` -> promote to `toread.md`
-->

**Status**: Auto-discovery PAUSED (2026-02-01)
- To resume: uncomment the automation section above and re-enable GitHub Action

---

## Verification (Run Periodically)

```bash
make deploy-check                 # corpus drift, count drift, analysisUrl -> file, galaxy typecheck + build
node scripts/validate-docs.js     # same graph checks on their own, faster

# arXiv ids in paper_list.md but not in nodes.js, and the reverse (empty output = in sync)
comm -3 \
  <(grep -E '^\| [0-9]+ \| ' papers/paper_list.md | awk -F'|' '{gsub(/ /,"",$3); print $3}' | sort -u) \
  <(grep -oE "^    id: '[^']+'" docs/js/nodes.js | sed "s/.*'\(.*\)'/\1/" | sort -u)

# one paper analyzed by two files
python3 -c "
import json, collections
c = json.load(open('analysis/index/corpus.json'))
for a, n in collections.Counter(e['arxiv'] for e in c if e['arxiv']).items():
    if n > 1: print(a, [e['analysis_path'] for e in c if e['arxiv'] == a])
"
```

If the node and paper-list check shows a mismatch:
1. Add the missing node to `docs/js/nodes.js` (Step 8a) and 3-5 links to `docs/js/links.js` (Step 8b)
2. Run `make corpus && make sync-counts && make deploy-check`
3. Commit and push to trigger the deploy

Counts are never edited by hand: README, findings, galaxy, synthesis, rebuttals, AGENTS, workflow and the `paper_list.md` header are all rewritten by `make sync-counts`.

---

## Known Issues

Existing inconsistencies that are not caused by the current workflow. Do not "fix" them silently: decide, then change the files, node and links in one commit.

| Issue | Detail | Decision needed |
|-------|--------|-----------------|
| Duplicate analyses | `2305.04388` is in `140-149/148_language_models_dont_say_what_think.md` and `310-319/312_unfaithful_cot_explanations.md`. `2305.10601` is in `200-209/207_tree_of_thoughts.md` and `290-299/299_tree_of_thoughts.md`. `2308.09687` is in `200-209/208_graph_of_thoughts.md` and `300-309/300_graph_of_thoughts.md`. | The graph node points at the later file. Keep one per paper, merge any unique content, delete the other and its corpus entry. This brings the corpus count down by 3. |
| Entry without an arXiv id | `190-199/192_the_missing_paper.md` is a placeholder. | Expected. Together with the 3 duplicate files it explains why the corpus (400) is 4 above `nodes.js` (396). |
| Non-arXiv id | `LREC-COLING-2024-884` (`210-219/217_llms_are_echo_chambers.md`). | None. The link validator exempts it. |
| `paper_list.md` numbering | Row numbers are not the analysis filename numbers. | None. They are independent by design. |

---
