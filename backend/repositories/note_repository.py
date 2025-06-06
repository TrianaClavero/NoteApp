import json
from backend.db.mysql_connection import get_connection
from backend.models.note import Note

def get_note_by_id(note_id: int) -> Note | None:
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notes WHERE id = %s", (note_id,))
    row = cursor.fetchone()
    if row:
        if row.get('tags'):
            row['tags'] = json.loads(row['tags'])
        else:
            row['tags'] = []
        return Note(**row)
    return None

def insert_note(title: str, content: str, tags: list[str] = None, background_color: str = '#ffffff') -> int:
    if tags is None:
        tags = []
    conn = get_connection()
    cursor = conn.cursor()
    tags_json = json.dumps(tags)
    cursor.execute(
        "INSERT INTO notes (title, content, is_archived, tags, background_color) VALUES (%s, %s, FALSE, %s, %s)",
        (title, content, tags_json, background_color)
    )
    conn.commit()
    return cursor.lastrowid

def update_note(note_id: int, title: str, content: str, is_archived: bool, tags: list[str] = None, background_color: str = '#ffffff') -> bool:
    if tags is None:
        tags = []
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM notes WHERE id = %s", (note_id,))
    existing = cursor.fetchone()
    if not existing:
        return False 
    tags_json = json.dumps(tags)
    cursor.execute(
        "UPDATE notes SET title = %s, content = %s, is_archived = %s, tags = %s, background_color = %s WHERE id = %s",
        (title, content, is_archived, tags_json, background_color, note_id)
    )
    conn.commit()
    return True


def delete_note(note_id: int) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notes WHERE id = %s", (note_id,))
    conn.commit()
    return cursor.rowcount > 0

def list_notes(archived: bool) -> list[Note]:
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notes WHERE is_archived = %s", (archived,))
    rows = cursor.fetchall()
    notes = []
    for row in rows:
        if row.get('tags'):
            row['tags'] = json.loads(row['tags'])
        else:
            row['tags'] = []
        notes.append(Note(**row))
    return notes
