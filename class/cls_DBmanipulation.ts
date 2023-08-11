import User from '../models/mdl_user';
import LstNegraJWT from '../models/mdl_cListaNegraJWT';
import Categoria from '../models/mdl_cCategoria';
import Caracteristica from '../models/mdl_cCaracteristica';
import Producto from '../models/mdl_cProducto';
import CarritoCompra from '../models/mdl_cCarritoCompra';
import mongoose from 'mongoose';




export default class DBmanipulation{

  private static oDocumento: any;
  private static oResultado: any;

  constructor(){}


  /**
 * Método para insertar un objeto en determinada colección.
 *
 * @param oObject Objeto a insertar.
 * @param sColeccion Nombre de la colección.
 * @returns void.
 */
  public static async insertarDocumento(oObject: Object, sColeccion: String){
      try {
        switch (sColeccion) {
          case "cUsuario":
            this.oDocumento = new User(oObject);
            break;
          case "cCategoria":
            this.oDocumento = new Categoria(oObject);
            break;
          case "cCaracteristica":
            this.oDocumento = new Caracteristica(oObject);
            break;
          case "cProducto":
            this.oDocumento = new Producto(oObject);
            break;
          case "cCarritoCompra":
            this.oDocumento = new CarritoCompra(oObject);
            break;

          // TO DO: Instanciar el objeto documento con las demas clases ...
          default:
            break;
        }
          await this.oDocumento.save();
        
      } catch (error) {
        console.log(error)
      } finally{
        this.oDocumento = null;
      }
    }

    public static async obtenerRegistroById(sId:string, sColeccion:string){
      try {
        this.oResultado = "";
        switch (sColeccion) {
          case "cUsuario":
            this.oResultado = await User.find({_id:sId}).exec();
            break;
          case "cCategoria":
            this.oResultado = await Categoria.find({_id:sId}).exec();
            break;
          case "cCaracteristica":
            this.oResultado = await Caracteristica.find({_id:sId}).exec();
            break;
          case "cProducto":
            this.oResultado = await Producto.find({_id:sId}).exec();
            break;
          case "cCarritoCompra":
            this.oResultado = await CarritoCompra.find({_id:sId}).exec();
            break;
          // TO DO: Instanciar el objeto documento con las demas clases ...
          default:
            break;
        }
          if (this.oResultado != "") {
            return this.oResultado;
          } else {
            return 0;
          }
        
      } catch (error) {
        console.log(error)
      } finally{
        this.oResultado = null;
      }
    }

      /**
 * Método para determinar a travez de un atributo si un objeto en determinada colección existe.
 *
 * @param sValor Valor del atributo a ser buscado.
 * @param sAtributo Nombre atributo.
 * @param sColeccion Nombre de la colección.
 * @returns void.
 */
  public static async verificarExistenciaValor(sValor: string, sAtributo: string, sColeccion: string){
    try {
      switch (sColeccion) {
        case "cUsuario":
          this.oResultado = await User.find({ [sAtributo]: sValor }).exec();
          break;
        case "cCategoria":
          this.oResultado = await Categoria.find({ [sAtributo]: sValor }).exec();
          break;
        case "cCaracteristica":
          this.oResultado = await Caracteristica.find({ [sAtributo]: sValor }).exec();
          break;
        case "cCarritoCompra":
          this.oResultado = await CarritoCompra.find({ [sAtributo]: sValor }).exec();
          break;
        // TO DO: Instanciar el objeto documento con las demas clases ...
        default:
          break;
      }
      
    } catch (error) {
      console.log(error)
    } finally{
      if (this.oResultado[0] != null) {
        this.oResultado = null;
        return true;
      } else {
        this.oResultado = null;
        return false;
      }
      
    }
  }

/**
 * Método para obtener el objeto de un usuario por medio de su nombre de usuario o correo.
 *
 * @param sAuthUser Nombre de usuario o correo.
 * @returns void.
 */
  public static async getUsuario(sAuthUser: string){
    try {

      this.oResultado = await User.find({ sCorreo: sAuthUser }).exec();

      if (this.oResultado[0] == null) {
        this.oResultado = await User.find({ sUsuario: sAuthUser }).exec();
      }

    } catch (error) {
      console.log(error)
    } finally{
      if (this.oResultado[0] != null) {
        return this.oResultado;
      } else {
        return false;
      }
      
    }
  }

/**
 * Método para agregar un token a una lista negra en base de datos.
 *
 * @param oObject Objeto a insertar en la colección cLstNegraJWT.
 * @returns void.
 */
  public static async agregarJWTLstNegra(oObject: Object){
    try{
      this.oDocumento = new LstNegraJWT(oObject);
      await this.oDocumento.save();
    }catch(error){
      console.log(error)
    }

  }

