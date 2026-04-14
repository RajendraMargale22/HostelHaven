import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import hostelApi from '../../api/hostelApi';

export default function AddHostelModal({ isOpen, onClose, onSuccess }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', location: '', price: '', type: 'boys', image: '', mapLink: '',
  });

  if (!isOpen) return null;

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.location || !form.price) {
      showToast('Name, location and price are required.', 'error'); return;
    }
    setLoading(true);
    try {
      await hostelApi.create({ ...form, price: Number(form.price) });
      showToast('Hostel listed successfully!', 'success');
      setForm({ name: '', location: '', price: '', type: 'boys', image: '', mapLink: '' });
      onClose();
      onSuccess?.();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to list hostel.', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box modal-box-lg">
        <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>
        <div className="modal-header">
          <div className="eyebrow teal"><i className="fas fa-plus-circle"></i> New Listing</div>
          <h2>List Your Hostel</h2>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label"><i className="fas fa-hotel"></i> Hostel Name *</label>
            <input type="text" className="form-control" placeholder="e.g. Sunrise Boys PG" value={form.name} onChange={set('name')} />
          </div>
          <div className="form-group">
            <label className="form-label"><i className="fas fa-map-marker-alt"></i> Full Address *</label>
            <input type="text" className="form-control" placeholder="Street, Area, Pune - PIN" value={form.location} onChange={set('location')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label"><i className="fas fa-indian-rupee-sign"></i> Monthly Rent *</label>
              <input type="number" className="form-control" placeholder="e.g. 6000" value={form.price} onChange={set('price')} />
            </div>
            <div className="form-group">
              <label className="form-label"><i className="fas fa-users"></i> Type *</label>
              <select className="form-control" value={form.type} onChange={set('type')}>
                <option value="boys">Boys</option>
                <option value="girls">Girls</option>
                <option value="co-ed">Co-ed</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label"><i className="fas fa-image"></i> Photo URL</label>
            <input type="text" className="form-control" placeholder="https://..." value={form.image} onChange={set('image')} />
          </div>
          <div className="form-group">
            <label className="form-label"><i className="fas fa-map"></i> Google Maps Link</label>
            <input type="text" className="form-control" placeholder="https://maps.google.com/..." value={form.mapLink} onChange={set('mapLink')} />
          </div>
          <button className="btn btn-primary btn-block btn-lg" onClick={handleSubmit} disabled={loading}>
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</> : <><i className="fas fa-plus"></i> Submit Listing</>}
          </button>
        </div>
      </div>
    </div>
  );
}