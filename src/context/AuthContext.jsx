import { createContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner'; // import { setCookie, destroyCookie } from 'nookies'
import { useLoadingToFetchLogin } from '@/hook/useLoadingToFetch';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('@Auth:token') || null);

  const loadingStoreData = async () => {
    const storageToken = localStorage.getItem('@Auth:token');
    if (storageToken) {
      setUser(storageToken);
    }
  };
  const load = async () => {
    await loadingStoreData();
  };
  useEffect(() => {
    load();
  }, []);

  const signIn = async ({ login, password }) => {
    try {
      const response = await useLoadingToFetchLogin(
        'Buscando usuário...',
        '/login',
        'post',
        { login, password },
      );
      if (response === false) {
        return false;
      } else {
        setUser(response);
        api.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${response.token}`;
          return config;
        });
        localStorage.setItem('@Auth:token', response.token);
        return true;
      }
    } catch (error) {
      console.log('DEU RUIM LOGIN', error);
      // toast.error('Erro ao logar contate o administrador!');
      return false;
    }
  };

  const singOut = () => {
    localStorage.clear();
    setUser(null);
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        singOut,
        signed: user === null ? false : true,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
