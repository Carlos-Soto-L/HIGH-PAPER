import User from '../models/mdl_user';
import LstNegraJWT from '../models/mdl_cListaNegraJWT';
import Categoria from '../models/mdl_cCategoria';
import Caracteristica from '../models/mdl_cCaracteristica';



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
}

