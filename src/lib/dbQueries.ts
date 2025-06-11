import { UserProfile } from '@src/types';

const NON_SENSITIVE_RETURN_DATA =
  'id, email, display_name, first_name, last_name, date_of_birth, description, job, gender_id, interested_in_gender_id';

export const USER_AUTH_QUERIES = {
  SIGNUP: `INSERT INTO users(email, password_hash, first_name, last_name, display_name) VALUES ($1, $2, $3, $4, $3) RETURNING ${NON_SENSITIVE_RETURN_DATA}`,
  LOGIN: 'SELECT * FROM users WHERE email = $1;',
};

export const USER_UPDATE_QUERIES = {
  PROFILE_UPDATE: `INSERT INTO users(display_name, description, date_of_birth, job, gender_id, interested_in_gender_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${NON_SENSITIVE_RETURN_DATA}`,
};

export const buildUpadateUserQuery = (id: number, profileData: UserProfile) => {
  const cleanValues: Array<string | number> = [];
  const setStringArray: string[] = [];

  Object.entries(profileData).forEach(([key, value], index) => {
    if (value !== undefined && value !== null && value !== '') {
      cleanValues.push(value);
      setStringArray.push(`${key} = $${index + 1}`);
    }
  });

  cleanValues.push(id);

  return {
    query: `UPDATE users SET ${setStringArray.join(', ')} WHERE id = $${
      setStringArray.length + 1
    } RETURNING ${NON_SENSITIVE_RETURN_DATA}`,
    values: cleanValues,
  };
};
