from dataclasses import dataclass


@dataclass(frozen=True)
class Classification:
    relevant: bool
    stance: str
    priority: int
    why_read: str
    classified_by: str  # "llm" or "keyword"


@dataclass(frozen=True)
class Paper:
    arxiv_id: str
    title: str
    abstract: str
    published: str
    stance: str
    priority: int
    why_read: str
    connections: tuple[str, ...]
    classified_by: str  # "llm" or "keyword"
