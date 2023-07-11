import User from '../models/mdl_user';
import LstNegraJWT from '../models/mdl_cListaNegraJWT';

export default class DBmanipulation{

  private static oDocumento: any;
  private static oResultado: any;

  constructor(){}

  public static async insertarDocumento(oObject: Object, sColeccion: String){
      try {
        switch (sColeccion) {
          case "cUsuario":
            this.oDocumento = new User(oObject);
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

    public static async verificarExistenciaValor(sValor: string, sAtributo: string, sColeccion: string){
      try {
        switch (sColeccion) {
          case "cUsuario":
            this.oResultado = await User.find({ [sAtributo]: sValor }).exec();
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

    public static async agregarJWTLstNegra(oObject: Object){
      try{
        this.oDocumento = new LstNegraJWT(oObject);
        await this.oDocumento.save();
      }catch(error){
        console.log(error)
      }

    }
}

