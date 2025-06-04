import { Pool } from 'pg';

declare module 'express-serve-static-core' {
  export interface Request {
    db: Pool;
  }
}

export {};
