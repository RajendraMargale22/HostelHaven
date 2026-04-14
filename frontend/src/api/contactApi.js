import api from './index';

const contactApi = {
  send: (data) => api.post('/contact', data),
};

export default contactApi;