import { useState } from 'react';
import contactApi from '../../api/contactApi';
import { useToast } from '../../hooks/useToast';
import Button from '../ui/Button';

const INFO_ITEMS = [
  { icon: 'fa-phone',        label: 'Phone',    value: '+91 123 456 7890' },
  { icon: 'fa-envelope',     label: 'Email',    value: 'info@hostelhaven.com' },
  { icon: 'fa-location-dot', label: 'Location', value: 'Pune, Maharashtra, India' },
];

export default function ContactSection() {
  const { showToast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await contactApi.send(form);
      showToast("Message sent! We'll get back to you soon.", 'success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      showToast('Failed to send. Please try again.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">

          {/* Left — info */}
          <div className="contact-left">
            <div className="eyebrow navy">
              <i className="fas fa-envelope"></i> Contact Us
            </div>
            <h2>Get In Touch</h2>
            <p>
              Have questions about a hostel or need help finding accommodation?
              We're here for you.
            </p>
            <div className="contact-info-list">
              {INFO_ITEMS.map(item => (
                <div key={item.label} className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <div className="label">{item.label}</div>
                    <div className="value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-form-card">
            <h3>Send a Message</h3>
            <form className="form-dark" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={set('name')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="your@email.com"
                  required
                  value={form.email}
                  onChange={set('email')}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="How can we help you?"
                  required
                  value={form.message}
                  onChange={set('message')}
                ></textarea>
              </div>
              <Button
                type="submit"
                variant="primary"
                block
                size="lg"
                loading={sending}
                icon="fa-paper-plane"
              >
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}