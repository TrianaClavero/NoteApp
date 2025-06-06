import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Badge } from "../ui/Badge"
import { colorOptions } from "../../services/constants"

export function NoteForm({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [newTag, setNewTag] = useState("")
  const [selectedTags, setSelectedTags] = useState(note?.tags || [])
  const [selectedColor, setSelectedColor] = useState(note?.backgroundColor || "#ffffff")

  const addTag = () => {
    if (newTag.trim() && !selectedTags.includes(newTag.trim())) {
      setSelectedTags((prev) => [...prev, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  const handleSave = () => {
    if (!title.trim()) return
  
    const noteData = {
      title: title.trim(),
      content: content.trim(),
      tags: selectedTags,
      backgroundColor: selectedColor,
      isArchived: note?.isArchived || false,
      id: note?.id,
    }
    onSave(noteData)
  }
  

  return (
    <div>
      <div className="form-group">
        <Input placeholder="Note title..." value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className="form-group">
        <Textarea
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        />
      </div>

      {/* Tags Section */}
      <div className="form-group">
        <label className="form-label">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          Tags
        </label>
        <div className="form-row">
          <Input
            placeholder="Add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTag()}
          />
          <Button onClick={addTag} variant="outline">
            Add
          </Button>
        </div>
        {selectedTags.length > 0 && (
          <div className="tag-list">
            {selectedTags.map((tag) => (
              <span key={tag} className="tag-item" onClick={() => removeTag(tag)}>
                {tag}
                <svg className="icon-xs" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="form-group">
        <label className="form-label">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3V1m0 18v2m8-10h2m-2 4h2m-2-8h2m-2-4h2"
            />
          </svg>
          Background Color
        </label>
        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="select">
          {colorOptions.map((color) => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      {/* Preview */}
      <div className="form-group">
        <label className="form-label">Preview</label>
        <div className="preview-container" style={{ backgroundColor: selectedColor }}>
          <div className="preview-title">{title || "Note title..."}</div>
          <div className="preview-content">{content || "Note content..."}</div>
          {selectedTags.length > 0 && (
            <div className="preview-tags">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-row" style={{ justifyContent: "flex-end", paddingTop: "1rem" }}>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!title.trim()}>
          {note ? "Update Note" : "Save Note"}
        </Button>
      </div>
    </div>
  )
}
