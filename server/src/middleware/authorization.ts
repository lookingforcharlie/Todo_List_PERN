import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PayloadType } from '../utils/jwtGenerator';

config();

const jwtSecretKey = process.env.jwtSecretKey as string;

interface CustomRequest extends Request {
  user?: string;
}

const authorizeUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. destructuring the token
    const header = req.headers.authorization;
    if (header === undefined) return;
    const [type, token] = header.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(403).json('Not Authorize');
    }

    const payload = jwt.verify(token, jwtSecretKey) as PayloadType;

    // Create req.user for attaching decoded payload.user to for future use
    // In jwtGenerator.ts file, we've defined payload type
    // payload.user is user_id
    req.user = payload.user;

    next();
  } catch (error: unknown) {
    console.error((error as Error).message);
    return res.status(403).json('Not Authorized');
  }
};

export default authorizeUser;

// We are using this middleware to authorized the user
// Use the middleware
// import authorizeUser from './path/to/authorizeUser';
// app.use(authorizeUser);
