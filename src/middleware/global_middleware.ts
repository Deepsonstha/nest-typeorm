import { Request, Response, NextFunction } from 'express';

export function globaleMiddlware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Global Middleware');
  next();
}
