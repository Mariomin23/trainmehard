import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Professional from '../models/Professional.js';
import { generateToken } from '../utils/jwt.js';

export const register = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw Object.assign(new Error('Email already registered'), { status: 409 });

  const hashed = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashed, role });

  if (role === 'PROFESSIONAL') {
    await Professional.create({ userId: user._id, professionType: 'TRAINER', hourlyRate: 0, specialties: [] });
  }

  const token = generateToken({ id: user._id, role: user.role });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

  const token = generateToken({ id: user._id, role: user.role });
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};
