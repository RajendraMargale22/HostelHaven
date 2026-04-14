import { Link } from 'react-router-dom';
import { useAuth }  from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import hostelApi from '../../api/hostelApi';
import { formatPrice } from '../../utils/formatters';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80';

export default function HostelCard({ hostel, onDeleted }) {
  const { user, isAdmin } = useAuth();
  const { showToast }     = useToast();

  const isOwner = user && (hostel.addedBy?._id === user.id || hostel.addedBy === user.id);
  const canDelete = isOwner || isAdmin;
  const imgSrc = hostel.image || FALLBACK_IMG;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Delete this hostel listing? This cannot be undone.')) return;
    try {
      await hostelApi.remove(hostel._id);
      showToast('Hostel deleted', 'success');
      onDeleted?.();
    } catch (err) {
      showToast(err.response?.data?.message || 'Not authorized to delete', 'error');
    }
  };

  return (
    <div className="hostel-card">
      <div className="hostel-card-img">
        <img
          src={imgSrc}
          alt={hostel.name}
          onError={e => { e.target.src = FALLBACK_IMG; }}
        />
        <div className="card-img-overlay">
          <span className={`badge badge-${hostel.type}`}>{hostel.type}</span>
        </div>
        {canDelete && (
          <div className="card-img-actions">
            <button className="card-action-btn card-action-delete" onClick={handleDelete} title="Delete listing">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      <div className="hostel-card-body">
        <div className="hostel-card-title">{hostel.name}</div>
        <div className="hostel-card-location">
          <i className="fas fa-map-marker-alt"></i>
          <span>{hostel.location}</span>
        </div>
        {hostel.addedBy?.username && (
          <div className="hostel-card-owner">
            <i className="fas fa-user-circle"></i> Listed by {hostel.addedBy.username}
          </div>
        )}
        <div className="hostel-card-footer">
          <div className="hostel-price">
            ₹{formatPrice(hostel.price)}<sub>/month</sub>
          </div>
          <Link to={`/hostels/${hostel._id}`} className="btn btn-primary btn-sm">
            View Details <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}