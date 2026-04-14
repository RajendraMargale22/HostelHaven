// Reusable Button component
// Usage: <Button variant="primary" size="lg" loading={true} icon="fa-search">Search</Button>

export default function Button({
  children,
  variant = 'primary',
  size = '',
  loading = false,
  disabled = false,
  icon,
  block = false,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    block ? 'btn-block' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading
        ? <><i className="fas fa-spinner fa-spin"></i> {children}</>
        : <>
            {icon && <i className={`fas ${icon}`}></i>}
            {children}
          </>
      }
    </button>
  );
}