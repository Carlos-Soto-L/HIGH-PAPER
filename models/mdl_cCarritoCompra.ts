import { Schema, model, Document } from 'mongoose';

export interface ICarritoCompra extends Document{
  oIdUsuario: string;
  aProductos: string[];
  iTotal: Number;
}

const CarritoCompraSchema:Schema = new Schema({
    oIdUsuario: {type: String, require:true},
    aProductos: {type: Array, require:true},
    iTotal: {type: Number, require:true}
  },
  {
    collection: 'cCarritoCompra'
  });

const CarritoCompra = model<ICarritoCompra>('cCarritoCompra', CarritoCompraSchema);

export default CarritoCompra;