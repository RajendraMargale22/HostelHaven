import { useState, useEffect } from 'react';
import { useAuth }  from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import authApi from '../../api/authApi';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const { login }     = useAuth();
  const { showToast } = useToast();

  const [tab,      setTab]      = useState(initialTab);
  const [authRole, setAuthRole] = useState('user');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const [loginForm,    setLoginForm]    = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' });

  useEffect(() => { setTab(initialTab); setError(''); }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError('');
    const { email, password } = loginForm;
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    try {
      const { data } = await authApi.login({ email, password });
      if (authRole === 'admin' && data.user.role !== 'admin') {
        setError('This account does not have admin access.'); setLoading(false); return;
      }
      login(data.token, data.user);
      showToast(`Welcome back, ${data.user.username}!`, 'success');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    } finally { setLoading(false); }
  };

  const handleRegister = async () => {
    setError('');
    const { username, email, password } = registerForm;
    if (!username || !email || !password) { setError('Please fill in all fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const { data } = await authApi.register({ username, email, password });
      login(data.token, data.user);
      showToast(`Welcome to Hostel Haven, ${data.user.username}!`, 'success');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><i className="fas fa-times"></i></button>

        {tab === 'login' ? (
          <>
            <div className="modal-header">
              <h2>Welcome Back</h2>
              <p>Login to your account</p>
            </div>
            <div className="modal-body">
              <div className="auth-tabs">
                <button className={`auth-tab${authRole === 'user' ? ' active' : ''}`} onClick={() => setAuthRole('user')}>
                  <i className="fas fa-user"></i> User
                </button>
                <button className={`auth-tab${authRole === 'admin' ? ' active' : ''}`} onClick={() => setAuthRole('admin')}>
                  <i className="fas fa-shield-alt"></i> Admin
                </button>
              </div>
              {error && (
                <div className="form-error">
                  <i className="fas fa-exclamation-circle"></i><span>{error}</span>
                </div>
              )}
              <div className="form-group">
                <label className="form-label"><i className="fas fa-envelope"></i> Email</label>
                <input type="email" className="form-control" placeholder="your@email.com"
                  value={loginForm.email}
                  onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <div className="form-group">
                <label className="form-label"><i className="fas fa-lock"></i> Password</label>
                <input type="password" className="form-control" placeholder="Password"
                  value={loginForm.password}
                  onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={handleLogin} disabled={loading}>
                {loading ? <><i className="fas fa-spinner fa-spin"></i> Logging in...</> : 'Login'}
              </button>
              <div className="auth-switch">
                No account? <a href="#" onClick={e => { e.preventDefault(); setTab('register'); setError(''); }}>Register</a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2>Create Account</h2>
              <p>Join Hostel Haven for free</p>
            </div>
            <div className="modal-body">
              {error && (
                <div className="form-error">
                  <i className="fas fa-exclamation-circle"></i><span>{error}</span>
                </div>
              )}
              <div className="form-group">
                <label className="form-label"><i className="fas fa-user"></i> Username</label>
                <input type="text" className="form-control" placeholder="Your name"
                  value={registerForm.username}
                  onChange={e => setRegisterForm(p => ({ ...p, username: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label"><i className="fas fa-envelope"></i> Email</label>
                <input type="email" className="form-control" placeholder="your@email.com"
                  value={registerForm.email}
                  onChange={e => setRegisterForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label"><i className="fas fa-lock"></i> Password</label>
                <input type="password" className="form-control" placeholder="Min 6 characters"
                  value={registerForm.password}
                  onChange={e => setRegisterForm(p => ({ ...p, password: e.target.value }))}
                />
              </div>
              <button className="btn btn-primary btn-block btn-lg" onClick={handleRegister} disabled={loading}>
                {loading ? <><i className="fas fa-spinner fa-spin"></i> Creating...</> : 'Create Account'}
              </button>
              <div className="auth-switch">
                Have an account? <a href="#" onClick={e => { e.preventDefault(); setTab('login'); setError(''); }}>Login</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}