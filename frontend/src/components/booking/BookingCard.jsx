import Badge from '../ui/Badge';
import { formatPrice, formatDate } from '../../utils/formatters';

// Usage: <BookingCard booking={booking} onCancel={fn} />
export default function BookingCard({ booking, onCancel }) {
  const { hostel, name, email, phone, checkIn, duration, status, createdAt } = booking;

  return (
    <div className="booking-card-item">
      <div className="bk-card-top">
        <div className="bk-hostel-info">
          {hostel?.image && (
            <img
              src={hostel.image}
              alt={hostel?.name}
              className="bk-hostel-img"
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
          <div>
            <div className="bk-hostel-name">{hostel?.name || 'Hostel'}</div>
            <div className="bk-hostel-location">
              <i className="fas fa-location-dot"></i> {hostel?.location || '—'}
            </div>
          </div>
        </div>
        <Badge status={status} />
      </div>

      <div className="bk-card-details">
        <div className="bk-detail-item">
          <span className="bk-detail-label">Guest</span>
          <span className="bk-detail-value">{name}</span>
        </div>
        <div className="bk-detail-item">
          <span className="bk-detail-label">Check-in</span>
          <span className="bk-detail-value">{formatDate(checkIn)}</span>
        </div>
        <div className="bk-detail-item">
          <span className="bk-detail-label">Duration</span>
          <span className="bk-detail-value">{duration} month{duration > 1 ? 's' : ''}</span>
        </div>
        <div className="bk-detail-item">
          <span className="bk-detail-label">Total</span>
          <span className="bk-detail-value bk-price">
            ₹{formatPrice((hostel?.price || 0) * duration)}
          </span>
        </div>
      </div>

      {status === 'pending' && onCancel && (
        <div className="bk-card-footer">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onCancel(booking._id)}
          >
            <i className="fas fa-times"></i> Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
}