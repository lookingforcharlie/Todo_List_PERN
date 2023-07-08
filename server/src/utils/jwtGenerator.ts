import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config();

const jwtSecretKey = process.env.jwtSecretKey as string;

export type PayloadType = {
  user: string;
};

export default function jwtGenerator(user_id: string) {
  const payload = {
    user: user_id,
  };

  // Unit for expiresIn is second
  return jwt.sign(payload, jwtSecretKey, { expiresIn: 60 });
}
