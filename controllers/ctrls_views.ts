import { Request, Response } from 'express';
import Utils from '../class/cls_utils'

class viewsController {

    private static oToken:any;
    /**
     * Realiza un saludo.
     * @returns {string} un saludo.
     */
    public static getSaludo(req: Request, res: Response) {
        res.send('Hola !!');
    }

    public static async getInicio(req: Request, res: Response) {
        let oDataUser = {
            "isLogin":false,
            "sFoto": null
        }
        if (req.cookies.jwt) {
            viewsController.oToken = await Utils.isLogin(req.cookies.jwt);
            if (viewsController.oToken != null) {
                const oData = viewsController.oToken._doc;
                oDataUser = {
                    "isLogin":true,
                    "sFoto": oData.sFoto
                }
                if (oData.iRol == 1) {
                    res.render('inicio', { oUser: oDataUser });
                }else if(oData.iRol == 2){
                    res.render('admin/vw_inicio');
                }else{
                    // TO DO: Renderizar pagina de inicio del usuario vendedor.
                }
                
            }else{
                res.render('inicio', { oUser: oDataUser });
            }
        } else {
            res.render('inicio', { oUser: oDataUser });
        }
        
        
    }

    public static async getRegistro(req: Request, res: Response) {
        if (req.cookies.jwt) {
            viewsController.oToken = await Utils.isLogin(req.cookies.jwt);
            if (viewsController.oToken != null) {
                res.render('registro', { activar:false, mensaje:null, isLogin:true });
            }else{
                res.render('registro', { activar:false, mensaje:null, isLogin:false });
            }
        } else {
            res.render('registro', { activar:false, mensaje:null, isLogin:false });
        }
        
    }

    public static getPerfil(req: Request, res: Response) {
        res.render('general/vw_perfil', {activar:false, mensaje:null});
    }

}


export default viewsController;