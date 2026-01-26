from dataclasses import dataclass


@dataclass(frozen=True)
class Classification:
    relevant: bool
    stance: str
    priority: int
    why_read: str


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
