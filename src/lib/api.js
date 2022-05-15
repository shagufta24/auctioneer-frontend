import { get, post } from '../config';

export const register = async body => {
  const res = await post('/register', body);
  return res;
};
