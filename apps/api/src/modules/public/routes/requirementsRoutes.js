import express from 'express';
import { resolveRequiredFiles } from '../controllers/requirements/requirementsController.js';

const router = express.Router();

router.post('/submit', resolveRequiredFiles);

export default router;
