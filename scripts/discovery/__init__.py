"""Paper discovery package for arXiv search and classification."""

from discovery.models import Paper, Classification
from discovery.search import search_recent_papers, load_known_ids
from discovery.classify import classify_paper
from discovery.output import prepend_to_toread, format_paper

__all__ = [
    "Paper",
    "Classification",
    "search_recent_papers",
    "load_known_ids",
    "classify_paper",
    "prepend_to_toread",
    "format_paper",
]
