import './config/moduleAlias';
import 'dotenv/config';
import express from 'express';
import AuthRouter from './routes/authRouter';
import DB_POOL from './lib/dbPool';
import UserRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', AuthRouter);
// needs auth middleware for JWT token
app.use('/users', UserRoutes);

app.get('/', (_req, res) => {
  res.send({ msg: 'yo its working !' });
});

app.listen(PORT, async () => {
  const res = await (await DB_POOL).query('SELECT * FROM genders;');
  console.log(res.rows);

  console.log(`Server running at http://localhost:${PORT}`);
});
