import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }  from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import adminApi from '../api/adminApi';
import { formatPrice, formatDate } from '../utils/formatters';
import '../styles/admin.css';

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const { showToast }     = useToast();
  const navigate          = useNavigate();

  const [tab,      setTab]      = useState('overview');
  const [stats,    setStats]    = useState(null);
  const [bookings, setBookings] = useState([]);
  const [users,    setUsers]    = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!user || !isAdmin) { navigate('/'); return; }
    loadAll();
  }, [user, isAdmin]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [s, b, u, c] = await Promise.all([
        adminApi.getStats(),
        adminApi.getAllBookings(),
        adminApi.getUsers(),
        adminApi.getContacts(),
      ]);
      setStats(s.data);
      setBookings(b.data);
      setUsers(u.data);
      setContacts(c.data);
    } catch {
      showToast('Failed to load admin data.', 'error');
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateBookingStatus(id, status);
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status } : b));
      showToast(`Booking marked as ${status}`, 'success');
    } catch { showToast('Failed to update status.', 'error'); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await adminApi.deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
      showToast('User deleted.', 'success');
    } catch { showToast('Failed to delete user.', 'error'); }
  };

  const deleteContact = async (id) => {
    try {
      await adminApi.deleteContact(id);
      setContacts(prev => prev.filter(c => c._id !== id));
      showToast('Message deleted.', 'success');
    } catch { showToast('Failed to delete.', 'error'); }
  };

  const markRead = async (id) => {
    try {
      await adminApi.markContactRead(id);
      setContacts(prev => prev.map(c => c._id === id ? { ...c, read: true } : c));
    } catch {}
  };

  if (loading) return (
    <div className="admin-page">
      <div className="spinner-wrap" style={{ paddingTop: 160 }}>
        <div className="spinner"></div><p>Loading admin dashboard...</p>
      </div>
    </div>
  );

  const TABS = [
    { key: 'overview',  icon: 'fa-chart-bar',      label: 'Overview' },
    { key: 'bookings',  icon: 'fa-calendar-check',  label: `Bookings ${stats?.pendingBookings ? `(${stats.pendingBookings})` : ''}` },
    { key: 'users',     icon: 'fa-users',            label: 'Users' },
    { key: 'contacts',  icon: 'fa-envelope',         label: `Messages ${stats?.totalContacts ? `(${stats.totalContacts})` : ''}` },
  ];

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="container">
          <div className="admin-header-inner">
            <div>
              <div className="eyebrow teal"><i className="fas fa-shield-alt"></i> Admin Panel</div>
              <h1>Dashboard</h1>
            </div>
            <div className="admin-user-chip">
              <div className="avatar">{user.username.charAt(0).toUpperCase()}</div>
              <span>{user.username}</span>
            </div>
          </div>
          <div className="admin-tabs">
            {TABS.map(t => (
              <button key={t.key}
                className={`admin-tab${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                <i className={`fas ${t.icon}`}></i> {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-body container">

        {/* ── OVERVIEW ── */}
        {tab === 'overview' && stats && (
          <div className="admin-section">
            <div className="stats-grid">
              {[
                { icon: 'fa-users',           color: 'coral',  label: 'Total Users',    value: stats.totalUsers },
                { icon: 'fa-building',        color: 'teal',   label: 'Total Hostels',  value: stats.totalHostels },
                { icon: 'fa-calendar-check',  color: 'amber',  label: 'Total Bookings', value: stats.totalBookings },
                { icon: 'fa-clock',           color: 'navy',   label: 'Pending',        value: stats.pendingBookings },
                { icon: 'fa-envelope',        color: 'coral',  label: 'Unread Messages',value: stats.totalContacts },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className={`stat-icon ${s.color}`}><i className={`fas ${s.icon}`}></i></div>
                  <div className="stat-info">
                    <div className="stat-value">{s.value ?? '—'}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {tab === 'bookings' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>All Bookings</h2>
              <span className="count-chip">{bookings.length} total</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Guest</th><th>Hostel</th><th>Check-in</th>
                    <th>Duration</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b._id}>
                      <td>
                        <div className="td-primary">{b.name}</div>
                        <div className="td-secondary">{b.email}</div>
                      </td>
                      <td>
                        <div className="td-primary">{b.hostel?.name || '—'}</div>
                        <div className="td-secondary">₹{formatPrice(b.hostel?.price)}/mo</div>
                      </td>
                      <td>{formatDate(b.checkIn)}</td>
                      <td>{b.duration} mo</td>
                      <td><span className={`badge badge-${b.status}`}>{b.status}</span></td>
                      <td>
                        <div className="action-btns">
                          {b.status === 'pending' && (
                            <>
                              <button className="btn-action confirm" onClick={() => updateStatus(b._id, 'confirmed')} title="Confirm">
                                <i className="fas fa-check"></i>
                              </button>
                              <button className="btn-action reject" onClick={() => updateStatus(b._id, 'rejected')} title="Reject">
                                <i className="fas fa-times"></i>
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && <div className="empty-state"><div className="empty-icon">📋</div><h3>No bookings yet</h3></div>}
            </div>
          </div>
        )}

        {/* ── USERS ── */}
        {tab === 'users' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>All Users</h2>
              <span className="count-chip">{users.length} total</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr><th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id}>
                      <td>
                        <div className="user-cell">
                          <div className="mini-avatar">{u.username.charAt(0).toUpperCase()}</div>
                          <span className="td-primary">{u.username}</span>
                        </div>
                      </td>
                      <td><div className="td-secondary">{u.email}</div></td>
                      <td><span className={`badge ${u.role === 'admin' ? 'badge-confirmed' : 'badge-cancelled'}`}>{u.role}</span></td>
                      <td>{formatDate(u.createdAt)}</td>
                      <td>
                        {u.role !== 'admin' && (
                          <button className="btn-action delete" onClick={() => deleteUser(u._id)} title="Delete user">
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── CONTACTS ── */}
        {tab === 'contacts' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h2>Contact Messages</h2>
              <span className="count-chip">{contacts.filter(c => !c.read).length} unread</span>
            </div>
            <div className="contacts-list">
              {contacts.map(c => (
                <div key={c._id} className={`contact-card${c.read ? ' read' : ''}`} onClick={() => markRead(c._id)}>
                  <div className="contact-card-header">
                    <div className="contact-from">
                      <div className="mini-avatar">{c.name.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="td-primary">{c.name}</div>
                        <div className="td-secondary">{c.email}</div>
                      </div>
                    </div>
                    <div className="contact-meta">
                      {!c.read && <span className="unread-dot"></span>}
                      <span className="contact-date">{formatDate(c.createdAt)}</span>
                      <button className="btn-action delete" onClick={(e) => { e.stopPropagation(); deleteContact(c._id); }}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <p className="contact-msg">{c.message}</p>
                </div>
              ))}
              {contacts.length === 0 && <div className="empty-state"><div className="empty-icon">📭</div><h3>No messages yet</h3></div>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}