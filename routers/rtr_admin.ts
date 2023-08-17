import express from 'express'
import adminController from '../controllers/ctrls_admin';
import { Validator } from '../class/cls_validator'
import MWAuthentication from '../middlewares/mw_authentication';

import { Request, Response, NextFunction } from 'express';
// import multer, { Multer } from 'multer';
import path from 'path';

import { S3Client, S3 } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3Client = new S3Client({
    region: 'us-east-2', // ejemplo: 'us-west-2'
    credentials: {
        accessKeyId: 'AKIAX5OPQGJPLW5SFHO2',
        secretAccessKey: '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',
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3Client as any, // Es probable que necesites el "as any" debido a diferencias de tipos entre `multerS3` y el nuevo SDK de AWS.
        bucket: 'high-paper',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname)
        }
    })
});





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
adminRouter.post('/crearproducto', MWAuthentication.isAdmin, upload.array('aFotografias', 5), Validator.validarProducto(),  adminController.createProducto);

// Ruta para administrar los productos
adminRouter.get('/administrar_productos', MWAuthentication.isAdmin, adminController.mostrarproductos);

// Ruta para editar un producto por su id
adminRouter.get('/editarproducto/:id', MWAuthentication.isAdmin, adminController.editarproducto);

// Ruta para editar las fotografias un producto por su id
adminRouter.post('/editarfotosproductos/:id', MWAuthentication.isAdmin, upload.array('aFotografias', 5), adminController.editarfotosproducto);

// Ruta para editar los detalles un producto
adminRouter.post('/editardetallesproducto', MWAuthentication.isAdmin, adminController.editardetallesproducto);

// Ruta para eliminar un producto por su id
adminRouter.get('/eliminarproducto/:id', MWAuthentication.isAdmin, adminController.eliminarproducto);

// Ruta para administrar categorias
adminRouter.get('/administrar_categorias', MWAuthentication.isAdmin, adminController.mostrarcategorias);

// Ruta para editar una categoria
adminRouter.get('/editarcategoria/:id', MWAuthentication.isAdmin, adminController.editarcategorias);

// Ruta para actualizar una categoria
adminRouter.post('/editarcategorias', MWAuthentication.isAdmin, Validator.validarCategoria(), adminController.actualizarcategorias);

// Ruta para eliminar una categoria
adminRouter.get('/eliminarcategoria/:id/:categoria', MWAuthentication.isAdmin, adminController.eliminarcategorias);

// Ruta para administrar las caracteristicas 
adminRouter.get('/administrar_caracteristicas', MWAuthentication.isAdmin, adminController.mostrarcaracteristicas);

// Ruta para editar una caracteristica
adminRouter.get('/editarcaracteristica/:id', MWAuthentication.isAdmin, adminController.editarcaracteristica);

// Ruta para actualizar una caracteristica
adminRouter.post('/editarcaracteristica', MWAuthentication.isAdmin, Validator.validarCaracteristica(), adminController.actualizarcaracteristica);

// Eliminar caracteristica
adminRouter.get('/eliminarcaracteristica/:id/:sCaracteristica', MWAuthentication.isAdmin, adminController.eliminarcaracteristica);

// Ruta para administrar pedidos
adminRouter.get('/pedidos', MWAuthentication.isAdmin, adminController.mostrarpedidos);

// Ruta para actualizar un pedido
adminRouter.get('/editarpedido/:id', MWAuthentication.isAdmin, adminController.editarpedido);

// Ruta para actualizar el estatus del pedido
adminRouter.post('/actualizarestatuspedido', MWAuthentication.isAdmin, adminController.actualizarestatuspedido);



// Exporta el enrutador para su uso en otros archivos
export default adminRouter;