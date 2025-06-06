export const USER_AUTH_QUERIES = {
  SIGNUP: 'INSERT INTO users(email, password_hash, name) VALUES ($1, $2, $3) RETURNING *',
  LOGIN: 'SELECT * FROM users WHERE email = $1;',
};
