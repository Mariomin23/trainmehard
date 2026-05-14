import { Router } from 'express';
import { getMe, updateMe } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/me', getMe);
router.put('/me', updateMe);

export default router;
