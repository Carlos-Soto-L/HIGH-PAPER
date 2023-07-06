import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';

class userController {

    public static async insertar(req: Request, res: Response){
        try {

            const { sNombre, sApePaterno, sApeMaterno, 
            sUsuario, sCorreo, sTelefono, sPassword,  ...rest } = req.body;

            const oUser = {
                sNombre: sNombre,
                sApePaterno: sApePaterno,
                sApeMaterno: sApeMaterno,
                sUsuario: sUsuario,
                sCorreo: sCorreo,
                sTelefono: sTelefono,
                sPassword: sPassword
            }

            await DBmanipulation.insertarDocumento(oUser, "cUsuario");

        } catch (error) {
            console.log(error)
            return res.status(500).send("Error interno");
        }

    }


}

export default userController;