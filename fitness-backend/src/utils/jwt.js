import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'trainmehard_secret_dev';
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

export const verifyToken = (token) => jwt.verify(token, SECRET);
