import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { USER_AUTH_QUERIES } from '@lib/dbQueries';
import { generateJWT } from '@src/lib/auth';

const SALT_ROUNDS = 10;

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await req.db.query(USER_AUTH_QUERIES.LOGIN, [email]);
    const userData = result.rows[0];
    const passwordHash = userData['password_hash'];

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!isValid) {
      res.status(401).json({ msg: 'Invalid creds!' });
      return;
    }

    const token = generateJWT(userData);

    res.status(200).json({ msg: 'login successful', authToken: token });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in' });
  }
};

export const handleSignUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ msg: 'Invalid Request' });
    console.log('Not all params where sent to sign up end point!');
    return;
  }
  //   probably should check for valid email and valid password at some point

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  try {
    const result = await req.db.query(USER_AUTH_QUERIES.SIGNUP, [email, passwordHash, firstName]);
    const userData = result.rows[0];

    const token = generateJWT(userData);

    res.status(201).json({ msg: 'signup successful', authToken: token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Error signing up' });
  }
};
