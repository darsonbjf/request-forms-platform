import express from 'express';
import { handleUserRequest } from '../controllers/user/userController.js';

const router = express.Router();

router.post('/solicitacao', handleUserRequest);

export default router;
