import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="brand-icon">
                  <svg viewBox="0 0 20 20" fill="white" width="14" height="14">
                    <path d="M10 2L2 8v10h5v-6h6v6h5V8L10 2z"/>
                  </svg>
                </div>
                Hostel<span className="brand-accent">Haven</span>
              </div>
              <p>The trusted student accommodation platform for Pune.</p>
              <div className="footer-social">
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Navigation</div>
              <div className="footer-links">
                <Link to="/">Home</Link>
                <Link to="/hostels">Browse Hostels</Link>
                <Link to="/#contact">Contact</Link>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Hostel Types</div>
              <div className="footer-links">
                <Link to="/hostels?type=boys">Boys Hostels</Link>
                <Link to="/hostels?type=girls">Girls Hostels</Link>
                <Link to="/hostels?type=co-ed">Co-ed PGs</Link>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Contact</div>
              <div className="footer-contact-item">
                <i className="fas fa-phone"></i>
                <span>+91 123 456 7890</span>
              </div>
              <div className="footer-contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@hostelhaven.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Hostel Haven. Built for students of Pune.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}