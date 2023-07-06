import express from 'express'
import viewsController from '../controllers/ctrls_views'


const viewsRouter = express.Router();

viewsRouter.get('/', viewsController.getInicio);
viewsRouter.get('/registro', viewsController.getRegistro);


// Exporta el enrutador para su uso en otros archivos
export default viewsRouter;