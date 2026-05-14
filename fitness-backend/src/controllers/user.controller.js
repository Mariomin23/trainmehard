import * as userService from '../services/user.service.js';
import { success } from '../utils/response.js';

export const getMe = async (req, res, next) => {
  try {
    const data = await userService.getUserProfile(req.user.id);
    success(res, data);
  } catch (err) { next(err); }
};

export const updateMe = async (req, res, next) => {
  try {
    const data = await userService.updateUserProfile(req.user.id, req.body);
    success(res, data);
  } catch (err) { next(err); }
};
