import express from 'express';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Express + TypeScript');
});

export default app;
