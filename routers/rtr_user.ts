import express from 'express'
import userController from '../controllers/ctrls_user'
import { Validator } from '../class/cls_validator'

const userRouter = express.Router();

userRouter.post('/registro', Validator.validarRegistro(), userController.insertar);

userRouter.get('/registro',  userController.getRegistro);

userRouter.post('/actualizar/:id', userController.getDatosActualizar);

// Exporta el enrutador para su uso en otros archivos
export default userRouter;