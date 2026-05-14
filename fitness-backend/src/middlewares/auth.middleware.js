import { verifyToken } from '../utils/jwt.js';
import { fail } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return fail(res, 'No token provided', 401);

  try {
    req.user = verifyToken(authHeader.split(' ')[1]);
    next();
  } catch {
    return fail(res, 'Invalid or expired token', 401);
  }
};
