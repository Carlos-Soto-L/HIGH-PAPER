import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document{
  sNombre: string;
  sApePaterno: string;
  sApeMaterno: string;
  sUsuario: String;
  sCorreo: String;
  sTelefono: String;
  sPassword: String;
}

const userSchema:Schema = new Schema({
    sNombre: { type: String, required: true },
    sApePaterno: { type: String, required: true },
    sApeMaterno: { type: String, required: true },
    sUsuario: { type: String, required: true, unique: true },
    sCorreo: { type: String, required: true, unique: true },
    sTelefono: { type: String, required: false },
    sPassword: { type: String, required: true },
    iRol:{ type:Number, required:true }
  },
  {
    collection: 'cUsuario'
  });

const User = model<IUser>('cUsuario', userSchema);

export default User;
