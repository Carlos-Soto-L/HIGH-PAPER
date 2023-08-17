import express from 'express'
import userController from '../controllers/ctrls_user'
import { Validator } from '../class/cls_validator'
import MWAuthentication from '../middlewares/mw_authentication';

const userRouter = express.Router();

// Ruta para el alta de un nuevo usuario al sistema (cliente)
userRouter.post('/registro', Validator.validarRegistro(), userController.insertar);

// Ruta para renderizar la vista registro
userRouter.get('/registro',  userController.getRegistro);


// Ruta para agregar un producto al carrito de compra
userRouter.post('/agregaritemcarrito', MWAuthentication.isCliente,  userController.agregarproductocarrito);

// Ruta para agregar un producto al carrito de compra
userRouter.get('/carritoCompra', MWAuthentication.isCliente,  userController.verCarritoCompra);

// Ruta para actualizar los productos en carrito de compra 
userRouter.post('/actualizarproductocarrito/:idproducto', MWAuthentication.isCliente,  userController.actualizarproductocarrito);

// Ruta para eliminar un producto del carrito de compra
userRouter.get('/eliminarproductocarrito/:idcarrito/:idproducto', MWAuthentication.isCliente,  userController.eliminarproductocarrito);

// Ruta para confirmar un pedido
userRouter.post('/confirmarPedido', MWAuthentication.isCliente,  userController.confirmarpedido);

// Ruta para realizar un pedido
userRouter.post('/realizarpedido', MWAuthentication.isCliente,  userController.realizarpedido);

// Ruta para visualizar los pedidos hechos por el cliente 
userRouter.get('/verpedidos', MWAuthentication.isCliente,  userController.verpedido);




// Exporta el enrutador para su uso en otros archivos
export default userRouter;