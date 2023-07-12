import express from 'express'
import adminController from '../controllers/ctrls_admin';
import { Validator } from '../class/cls_validator'
import MWAuthentication from '../middlewares/mw_authentication';


const adminRouter = express.Router();

// Ruta para renderizar la vista vw_categorias
adminRouter.get('/categorias', MWAuthentication.isAdmin, adminController.vwCategoria);

// Ruta para crear una categoría nueva
adminRouter.post('/categorias', MWAuthentication.isAdmin, Validator.validarCategoria(), adminController.createCategoria);

// Ruta para renderizar la vista vw_caracteristicas
adminRouter.get('/caracteristica', MWAuthentication.isAdmin, adminController.vwCaracteristica);

// Ruta para crear una Característica nueva
adminRouter.post('/caracteristica', MWAuthentication.isAdmin, Validator.validarCaracteristica(), adminController.createCaracteristica);

// Exporta el enrutador para su uso en otros archivos
export default adminRouter;