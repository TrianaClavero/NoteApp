export function Card({ children, className = "", style }) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "" }) {
  return <div className={`card-header ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }) {
  return <div className={`card-content ${className}`}>{children}</div>
}