    /**
 * Método para obtener todos los registros de una colección.
 *
 * @param sColeccion Nombre de la colección.
 * @returns Datos de la colección, en caso contrario, retorna null.
 */
    public static async obtenerRegistros(sColeccion: string){
      try {
        switch (sColeccion) {
          case "cUsuario":
            this.oResultado = await User.find({}).exec();
            break;
          case "cCategoria":
            this.oResultado = await Categoria.find({}).exec();
            break;
          case "cCaracteristica":
            this.oResultado = await Caracteristica.find({}).exec();
            break;
          case "cProducto":
            this.oResultado = await Producto.find({}).exec();
            break;
          case "cCaracteristica":
            this.oResultado = await Producto.find({}).exec();
            break;
          // TO DO: Instanciar el objeto documento con las demas clases ...
          default:
            break;
        }
        
      } catch (error) {
        console.log(error)
      } finally{
        if (this.oResultado[0] != null) {
          return this.oResultado;
        } else {
          this.oResultado = null;
          return null;
        }
        
      }
    }


        /**
 * Método para obtener todos los registros de una colección.
 *
 * @param sColeccion Nombre de la colección.
 * @param oFiltros Filtros a aplicar.
 * @returns Datos de la colección, en caso contrario, retorna null.
 */
        public static async obtenerRegistrosFiltro(oFiltros:Object,sColeccion: string){
          try {
            switch (sColeccion) {
              case "cUsuario":
                this.oResultado = await User.find(oFiltros).exec();
                break;
              case "cCategoria":
                this.oResultado = await Categoria.find(oFiltros).exec();
                break;
              case "cCaracteristica":
                this.oResultado = await Caracteristica.find(oFiltros).exec();
                break;
              case "cProducto":
                this.oResultado = await Producto.find(oFiltros).exec();
                break;
              case "cCarritoCompra":
                this.oResultado = await CarritoCompra.find(oFiltros).exec();
                break;
              // TO DO: Instanciar el objeto documento con las demas clases ...
              default:
                break;
            }
            
          } catch (error) {
            console.log(error)
          } finally{
            if (this.oResultado[0] != null) {
              return this.oResultado;
            } else {
              this.oResultado = null;
              return null;
            }
            
          }
        }


  /**
 * Método para obtener los 10 productos mas recientes.
 *
 * @returns arreglo con un listado de objetos del esquema productos.
 */
    public static async obtenerLos10ProductosRecientes(){
      try {
        this.oResultado =  await Producto.find({})
        .sort({ _id: -1 })
        .limit(10)
        .exec();
      } catch (error) {
        console.log(error)
      }finally{
        if (this.oResultado[0] != null) {
          return this.oResultado;
        } else {
          this.oResultado = null;
          return null;
        }
        
      }
    }

