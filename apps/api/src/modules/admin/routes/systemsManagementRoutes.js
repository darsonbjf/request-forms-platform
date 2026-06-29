import express from 'express';
import addSystemServicePositionFile from '../controllers/systemsManagement/systemsManagementController.js';
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js';

const router = express.Router();

router.post('/sistema-servico-cargo-arquivo', checkPermission('administrador'), addSystemServicePositionFile);

export default router;