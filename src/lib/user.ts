import { User } from '@src/types';

export const filterSensitiveDataFromUserData = (data: any): User => {
  const keysToFilter = ['password_hash'];

  const filteredData: { [key: string]: any } = {};
  for (const key in data) {
    if (!keysToFilter.includes(key)) {
      filteredData[key] = data[key];
    }
  }

  return filteredData as User;
};
