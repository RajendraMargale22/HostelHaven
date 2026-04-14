import api from './index';

const bookingApi = {
  create: (data) => api.post('/bookings', data),
  getMy:  ()     => api.get('/bookings/my'),
  cancel: (id)   => api.patch(`/bookings/${id}/cancel`),
};

export default bookingApi;