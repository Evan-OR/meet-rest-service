import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { USER_AUTH_QUERIES } from '@lib/dbQueries';
import { generateJWT } from '@src/lib/auth';
import { filterSensitiveDataFromUserData } from '@src/lib/user';

const SALT_ROUNDS = 10;

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body as Record<string, string>;

  if (!email || !password) {
    res.status(400).json({ msg: 'Invalid Request' });
    console.log('Not all params where sent to sign up end point!');
    return;
  }

  try {
    const lowercaseEmail = email.toLowerCase();

    const result = await req.db.query(USER_AUTH_QUERIES.LOGIN, [lowercaseEmail]);
    const userData = result.rows[0];
    const passwordHash = userData['password_hash'];

    const isValid = await bcrypt.compare(password, passwordHash);

    if (!isValid) {
      res.status(401).json({ msg: 'Invalid creds!' });
      return;
    }

    const token = generateJWT(userData);

    const filteredUserData = filterSensitiveDataFromUserData(userData);

    res.status(200).json({ msg: 'login successful', authToken: token, userData: filteredUserData });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in' });
  }
};

export const handleSignUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body as Record<string, string>;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ msg: 'Invalid Request' });
    console.log('Not all params where sent to sign up end point!');
    return;
  }
  //   probably should check for valid email and valid password at some point

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const lowercaseEmail = email.toLocaleLowerCase();

  try {
    const result = await req.db.query(USER_AUTH_QUERIES.SIGNUP, [lowercaseEmail, passwordHash, firstName, lastName]);
    const userData = result.rows[0];

    const token = generateJWT(userData);

    const filteredUserData = filterSensitiveDataFromUserData(userData);

    res.status(201).json({ msg: 'signup successful', authToken: token, userData: filteredUserData });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'Error signing up' });
  }
};
