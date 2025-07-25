import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      status: 'error'
    });
  }

  // Prisma errors
  if (err.message.includes('P2002')) {
    return res.status(409).json({
      error: 'Duplicate entry',
      status: 'error'
    });
  }

  if (err.message.includes('P2025')) {
    return res.status(404).json({
      error: 'Record not found',
      status: 'error'
    });
  }

  // Default error
  console.error('Unexpected error:', err);
  res.status(500).json({
    error: 'Internal server error',
    status: 'error'
  });
};