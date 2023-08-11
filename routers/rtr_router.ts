import express from 'express'
import viewsController from '../controllers/ctrls_views'


const viewsRouter = express.Router();
// RUTA PARA RENDERIZAR LA VISTA DE INICIO.
viewsRouter.get('/', viewsController.getInicio);
// RUTA PARA RENDERIZAR LA VISTA REGISTRO.
viewsRouter.get('/registro', viewsController.getRegistro);
// RUTA PARA RENDERIZAR LA VISTA DE DETALLE PRODUCTO.
viewsRouter.get('/detalleproducto/:id', viewsController.getDetalleProducto)
// RUTA PARA DESPLIEGAR LOS PRODUCTOS RELACIONADOS CON LA PALABRA INTRODUCIDA EN EL BUSCADOR
viewsRouter.post('/buscarproducto', viewsController.getProductosBuscador)



// Exporta el enrutador para su uso en otros archivos
export default viewsRouter;