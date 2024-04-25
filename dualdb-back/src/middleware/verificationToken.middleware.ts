import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  userid?: string; 
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.jwt; 

  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.userid = decoded.userId;
    next();
  });
}
