import Trainer from '../models/Trainer.js';
import User from '../models/User.js';

export const searchTrainers = async ({ specialty, minRate, maxRate, page = 1, limit = 12 }) => {
  const filter = {};
  if (specialty) filter.specialties = { $in: [new RegExp(specialty, 'i')] };
  if (minRate || maxRate) {
    filter.hourlyRate = {};
    if (minRate) filter.hourlyRate.$gte = Number(minRate);
    if (maxRate) filter.hourlyRate.$lte = Number(maxRate);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [trainers, total] = await Promise.all([
    Trainer.find(filter).populate('userId', 'name').skip(skip).limit(Number(limit)),
    Trainer.countDocuments(filter),
  ]);

  return { trainers, total, page: Number(page), pages: Math.ceil(total / Number(limit)) };
};

export const getTrainerById = async (id) => {
  const trainer = await Trainer.findById(id).populate('userId', 'name email');
  if (!trainer) throw Object.assign(new Error('Trainer not found'), { status: 404 });
  return trainer;
};

export const getTrainerByUserId = async (userId) => {
  const trainer = await Trainer.findOne({ userId });
  if (!trainer) throw Object.assign(new Error('Trainer profile not found'), { status: 404 });
  return trainer;
};

export const updateTrainerProfile = async (userId, data) => {
  const trainer = await Trainer.findOneAndUpdate({ userId }, data, { new: true, runValidators: true });
  if (!trainer) throw Object.assign(new Error('Trainer profile not found'), { status: 404 });
  return trainer;
};

export const updateAvailability = async (userId, availability) => {
  const trainer = await Trainer.findOneAndUpdate({ userId }, { availability }, { new: true });
  if (!trainer) throw Object.assign(new Error('Trainer profile not found'), { status: 404 });
  return trainer;
};
