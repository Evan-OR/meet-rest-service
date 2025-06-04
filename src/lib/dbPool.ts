import 'dotenv/config';
import { Pool } from 'pg';

const DB_POOL = new Pool();

export default DB_POOL;
