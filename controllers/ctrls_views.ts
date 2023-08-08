import { Request, Response } from 'express';
import Utils from '../class/cls_utils'
import DBmanipulation from '../class/cls_DBmanipulation';

class viewsController {

    private static oToken:any;

    /**
     * Renderiza la vista inicio con el listado de los 10 mas recientes productos.
     * @returns vista inicio.
     */
    public static async getInicio(req: Request, res: Response) {
        const productosData = await DBmanipulation.obtenerLos10ProductosRecientes();
        console.log(productosData)
        if (req.cookies.jwt) {
            viewsController.oToken = await Utils.isLogin(req.cookies.jwt);
            if (viewsController.oToken != null) {
                if (viewsController.oToken._doc.iRol == 1) {
                    res.render('inicio', { isLogin:true, oProductos: productosData });
                }else if(viewsController.oToken._doc.iRol == 2){
                    res.render('admin/vw_inicio');
                }else{
                    // TO DO: Renderizar pagina de inicio del usuario vendedor.
                }
                
            }else{
                res.render('inicio', { isLogin:false, oProductos: productosData });
            }
        } else {
            res.render('inicio', { isLogin:false, oProductos: productosData });
        }
        
        
    }

    /**
     * Renderiza la vista registro usuario.
     * @returns vista registro.
     */
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

        /**
     * Retorna la información de un producto, por medio de su id.
     * @returns renderiza la vista detalleproducto y le manda con ello, el objeto del producto.
     */
        public static async getDetalleProducto(req: Request, res: Response) {

            try {
                const idProducto = req.params.id;
                const oProducto = await DBmanipulation.obtenerProducto(idProducto);
                const oCaracteristicas = await DBmanipulation.obtenerRegistros("cCaracteristica");
                console.log("detalles")
                console.log(oProducto)
                console.log(oCaracteristicas)
                if (req.cookies.jwt) {
                    viewsController.oToken = await Utils.isLogin(req.cookies.jwt);
                    if (viewsController.oToken != null) {
                        res.render("detalleproducto",{ producto: oProducto, caract: oCaracteristicas, activar:false, mensaje:null, isLogin:true})
                    }else{
                        res.render("detalleproducto", { producto: oProducto, caract: oCaracteristicas, activar:false, mensaje:null, isLogin:false });
                    }
                } else {
                    res.render("detalleproducto", { producto: oProducto, caract: oCaracteristicas, activar:false, mensaje:null, isLogin:false });
                }
    
            } catch (error) {
                console.log(error)
            }
            
        }


}


export default viewsController;