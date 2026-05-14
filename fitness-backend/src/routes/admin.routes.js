import { Router } from 'express';
import { getMetrics, getAllUsers, getAllTrainers } from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/metrics', getMetrics);
router.get('/users', getAllUsers);
router.get('/trainers', getAllTrainers);

export default router;
