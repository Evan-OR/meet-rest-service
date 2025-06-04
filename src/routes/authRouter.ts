import { Router } from 'express';
import { attachDB } from '../middlewares/db';
import { handleSignUp } from '../controllers/authControllers';

const AuthRouter = Router();

AuthRouter.post('/login', attachDB, (req, res) => {
  res.status(200).json({ msg: 'login auth route' });
});

AuthRouter.post('/signup', attachDB, handleSignUp);

export default AuthRouter;
