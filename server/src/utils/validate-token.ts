import { verify } from "jsonwebtoken";

export function validateToken(authToken: string) {
  const secret = process.env.JWT_SECRET_KEY || 'secret';

  const tokenParts = authToken.split(" ");
  if (tokenParts.length !== 2) throw new Error("Token não fornecido da maneira correta");

  const [bearer, token] = tokenParts;

  if (bearer !== "Bearer") throw new Error("Token mal formatado");
  
  const tokenSignatureParts = token.split(".")
  if (tokenSignatureParts.length != 3) throw new Error("Token mal formatado");

  try {
    const verifiedToken = verify(token, secret);

    const userId = verifiedToken.sub?.toString();

    return userId;
  } catch (e) {
    throw new Error("Token inválido");
  }
}