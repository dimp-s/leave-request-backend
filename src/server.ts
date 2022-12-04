import { json, urlencoded } from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import { Error } from 'mongoose';
import leaveRouter from './routes/leaveRoutes';
import userRouter from './routes/userRoutes';

const app = express();
const port = 3000;

app.use(json());
app.use(urlencoded({ extended: true }));

// app.get('/', () => {
//   return 'hello';
// });

app.use('/user', userRouter);

app.use('/leave', leaveRouter);

app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: error.message });
  }
);

mongoose.connect('mongodb://localhost:27017/leave-module', () => {
  console.log('database connection established!');
});

app.listen(port, () => {
  console.log('server up and running!');
});
