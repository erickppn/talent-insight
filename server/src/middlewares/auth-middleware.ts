import { Request, Response, NextFunction } from "express";
import { validateToken } from "../utils/validate-token";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers["authorization"];

  if (!authToken) throw new Error("Token de autenticação não fornecido");

  validateToken(authToken);
  next();
}