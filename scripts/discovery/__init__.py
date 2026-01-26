"""Paper discovery package for arXiv search and classification."""

from discovery.models import Paper, Classification
from discovery.arxiv import search_recent_papers
from discovery.classify import classify_paper
from discovery.output import prepend_to_toread, format_paper

__all__ = [
    "Paper",
    "Classification",
    "search_recent_papers",
    "classify_paper",
    "prepend_to_toread",
    "format_paper",
]
