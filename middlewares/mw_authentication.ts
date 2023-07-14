import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

class MWAuthentication {
  
/**
 * Middleware que tiene el objetivo de proteger las rutas para los usuarios administradores.
 * @returns Redirecciona a inicio si no se es un usuario administrador.
 */
  public static async isAdmin(req: Request, res: Response, next: NextFunction){
    // TO DO: verificar que el token no este en la lista negra.
    const isValido = await jwt.verify(req.cookies.jwt, process.env.KEY_SECRET,(error: VerifyErrors | null, decoded: any) => {
        if (error) {
          return false;
        } else {
          return decoded;
        }
      });

      if (isValido !== false) {
        if (isValido._doc.iRol == 2) {
          next();
        } else {
          // No es un usuario administrador.
          res.redirect('/');
        }
      }else{
        // El token es invalido.
        res.redirect('/');
      }
  }

/**
 * Middleware que tiene el objetivo de proteger las rutas para los usuarios clientes.
 * @returns Redirecciona a inicio si no se es un usuario clientes que ha iniciado sesión.
 */
  public static async isCliente(req: Request, res: Response, next: NextFunction){
    // TO DO: verificar que el token no este en la lista negra.
    const isValido = await jwt.verify(req.cookies.jwt, process.env.KEY_SECRET,(error: VerifyErrors | null, decoded: any) => {
        if (error) {
          return false;
        } else {
          return decoded;
        }
      });

    if (isValido !== false) {
      if (isValido._doc.iRol == 1) {
        next();
      } else {
        // No es un usuario cliente.
        res.redirect('/');
      }
    }else{
      // El token es invalido.
      res.redirect('/');
    }
  }
}

export default MWAuthentication;