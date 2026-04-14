import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth }  from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import AuthModal from '../auth/AuthModal';
import AddHostelModal from '../auth/AddHostelModal';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { showToast }    = useToast();
  const location         = useLocation();
  const isHome           = location.pathname === '/';

  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [showAuth,       setShowAuth]       = useState(false);
  const [authTab,        setAuthTab]        = useState('login');
  const [showAddHostel,  setShowAddHostel]  = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    setMenuOpen(false);
  };

  const openLogin = () => { setAuthTab('login'); setShowAuth(true); setMenuOpen(false); };
  const openRegister = () => { setAuthTab('register'); setShowAuth(true); setMenuOpen(false); };
  const openAddHostel = () => {
    if (!user) { openLogin(); showToast('Please login to list a hostel', 'info'); return; }
    setShowAddHostel(true);
    setMenuOpen(false);
  };

  const navClass = `navbar${!isHome || scrolled ? ' solid' : ''}`;
  const links = [
    { to: '/', label: 'Home' },
    { to: '/hostels', label: 'Hostels' },
    { to: '/#about', label: 'About' },
    { to: '/#contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={navClass} id="navbar">
        <div className="navbar-inner">
          <Link className="navbar-brand" to="/">
            <div className="brand-icon">
              <svg viewBox="0 0 20 20" fill="white" width="16" height="16">
                <path d="M10 2L2 8v10h5v-6h6v6h5V8L10 2z"/>
              </svg>
            </div>
            Hostel<span className="brand-accent">Haven</span>
          </Link>

          <ul className="navbar-links">
            {links.map(l => (
              <li key={l.to}>
                <Link to={l.to} className={location.pathname === l.to ? 'active' : ''}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar-auth">
            {!user ? (
              <>
                <button className="btn-nav-login" onClick={openLogin}>Login</button>
                <button className="btn-nav-primary" onClick={openRegister}>Sign Up</button>
              </>
            ) : user.role === 'admin' ? (
              <>
                <div className="user-chip">
                  <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
                  {user.username}
                </div>
                <Link to="/admin" className="btn-nav-admin">
                  <i className="fas fa-shield-alt"></i> Admin Panel
                </Link>
                <button className="btn-nav-ghost" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </>
            ) : (
              <>
                <div className="user-chip">
                  <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
                  {user.username}
                </div>
                <button className="btn-nav-primary" onClick={openAddHostel}>
                  <i className="fas fa-plus"></i> List Hostel
                </button>
                <button className="btn-nav-ghost" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </>
            )}
          </div>

          <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`navbar-mobile${menuOpen ? ' open' : ''}`}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          <div className="mobile-auth">
            {!user ? (
              <>
                <button className="btn-nav-login w-100" onClick={openLogin}>Login</button>
                <button className="btn-nav-primary w-100" onClick={openRegister}>Sign Up</button>
              </>
            ) : (
              <>
                {user.role === 'admin'
                  ? <Link to="/admin" className="btn-nav-admin w-100 text-center" onClick={() => setMenuOpen(false)}>Admin Panel</Link>
                  : <button className="btn-nav-primary w-100" onClick={openAddHostel}>List Hostel</button>
                }
                <button className="btn-nav-ghost w-100" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialTab={authTab}
      />
      <AddHostelModal
        isOpen={showAddHostel}
        onClose={() => setShowAddHostel(false)}
      />
    </>
  );
}