import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as JwtPayload;

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { userId: BigInt(decoded.userId) }
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};