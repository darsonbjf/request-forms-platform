import express from 'express';
import { addUnit, getAllUnits, deleteUnit, updateUnit } from '../controllers/units/unitController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.post('/cadastro', checkPermission('administrador'), addUnit);
router.get('/verificacao', getAllUnits);
router.delete('/:id', checkPermission('administrador'), deleteUnit);
router.put('/:id', checkPermission('administrador'), updateUnit);

export default router;