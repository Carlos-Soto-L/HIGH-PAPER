import express from 'express';
import authRouter from './routers/rtr_authentication';
import userRouter from './routers/rtr_user';
import { connectDB } from "./services/svc_databaseMongoDB"
import bodyParse from 'body-parser'
import cookieParser from 'cookie-parser';
import viewsRouter from './routers/rtr_router';
import adminRouter from './routers/rtr_admin';


var path = require('path');

const app = express();
const port = 3000;

app.use(cookieParser());

// CONEXIÓN A BASE DE DATOS
connectDB();

app.use(bodyParse.urlencoded({extended:false}))
app.use(bodyParse.json())

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// RUTAS
app.use('/', viewsRouter)

app.use('/auth',authRouter);

app.use('/user',userRouter);

app.use('/admin',adminRouter);



app.listen(port)
  .on('listening', () => {
    console.log(`El servidor está escuchando en el puerto ${port}`);
  })
  .on('error', (err: any) => {
    console.error(err);
  });