import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';


class userController {
    public static getRegistro(req: Request, res: Response) {
        res.render('registro', {activar:false, mensaje:null});
    }

    public static async insertar(req: Request, res: Response){
        try {

            console.log(req.body);

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

            return res.status(200).json({
                status:1, 
                mensaje: null
              });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }

    }
 


}

export default userController;