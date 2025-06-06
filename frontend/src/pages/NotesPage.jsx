import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/Dialog"
import { NotesHeader } from "../components/notes/NotesHeader"
import { TagFilter } from "../components/notes/TagFilter"
import { NotesGrid } from "../components/notes/NotesGrid"
import { NoteForm } from "../components/notes/NoteForm"
import { useNotes } from "../services/useNotes"

export default function NotesPage() {
  const {
    notes,
    filteredNotes,
    selectedTags,
    showArchived,
    searchTerm,
    allTags,
    loading,
    error,
    setShowArchived,
    setSearchTerm,
    createNote,
    updateNote,
    deleteNote,
    toggleArchive,
    toggleTagFilter,
    clearFilters,
    refreshNotes,
  } = useNotes()

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData)
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Failed to create note:", error)
    }
  }

  const handleUpdateNote = async (noteData) => {
    if (noteData?.id) {
      try {
        await updateNote(noteData.id, noteData)
        setEditingNote(null)
      } catch (error) {
        console.error("Failed to update note:", error)
      }
    }
  }

  const startEdit = (note) => {
    setEditingNote(note)
  }

  const handleToggleArchived = () => {
    setShowArchived(!showArchived)
  }

  return (
    <div className="app">
      <div className="container">
        <NotesHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showArchived={showArchived}
          onToggleArchived={handleToggleArchived}
          onCreateNote={() => setIsCreateDialogOpen(true)}
        />

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={refreshNotes} className="button button-outline">
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="loading-message">
            <p>Loading notes...</p>
          </div>
        )}

        <TagFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTagFilter}
          onClearFilters={clearFilters}
        />

        <NotesGrid
          notes={filteredNotes}
          totalNotes={notes.length}
          onEdit={startEdit}
          onDelete={deleteNote}
          onToggleArchive={toggleArchive}
          onCreateNote={() => setIsCreateDialogOpen(true)}
        />

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
            </DialogHeader>
            <NoteForm onSave={handleCreateNote} onCancel={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
            </DialogHeader>
            <NoteForm note={editingNote} onSave={handleUpdateNote} onCancel={() => setEditingNote(null)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
