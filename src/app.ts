import 'express-async-errors';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import errorMiddleware from './middlewares/error';
import routers from './routes';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send('Express + TypeScript');
});

app.use('/register', routers.register);
app.use('/login', routers.login);
app.use('/balance', routers.balance);
app.use('/transactions', routers.transaction);

app.use(errorMiddleware);

export default app;