  /**
 * Método para obtener un producto en particular, por medio de su ID.
 *@param idProducto identificador unico del producto.
 * @returns objeto del producto..
 */
    public static async obtenerProducto(idProducto:string){
      try {
        this.oResultado = await Producto.find({_id:idProducto}).exec();
      } catch (error) {
        console.log(error)
      }finally{
        if (this.oResultado[0] != null) {
          return this.oResultado;
        } else {
          this.oResultado = null;
          return null;
        }
        
      }
    }

    public static async actualizaratributodocumento(idDocumento:string, sAtributo: string, aNuevoValor: any, sColeccion: string){

      try {

        let data;
        switch (sColeccion) {
          case 'cProducto':
            // Busca el documento por su _id
            data = await Producto.findById(idDocumento);
            break;
        
          default:
            break;
        }

        if (data) {
          // Actualiza el atributo `aFotos` con las nuevas fotos
          data[sAtributo] = aNuevoValor;

          // Guarda el documento actualizado
          await data.save();
          console.log('Documento actualizado:', data);
          return 1;
        } else {
          console.log('No se encontró el producto con el id especificado.');
          return 0;
        }
      } catch (error) {
        console.error('Error al actualizar el documento:', error);
        return 0;
      }

    }


    public static async actualizardocumento(sId: string, aActualizadosAtributos: Object, sColeccion: string){
      try {
        var resultado;
        switch (sColeccion) {
          case "cProducto":
            resultado = await Producto.findByIdAndUpdate( sId,aActualizadosAtributos);
            break;
          case "cCategoria":
            resultado = await Categoria.findByIdAndUpdate( sId,aActualizadosAtributos);
            break;
          case "cCaracteristica":
            resultado = await Caracteristica.findByIdAndUpdate( sId,aActualizadosAtributos);
            break;
      
          default:
            break;
        }


        // Verificar si se encontró y actualizó el documento
        if (resultado) {
          console.log('Documento actualizado correctamente.');
          return 1;
        } else {
          console.log('No se encontró el documento o no hubo cambios en la actualización.');
          return 0;
        }
      } catch (error) {
        console.log('Error al actualizar el documento:', error);
        return 0;
      }
    }

  public static async eliminarDocumento(sId:string, sColeccion:string){
    try {
      var resultado;
      switch (sColeccion) {
        case "cProducto":
          resultado = await Producto.findByIdAndDelete(sId);
          break;
        case "cCategoria":
          resultado = await Categoria.findByIdAndDelete(sId);
          break;
        case "cCaracteristica":
          resultado = await Caracteristica.findByIdAndDelete(sId);
          break;
        case "cCarritoCompra":
          resultado = await CarritoCompra.findByIdAndDelete(sId);
          break;
    
        default:
          break;
      }

      // Verificar si se encontró y eliminó el documento
      if (resultado) {
        console.log('Documento eliminado correctamente.');
        return 1;
      } else {
        console.log('No se encontró el documento con el ID especificado.');
        return 0;
      }
    } catch (error) {
      console.log('Error al eliminar el documento:', error);
      return 0;
    }
  }

