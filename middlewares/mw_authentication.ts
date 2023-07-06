import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';

class MWAuthentication {
    public static async isTokenValido(req: Request, res: Response, next: NextFunction){
      // TO DO: verificar que el token no este en la lista negra.
        const isValido = await jwt.verify(req.cookies.jwt, process.env.KEY_SECRET,(error: VerifyErrors | null, decoded: any) => {
            if (error) {
              return false;
            } else {
              return true;
            }
          });

          if (isValido) {
            next();
          }else{
            return res.status(400).json({mensaje:"Token invalido"});
          }
    }
}

export default MWAuthentication;