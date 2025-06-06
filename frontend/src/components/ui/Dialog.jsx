import { useEffect } from "react"

export function Dialog({ children, open, onOpenChange }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="dialog-overlay fade-in" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export function DialogContent({ children, className = "" }) {
  return <div className={className}>{children}</div>
}

export function DialogHeader({ children }) {
  return <div className="dialog-header">{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className="dialog-title">{children}</h2>
}
