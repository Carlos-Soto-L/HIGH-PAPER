import jwt, { VerifyErrors } from 'jsonwebtoken';

class Utils{

    // Verifica si un usuario que trata de identificarse con un token, haiga iniciado realmente sesión en el sistema.
    public static async isLogin(sJwt:string){
        try {
            const isValido = await jwt.verify(sJwt, process.env.KEY_SECRET)
    
            return isValido
            
        } catch (error) {
            //console.log(error)
        }

    }
}

export default Utils;