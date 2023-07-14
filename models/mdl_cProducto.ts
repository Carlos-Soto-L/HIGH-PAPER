import { Schema, model, Document } from 'mongoose';

export interface IProducto extends Document{
    sNombre: String,
    sDescripcion:  String,
    aFotos: string[], 
    aCategorias:  string[], 
    iCantidadExistencia: Number,
    iPrecio: Number,
    aCaracteristicas: string[],
}

const productoSchema:Schema = new Schema({
    sNombre: { type: String, required: true },
    sDescripcion: { type: String, required: true },
    aFotos: { type: Array, required: true },
    aCategorias: { type: Array, required: true },
    iCantidadExistencia: { type: Number, required: true },
    iPrecio: { type: Number, required: true },
    aCaracteristicas: { type: Array, required: true },
  },
  {
    collection: 'cProducto'
  });

const Producto = model<IProducto>('cProducto', productoSchema);

export default Producto;
