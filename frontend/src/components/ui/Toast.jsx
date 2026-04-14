// Single Toast item — rendered by ToastContext
// Not used directly. ToastContext handles rendering.
// Exported for reference or custom usage.

const ICONS = {
  success: 'fa-check',
  error:   'fa-times',
  info:    'fa-info-circle',
};

export default function Toast({ msg, type = 'success' }) {
  return (
    <div className={`toast ${type}`}>
      <div className="toast-icon">
        <i className={`fas ${ICONS[type] || 'fa-bell'}`}></i>
      </div>
      <span>{msg}</span>
    </div>
  );
}