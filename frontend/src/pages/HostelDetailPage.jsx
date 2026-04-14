import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import hostelApi  from '../api/hostelApi';
import bookingApi from '../api/bookingApi';
import { FALLBACK_HOSTELS, AMENITY_ICONS, formatPrice } from '../utils/data';
import { useAuth }  from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import '../styles/hostel-detail.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80';

export default function HostelDetailPage() {
  const { id }          = useParams();
  const { user }        = useAuth();
  const { showToast }   = useToast();

  const [hostel,  setHostel]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [booked,  setBooked]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState({
    name: '', email: '', phone: '', checkIn: '', duration: '12', message: '',
  });

  const checkinRef = useRef(null);
  const fpRef      = useRef(null);

  useEffect(() => { loadHostel(); }, [id]);

  useEffect(() => {
    if (user && hostel && checkinRef.current) {
      fpRef.current = flatpickr(checkinRef.current, {
        minDate: 'today', dateFormat: 'Y-m-d',
        onChange: ([date]) => {
          setBooking(p => ({ ...p, checkIn: date ? date.toISOString().split('T')[0] : '' }));
        },
      });
    }
    return () => fpRef.current?.destroy();
  }, [user, hostel]);

  useEffect(() => {
    if (user) setBooking(p => ({ ...p, name: user.username || '' }));
  }, [user]);

  const loadHostel = async () => {
    setLoading(true);
    try {
      const { data } = await hostelApi.getById(id);
      setHostel(data);
    } catch {
      setHostel(FALLBACK_HOSTELS.find(h => h._id === id) || null);
    } finally { setLoading(false); }
  };

  const handleBook = async () => {
    if (!booking.name || !booking.email || !booking.phone || !booking.checkIn) {
      showToast('Please fill in all required fields.', 'error'); return;
    }
    setSubmitting(true);
    try {
      await bookingApi.create({
        hostel: hostel._id,
        name: booking.name, email: booking.email, phone: booking.phone,
        checkIn: booking.checkIn, duration: Number(booking.duration), message: booking.message,
      });
      setBooked(true);
      showToast('Booking submitted successfully!', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'Booking failed. Try again.', 'error');
    } finally { setSubmitting(false); }
  };

  if (loading) return (
    <div className="detail-page-wrap">
      <div className="spinner-wrap" style={{ paddingTop: 160 }}>
        <div className="spinner"></div><p>Loading hostel details...</p>
      </div>
    </div>
  );

  if (!hostel) return (
    <div className="detail-page-wrap">
      <div className="empty-state" style={{ paddingTop: 160 }}>
        <div className="empty-icon">😕</div>
        <h3>Hostel not found</h3>
        <Link to="/hostels" className="btn btn-primary btn-sm" style={{ marginTop: 16 }}>Go Back</Link>
      </div>
    </div>
  );

  const images   = hostel.images?.length ? hostel.images : [hostel.image || FALLBACK_IMG];
  const amenities = hostel.amenities?.length ? hostel.amenities : ['WiFi', 'Security'];
  const total    = hostel.price * Number(booking.duration);

  return (
    <div className="detail-page-wrap">
      {/* Hero swiper */}
      <Swiper
        className="detail-hero-swiper"
        modules={[Autoplay, Pagination, Navigation]}
        loop={images.length > 1}
        pagination={{ clickable: true }}
        navigation
        autoplay={images.length > 1 ? { delay: 3500 } : false}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={hostel.name} onError={e => { e.target.src = FALLBACK_IMG; }} />
          </SwiperSlide>
        ))}
        <div className="detail-hero-overlay">
          <span className={`badge badge-${hostel.type}`}>{hostel.type}</span>
          <h1>{hostel.name}</h1>
          <div className="location-line">
            <i className="fas fa-map-marker-alt"></i> {hostel.location}
          </div>
        </div>
      </Swiper>

      {/* Breadcrumb */}
      <div className="detail-breadcrumb">
        <Link to="/">Home</Link>
        <i className="fas fa-chevron-right"></i>
        <Link to="/hostels">Hostels</Link>
        <i className="fas fa-chevron-right"></i>
        <span>{hostel.name}</span>
      </div>

      {/* Layout */}
      <div className="detail-layout">
        <div className="detail-main">
          <div className="detail-card">
            <h3><i className="fas fa-info-circle"></i> About This Hostel</h3>
            <p>A well-maintained <strong>{hostel.type}</strong> hostel located in <strong>{hostel.location}</strong>. Perfect for students studying at nearby colleges. Safe, clean, and affordable with all essential amenities.</p>
            {hostel.addedBy?.username && (
              <p style={{ marginTop: 10, fontSize: '0.85rem', color: 'var(--text-lt)' }}>
                <i className="fas fa-user-circle" style={{ color: 'var(--teal)', marginRight: 4 }}></i>
                Listed by <strong>{hostel.addedBy.username}</strong>
              </p>
            )}
          </div>

          <div className="detail-card">
            <h3><i className="fas fa-star"></i> Amenities & Facilities</h3>
            <div className="amenities-wrap">
              {amenities.map(a => (
                <span key={a} className="amenity-chip">
                  <i className={`fas ${AMENITY_ICONS[a] || 'fa-check'}`}></i> {a}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <h3><i className="fas fa-map-marker-alt"></i> Location</h3>
            <p>{hostel.location}</p>
            <div className="map-btn-wrap">
              <a href={hostel.mapLink || '#'} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                <i className="fas fa-map"></i> Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="booking-card-header">
              <div className="booking-card-price">
                ₹{formatPrice(hostel.price)}<sub>/month</sub>
              </div>
              <div className="booking-card-type">
                <span className={`badge badge-${hostel.type}`}>{hostel.type}</span>
              </div>
            </div>

            {!user ? (
              <div className="booking-login-wall">
                <div className="lock-icon"><i className="fas fa-lock"></i></div>
                <h4>Login to Book</h4>
                <p>Create a free account or login to book this hostel</p>
                <Link to="/" className="btn btn-primary btn-block">
                  <i className="fas fa-sign-in-alt"></i> Login / Register
                </Link>
              </div>
            ) : booked ? (
              <div className="booking-success">
                <div className="success-icon"><i className="fas fa-check"></i></div>
                <h4>Booking Submitted!</h4>
                <p>Your request has been sent. The hostel owner will contact you to confirm.</p>
                <Link to="/hostels" className="btn btn-secondary btn-sm">Browse More Hostels</Link>
              </div>
            ) : (
              <div className="booking-card-body">
                <h4><i className="fas fa-calendar-check"></i> Book This Hostel</h4>
                {[
                  { label: 'Full Name', icon: 'fa-user', type: 'text', field: 'name', ph: 'Your full name' },
                  { label: 'Email', icon: 'fa-envelope', type: 'email', field: 'email', ph: 'your@email.com' },
                  { label: 'Phone Number', icon: 'fa-phone', type: 'tel', field: 'phone', ph: '+91 XXXXX XXXXX' },
                ].map(f => (
                  <div key={f.field} className="form-group">
                    <label className="form-label"><i className={`fas ${f.icon}`}></i> {f.label}</label>
                    <input type={f.type} className="form-control" placeholder={f.ph}
                      value={booking[f.field]}
                      onChange={e => setBooking(p => ({ ...p, [f.field]: e.target.value }))}
                    />
                  </div>
                ))}

                <div className="form-group">
                  <label className="form-label"><i className="fas fa-calendar"></i> Check-in Date</label>
                  <input type="text" className="form-control" ref={checkinRef} placeholder="Select date" readOnly />
                </div>

                <div className="form-group">
                  <label className="form-label"><i className="fas fa-clock"></i> Duration</label>
                  <select className="form-control"
                    value={booking.duration}
                    onChange={e => setBooking(p => ({ ...p, duration: e.target.value }))}
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label"><i className="fas fa-comment"></i> Message (optional)</label>
                  <textarea className="form-control" rows="2" placeholder="Any special requirements..."
                    value={booking.message}
                    onChange={e => setBooking(p => ({ ...p, message: e.target.value }))}
                  ></textarea>
                </div>

                <div className="total-box">
                  <span className="label">Total Estimated Cost</span>
                  <span className="amount">₹{formatPrice(total)}</span>
                </div>

                <button className="btn btn-primary btn-block btn-lg" onClick={handleBook} disabled={submitting} style={{ marginTop: 14 }}>
                  {submitting
                    ? <><i className="fas fa-spinner fa-spin"></i> Submitting...</>
                    : <><i className="fas fa-calendar-check"></i> Confirm Booking Request</>}
                </button>

                <div className="booking-note">
                  <i className="fas fa-info-circle"></i>
                  Booking is pending until confirmed by the hostel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}