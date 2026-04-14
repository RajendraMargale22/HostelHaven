// Reusable Badge component
// Usage: <Badge type="boys" /> or <Badge status="confirmed" />

const TYPE_MAP   = { boys: 'badge-boys', girls: 'badge-girls', 'co-ed': 'badge-co-ed' };
const STATUS_MAP = {
  pending:   'badge-pending',
  confirmed: 'badge-confirmed',
  rejected:  'badge-rejected',
  cancelled: 'badge-cancelled',
};

export default function Badge({ type, status, children, className = '' }) {
  const variant = TYPE_MAP[type] || STATUS_MAP[status] || '';
  const label   = children || type || status || '';

  return (
    <span className={`badge ${variant} ${className}`.trim()}>
      {label}
    </span>
  );
}