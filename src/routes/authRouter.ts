import { Router } from 'express';
import { handleSignUp } from '@controllers/authControllers';
import { attachDB } from '@middlewares/db';

const AuthRouter = Router();

AuthRouter.post('/login', attachDB, (req, res) => {
  res.status(200).json({ msg: 'login auth route' });
});

AuthRouter.post('/signup', attachDB, handleSignUp);

export default AuthRouter;
