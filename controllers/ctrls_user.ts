import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';
import bcrypt from 'bcryptjs';
import Utils from "../class/cls_utils"

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

    public static async agregarproductocarrito(req: Request, res: Response){
        console.log(req.body)

        try {
            const { sIdP, sIdCliente, sNombreP, sFotoP, sCantidad, sPrecioP, ...rest } = req.body;

            // EL USUARIO YA TIENE REGISTRADO UN CARRITO ?
            const resultadoExistencia = await DBmanipulation.verificarExistenciaValor(sIdCliente, "oIdUsuario", "cCarritoCompra")
    

            if (resultadoExistencia) {

                const oNuevoProducto = {
                        sIdProducto: sIdP,
                        sNombreProducto: sNombreP,
                        sFotoProducto: sFotoP,
                        sUnidadesProducto: sCantidad,
                        iPrecioProducto: sPrecioP
                }

                await DBmanipulation.agregarCantidadProductosCarritoCliente(sIdCliente, sIdP, sCantidad, oNuevoProducto);

                return res.status(200).json({
                    status:1, 
                    mensaje: "Producto agregado al carrito"
                  });

                
            } else {
                const iPrecioNumero: number = parseInt(sPrecioP, 10);
    
                const iCantidadNumero: number = parseInt(sCantidad, 10);
        
                const totalfinal = iPrecioNumero * iCantidadNumero;
        
                const oCarritoCompra = {
                    oIdUsuario: sIdCliente,
                    aProductos: [{
                        sIdProducto: sIdP,
                        sNombreProducto: sNombreP,
                        sFotoProducto: sFotoP,
                        sUnidadesProducto: sCantidad,
                        iPrecioProducto: sPrecioP
                }],
                    iTotal: totalfinal
                }
        
                await DBmanipulation.insertarDocumento(oCarritoCompra, "cCarritoCompra");
        
                return res.status(200).json({
                    status:1, 
                    mensaje: "Producto agregado al carrito"
                  });
            }
        } catch (error) {
        return res.status(500).json({
            status:1, 
            mensaje: "Error interno"
            });
        }
    }


    public static async verCarritoCompra(req: Request, res: Response){
        try {
            const {sIdCliente,  ...rest} = req.body;
            let oFiltro = {"oIdUsuario": sIdCliente}
            const resultadoConsulta = await DBmanipulation.obtenerRegistrosFiltro(oFiltro  ,"cCarritoCompra");
            console.log(resultadoConsulta)
            res.render("cliente/vw_carritoCompra",{carrito: resultadoConsulta, isLogin:true});
        } catch (error) {
            res.send("Error interno")
        }

    }

    public static async actualizarproductocarrito(req: Request, res: Response){
        try {
            const {sIdProducto, sIdCarrito, sActualizadoUnidadesProducto, sUnidadesProducto, sIdCliente, ...rest} = req.body;
            await DBmanipulation.actualizarproductocarrito(sIdCliente, sIdProducto, sUnidadesProducto, sActualizadoUnidadesProducto)
            res.redirect("/user/carritoCompra")
        } catch (error) {
            res.send("Error interno")
        }

    }

    public static async eliminarproductocarrito(req: Request, res: Response){
        try {
            const idCarrito = req.params.idcarrito;
            const idProducto = req.params.idproducto;
            await DBmanipulation.eliminarproductocarrito(idCarrito, idProducto);
            res.redirect("/user/carritoCompra");
        } catch (error) {
            res.send("Error interno")
        }

    }

    public static async confirmarpedido(req: Request, res: Response){
        try {
            const {sIdCliente,  ...rest} = req.body;
            let oFiltro = {"oIdUsuario": sIdCliente}
            const resultadoConsulta = await DBmanipulation.obtenerRegistrosFiltro(oFiltro  ,"cCarritoCompra");
            res.render("cliente/vw_confirmarPedido",{carrito: resultadoConsulta , isLogin:true})
        } catch (error) {
            console.log(error)
        }
    }

    public static async realizarpedido(req: Request, res: Response){
        try {
            const {sIdCliente,  ...rest} = req.body;
            // obtener el carrito de compra del usuario
            let oFiltro = {"oIdUsuario": sIdCliente}
            const resultadoConsulta = await DBmanipulation.obtenerRegistrosFiltro(oFiltro  ,"cCarritoCompra");
            console.log(resultadoConsulta[0])
            // actualizar las unidades disponibles para los productos
            resultadoConsulta[0].aProductos.forEach(async (producto) => {
                await DBmanipulation.actualizarCantidadExistenteProducto(producto.sIdProducto, parseInt(producto.sUnidadesProducto))
            });
            // almacenar el pedido
            let codigo = await Utils.generateRandomCode();
            console.log("CODIGO: " + codigo)
            const pedido = {
                oIdUsuario: resultadoConsulta[0].oIdUsuario,
                aProductos:  resultadoConsulta[0].aProductos,
                iMetodoPago: 1, 
                iMetodoEnvio:  1,
                sEstatus: "En preparación",
                sCodigoPedido: codigo,
                iTotal: resultadoConsulta[0].iTotal
            }

            await DBmanipulation.insertarDocumento(pedido, "cPedido")
            // Eliminar El carrito de compras
            await DBmanipulation.eliminarDocumento(resultadoConsulta[0]._id, "cCarritoCompra")

            // Redireccionar a pedidos
            res.redirect("/user/verpedidos")

        } catch (error) {
            console.log(error)
        }
    }

    public static async verpedido(req: Request, res: Response){
        try {
            const {sIdCliente, ...rest} = req.body;
            let oFiltro = {"oIdUsuario": sIdCliente}
            const resultadoConsulta = await DBmanipulation.obtenerRegistrosFiltro(oFiltro  ,"cPedido");
            console.log(resultadoConsulta)
            res.render("cliente/vw_pedidos", {pedidos: resultadoConsulta, isLogin: true})
        } catch (error) {
            console.log(error)
        }

    }


}

export default userController;