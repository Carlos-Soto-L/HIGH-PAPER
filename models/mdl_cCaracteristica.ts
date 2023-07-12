import { Schema, model, Document } from 'mongoose';

export interface ICaracteristica extends Document{
  sCaracteristica: string;
}

const CaracteristicaSchema:Schema = new Schema({
    sCaracteristica: { type: String, required: true }
  },
  {
    collection: 'cCaracteristica'
  });

const Caracteristica = model<ICaracteristica>('cCaracteristica', CaracteristicaSchema);

export default Caracteristica;