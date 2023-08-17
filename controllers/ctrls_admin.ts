import { Request, Response } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation';



class adminController{

    // Método para renderizar la vista vw_categorias
    public static vwCategoria(req: Request, res: Response) {
        res.render('admin/vw_categorias');
    }


    /**
     * Método para crear una nueva categoría.
     *
     * @returns status = 1 corecto, status = 0 error.
     */
    public static createCategoria(req: Request, res: Response) {
        try {
            const { sCategoria,  ...rest } = req.body;

            const oCategoria = {
                sCategoria: sCategoria
            }
            DBmanipulation.insertarDocumento(oCategoria, "cCategoria");

            return res.status(200).json({
                status:1, 
                mensaje: "Categoría dada de alta de forma correcta"
              });

        } catch (error) {
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }
    }

    // Método para renderizar la vista vw_caracteristicas
    public static vwCaracteristica(req: Request, res: Response) {
        res.render('admin/vw_caracteristicas');
    }


    /**
     * Método para crear una nueva característica.
     *
     * @returns status = 1 corecto, status = 0 error.
     */
    public static createCaracteristica(req: Request, res: Response) {
        try {
            const { sCaracteristica,  ...rest } = req.body;

            const oCaracteristica = {
                sCaracteristica: sCaracteristica
            }
            DBmanipulation.insertarDocumento(oCaracteristica, "cCaracteristica");

            return res.status(200).json({
                status:1, 
                mensaje: "Característica dada de alta de forma correcta"
              });

        } catch (error) {
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }
    }

    // Renderiza la vista vw_productos
    public static async vwProducto(req: Request, res: Response) {
        const dataCtg = await DBmanipulation.obtenerRegistros("cCategoria")
        const dataCtr = await DBmanipulation.obtenerRegistros("cCaracteristica")
        res.render('admin/vw_productos', {categorias:dataCtg, caracteristicas: dataCtr});
    }

