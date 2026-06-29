import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/users/usersController.js';
import {  addUser, updateUserStatus, changeUserPermission } from '../controllers/users/usersManagementController.js'
import checkPermission from '../../../middlewares/checkPermissionMiddleware.js'

const router = express.Router();

router.get('/verificacao', checkPermission('administrador'), getAllUsers);
router.delete('/:id', checkPermission('administrador'), deleteUser);
router.post('/cadastro', checkPermission('administrador'), addUser);
router.patch('/:id/status', checkPermission('administrador'), updateUserStatus);
router.patch('/:id/permissao', checkPermission('administrador'), changeUserPermission);

export default router;