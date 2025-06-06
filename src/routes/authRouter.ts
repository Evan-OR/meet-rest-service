import { Router } from 'express';
import { handleLogin, handleSignUp } from '@controllers/authControllers';
import { attachDB } from '@middlewares/db';

const AuthRouter = Router();

AuthRouter.post('/login', attachDB, handleLogin);

AuthRouter.post('/signup', attachDB, handleSignUp);

export default AuthRouter;
