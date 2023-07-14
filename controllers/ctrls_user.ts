import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';
import bcrypt from 'bcryptjs';
import User from '../models/mdl_user';

class userController {
    public static getRegistro(req: Request, res: Response) {
        res.render('registro', {activar:false, mensaje:null});
    }

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
                sFoto: "assets/img/img_defaultUser.PNG"
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

    public static getDatosActualizar = (req: Request, res: Response) => {
      const id = req.params.id
      User.find({_id: id}, (err, result) =>{
          if (err) {
              console.log('Ha ocurrido un error: '+err)
          } else {
              console.log(result)
              res.render('vw_perfil', {user:result})
              
          }
      })
  }

}

export default userController;