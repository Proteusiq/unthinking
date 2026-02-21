# Paper Analysis Workflow

Steps to analyze a new paper and update the literature review.

---

## Prerequisites

- Read `AGENTS.md` for methodology rules
- Triage `papers/toevaluate.md` to promote papers to `papers/toread.md`
- Check `papers/paper_list.md` for existing papers

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

## Step 2: Qualify Paper

Before deep reading, verify relevance:

- [ ] Is it about LLM reasoning/thinking?
- [ ] Does it provide empirical evidence (not just opinion)?
- [ ] Is it relevant to thesis (supports, challenges, or provides mechanism)?

If NO to any, skip and note why in `papers/toread.md`.

---

## Step 3: Read Full Paper

**CRITICAL**: Read the COMPLETE paper — this is non-negotiable.

- **NEVER** stop at "enough information" — read the ENTIRE paper
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

## Step 4: Create Analysis File

Create `analysis/explored/XX-X9/XX_paper_name.md` in the appropriate bin folder:
- Papers 00-09 → `00-09/`
- Papers 10-19 → `10-19/`
- Papers 90-99 → `90-99/`
- etc.

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

Add entry to `papers/paper_list.md`:

```markdown
| XX | [Title](https://arxiv.org/abs/XXXX.XXXXX) | YYYY-MM-DD | SUPPORTS/CHALLENGES/BALANCED | Brief finding |
```

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

**Link types** (only use these four — others have no CSS styling):

| Type | When to Use |
|------|-------------|
| `supports` | Findings reinforce the target paper's claims |
| `extends` | Builds on target paper with new methods/scope |
| `rebuts` | Directly contradicts target paper's conclusions |
| `challenges` | Provides evidence that weakens target paper's claims |

**Writing descriptions** — answer: "What specific relationship exists between these two papers?"

The description is the most valuable part of a link. It tells the reader *how* two papers
relate, not just *that* they relate. Compare:

**Weak** (Grasp Addition → Faith & Fate):
```javascript
{ source: '2504.05262', target: '2305.18654', type: 'supports',
  description: 'Pattern matching, no abstract rules' }
```
- 5 words — barely more than the type badge
- Generic — could describe half the corpus
- No mechanism — what did this paper specifically find?
- Wastes the paper's rich evidence (99.8%→7.5%, commutativity violations)

**Strong** (Dot by Dot → Faith & Fate):
```javascript
{ source: '2404.15758', target: '2305.18654', type: 'supports',
  description: 'CoT benefits from computation, not task decomposition' }
```
- Specific mechanism — computation vs task decomposition
- Tells you something you didn't know from the type badge alone
- Unique — no other link in the corpus has this description

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
- No type echoing ("supports the claim..." — badge already says SUPPORTS)
- No ALL CAPS emphasis
- Each description must be unique across all links for a paper

**Choosing what to link** (priority order):
1. Papers this one directly cites or rebuts
2. Papers with shared experimental methodology
3. Papers with same finding via different method (strongest evidence)
4. Papers in same cluster with contrasting conclusions

### 8c. Update `meta.totalAnalyzed` count in `docs/js/data.js`

---

## Step 9: Update README

Update paper counts in `README.md`:

1. Badge count: `[![Papers](https://img.shields.io/badge/papers-XX-blue)]()`
2. Nodes badge: `<img src="https://img.shields.io/badge/nodes-XX%20papers-4CAF50" />`
3. Folder count: `# Individual paper analyses (XX files)`

---

## Step 10: Commit Changes

```bash
git add analysis/explored/XX_paper_name.md
git add papers/paper_list.md
git add analysis/paper_graph.md
git add analysis/synthesis.md
git add docs/js/nodes.js
git add docs/js/links.js
git add docs/js/data.js
git add README.md
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

---

## Automation

<!-- PAUSED: Stopping at 160 papers to dive deep with existing corpus
- **Daily at 8am UTC**: GitHub Action searches arXiv for new papers
- **Auto-creates**: `papers/toevaluate.md` entries with relevance assessment
- **Auto-creates**: GitHub issue notifying of new papers
- **Manual**: Triage `toevaluate.md` -> promote to `toread.md`
-->

**Status**: Auto-discovery PAUSED (2026-02-01)
- Corpus at 215 papers
- To resume: uncomment the automation section above and re-enable GitHub Action

---

## Verification (Run Periodically)

Ensure `docs/js/nodes.js` node count matches analyzed papers:

```bash
# Count nodes
grep -c "id: '" docs/js/nodes.js

# Count DONE papers in paper_list.md  
grep -c "DONE" papers/paper_list.md

# Find papers missing from nodes.js
grep "id: '" docs/js/nodes.js | sed "s/.*id: '\\([^']*\\)'.*/\\1/" | sort > /tmp/data_ids.txt
grep -E "^\| [0-9]+ \| [0-9]" papers/paper_list.md | awk -F'|' '{gsub(/ /,"",$3); print $3}' | sort > /tmp/paper_ids.txt
comm -23 /tmp/paper_ids.txt /tmp/data_ids.txt
```

If mismatch found:
1. Add missing papers to `docs/js/nodes.js`
2. Add relevant links to `docs/js/links.js` (3-5 outgoing, each with unique description)
3. Update `meta.totalAnalyzed` count in `docs/js/data.js`
4. **Update README.md** paper counts (badges and folder count)
5. Commit and push to trigger deploy
