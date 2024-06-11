import { jwtDecode } from 'jwt-decode';
export function userDecode() {
  const token = localStorage.getItem('@Auth:token');
  if (!token) {
    throw new Error('Unauthenticated');
  }
  const user = jwtDecode(token);
  return user;
}
