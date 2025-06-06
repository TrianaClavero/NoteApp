import { useState, useEffect, useCallback } from "react"
import { notesApi } from "./notesApi"

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [showArchived, setShowArchived] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const allTags = Array.from(new Set(notes.flatMap((note) => note.tags || [])))

  const normalizeNote = (apiNote) => ({
    id: apiNote.id,
    title: apiNote.title || "",
    content: apiNote.content || "",
    tags: apiNote.tags || [],
    isArchived: Boolean(apiNote.is_archived),
    backgroundColor: apiNote.background_color || "#ffffff",
    createdAt: apiNote.created_at ? new Date(apiNote.created_at) : new Date(),
    updatedAt: apiNote.updated_at ? new Date(apiNote.updated_at) : new Date(),
  })

  const loadNotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const [activeNotes, archivedNotes] = await Promise.all([notesApi.getActiveNotes(), notesApi.getArchivedNotes()])

      const allNotes = [...activeNotes, ...archivedNotes]
      const normalizedNotes = allNotes.map(normalizeNote)

      setNotes(normalizedNotes)
    } catch (err) {
      setError("Error loading notes: " + err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  useEffect(() => {
    filterNotes()
  }, [notes, selectedTags, showArchived, searchTerm])

  const filterNotes = () => {
    let filtered = notes.filter((note) => note.isArchived === showArchived)

    if (selectedTags.length > 0) {
      filtered = filtered.filter((note) => selectedTags.some((tag) => note.tags.includes(tag)))
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredNotes(filtered)
  }

  const createNote = async (noteData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await notesApi.createNote(noteData)

      if (response.id) {
        await loadNotes()
        return response
      }

      return response
    } catch (err) {
      setError("Error creating note: " + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateNote = async (id, noteData) => {
    try {
      setLoading(true)
      setError(null)

      // Verificar que la nota existe localmente
      const localNote = notes.find((n) => n.id === id)
      if (!localNote) {
        throw new Error("Note not found in local state. Please refresh the page.")
      }

      const response = await notesApi.updateNote(id, noteData)
      await loadNotes()

      return response
    } catch (err) {
      setError("Error updating note: " + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteNote = async (id) => {
    try {
      setLoading(true)
      setError(null)

      await notesApi.deleteNote(id)
      setNotes((prev) => prev.filter((note) => note.id !== id))
    } catch (err) {
      setError("Error deleting note: " + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleArchive = async (id) => {
    try {
      setLoading(true)
      setError(null)

      const note = notes.find((n) => n.id === id)
      if (!note) {
        throw new Error("Note not found")
      }

      const updatedData = {
        title: note.title,
        content: note.content,
        tags: note.tags,
        isArchived: !note.isArchived,
        backgroundColor: note.backgroundColor,
      }

      await updateNote(id, updatedData)
    } catch (err) {
      setError("Error archiving note: " + err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleTagFilter = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSelectedTags([])
    setSearchTerm("")
  }

  const refreshNotes = () => {
    loadNotes()
  }

  return {
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
  }
}
