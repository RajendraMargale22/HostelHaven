// Reusable Spinner component
// Usage: <Spinner /> or <Spinner label="Loading hostels..." />

export default function Spinner({ label = 'Loading...', fullPage = false }) {
  const style = fullPage
    ? { minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }
    : {};

  return (
    <div className="spinner-wrap" style={style}>
      <div className="spinner"></div>
      {label && <p>{label}</p>}
    </div>
  );
}