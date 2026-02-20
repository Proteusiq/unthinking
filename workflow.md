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

1. Edit `docs/js/data.js` to add new node:

```javascript
{
  id: 'XXXX.XXXXX',              // arXiv ID
  title: 'Paper Title',          // Full title
  shortTitle: 'Short Name',      // Display name for graph
  date: 'Mon YYYY',              // e.g., 'May 2023'
  stance: 'supports',            // supports | challenges | balanced
  cluster: 'compositional',      // Thematic cluster
  coreArgument: '...',           // Paper's claim (NO CAPS EMPHASIS)
  keyEvidence: ['...'],          // Array of key findings
  keyQuotes: [                   // 1-2 quotes from paper's own words
    "Direct quote from paper...",
    "Another key quote..."
  ],
  analysisUrl: 'https://github.com/Proteusiq/unthinking/blob/main/analysis/explored/XX-XX/XX_paper_name.md'
}
```

**Important data.js guidelines:**
- `coreArgument`: Use paper's own language, NO ALL CAPS for emphasis
- `keyQuotes`: Extract from "Key Quotes" section of analysis file
- `analysisUrl`: Link to the full analysis markdown file
- `stance`: Use only `supports`, `challenges`, or `balanced`

2. Add links to other papers:

```javascript
{
  source: 'XXXX.XXXXX',
  target: 'YYYY.YYYYY', 
  type: 'supports',              // supports | rebuts | extends
  description: 'Brief description'
}
```

3. Update `meta.totalAnalyzed` count at top of file

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
| `docs/js/data.js` | Website visualization data |

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

Ensure `docs/js/data.js` node count matches analyzed papers:

```bash
# Count nodes in data.js
grep -c "id: '" docs/js/data.js

# Count DONE papers in paper_list.md  
grep -c "DONE" papers/paper_list.md

# Find papers missing from data.js
grep "id: '" docs/js/data.js | sed "s/.*id: '\\([^']*\\)'.*/\\1/" | sort > /tmp/data_ids.txt
grep -E "^\| [0-9]+ \| [0-9]" papers/paper_list.md | awk -F'|' '{gsub(/ /,"",$3); print $3}' | sort > /tmp/paper_ids.txt
comm -23 /tmp/paper_ids.txt /tmp/data_ids.txt
```

If mismatch found:
1. Add missing papers to `docs/js/data.js` nodes array
2. Add relevant links for the new papers
3. Update `meta.totalAnalyzed` count
4. **Update README.md** paper counts (badges and folder count)
5. Commit and push to trigger deploy
