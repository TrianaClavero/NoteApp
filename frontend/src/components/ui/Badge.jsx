export function Badge({ children, variant = "default", className = "", onClick }) {
  const variantClass = {
    default: "badge-default",
    secondary: "badge-secondary",
    outline: "badge-outline",
  }[variant]

  const classes = `badge ${variantClass} ${className}`.trim()

  return (
    <span className={classes} onClick={onClick}>
      {children}
    </span>
  )
}
