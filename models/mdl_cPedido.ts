import { Schema, model, Document } from 'mongoose';

export interface IPedido extends Document{
    oIdUsuario: String,
    aProductos:  String[],
    iMetodoPago: Number, 
    iMetodoEnvio:  Number, 
    sEstatus: String,
    iCodigoPedido: Number,
    iTotal: Number
}

const pedidoSchema:Schema = new Schema({
    oIdUsuario: { type: String, required: true },
    aProductos:  { type: Array, required: true },
    iMetodoPago: { type: Number, required: true }, 
    iMetodoEnvio:  { type: Number, required: true },
    sEstatus: { type: String, required: true },
    sCodigoPedido: { type: String, required: true },
    iTotal: { type: Number, required: true }
  },
  {
    collection: 'cPedido'
  });

const Pedido = model<IPedido>('cPedido', pedidoSchema);

export default Pedido;