import { useState } from "react"

export function Select({ children, value, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false)

  return <div className="relative">{children}</div>
}

export function SelectTrigger({ children, className = "" }) {
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>
}

export function SelectContent({ children }) {
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
      {children}
    </div>
  )
}

export function SelectItem({ children, value, onSelect }) {
  return (
    <div className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => onSelect && onSelect(value)}>
      {children}
    </div>
  )
}
