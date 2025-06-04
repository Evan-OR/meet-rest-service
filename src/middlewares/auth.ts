import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error('No authorization header found!');
    const tokenParts = authHeader.split(' ');

    const decodedUserInfo = jwt.verify(tokenParts[1], process.env.SECRET!);
    // TODO: set user data on request object

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

export default authenticateUser;
