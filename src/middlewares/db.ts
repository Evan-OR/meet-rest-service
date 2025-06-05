import { Request, Response, NextFunction } from 'express';
import DB_POOL from '@lib/dbPool';

export const attachDB = (req: Request, _res: Response, next: NextFunction) => {
  req.db = DB_POOL;
  next();
};
