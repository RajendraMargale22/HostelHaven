import api from './index';

// ── Auth ──────────────────────────────────────────────
export const authApi = {
  register: (data)   => api.post('/auth/register', data),
  login:    (data)   => api.post('/auth/login', data),
};

// ── Hostels ───────────────────────────────────────────
export const hostelApi = {
  getAll:   (params) => api.get('/hostels', { params }),
  getById:  (id)     => api.get(`/hostels/${id}`),
  create:   (data)   => api.post('/hostels', data),
  update:   (id, data) => api.put(`/hostels/${id}`, data),
  remove:   (id)     => api.delete(`/hostels/${id}`),
};

// ── Bookings ──────────────────────────────────────────
export const bookingApi = {
  create:   (data)   => api.post('/bookings', data),
  getMy:    ()       => api.get('/bookings/my'),
  cancel:   (id)     => api.patch(`/bookings/${id}/cancel`),
};

// ── Contact ───────────────────────────────────────────
export const contactApi = {
  send: (data) => api.post('/contact', data),
};

// ── Admin ─────────────────────────────────────────────
export const adminApi = {
  getStats:           ()         => api.get('/admin/stats'),
  getUsers:           ()         => api.get('/admin/users'),
  deleteUser:         (id)       => api.delete(`/admin/users/${id}`),
  getAllBookings:      ()         => api.get('/admin/bookings'),
  updateBookingStatus:(id, status) => api.patch(`/admin/bookings/${id}/status`, { status }),
  deleteBooking:      (id)       => api.delete(`/bookings/${id}`),
  getContacts:        ()         => api.get('/admin/contacts'),
  markContactRead:    (id)       => api.patch(`/admin/contacts/${id}/read`),
  deleteContact:      (id)       => api.delete(`/admin/contacts/${id}`),
};