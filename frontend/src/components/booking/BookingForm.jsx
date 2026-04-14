import { useState, useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import bookingApi from '../../api/bookingApi';
import { useAuth }  from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { formatPrice } from '../../utils/formatters';
import Button from '../ui/Button';

// Usage: <BookingForm hostel={hostel} onSuccess={fn} />
export default function BookingForm({ hostel, onSuccess }) {
  const { user }      = useAuth();
  const { showToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: user?.username || '',
    email: '',
    phone: '',
    checkIn: '',
    duration: '12',
    message: '',
  });

  const checkinRef = useRef(null);
  const fpRef      = useRef(null);

  useEffect(() => {
    if (checkinRef.current) {
      fpRef.current = flatpickr(checkinRef.current, {
        minDate: 'today',
        dateFormat: 'Y-m-d',
        onChange: ([date]) => {
          setForm(p => ({ ...p, checkIn: date ? date.toISOString().split('T')[0] : '' }));
        },
      });
    }
    return () => fpRef.current?.destroy();
  }, []);

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const total = hostel.price * Number(form.duration);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.checkIn) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setLoading(true);
    try {
      await bookingApi.create({
        hostel:   hostel._id,
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        checkIn:  form.checkIn,
        duration: Number(form.duration),
        message:  form.message,
      });
      showToast('Booking submitted successfully!', 'success');
      onSuccess?.();
    } catch (err) {
      showToast(err.response?.data?.message || 'Booking failed. Try again.', 'error');
    } finally { setLoading(false); }
  };

  return (
    <div className="booking-card-body">
      <h4><i className="fas fa-calendar-check"></i> Book This Hostel</h4>

      {[
        { label: 'Full Name',    icon: 'fa-user',     type: 'text',  field: 'name',  ph: 'Your full name' },
        { label: 'Email',        icon: 'fa-envelope', type: 'email', field: 'email', ph: 'your@email.com' },
        { label: 'Phone Number', icon: 'fa-phone',    type: 'tel',   field: 'phone', ph: '+91 XXXXX XXXXX' },
      ].map(f => (
        <div key={f.field} className="form-group">
          <label className="form-label">
            <i className={`fas ${f.icon}`}></i> {f.label}
          </label>
          <input
            type={f.type}
            className="form-control"
            placeholder={f.ph}
            value={form[f.field]}
            onChange={set(f.field)}
          />
        </div>
      ))}

      <div className="form-group">
        <label className="form-label"><i className="fas fa-calendar"></i> Check-in Date</label>
        <input
          type="text"
          className="form-control"
          ref={checkinRef}
          placeholder="Select date"
          readOnly
        />
      </div>

      <div className="form-group">
        <label className="form-label"><i className="fas fa-clock"></i> Duration</label>
        <select className="form-control" value={form.duration} onChange={set('duration')}>
          <option value="1">1 Month</option>
          <option value="3">3 Months</option>
          <option value="6">6 Months</option>
          <option value="12">12 Months</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label"><i className="fas fa-comment"></i> Message (optional)</label>
        <textarea
          className="form-control"
          rows="2"
          placeholder="Any special requirements..."
          value={form.message}
          onChange={set('message')}
        ></textarea>
      </div>

      <div className="total-box">
        <span className="label">Total Estimated Cost</span>
        <span className="amount">₹{formatPrice(total)}</span>
      </div>

      <Button
        variant="primary"
        block
        size="lg"
        loading={loading}
        onClick={handleSubmit}
        style={{ marginTop: 14 }}
      >
        <i className="fas fa-calendar-check"></i> Confirm Booking Request
      </Button>

      <div className="booking-note">
        <i className="fas fa-info-circle"></i>
        Booking is pending until confirmed by the hostel
      </div>
    </div>
  );
}