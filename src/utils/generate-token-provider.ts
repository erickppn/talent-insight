import { sign } from 'jsonwebtoken';

export async function generateToken(userId: string) {
  const secret = process.env.SECRET || 'Secret';

  return await sign({}, secret, {
    subject: userId,
    expiresIn: "1d",
  });
}