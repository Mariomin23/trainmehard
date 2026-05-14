import { Router } from 'express';
import express from 'express';
import { initiatePayment, handleWebhook } from '../controllers/payment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Webhook must receive raw body — registered before json middleware in index.js
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

router.post('/sessions/:id/pay', authenticate, initiatePayment);

export default router;
