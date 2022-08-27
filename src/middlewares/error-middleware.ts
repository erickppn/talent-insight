import { NextFunction, Request, Response } from "express";

export function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  return response.status(400).json({
    error: true,
    message: error.message,
  });
};