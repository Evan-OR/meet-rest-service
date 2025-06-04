export const USER_SIGNUP =
  'INSERT INTO users(email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name';
