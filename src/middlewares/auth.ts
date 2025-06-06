import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.body.authToken;
    if (!authToken) throw new Error('No authorization header found!');

    const decodedUserInfo = jwt.verify(authToken, process.env.SECRET!);
    // TODO: set user data on request object

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authenticateUser;
