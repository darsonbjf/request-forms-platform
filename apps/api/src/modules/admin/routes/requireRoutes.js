import express from 'express';
import { getAllRequires, deleteRequire } from '../controllers/requires/requireController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.get('/verificacao', getAllRequires);
router.delete('/:id', checkPermission('administrador'), deleteRequire);

export default router;