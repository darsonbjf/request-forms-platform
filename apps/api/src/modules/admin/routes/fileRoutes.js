import express from 'express';
import { addFile, getAllFiles, deleteFile, updateFile } from '../controllers/files/fileController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.post('/cadastro', checkPermission('administrador'), addFile);
router.get('/verificacao', getAllFiles);
router.delete('/:id', checkPermission('administrador'), deleteFile);
router.put('/:id', checkPermission('administrador'), updateFile)

export default router;