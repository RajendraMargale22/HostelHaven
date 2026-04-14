// Reusable Modal wrapper
// Usage:
// <Modal isOpen={true} onClose={fn} title="My Modal" size="lg">
//   <p>content</p>
// </Modal>

export default function Modal({ isOpen, onClose, title, subtitle, children, size = '' }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`modal-box${size === 'lg' ? ' modal-box-lg' : ''}`}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {(title || subtitle) && (
          <div className="modal-header">
            {title    && <h2>{title}</h2>}
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}