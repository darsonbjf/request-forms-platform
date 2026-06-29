import express from 'express';
import { addService, getAllServices, deleteService, updateService } from '../controllers/services/serviceController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.post('/cadastro', checkPermission('administrador'), addService);
router.get('/verificacao', getAllServices('administrador'), getAllServices);
router.delete('/:id', checkPermission('administrador'), deleteService);
router.put('/:id', checkPermission('administrador'), updateService)

export default router;
