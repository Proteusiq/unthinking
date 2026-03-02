# /// script
# requires-python = ">=3.13"
# dependencies = ["arxiv", "typer", "rich"]
# ///
"""
arXiv search tool for finding relevant papers.

Usage:
    uv run scripts/arxiv_search.py "extracting books LLM"
    uv run scripts/arxiv_search.py "chain of thought" --year 2025
    uv run scripts/arxiv_search.py "reasoning" --title-only --max 20
"""

from datetime import datetime
from typing import Annotated

import arxiv
import typer
from rich.console import Console
from rich.table import Table

# Categories to search (CS, ML, AI, NLP)
CATEGORIES = ["cs.CL", "cs.LG", "cs.AI", "cs.NE"]

console = Console()
app = typer.Typer(help="Search arXiv for papers in CS/ML/NLP fields")


def build_query(keywords: str, title_only: bool) -> str:
    """Build arXiv query string."""
    field = "ti" if title_only else "all"

    if " " in keywords and not keywords.startswith('"'):
        term = f'{field}:"{keywords}"'
    else:
        term = f"{field}:{keywords}"

    cat_filter = " OR ".join(f"cat:{cat}" for cat in CATEGORIES)
    return f"({term}) AND ({cat_filter})"


def format_date(dt: datetime) -> str:
    """Format datetime as 'Mon YYYY'."""
    return dt.strftime("%b %Y")


def search_arxiv(
    keywords: str,
    title_only: bool = False,
    year: int | None = None,
    max_results: int = 15,
) -> list[arxiv.Result]:
    """Search arXiv and return results."""
    query = build_query(keywords, title_only)

    client = arxiv.Client()
    search = arxiv.Search(
        query=query,
        max_results=max_results * 2,
        sort_by=arxiv.SortCriterion.SubmittedDate,
        sort_order=arxiv.SortOrder.Descending,
    )

    results = []
    for paper in client.results(search):
        if year and paper.published.year < year:
            continue
        results.append(paper)
        if len(results) >= max_results:
            break

    return results


def get_arxiv_id(paper: arxiv.Result) -> str:
    """Extract clean arXiv ID without version suffix."""
    arxiv_id = paper.get_short_id()
    if "v" in arxiv_id:
        arxiv_id = arxiv_id.rsplit("v", 1)[0]
    return arxiv_id


@app.command()
def main(
    keywords: Annotated[str, typer.Argument(help="Search keywords (quoted for phrases)")],
    title_only: Annotated[bool, typer.Option("--title-only", "-t", help="Search titles only")] = False,
    year: Annotated[int | None, typer.Option("--year", "-y", help="Filter to papers from this year onwards")] = None,
    max_results: Annotated[int, typer.Option("--max", "-m", help="Maximum results")] = 15,
    verbose: Annotated[bool, typer.Option("--verbose", "-v", help="Show abstract snippets")] = False,
) -> None:
    """Search arXiv for papers in CS/ML/NLP fields."""
    console.print(f"\n[bold]Searching arXiv for:[/bold] {keywords}")
    
    filters = []
    if title_only:
        filters.append("title only")
    if year:
        filters.append(f"year >= {year}")
    filters.append(f"categories: {', '.join(CATEGORIES)}")
    console.print(f"[dim]  ({'; '.join(filters)})[/dim]\n")

    with console.status("[bold green]Searching arXiv..."):
        results = search_arxiv(
            keywords=keywords,
            title_only=title_only,
            year=year,
            max_results=max_results,
        )

    if not results:
        console.print("[yellow]No papers found.[/yellow]")
        raise typer.Exit()

    table = Table(title=f"Found {len(results)} papers", show_lines=True)
    table.add_column("#", style="dim", width=3)
    table.add_column("arXiv ID", style="cyan", width=12)
    table.add_column("Date", width=10)
    table.add_column("Title", style="bold")
    table.add_column("Categories", style="dim", width=20)

    for i, paper in enumerate(results, 1):
        arxiv_id = get_arxiv_id(paper)
        date = format_date(paper.published)
        title = " ".join(paper.title.split())
        categories = ", ".join(paper.categories[:3])

        if verbose:
            abstract = " ".join(paper.summary.split())[:150] + "..."
            title = f"{title}\n[dim]{abstract}[/dim]"

        table.add_row(str(i), arxiv_id, date, title, categories)

    console.print(table)
    console.print("\n[dim]To analyze: add to papers/toread.md, then follow workflow.md[/dim]")


if __name__ == "__main__":
    app()
