import express from 'express';
import { addService, getAllServices, deleteService, updateService } from '../controllers/systemService/serviceController.js';
import { addSystem, getAllSystems, deleteSystem, updateSystem } from '../controllers/systemService/systemController.js';
import { getAllSystemServicePosition } from '../controllers/systemService/systemServiceController.js'
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js'

const router = express.Router();

router.post('/servico/cadastro', checkPermission('administrador'), addService);
router.get('/servico/verificacao', getAllServices);
router.delete('/servico/:id', checkPermission('administrador'), deleteService);
router.put('/servico/:id', checkPermission('administrador'), updateService);

router.post('/sistema/cadastro', checkPermission('administrador'), addSystem);
router.get('/sistema/verificacao', getAllSystems);
router.delete('/sistema/:id', checkPermission('administrador'), deleteSystem);
router.put('/sistema/:id', checkPermission('administrador'), updateSystem);

router.get('/verificacao', getAllSystemServicePosition);

export default router;