    /**
     * Método para crear un nuevo producto.
     *
     * @returns status = 1 corecto, status = 0 error.
     */
    public static async createProducto(req: Request, res: Response) {
        try {

            const { sNombre, sDescripcion, aCategorias, iCantidadExistencia, iPrecio, aCaracteristica, ...rest } = req.body;
            
            interface UploadedFile {
                fieldname: string;
                originalname: string;
                encoding: string;
                mimetype: string;
                size: number;
                bucket: string;
                key: string;
                acl: string;
                contentType: string;
                contentDisposition: null | string;
                contentEncoding: null | string;
                storageClass: string;
                serverSideEncryption: null | string;
                metadata: { fieldName: string };
                location: string;
                etag: string;
                versionId?: string;
              }

            var filenames;

            const oCaracteristicas = await DBmanipulation.obtenerRegistros("cCaracteristica");

            let oCategoriasObj = [];
            let contador = 0;
            oCaracteristicas.forEach((objeto) => {
                oCategoriasObj.push({"sCaracteristica":objeto.sCaracteristica,"sValor": aCaracteristica[contador]})
                contador++;
              });

            // Determinar si `req.files` es una matriz o un objeto
            if (Array.isArray(req.files)) {
                const files = req.files as unknown as UploadedFile[];
                filenames = files.map(doc => doc.location);
            } else {
                // Es un objeto, así que obtén todos los archivos de todos los campos
                const filesByField: { [fieldname: string]: UploadedFile[] } = req.files as unknown as { [fieldname: string]: UploadedFile[] };
                for (const key in filesByField) {
                if (Object.hasOwnProperty.call(filesByField, key)) {
                    const files: UploadedFile[] = filesByField[key];
                    filenames.push(...files.map(doc => doc.location));
                }
                }
            }

            const oProducto = {
                sNombre: sNombre,
                sDescripcion: sDescripcion,
                aFotos: filenames,
                aCategorias: Array.isArray(aCategorias)? aCategorias : [aCategorias],
                iCantidadExistencia: iCantidadExistencia,
                iPrecio: iPrecio,
                aCaracteristicas: oCategoriasObj,
              };

              DBmanipulation.insertarDocumento(oProducto, "cProducto");

            return res.status(200).json({
                status:1, 
                mensaje: "Producto dado de alta de forma correcta"
              });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
              });
        }
    }

    public static async mostrarproductos(req: Request, res: Response){
        try {
            const oProductos = await DBmanipulation.obtenerRegistros("cProducto");

    
            res.render("admin/vw_adminproductos",{productos: oProductos})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
            })
        }

    }

    public static async editarproducto(req: Request, res: Response){
        try {
            const id = req.params.id;
            const oProducto = await DBmanipulation.obtenerProducto(id);
            const oCaracteristicas = await DBmanipulation.obtenerRegistros("cCaracteristica");
            const categor = await DBmanipulation.obtenerRegistros("cCategoria");

            console.log("PRODUCTO: " + oProducto)

            res.render("admin/vw_editarproducto", {producto: oProducto, caract: oCaracteristicas, categorias: categor})
        } catch (error) {
            console.log(error)

        }

    }

    public static async editarfotosproducto(req: Request, res: Response){
        try {
            interface UploadedFile {
                fieldname: string;
                originalname: string;
                encoding: string;
                mimetype: string;
                size: number;
                bucket: string;
                key: string;
                acl: string;
                contentType: string;
                contentDisposition: null | string;
                contentEncoding: null | string;
                storageClass: string;
                serverSideEncryption: null | string;
                metadata: { fieldName: string };
                location: string;
                etag: string;
                versionId?: string;
              }

                const id = req.params.id;
                console.log(id)
                const files = req.files;
                var filenames;


            // Determinar si `req.files` es una matriz o un objeto
            if (Array.isArray(req.files)) {
                const files = req.files as unknown as UploadedFile[];
                filenames = files.map(doc => doc.location);
            } else {
                // Es un objeto, así que obtén todos los archivos de todos los campos
                const filesByField: { [fieldname: string]: UploadedFile[] } = req.files as unknown as { [fieldname: string]: UploadedFile[] };
                for (const key in filesByField) {
                if (Object.hasOwnProperty.call(filesByField, key)) {
                    const files: UploadedFile[] = filesByField[key];
                    filenames.push(...files.map(doc => doc.location));
                }
                }
            }

            const resultado = await DBmanipulation.actualizaratributodocumento(id, "aFotos", filenames, "cProducto");
            if (resultado == 1) {
                res.redirect("/admin/editarproducto/" + id)
            } else {
                res.send("ocurrio un error")
            }
        } catch (error) {
            
        }
    }

    public static async editardetallesproducto(req: Request, res: Response){
        const { sNombre, sDescripcion, iCantidadExistencia, iPrecio, aCaracteristica, sId, aCategorias, ...rest } = req.body;
        const data = req.body;

        const oCaracteristicas = await DBmanipulation.obtenerRegistros("cCaracteristica");

        let oCategoriasObj = [];
        let contador = 0;
        oCaracteristicas.forEach((objeto) => {
            oCategoriasObj.push({"sCaracteristica":objeto.sCaracteristica,"sValor": aCaracteristica[contador]})
            contador++;
          });

        // Los atributos que deseas actualizar
        const nuevosAtributos = {
            sNombre: sNombre,
            sDescripcion: sDescripcion,
            iCantidadExistencia: iCantidadExistencia,
            iPrecio: iPrecio,
            aCategorias: Array.isArray(aCategorias)? aCategorias : [aCategorias],
            aCaracteristicas: oCategoriasObj
            // Puedes agregar más atributos a actualizar aquí
        };

        const resultado = await DBmanipulation.actualizardocumento(sId, nuevosAtributos,"cProducto");

        if (resultado == 1) {
            res.redirect("/admin/administrar_productos")
        } else {
            return res.status(500).json({
                status:0, 
                mensaje: "Error interno"
              });
        }
    }

    public static async eliminarproducto(req: Request, res: Response){
        const sId = req.params.id;
        const resultado = await DBmanipulation.eliminarDocumento(sId, "cProducto");

        if (resultado == 1) {
            res.redirect("/admin/administrar_productos");
        } else {
            res.send("Error")
        }

    }

    public static async mostrarcategorias(req: Request, res: Response){
        try {
            const oCategorias = await DBmanipulation.obtenerRegistros("cCategoria");

    
            res.render("admin/vw_admincategorias",{categ: oCategorias})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
            })
        }
    }

    public static async editarcategorias(req: Request, res: Response){
        try {
            const sId = req.params.id;
            const oCategoria = await DBmanipulation.obtenerRegistroById(sId, "cCategoria");
            if (oCategoria != 0) {
                res.render("admin/vw_editarcategoria",{categ: oCategoria})
            } else {
                res.send("Error")
            }
        } catch (error) {
            console.log(error)
        }

    }


    public static async actualizarcategorias(req: Request, res: Response){
        try {
            const {sId, sCategoria, sCategoriaAntigua, ...rest} = req.body;
            let resultado;
            // Los atributos que deseas actualizar
            const nuevosAtributos = {
                sCategoria: sCategoria
                // Puedes agregar más atributos a actualizar aquí
            };

            resultado = await DBmanipulation.actualizardocumento(sId, nuevosAtributos,"cCategoria");

            if (resultado == 1) {
                // Define el filtro para encontrar el documento que deseas actualizar
                const filtro = { aCategorias: sCategoriaAntigua };
            
                // Define el nuevo valor que deseas establecer en el arreglo
                const nuevoValor = sCategoria;

                resultado = await DBmanipulation.actualizarCategoriasProductos(filtro, nuevoValor);

                console.log(resultado)
                if (resultado == 1) {
                    return res.status(200).json({
                        status:1, 
                        mensaje: "Categoría actualizada de forma correcta"
                      });
                } else {
                    return res.status(500).json({
                        status:0, 
                        mensaje: "Ocurrio un error"
                      });
                }

            } else {
                return res.status(500).json({
                    status:0, 
                    mensaje: "Ocurrio un error"
                  });
            }
        } catch (error) {
            console.log(error)
        }

    }


    public static async eliminarcategorias(req: Request, res: Response){
        const sId = req.params.id;
        const sCategoriaAntigua = req.params.categoria;
        let resultado;
        resultado = await DBmanipulation.eliminarDocumento(sId, "cCategoria");

        if (resultado == 1) {
            // Define el filtro para encontrar el documento que deseas actualizar
            const filtro = { aCategorias: sCategoriaAntigua };
        
            // Define el nuevo valor que deseas establecer en el arreglo
            const valorAEliminar = sCategoriaAntigua;

            resultado = await DBmanipulation.eliminarCategoriaProductos(filtro, valorAEliminar);

            console.log(resultado)
            if (resultado == 1) {
                res.redirect("/admin/administrar_categorias");
            } else {
                res.send("Error")
            }

        } else {
            res.send("Error")
        }
    }

    public static async mostrarcaracteristicas(req: Request, res: Response){
        try {
            const oCaracteristicas = await DBmanipulation.obtenerRegistros("cCaracteristica");

    
            res.render("admin/vw_admincaracteristicas",{caracteris: oCaracteristicas})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
            })
        }
    }




    public static async editarcaracteristica(req: Request, res: Response){
        try {
            const sId = req.params.id;
            const oCaracteristica = await DBmanipulation.obtenerRegistroById(sId, "cCaracteristica");
            if (oCaracteristica != 0) {
                res.render("admin/vw_editarcaracteristica",{caract: oCaracteristica})
            } else {
                res.send("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }


    public static async actualizarcaracteristica(req: Request, res: Response){

        const {sId, sCaracteristica, sCaracteristicaAntigua, ...rest} = req.body;
        console.log(req.body)
        let resultado;
        // Los atributos que deseas actualizar
        const nuevosAtributos = {
            sCaracteristica: sCaracteristica
            // Puedes agregar más atributos a actualizar aquí
        };

        resultado = await DBmanipulation.actualizardocumento(sId, nuevosAtributos,"cCaracteristica");

        resultado = await DBmanipulation.actualizarCaracteristicaProductos(sCaracteristicaAntigua, sCaracteristica);

        console.log(resultado)

        if (resultado == 1) {
            return res.status(200).json({
                status:1, 
                mensaje: "Característica actualizada de forma correcta"
              });
        } else {
            return res.status(500).json({
                status:0, 
                mensaje: "Ah ocurrio un error"
              });
        }


    }

    public static async eliminarcaracteristica(req: Request, res: Response){
        const sId = req.params.id;
        const sCaracteristicaAntigua = req.params.sCaracteristica;
        let resultado;
        console.log(sId)
        resultado = await DBmanipulation.eliminarDocumento(sId, "cCaracteristica");

        if (resultado == 1) {

            resultado = await DBmanipulation.eliminarCaracteristicaProductos(sCaracteristicaAntigua);

            console.log(resultado)
            if (resultado == 1) {
                res.redirect("/admin/administrar_caracteristicas");
            } else {
                res.send("Error")
            }

        } else {
            res.send("Error")
        }
    }

    public static async mostrarpedidos(req: Request, res: Response){
        try {
            const oPedidos = await DBmanipulation.obtenerRegistros("cPedido");

    
            res.render("admin/vw_adminpedidos",{pedidos: oPedidos})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
            })
        }
    }

    public static async editarpedido(req: Request, res: Response){
        try {
            const sId = req.params.id;
            let resultado = await DBmanipulation.obtenerRegistroById(sId, "cPedido");
            console.log(resultado)
            res.render("admin/vw_editarpedido",{pedido: resultado})
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
            })
        }
    }
    
    public static async actualizarestatuspedido(req: Request, res: Response){
        try {
            const {sEstatusPedido, sIdPedido, ...rest} = req.body;
            const resultado = await DBmanipulation.actualizaratributodocumento(sIdPedido, "sEstatus", sEstatusPedido, "cPedido");
            res.redirect("/admin/editarpedido/" +  sIdPedido)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                status:0, 
                mensaje: "Ocurrio un error interno"
            })
        }
    }
    
}



export default adminController;