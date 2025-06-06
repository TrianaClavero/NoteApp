import backend.repositories.note_repository as repo
from backend.models.note import Note

def create_note(title: str, content: str, tags: list[str] = None, background_color: str = '#ffffff') -> int:
    if not title:
        raise ValueError("Title cannot be empty")
    return repo.insert_note(title, content, tags, background_color)

def get_note(note_id: int) -> Note | None:
    return repo.get_note_by_id(note_id)

def edit_note(note_id: int, title: str, content: str, is_archived: bool, tags: list[str] = None, background_color: str = '#ffffff') -> bool:
    return repo.update_note(note_id, title, content, is_archived, tags, background_color) 

def remove_note(note_id: int) -> bool:
    return repo.delete_note(note_id)

def get_notes(archived: bool) -> list[Note]:
    return repo.list_notes(archived)
