import axios from 'axios';

export const login = data => ({
  type: 'LOGIN',
  payload: axios.post('http://54.165.175.40:3000/api/v1/login', data),
});

export const register = data => ({
  type: 'REGISTER',
  payload: axios.post('http://54.165.175.40:3000/api/v1/register', data),
});
