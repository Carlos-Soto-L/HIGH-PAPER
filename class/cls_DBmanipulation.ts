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

}




