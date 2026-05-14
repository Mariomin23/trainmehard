import api from './api';

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password }).then(r => r.data.data);

export const register = (name: string, email: string, password: string, role: 'USER' | 'TRAINER') =>
  api.post('/auth/register', { name, email, password, role }).then(r => r.data.data);

export const getMe = () =>
  api.get('/users/me').then(r => r.data.data);
