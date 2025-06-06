import jwt from 'jsonwebtoken';

export const generateJWT = (data: any) => {
  const token = jwt.sign(data, process.env.SECRET!);

  return token;
};

export const validateAuthHeader = () => {};
