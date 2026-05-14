import Session from '../models/Session.js';
import Trainer from '../models/Trainer.js';
import { calculateFees } from './stripe.service.js';

export const createSession = async (userId, { trainerId, sessionDate, durationMinutes }) => {
  const trainer = await Trainer.findById(trainerId);
  if (!trainer) throw Object.assign(new Error('Trainer not found'), { status: 404 });

  const hours = durationMinutes / 60;
  const sessionPrice = +(trainer.hourlyRate * hours).toFixed(2);
  const { platformFee, trainerPayout } = calculateFees(sessionPrice);

  const session = await Session.create({
    userId,
    trainerId,
    sessionDate: new Date(sessionDate),
    durationMinutes,
    price: sessionPrice,
    platformFee: +platformFee.toFixed(2),
    trainerPayout: +trainerPayout.toFixed(2),
  });

  return session;
};

export const getUserSessions = async (userId) =>
  Session.find({ userId }).populate('trainerId', 'specialties hourlyRate').sort('-createdAt');

export const getTrainerSessions = async (trainerId) =>
  Session.find({ trainerId }).populate('userId', 'name email').sort('-createdAt');

export const getSessionById = async (id, requestingUserId) => {
  const session = await Session.findById(id)
    .populate('userId', 'name email')
    .populate('trainerId', 'specialties hourlyRate');

  if (!session) throw Object.assign(new Error('Session not found'), { status: 404 });

  const isOwner = session.userId._id.toString() === requestingUserId ||
    session.trainerId.userId?.toString() === requestingUserId;

  if (!isOwner) throw Object.assign(new Error('Forbidden'), { status: 403 });
  return session;
};

export const updateSessionStatus = async (sessionId, status, requestingUserId) => {
  const session = await Session.findById(sessionId);
  if (!session) throw Object.assign(new Error('Session not found'), { status: 404 });

  session.status = status;
  await session.save();
  return session;
};
