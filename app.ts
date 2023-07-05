import express from 'express';
import authRouter from './routers/rtr_authentication';
import userRouter from './routers/rtr_user';
import { connectDB } from "./services/svc_databaseMongoDB"
import bodyParse from 'body-parser'

const app = express();
const port = 3000;

// CONEXIÓN A BASE DE DATOS
connectDB();

app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

// RUTAS
app.use('/auth',authRouter);

app.use('/user',userRouter);

app.listen(port)
  .on('listening', () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
  })
  .on('error', (err: any) => {
    console.error(err);
  });