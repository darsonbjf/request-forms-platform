import express from 'express';
import { addPosition, getAllPositions, deletePosition, updatePosition } from '../controllers/positions/positionController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.post('/cadastro', checkPermission('administrador'), addPosition);
router.get('/verificacao', getAllPositions);
router.delete('/:id',checkPermission('administrador'), deletePosition);
router.put('/:id', checkPermission('administrador'), updatePosition);

export default router;