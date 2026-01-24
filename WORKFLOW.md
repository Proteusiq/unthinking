# Paper Analysis Workflow

Steps to analyze a new paper and update the literature review.

---

## Prerequisites

- Read `AGENTS.md` for methodology rules
- Check `papers/toread.md` for pending papers
- Check `papers/paper_list.md` for existing papers

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

**IMPORTANT**: Read the FULL HTML version at `https://arxiv.org/html/{arxiv_id}`

- [ ] Read abstract
- [ ] Read methodology
- [ ] Read results with actual numbers
- [ ] Read limitations section
- [ ] Note key quotes

---

## Step 4: Create Analysis File

Create `analysis/explored/XX_paper_name.md` following template:

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

Add relationships to `analysis/PAPER_GRAPH.md`:

```markdown
### [Paper Title] (arXiv ID)
- **Supports**: [list papers this supports]
- **Challenges**: [list papers this challenges]
- **Extended by**: [list papers that extend this]
```

---

## Step 7: Update Synthesis

If paper provides significant evidence, update `analysis/SYNTHESIS.md`:

- Add to evidence table
- Update stance count
- Add to relevant argument section

---

## Step 8: Update Website Data

1. Edit `docs/js/data.js` to add new node:

```javascript
{
  "id": "XXXX.XXXXX",
  "title": "Paper Title",
  "shortTitle": "Short Name",
  "stance": "supports|challenges|balanced",
  "argument": "Core argument in one sentence",
  "evidence": ["Key finding 1", "Key finding 2"],
  "arxiv": "XXXX.XXXXX",
  "date": "YYYY-MM-DD"
}
```

2. Add links to other papers:

```javascript
{"source": "XXXX.XXXXX", "target": "YYYY.YYYYY", "type": "supports|rebuts|extends", "description": "Brief description"}
```

---

## Step 9: Commit Changes

```bash
git add analysis/explored/XX_paper_name.md
git add papers/paper_list.md
git add analysis/PAPER_GRAPH.md
git add analysis/SYNTHESIS.md
git add docs/js/data.js
git commit -m "Add analysis: [Paper Title] (arXiv ID)

- Stance: SUPPORTS/CHALLENGES/BALANCED
- Key finding: [one line summary]
- Connections: [papers it relates to]"
git push origin main
```

---

## Step 10: Remove from To-Read

Remove analyzed paper from `papers/toread.md` or mark as done.

---

## Quick Reference

| File | Purpose |
|------|---------|
| `AGENTS.md` | Methodology rules |
| `papers/toread.md` | Pending papers (auto-discovered) |
| `papers/paper_list.md` | Master list of analyzed papers |
| `analysis/explored/` | Individual paper analyses |
| `analysis/SYNTHESIS.md` | Main thesis synthesis |
| `analysis/PAPER_GRAPH.md` | Paper relationships |
| `docs/js/data.js` | Website visualization data |

---

## Automation

- **Daily at 8am UTC**: GitHub Action searches arXiv for new papers
- **Auto-creates**: `papers/toread.md` entries with relevance assessment
- **Auto-creates**: GitHub issue notifying of new papers
