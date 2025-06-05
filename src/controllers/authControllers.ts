import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { USER_SIGNUP } from '@lib/dbQueries';

export const handleLogin = (req: Request, res: Response) => {
  const { email, password } = req.body;

  //   probably should check for valid email and valid password at some point

  //   check if user is in db via email and password hash
};

export const handleSignUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ msg: 'Invalid Request' });
    console.log('Not all params where sent to sign up end point!');
    return;
  }
  //   probably should check for valid email and valid password at some point

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const result = await req.db.query(USER_SIGNUP, [email, passwordHash, firstName]);
    console.log(result.rows[0]);
    res.status(201).json({ msg: 'signup successful' });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Error signing up' });
  }
};
