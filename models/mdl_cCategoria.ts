import { Schema, model, Document } from 'mongoose';

export interface ICategoria extends Document{
  sCategoria: string;
}

const categoriaSchema:Schema = new Schema({
    sCategoria: { type: String, required: true }
  },
  {
    collection: 'cCategoria'
  });

const Categoria = model<ICategoria>('cCategoria', categoriaSchema);

export default Categoria;