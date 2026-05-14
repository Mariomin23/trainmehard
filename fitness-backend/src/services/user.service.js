import User from '../models/User.js';

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
};

export const updateUserProfile = async (userId, { name }) => {
  const user = await User.findByIdAndUpdate(userId, { name }, { new: true, runValidators: true }).select('-password');
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });
  return user;
};
