import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';
import bcrypt from 'bcryptjs';

class userController {

    // Renderiza la vista registro.
    public static getRegistro(req: Request, res: Response) {
        res.render('registro', {activar:false, mensaje:null});
    }

            /**
     * Metodo para dar de alta a un nuevo usuario en el sistema.
     * @returns status = 1 correcto, status = 0 error.
     */
    public static async insertar(req: Request, res: Response){
        try {

            const { sNombre, sApePaterno, sApeMaterno, 
            sUsuario, sCorreo, sTelefono, sPassword1,  ...rest } = req.body;

            const sPassword = bcrypt.hashSync(sPassword1, 10);

            const oUser = {
                sNombre: sNombre,
                sApePaterno: sApePaterno,
                sApeMaterno: sApeMaterno,
                sUsuario: sUsuario,
                sCorreo: sCorreo,
                sTelefono: sTelefono,
                sPassword: sPassword,
                iRol: 1,
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