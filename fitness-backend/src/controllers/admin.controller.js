import * as adminService from '../services/admin.service.js';
import { success } from '../utils/response.js';

export const getMetrics = async (req, res, next) => {
  try {
    const data = await adminService.getMetrics();
    success(res, data);
  } catch (err) { next(err); }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const data = await adminService.getAllUsers();
    success(res, data);
  } catch (err) { next(err); }
};

export const getAllTrainers = async (req, res, next) => {
  try {
    const data = await adminService.getAllTrainers();
    success(res, data);
  } catch (err) { next(err); }
};
