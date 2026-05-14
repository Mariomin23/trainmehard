import * as authService from '../services/auth.service.js';
import { success } from '../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    success(res, data, 201);
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    success(res, data);
  } catch (err) { next(err); }
};
