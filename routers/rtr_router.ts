import express from 'express'
import viewsController from '../controllers/ctrls_views'


const viewsRouter = express.Router();
// RUTA PARA RENDERIZAR LA VISTA DE INICIO.
viewsRouter.get('/', viewsController.getInicio);
// RUTA PARA RENDERIZAR LA VISTA REGISTRO.
viewsRouter.get('/registro', viewsController.getRegistro);
// RUTA PARA RENDERIZAR LA VISTA DE DETALLE PRODUCTO.
viewsRouter.get('/detalleproducto/:id', viewsController.getDetalleProducto)


// Exporta el enrutador para su uso en otros archivos
export default viewsRouter;