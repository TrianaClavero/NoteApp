export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  onClick,
  ...props
}) {
  const variantClass = {
    default: "button-default",
    outline: "button-outline",
    ghost: "button-ghost",
  }[variant]

  const sizeClass = {
    default: "",
    sm: "button-sm",
  }[size]

  const classes = `button ${variantClass} ${sizeClass} ${className}`.trim()

  return (
    <button className={classes} disabled={disabled} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
