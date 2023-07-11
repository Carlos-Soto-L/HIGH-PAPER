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
        if (req.cookies.jwt) {
            viewsController.oToken = await Utils.isLogin(req.cookies.jwt);
            if (viewsController.oToken != null) {
                if (viewsController.oToken._doc.iRol == 1) {
                    res.render('inicio', { isLogin:true });
                }else if(viewsController.oToken._doc.iRol == 2){
                    res.render('admin/vw_inicio');
                }else{
                    // TO DO: Renderizar pagina de inicio del usuario vendedor.
                }
                
            }else{
                res.render('inicio', { isLogin:false });
            }
        } else {
            res.render('inicio', { isLogin:false });
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


}


export default viewsController;