// Reusable EmptyState component
// Usage: <EmptyState icon="🏠" title="No hostels found" desc="Try different filters" action={<button>Clear</button>} />

export default function EmptyState({
  icon = '📭',
  title = 'Nothing here yet',
  desc = '',
  action = null,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}