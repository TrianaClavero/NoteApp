import { Input } from "../ui/Input"

export function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
      <Input placeholder="Search notes..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
    </div>
  )
}
