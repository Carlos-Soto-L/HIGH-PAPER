import express from 'express'
import adminController from '../controllers/ctrls_admin';
import { Validator } from '../class/cls_validator'
import MWAuthentication from '../middlewares/mw_authentication';

import { Request, Response, NextFunction } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/assets/img/products/')); // Ruta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const fechaCarga = Date.now().toString();
        const nombreArchivo = fechaCarga + extension;
        cb(null, nombreArchivo); // Nuevo nombre del archivo
    },
  });

  const upload = multer({ storage:storage, fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      // Archivo no valido.
    }
  },});


const adminRouter = express.Router();

// Ruta para renderizar la vista vw_categorias
adminRouter.get('/categorias', MWAuthentication.isAdmin, adminController.vwCategoria);

// Ruta para crear una categoría nueva
adminRouter.post('/categorias', MWAuthentication.isAdmin, Validator.validarCategoria(), adminController.createCategoria);

// Ruta para renderizar la vista vw_caracteristicas
adminRouter.get('/caracteristica', MWAuthentication.isAdmin, adminController.vwCaracteristica);

// Ruta para crear una Característica nueva
adminRouter.post('/caracteristica', MWAuthentication.isAdmin, Validator.validarCaracteristica(), adminController.createCaracteristica);

// Ruta para renderizar la vista vw_productos
adminRouter.get('/producto', MWAuthentication.isAdmin, adminController.vwProducto);

// Ruta para crear un producto
adminRouter.post('/crearproducto', (req:Request, res:Response, next:NextFunction)=>{
  console.log(req.body)
  next()
}, MWAuthentication.isAdmin,upload.array('aFotografias', 5), Validator.validarProducto(),  adminController.createProducto);

// Exporta el enrutador para su uso en otros archivos
export default adminRouter;