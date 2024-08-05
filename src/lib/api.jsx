import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:3333/',
  baseURL: 'https://api-bipagem.triforsys.com.br',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
  },
});
