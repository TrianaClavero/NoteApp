import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Card, CardContent, CardHeader } from "../ui/Card"

export function NoteCard({ note, onEdit, onDelete, onToggleArchive }) {
  const cardStyle = {
    backgroundColor: note.backgroundColor || "#ffffff",
  }

  return (
    <Card style={cardStyle}>
      <CardHeader>
        <div className="note-card-header">
          <h3 className="note-title">{note.title}</h3>
          <div className="note-actions">
            <Button variant="ghost" className="button-icon bg-white-50" onClick={() => onEdit(note)}>
              <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Button>
            <Button variant="ghost" className="button-icon bg-white-50" onClick={() => onToggleArchive(note.id)}>
              {note.isArchived ? (
                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              ) : (
                <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6" />
                </svg>
              )}
            </Button>
            <Button variant="ghost" className="button-icon text-red hover-red" onClick={() => onDelete(note.id)}>
              <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {note.content && <p className="note-content">{note.content}</p>}
        {note.tags.length > 0 && (
          <div className="note-tags">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white-60">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="note-date">{note.updatedAt.toLocaleDateString()}</div>
      </CardContent>
    </Card>
  )
}
