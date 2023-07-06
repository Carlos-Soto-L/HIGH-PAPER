import { Schema, model, Document } from 'mongoose';

export interface IListaNegraJWT extends Document{
  sToken: string;
}

const listaNegraJWTSchema:Schema = new Schema({
    sToken: { type: String, required: true }
  },
  {
    collection: 'cListaNegraJWT'
  });

const LstNegraJWT = model<IListaNegraJWT>('cListaNegraJWT', listaNegraJWTSchema);

export default LstNegraJWT;