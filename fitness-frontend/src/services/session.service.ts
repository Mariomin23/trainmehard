import api from './api';

export const createSession = (trainerId: string, sessionDate: string, durationMinutes: number) =>
  api.post('/sessions', { trainerId, sessionDate, durationMinutes }).then(r => r.data.data);

export const getMySessions = () =>
  api.get('/sessions').then(r => r.data.data);

export const updateSessionStatus = (id: string, status: string) =>
  api.patch(`/sessions/${id}/status`, { status }).then(r => r.data.data);