  public static async actualizarCategoriasProductos(filtro:Object, nuevoValor: string){
    try {
      this.oResultado = null;
      // Actualiza el arreglo usando el operador $set
      this.oResultado = await Producto.updateMany(filtro, { $set: { 'aCategorias.$': nuevoValor } });

      if (this.oResultado) {
        this.oResultado = null;
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
      this.oResultado = 0;
    }
  }


  public static async eliminarCategoriaProductos(filtro:Object, nuevoEliminmarpa: string){
    try {
      this.oResultado = null;

    // Define el valor que deseas eliminar del arreglo
    const valorAEliminar = nuevoEliminmarpa;
    
    // Elimina el valor del arreglo usando el operador $pull
    this.oResultado = await Producto.updateMany(filtro, { $pull: { aCategorias: valorAEliminar } })

      if (this.oResultado) {
        this.oResultado = null;
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
      this.oResultado = 0;
    }
  }


  public static async eliminarCaracteristicaProductos(sCaracteristica:string){
    try {
      this.oResultado = null;

      this.oResultado = await Producto.updateMany(
        { "aCaracteristicas.sCaracteristica": sCaracteristica },
        { $pull: { "aCaracteristicas": { "sCaracteristica": sCaracteristica } } }
    );
        

      if (this.oResultado) {
        this.oResultado = null;
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      console.log(error);
      this.oResultado = 0;
    }
  }


  public static async actualizarCaracteristicaProductos(sCaracteristica:string, sCaracteristicaActualizada:string){
    try {
      this.oResultado = true;

      this.oResultado = await Producto.updateMany(
            { "aCaracteristicas.sCaracteristica": sCaracteristica },
            { $set: { "aCaracteristicas.$.sCaracteristica": sCaracteristicaActualizada } }
        );
        console.log('Documentos actualizados con éxito.');


          if (this.oResultado) {
            this.oResultado = null;
            return 1;
          } else {
            return 0;
          }
        } catch (error) {
          console.log(error);
          this.oResultado = 0;
        }
      }


    public static async agregarCantidadProductosCarritoCliente(sIdCliente:string, sIdProducto:string, sUnidadesProducto:string, oNuevoProducto:Object){
      let resultado = 1;
      let sTotalUnidades;
      let iNuevoTotal;
      let idCarritoCompra;
      let iTotalActual;

      // consultar el producto 

      try {
        const carrito = await CarritoCompra.findOne({ "oIdUsuario": sIdCliente});
        if (carrito) {
          idCarritoCompra = carrito._id;
          iTotalActual = carrito.iTotal;

          const productoColeccion = await CarritoCompra.findOne({ "oIdUsuario": sIdCliente, "aProductos.sIdProducto": sIdProducto });

          if (productoColeccion != null) {

            const producto = productoColeccion.aProductos.find(item => item['sIdProducto'] === sIdProducto);
            // if (producto) {
              console.log('Producto encontrado:');
              sTotalUnidades = parseInt(producto['sUnidadesProducto'], 10) + parseInt(sUnidadesProducto, 10);
              iNuevoTotal = parseFloat(producto['iPrecioProducto']) * parseInt(sUnidadesProducto, 10);
    
            // Realiza la actualización
            await CarritoCompra.updateOne(
              {
                "oIdUsuario": sIdCliente,
                "aProductos.sIdProducto": sIdProducto
              },
              {
                "$set": {
                  "aProductos.$[element].sUnidadesProducto": sTotalUnidades + ""
                },
                "$inc":{"iTotal": iNuevoTotal}
              },
              {
                arrayFilters: [
                  { "element.sIdProducto": sIdProducto }
                ]
              }
            );
  
  
          } else {
            console.log('Producto no encontrado en el carrito.');

            console.log(oNuevoProducto)

            // Se agrega el producto al carrito de compra del usuario
            let iAgregado = parseFloat(oNuevoProducto['iPrecioProducto']) * parseFloat(oNuevoProducto['sUnidadesProducto']);

            console.log(iAgregado)


            await CarritoCompra.updateOne(
              { "_id": idCarritoCompra }, // Filtra el documento que deseas actualizar
              {
                "$push": {
                  "aProductos": oNuevoProducto
                },
                "$inc": { "iTotal": iAgregado } // Actualiza el campo iTotal sumando el precio del nuevo producto
              }
           );
  
          }
        } else {
          console.log('Carrito no encontrado para el usuario.');
        }
      } catch (error) {
        resultado = 0;
      }

      return resultado;

    }

    public static async actualizarproductocarrito(sIdCliente:string, sIdProducto:string, sUnidadesProducto:string, sActualizadoUnidadesProducto:string){
      try {
        let iTotalUnidades;
        let iNuevoTotal;
        let iDiferencia;
        let iTotalActual;

        const productoColeccion = await CarritoCompra.findOne({ "oIdUsuario": sIdCliente, "aProductos.sIdProducto": sIdProducto });

        if (productoColeccion != null) {

            const producto = productoColeccion.aProductos.find(item => item['sIdProducto'] === sIdProducto);

            iTotalActual = productoColeccion['iTotal'];

              if(parseInt(sUnidadesProducto,10) > parseInt(sActualizadoUnidadesProducto,10)){
                // RESTA
                iDiferencia = parseInt(sUnidadesProducto,10) - parseInt(sActualizadoUnidadesProducto,10);
                console.log("Elementos quitados: " + iDiferencia)

                iTotalUnidades = parseInt(producto['sUnidadesProducto'], 10) - iDiferencia;
                iNuevoTotal = parseFloat(producto['iPrecioProducto']) * iDiferencia;
                iNuevoTotal = iTotalActual - iNuevoTotal;

                console.log("Total nuevo: " + iNuevoTotal)

                  // Realiza la actualización
                  await CarritoCompra.updateOne(
                    {
                      "oIdUsuario": sIdCliente,
                      "aProductos.sIdProducto": sIdProducto
                    },
                    {
                      "$set": {
                        "aProductos.$[element].sUnidadesProducto": iTotalUnidades + "",
                        "iTotal": iNuevoTotal
                      }
                    },
                    {
                      arrayFilters: [
                        { "element.sIdProducto": sIdProducto }
                      ]
                    }
                  );

              }else{

                iDiferencia = parseInt(sActualizadoUnidadesProducto,10) - parseInt(sUnidadesProducto,10);
                console.log("Elementos agregados: " + iDiferencia)
                //SUMA
                iTotalUnidades = parseInt(producto['sUnidadesProducto'], 10) + iDiferencia;
                iNuevoTotal = parseFloat(producto['iPrecioProducto']) * iDiferencia;
                iNuevoTotal = iTotalActual + iNuevoTotal;

                console.log("Total nuevo: " + iNuevoTotal)

                // Realiza la actualización
                await CarritoCompra.updateOne(
                  {
                    "oIdUsuario": sIdCliente,
                    "aProductos.sIdProducto": sIdProducto
                  },
                  {
                    "$set": {
                      "aProductos.$[element].sUnidadesProducto": iTotalUnidades + "",
                      "iTotal": iNuevoTotal
                    }
                  },
                  {
                    arrayFilters: [
                      { "element.sIdProducto": sIdProducto }
                    ]
                  }
                );
              }
  
          }

      } catch (error) {
        
      }
    }

    public static async eliminarproductocarrito(sdCarrito:string, sdProducto:string){

      try {
        let iNuevoTotal: number;

        let carritoCliente = await CarritoCompra.findOne({ "_id": sdCarrito, "aProductos.sIdProducto": sdProducto });
  
        if (carritoCliente != null) {

          console.log("CARRITO " + carritoCliente)
  
          const producto = carritoCliente.aProductos.find(item => item['sIdProducto'] === sdProducto);
          
          console.log("PRODUCTO " + producto['iPrecioProducto'])

          let iTotalActual:any = carritoCliente['iTotal'];

          iNuevoTotal = parseInt(iTotalActual,10) - (parseInt(producto['iPrecioProducto'],10) * parseInt(producto['sUnidadesProducto'],10))
  
          await CarritoCompra.updateOne(
            { "_id": sdCarrito }, // Filtrar el documento específico
            { "$pull": { "aProductos": { "sIdProducto": sdProducto } },
              "$set":{ "iTotal": iNuevoTotal}
            } // Eliminar el producto con el sIdProducto dado
          )

          carritoCliente = await CarritoCompra.findOne({ "_id": sdCarrito})

          if (carritoCliente['aProductos'].length == 0) {
            DBmanipulation.eliminarDocumento(sdCarrito, "cCarritoCompra");
          }


        }else{
          console.log("No existe el carrito")
        }
      } catch (error) {
        console.log(error)
      }
    }

}




