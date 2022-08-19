import { sign } from 'jsonwebtoken';

export async function generateToken(userId: string) {
  const secret = process.env.JWT_SECRET_KEY || 'Secret';

  return await sign({}, secret, { 
    expiresIn: "1d", 
    subject: userId 
  });
}