import express from 'express'
import authController from '../controllers/ctrls_authentication'

const authRouter = express.Router();

authRouter.get('/', authController.getSaludo);

// Exporta el enrutador para su uso en otros archivos
export default authRouter;