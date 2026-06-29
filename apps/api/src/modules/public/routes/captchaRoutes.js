import express from 'express';
import { recaptchaTokenValidate } from '../controllers/captcha/captchaController.js';

const router = express.Router();

router.post('/submit', recaptchaTokenValidate);

export default router;