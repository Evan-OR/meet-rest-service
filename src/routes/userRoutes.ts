import { updateUser } from '@src/controllers/userController';
import { attachDB } from '@src/middlewares/db';
import { Router } from 'express';

const UserRoutes = Router();

UserRoutes.get('/:id', attachDB, (req, res) => {
  // need to add auth middleware
  res.status(200).json({ msg: 'should have got user data' });
});

UserRoutes.patch('/:id', attachDB, updateUser);

export default UserRoutes;
