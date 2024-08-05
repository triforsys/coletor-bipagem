import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://api-acs-kmc.triforsys.com.br',
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
  },
});
