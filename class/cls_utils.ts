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

    // Crea un codigo random de x longitud
    public static async generateRandomCode(length: number = 5) {
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result: string = '';
    
        for (let i = 0; i < length; i++) {
            const randomIndex: number = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
    
        return result;
    }
}

export default Utils;