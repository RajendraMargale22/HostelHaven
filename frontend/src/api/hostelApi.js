import api from './index';

const hostelApi = {
  getAll:  (params) => api.get('/hostels', { params }),
  getById: (id)     => api.get(`/hostels/${id}`),
  create:  (data)   => api.post('/hostels', data),
  update:  (id, data) => api.put(`/hostels/${id}`, data),
  remove:  (id)     => api.delete(`/hostels/${id}`),
};

export default hostelApi;