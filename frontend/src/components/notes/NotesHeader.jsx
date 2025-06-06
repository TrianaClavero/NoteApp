import { Button } from "../ui/Button"
import { SearchBar } from "./SearchBar"

export function NotesHeader({ searchTerm, onSearchChange, showArchived, onToggleArchived, onCreateNote }) {
  return (
    <div className="notes-header">
      <h1 className="notes-title">{showArchived ? "Archived Notes" : "Active Notes"}</h1>

      <div className="header-controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />

        <div className="button-group">
          <Button variant={showArchived ? "default" : "outline"} onClick={onToggleArchived}>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showArchived ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l6 6 6-6" />
              )}
            </svg>
            {showArchived ? "Show Active" : "Show Archived"}
          </Button>

          <Button onClick={onCreateNote}>
            <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Note
          </Button>
        </div>
      </div>
    </div>
  )
}
