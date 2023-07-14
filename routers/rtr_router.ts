import express from 'express'
import viewsController from '../controllers/ctrls_views'


const viewsRouter = express.Router();

viewsRouter.get('/', viewsController.getInicio);
viewsRouter.get('/registro', viewsController.getRegistro);
viewsRouter.get('/vw_perfil', viewsController.getPerfil)


// Exporta el enrutador para su uso en otros archivos
export default viewsRouter;