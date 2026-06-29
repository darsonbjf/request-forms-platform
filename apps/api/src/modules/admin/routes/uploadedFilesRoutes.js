import express from 'express';
import { recuperarArquivo } from '../controllers/uploadedFiles/uploadedFileController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.get('/:id/:anexoTipo', recuperarArquivo);

export default router;
