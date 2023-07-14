import express from 'express'
import userController from '../controllers/ctrls_user'
import { Validator } from '../class/cls_validator'

const userRouter = express.Router();

// Ruta para el alta de un nuevo usuario al sistema (cliente)
userRouter.post('/registro', Validator.validarRegistro(), userController.insertar);

// Ruta para renderizar la vista registro
userRouter.get('/registro',  userController.getRegistro);

// Exporta el enrutador para su uso en otros archivos
export default userRouter;