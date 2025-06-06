from dataclasses import dataclass, asdict

@dataclass
class Note:
    id: int
    title: str
    content: str
    is_archived: bool
    background_color: str
    tags: list[str]
    created_at: str
    updated_at: str

    def to_dict(self):
        return asdict(self)
