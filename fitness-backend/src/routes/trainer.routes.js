import { Router } from 'express';
import { search, getById, updateProfile, updateAvailability, getMyProfile } from '../controllers/trainer.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { trainerProfileSchema, availabilitySchema } from '../schemas/trainer.schema.js';

const router = Router();

// Public
router.get('/', search);
router.get('/:id', getById);

// Trainer-only
router.get('/me/profile', authenticate, authorize('PROFESSIONAL'), getMyProfile);
router.put('/me/profile', authenticate, authorize('PROFESSIONAL'), validate(trainerProfileSchema), updateProfile);
router.put('/me/availability', authenticate, authorize('PROFESSIONAL'), validate(availabilitySchema), updateAvailability);

export default router;
