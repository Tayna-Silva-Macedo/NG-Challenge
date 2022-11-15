import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../helpers/HttpException';
import Token from '../helpers/Token';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization)
    throw new HttpException(StatusCodes.UNAUTHORIZED, 'Token not found');

  try {
    const payload = Token.validate(authorization);
    res.locals = payload;
    next();
  } catch (error) {
    throw new HttpException(
      StatusCodes.UNAUTHORIZED,
      'Token must be a valid token'
    );
  }
};

export default auth;
