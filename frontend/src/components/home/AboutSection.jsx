import { Link } from 'react-router-dom';

const CHECKLIST = [
  'Over 200 verified hostels across Pune',
  'Transparent pricing with no hidden fees',
  'Direct contact with hostel owners',
  'Dedicated 24/7 support for students',
];

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap">
            <img
              className="about-img-main"
              src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&q=80"
              alt="About Hostel Haven"
            />
            <div className="about-img-badge">
              <strong>5+</strong>
              <span>Years of Trust</span>
            </div>
          </div>

          <div className="about-text">
            <div className="eyebrow"><i className="fas fa-circle-info"></i> About Us</div>
            <h2>Pune's Most Trusted Student Housing Platform</h2>
            <p>
              We started Hostel Haven with one goal — make finding student accommodation
              in Pune simple, safe, and affordable. Today, over 1,500 students trust us
              to find their home away from home.
            </p>
            <div className="about-list">
              {CHECKLIST.map(item => (
                <div key={item} className="about-list-item">
                  <div className="check"><i className="fas fa-check"></i></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/hostels" className="btn btn-primary btn-lg">
              Find a Hostel <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}