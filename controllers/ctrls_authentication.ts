import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';
import jwt from 'jsonwebtoken';

class authController {

    


    public static async login(req: Request, res: Response){
        try {
            let resultado;
            const { sAuthUser, sPassword,  ...rest } = req.body;

            resultado = await DBmanipulation.getUsuario(sAuthUser);

            if(resultado != false){
                for(let usuario of resultado){
                    //Verificar contraseña
                    if(sPassword == usuario.sPassword){
                        //Gernerar PAyload(Información para enc.)
                        const {sUsuario, sPassword, ...payload}= usuario;
                        //Generar JWT (JSONWEBTOKEN)
                        var token = jwt.sign(payload, process.env.KEY_SECRET, {expiresIn: '1h'});
                        // Se almacena el token en una cookies
                        res.cookie("jwt",token.toString());
    
                            return res.status(200).json({
                              status:1, 
                              mensaje: null
                            });
    
                    }else{
                        return res.status(401).json({
                            status:0, 
                            mensaje: "El usuario y o constraseña es incorrecta"
                          });
                    }
                }
            }else{
                return res.status(401).json({
                    status:0, 
                    mensaje: "El usuario y o constraseña es incorrecta"
                  });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status:0, 
                mensaje: "Error interno"
              });
        }

    }

    /**
     * signOut
     */
    public static signOut(req: Request, res: Response) {
        if (req.cookies.jwt) {
            const oToken = {
                sToken: req.cookies.jwt
            }
            DBmanipulation.agregarJWTLstNegra(oToken);
            res.cookie("jwt",null);
        }
        res.redirect("/");
    }

}

export default authController;