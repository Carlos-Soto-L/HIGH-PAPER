import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation'

export class Validator {

  /**
 * Middleware para validar los datos de entrada para el proceso de registro de usuario.
 * @returns retorna una respuesta con código 400 si no se comple las validaciones, si no, sigue con el siguiente proceso.
 */
  public static validarRegistro() {
    return [
        body('sNombre')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tu nombre es requerido')
        .isLength({ min: 3, max: 20 })
        .withMessage('Por favor, ingrese su nombre de forma correcta')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Tu nombre solo debe contener letras'),
        body('sApePaterno')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tu apellido paterno no debe estar vacío')
        .isLength({ min: 3, max: 12 })
        .withMessage('Por favor, ingrese su apellido paterno de forma correcta')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('Tu apellido paterno solo debe contener letras'),
        body('sApeMaterno')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tu apellido materno no debe estar vacío')
        .isLength({ min: 3, max: 12 })
        .withMessage('Por favor, ingrese su apellido materno de forma correcta')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('Tu apellido materno solo debe contener letras'),
        body('sUsuario')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Por favor, define tu usuario')
        .isLength({ min: 5, max: 15 })
        .withMessage('Tu usuario debe tener entre 5 y 15 caracteres')
        .matches(/^[a-zA-Z0-9$%_-]+$/)
        .withMessage('Tu usuario solo puede contener letras, números y los signos $%_-')
        .custom(async (value) => {
            const correoExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sUsuario" , "cUsuario");
            if (correoExistente) {
              throw new Error('El usuario ya está en uso');
            }
          }),
        body('sCorreo')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Tu correo es requerido')
        .isEmail()
        .withMessage('Tu correo debe tener un formato válido')
        .custom(async (value) => {
          const correoExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sCorreo" , "cUsuario");
          if (correoExistente) {
            throw new Error('El correo ya está en uso');
          }
        }),
        body('sTelefono')
        .optional()
        .matches(/^\d{10}$/)
        .withMessage('Tu teléfono debe tener 10 dígitos'),
        body('sPassword1').custom((value, { req }) => {
          if (value !== req.body.sPassword2) {
            throw new Error('Las contraseñas no coinciden');
          }
          return true;
        })
        .trim()
        .not()
        .isEmpty()
        .withMessage('La contraseña es requerida')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe tener al menos una mayúscula')
        .matches(/[0-9]/)
        .withMessage('La contraseña debe tener al menos un número')
        .matches(/[$_.\-/!#]/)
        .withMessage('La contraseña debe tener al menos uno de los siguientes signos: $_.-/!#'),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status:0, 
            mensaje: errors.array()[0].msg
          });
        }
        else{
          next();
        }
      },
    ];
  }


  /**
 * Middleware para validar los datos de entrada para el proceso de login.
 * @returns retorna una respuesta con código 400 si no se comple las validaciones, si no, sigue con el siguiente proceso.
 */
  public static validarLogin() {
    return [
      body('sAuthUser')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Por favor, introduzca su correo o usuario para continuar')
      .custom((value, { req }) => {
        if (value && !value.match(/^[\w$%_-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$|[\w$%_-]+$/)) {
          throw new Error('El campo debe ser un correo electrónico o un nombre de usuario válido');
        }
        return true;
      }),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status:0, 
            mensaje: errors.array()[0].msg
          });
        }
        else{
          next();
        }
      },
    ];
  }


  /**
 * Middleware para validar los datos de entrada para el proceso de dar de alta una nueva categoría.
 * @returns retorna una respuesta con código 400 si no se comple las validaciones, si no, sigue con el siguiente proceso.
 */
  public static validarCategoria() {
    return [
      body('sCategoria')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El campo no debe estar vacío')
      .isLength({ min: 3, max: 25 })
      .withMessage('Por favor, ingrese el nombre de la categoría de forma correcta')
      .matches(/^[a-zA-Z]+$/)
      .withMessage('La categoría materno solo debe contener letras')
      .custom(async (value) => {
        const correoExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sCategoria" , "cCategoria");
        if (correoExistente) {
          throw new Error('La categoría ya existe');
        }
      }),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status:0, 
            mensaje: errors.array()[0].msg
          });
        }
        else{
          next();
        }
      },
    ];
  }


  /**
 * Middleware para validar los datos de entrada para el proceso de dar de alta una nueva característica.
 * @returns retorna una respuesta con código 400 si no se comple las validaciones, si no, sigue con el siguiente proceso.
 */
  public static validarCaracteristica() {
    return [
      body('sCaracteristica')
      .trim()
      .not()
      .isEmpty()
      .withMessage('El campo no debe estar vacío')
      .isLength({ min: 3, max: 25 })
      .withMessage('Por favor, ingrese el nombre de la Característica de forma correcta')
      .matches(/^[a-zA-Z]+$/)
      .withMessage('La Característica materno solo debe contener letras')
      .custom(async (value) => {
        const correoExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sCaracteristica" , "cCaracteristica");
        if (correoExistente) {
          throw new Error('La Característica ya existe');
        }
      }),
      (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            status:0, 
            mensaje: errors.array()[0].msg
          });
        }
        else{
          next();
        }
      },
    ];
  }

}
