import express from 'express';
import { addSystem, getAllSystems, deleteSystem, updateSystem } from '../controllers/system/systemController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.post('/cadastro', checkPermission('administrador'), addSystem);
router.get('/verificacao', getAllSystems);
router.delete('/:id', checkPermission('administrador'), deleteSystem);
router.put('/:id', checkPermission('administrador'), updateSystem);

export default router;
