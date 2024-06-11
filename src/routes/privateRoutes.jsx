import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { signed } = useContext(AuthContext);
  return signed ? children : <Navigate to="/" />;
};
