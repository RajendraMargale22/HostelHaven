import api from './index';

const adminApi = {
  getStats:            ()           => api.get('/admin/stats'),
  getUsers:            ()           => api.get('/admin/users'),
  deleteUser:          (id)         => api.delete(`/admin/users/${id}`),
  getAllBookings:       ()           => api.get('/admin/bookings'),
  updateBookingStatus: (id, status) => api.patch(`/admin/bookings/${id}/status`, { status }),
  deleteBooking:       (id)         => api.delete(`/bookings/${id}`),
  getContacts:         ()           => api.get('/admin/contacts'),
  markContactRead:     (id)         => api.patch(`/admin/contacts/${id}/read`),
  deleteContact:       (id)         => api.delete(`/admin/contacts/${id}`),
};

export default adminApi;