import { Router } from 'express';
import { create, getMySessions, getById, updateStatus } from '../controllers/session.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createSessionSchema } from '../schemas/session.schema.js';

const router = Router();

router.use(authenticate);

router.get('/', getMySessions);
router.get('/:id', getById);
router.post('/', authorize('USER'), validate(createSessionSchema), create);
router.patch('/:id/status', authorize('PROFESSIONAL', 'ADMIN'), updateStatus);

export default router;
