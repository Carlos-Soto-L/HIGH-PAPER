import express from 'express';
import authRouter from './routers/rtr_authentication';

const app = express();
const port = 3000;
app.use('/auth',authRouter);
// app.get('/', (req, res) => {
//   res.send('HOLA, BIENVENIDO');
// });
app.listen(port)
  .on('listening', () => {
    console.log(`Server is listening on ${port}`);
  })
  .on('error', (err: any) => {
    console.error(err);
  });