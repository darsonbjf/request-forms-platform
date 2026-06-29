import express from 'express';

import loginUsuario from '../controllers/login/loginController.js';

const router = express.Router();

router.post('/login', loginUsuario);

export default router;