const ITEMS = [
  { icon: 'fa-shield-halved',    color: 'coral', title: 'Verified & Safe',   desc: 'Every listing is manually verified. We check amenities, pricing, and safety standards before publishing.' },
  { icon: 'fa-indian-rupee-sign',color: 'teal',  title: 'No Hidden Costs',   desc: 'What you see is what you pay. No brokerage, no surprise fees, transparent pricing always.' },
  { icon: 'fa-location-dot',     color: 'amber', title: 'Near Your College', desc: 'Filter hostels by proximity to your college. All major colleges in Pune are covered.' },
  { icon: 'fa-headset',          color: 'navy',  title: '24/7 Support',      desc: 'Our support team is always available to help you find the right accommodation.' },
  { icon: 'fa-mobile-screen',    color: 'coral', title: 'Easy Booking',      desc: 'Book online in minutes. No paperwork, no hassle. Just fill a form and we handle the rest.' },
  { icon: 'fa-users',            color: 'teal',  title: 'Student Community', desc: 'Connect with other students living in the same area. Share experiences and reviews.' },
];

export default function WhySection() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow teal"><i className="fas fa-star"></i> Why Us</div>
          <h2>Why Students Choose Hostel Haven</h2>
          <p>We make finding student accommodation simple, safe, and stress-free</p>
          <div className="divider"></div>
        </div>
        <div className="why-grid">
          {ITEMS.map(w => (
            <div key={w.title} className="why-card">
              <div className={`why-icon ${w.color}`}>
                <i className={`fas ${w.icon}`}></i>
              </div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}