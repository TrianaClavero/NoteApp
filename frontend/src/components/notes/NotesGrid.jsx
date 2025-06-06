import { Button } from "../ui/Button"
import { NoteCard } from "./NoteCard"

export function NotesGrid({ notes, totalNotes, onEdit, onDelete, onToggleArchive, onCreateNote }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-message">{totalNotes === 0 ? "No notes yet" : "No notes match your filters"}</div>
        {totalNotes === 0 && (
          <Button onClick={onCreateNote} variant="outline">
            Create your first note
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} onToggleArchive={onToggleArchive} />
      ))}
    </div>
  )
}
