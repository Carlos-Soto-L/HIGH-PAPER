import express from 'express'
import userController from '../controllers/ctrls_user'
import { Validator } from '../class/cls_validator'

const userRouter = express.Router();

userRouter.post('/register', Validator.validarRegistro(), userController.insertar);


// Exporta el enrutador para su uso en otros archivos
export default userRouter;