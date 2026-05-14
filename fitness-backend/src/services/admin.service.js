import User from '../models/User.js';
import Trainer from '../models/Trainer.js';
import Session from '../models/Session.js';

export const getMetrics = async () => {
  const [totalUsers, totalTrainers, totalSessions, revenueAgg] = await Promise.all([
    User.countDocuments({ role: 'USER' }),
    Trainer.countDocuments(),
    Session.countDocuments({ paymentStatus: 'PAID' }),
    Session.aggregate([
      { $match: { paymentStatus: 'PAID' } },
      { $group: { _id: null, totalRevenue: { $sum: '$price' }, totalFees: { $sum: '$platformFee' } } },
    ]),
  ]);

  const { totalRevenue = 0, totalFees = 0 } = revenueAgg[0] || {};
  return { totalUsers, totalTrainers, totalSessions, totalRevenue, totalFees };
};

export const getAllUsers = async () => User.find().select('-password').sort('-createdAt');

export const getAllTrainers = async () => Trainer.find().populate('userId', 'name email').sort('-createdAt');
