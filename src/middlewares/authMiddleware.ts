import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(401).json({ 
      message: "Token de autenticação não fornecido" 
    });
  }

  const tokenParts = authToken.split(" ");

  if (tokenParts.length !== 2) {
    return res.status(401).json({ 
      message: "Token não fornecido da maneira correta" 
    });
  }

  const [bearer, token] = tokenParts;

  if (bearer !== "Bearer") {
    return res.status(401).json({ 
      message: "Token mal formatado" 
    });
  }

  try {
    const secret = process.env.JWT_SECRET_KEY || 'secret';
    verify(token, secret)

    return next();
  } catch (e) {
    res.status(500).json({
      error: e,
      message: "Erro ao validar o token"
    });
  }
}