import express from 'express';
import {getAllPositions} from '../../admin/controllers/positions/positionController.js';
import {getAllUnits} from '../../admin/controllers/units/unitController.js'
import {getAllServices} from '../../admin/controllers/services/serviceController.js'
import {getAllSystems} from '../../admin/controllers/system/systemController.js'

const router = express.Router();

router.get('/cargos', getAllPositions);
router.get('/unidades', getAllUnits);
router.get('/servicos', getAllServices);
router.get('/sistemas', getAllSystems);

export default router;
