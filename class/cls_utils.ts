import jwt, { VerifyErrors } from 'jsonwebtoken';

class Utils{
    // public static async isLogin(sJwt:string){
    //     try {
    //         const isValido = await jwt.verify(sJwt, process.env.KEY_SECRET,(error: VerifyErrors | null, decoded: any) => {
    //             if (error) {
    //               return false;
    //             } else {
    //               return true;
    //             }
    //           });
    
    //           isValido;

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }


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