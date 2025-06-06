import { Badge } from "../ui/Badge"
import { Button } from "../ui/Button"

export function TagFilter({ allTags, selectedTags, onToggleTag, onClearFilters }) {
  if (allTags.length === 0) return null

  return (
    <div className="tag-filter">
      <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
        />
      </svg>
      <span className="filter-label">Filter by tags:</span>
      {allTags.map((tag) => (
        <Badge key={tag} variant={selectedTags.includes(tag) ? "default" : "outline"} onClick={() => onToggleTag(tag)}>
          {tag}
        </Badge>
      ))}
      {selectedTags.length > 0 && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  )
}
