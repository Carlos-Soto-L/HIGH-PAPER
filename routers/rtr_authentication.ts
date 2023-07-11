import express from 'express'
import authController from '../controllers/ctrls_authentication'
import { Validator } from '../class/cls_validator'


const authRouter = express.Router();


authRouter.post('/login', Validator.validarLogin(), authController.login);

authRouter.get('/signout', authController.signOut);

// Exporta el enrutador para su uso en otros archivos
export default authRouter;