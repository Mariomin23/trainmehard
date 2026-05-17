import * as sessionService from '../services/session.service.js';
import { success } from '../utils/response.js';

export const create = async (req, res, next) => {
  try {
    const data = await sessionService.createSession(req.user.id, req.body);
    success(res, data, 201);
  } catch (err) { next(err); }
};

export const getMySessions = async (req, res, next) => {
  try {
    const data = req.user.role === 'PROFESSIONAL'
      ? await sessionService.getTrainerSessions(req.user.id)
      : await sessionService.getUserSessions(req.user.id);
    success(res, data);
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const data = await sessionService.getSessionById(req.params.id, req.user.id);
    success(res, data);
  } catch (err) { next(err); }
};

export const updateStatus = async (req, res, next) => {
  try {
    const data = await sessionService.updateSessionStatus(req.params.id, req.body.status, req.user.id);
    success(res, data);
  } catch (err) { next(err); }
};
