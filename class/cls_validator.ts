import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import DBmanipulation from '../class/cls_DBmanipulation'

export class Validator {
  public static validarRegistro() {
    return [
        body('sNombre')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Nombre es requerido')
        .isLength({ min: 3, max: 20 })
        .withMessage('Por favor, ingrese su nombre de forma correcta')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('El nombre solo debe contener letras'),
        body('sApePaterno')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El campo pellido materno no debe estar vacío')
        .isLength({ min: 3, max: 12 })
        .withMessage('Por favor, ingrese su nombre de forma correcta')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('El apellido materno solo debe contener letras'),
        body('sApeMaterno')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El campo apellido materno no debe estar vacío')
        .isLength({ min: 3, max: 12 })
        .withMessage('Por favor, ingrese su nombre de forma correcta')
        .matches(/^[a-zA-Z]+$/)
        .withMessage('El campo apellido materno solo debe contener letras'),
        body('sUsuario')
        .trim()
        .not()
        .isEmpty()
        .withMessage('El campo usuario no debe estar vacío')
        .isLength({ min: 5, max: 15 })
        .withMessage('El campo usuario debe tener entre 5 y 15 caracteres')
        .matches(/^[a-zA-Z0-9$%_-]+$/)
        .withMessage('El campo usuario solo puede contener letras, números y los signos $%_-')
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
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('El correo debe tener un formato válido')
        .custom(async (value) => {
          const correoExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sCorreo" , "cUsuario");
          if (correoExistente) {
            throw new Error('El correo ya está en uso');
          }
        }),
        body('sTelefono')
        .optional()
        .isLength({ min: 10, max: 10 })
        .withMessage('El teléfono debe tener 10 dígitos'),
        body('sPassword')
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
          return res.status(400).json({ mensaje: errors.array()[0].msg  });
        }
        next();
      },
    ];
  }


  public static validarLogin() {
    return [
        body('sUsuario')
        .optional()
        .trim()
        .isLength({ min: 5, max: 15 })
        .withMessage('El campo usuario debe tener entre 5 y 15 caracteres')
        .matches(/^[a-zA-Z0-9$%_-]+$/)
        .withMessage('El campo usuario solo puede contener letras, números y los signos $%_-')
        .custom(async (value) => {
            const usuarioExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sUsuario" , "cUsuario");
            if (!usuarioExistente) {
              throw new Error('El usuario no existe');
            }
          }),
        body('sCorreo')
        .optional()
        .trim()
        .isEmail()
        .withMessage('El correo debe tener un formato válido')
        .custom(async (value) => {
          const correoExistente = await DBmanipulation.verificarExistenciaValor(value.toString(), "sCorreo" , "cUsuario");
          if (!correoExistente) {
            throw new Error('El correo no existe');
          }
        }),
        body('sPassword')
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
          return res.status(400).json({ mensaje: errors.array()[0].msg });
        }
        next();
      },
    ];
  }
}
