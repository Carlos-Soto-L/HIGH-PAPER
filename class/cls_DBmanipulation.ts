import User from '../models/mdl_user';
import LstNegraJWT from '../models/mdl_cListaNegraJWT';
import Categoria from '../models/mdl_cCategoria';
import Caracteristica from '../models/mdl_cCaracteristica';
import Producto from '../models/mdl_cProducto';




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

}




