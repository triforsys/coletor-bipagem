import { createContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner'; // import { setCookie, destroyCookie } from 'nookies'

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
      const response = await api.post('/login', { login, password });
      if (response?.data?.msg === 'Senha inválida!' || response?.data === '') {
        // alert('Senha inválida!', response?.data);
        toast.error('Login ou senha inválidos!');
        return false;
      } else {
        setUser(response.data);
        api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
        localStorage.setItem('@Auth:token', response.data.token);
        return true;
      }
    } catch (error) {
      console.log('DEU RUIM LOGIN', error);
      toast.error('Erro ao logar contate o administrador!');
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
