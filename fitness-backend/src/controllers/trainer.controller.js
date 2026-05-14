import * as trainerService from '../services/trainer.service.js';
import { success } from '../utils/response.js';

export const search = async (req, res, next) => {
  try {
    const data = await trainerService.searchTrainers(req.query);
    success(res, data);
  } catch (err) { next(err); }
};

export const getById = async (req, res, next) => {
  try {
    const data = await trainerService.getTrainerById(req.params.id);
    success(res, data);
  } catch (err) { next(err); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const data = await trainerService.updateTrainerProfile(req.user.id, req.body);
    success(res, data);
  } catch (err) { next(err); }
};

export const updateAvailability = async (req, res, next) => {
  try {
    const data = await trainerService.updateAvailability(req.user.id, req.body.availability);
    success(res, data);
  } catch (err) { next(err); }
};

export const getMyProfile = async (req, res, next) => {
  try {
    const data = await trainerService.getTrainerByUserId(req.user.id);
    success(res, data);
  } catch (err) { next(err); }
};
