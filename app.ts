import express from 'express';
import authRouter from './routers/rtr_authentication';
import { connectToDatabase } from "./services/svc_databaseMongoDB"

const app = express();
const port = 3000;

// CONEXIÓN A BASE DE DATOS
connectToDatabase();

// RUTAS
app.use('/auth',authRouter);

app.listen(port)
  .on('listening', () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
  })
  .on('error', (err: any) => {
    console.error(err);
  });