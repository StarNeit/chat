import axios from 'axios';

export const userLogin = (payload: { email: string }) => {
  return axios.post('/user', payload);
};

export const getUserApi = (id: string) => {
  return axios.get(`/user/${id}`);
};
