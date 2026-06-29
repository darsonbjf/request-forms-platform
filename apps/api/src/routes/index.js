import loginRoutes from '../modules/admin/routes/loginRoutes.js';
import unitRoutes from '../modules/admin/routes/unitRoutes.js';
import usersRoutes from '../modules/admin/routes/usersRoutes.js';
import systemServiceRoutes from '../modules/admin/routes/systemServiceRoutes.js';
import fileRoutes from '../modules/admin/routes/fileRoutes.js';
import positionRoutes from '../modules/admin/routes/positionRoutes.js';
import positionGetForm from '../modules/public/routes/positionGetForm.js';
import uploadedFilesRoutes from '../modules/admin/routes/uploadedFilesRoutes.js';
import requireRoutes from '../modules/admin/routes/requireRoutes.js';
import systemsManagementRoutes from '../modules/admin/routes/systemsManagementRoutes.js';
import requirementsRoutes from '../modules/public/routes/requirementsRoutes.js';
import uploadRoutes from '../modules/public/routes/uploadRoutes.js';
import captchaRoutes from '../modules/public/routes/captchaRoutes.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export function registerRoutes(app, apiPrefix = '') {
  app.get(`${apiPrefix}/`, (req, res) => {
    res.send('Servidor rodando com sucesso.');
  });

  app.get(`${apiPrefix}/health`, (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(`${apiPrefix}/public`, positionGetForm);
  app.use(`${apiPrefix}/admin`, loginRoutes);
  app.use(`${apiPrefix}/admin/usuarios`, authMiddleware, usersRoutes);
  app.use(`${apiPrefix}/admin/servico-sistema`, authMiddleware, systemServiceRoutes);
  app.use(`${apiPrefix}/admin/arquivos`, authMiddleware, fileRoutes);
  app.use(`${apiPrefix}/admin/unidades`, authMiddleware, unitRoutes);
  app.use(`${apiPrefix}/admin/cargos`, authMiddleware, positionRoutes);
  app.use(`${apiPrefix}/admin/uploads`, authMiddleware, uploadedFilesRoutes);
  app.use(`${apiPrefix}/admin/gerenciamento`, authMiddleware, systemsManagementRoutes);
  app.use(`${apiPrefix}/admin/requisicoes`, authMiddleware, requireRoutes);
  app.use(`${apiPrefix}/requirements`, requirementsRoutes);
  app.use(`${apiPrefix}/upload`, uploadRoutes);
  app.use(`${apiPrefix}/recaptcha`, captchaRoutes);
}
