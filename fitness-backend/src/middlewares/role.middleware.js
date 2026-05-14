import { fail } from '../utils/response.js';

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) return fail(res, 'Forbidden', 403);
  next();
};
