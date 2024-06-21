import { useState, useContext, useEffect } from 'react';

import packageJson from '../../package.json';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Company from '../assets/kmc.png';

export default function Login() {
  const { version } = packageJson;
  const { signIn, signed } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ login, password });
      if (signed || response) {
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('@Auth:token')) {
      navigate('/home');
    }
  }, []);
  return (
    <div className="h-screen w-screen flex items-center bg-slate-50 justify-center xl:min-h-screen font-poppins">
      <div className="flex items-center justify-center">
        <div className="mx-auto w-[350px] sm:w-[36rem] space-y-6">
          <div className="flex">
            <h1 className="mx-auto text-2xl text-neutral-500">Sistema de bipagem coletor</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              id="email"
              value={login}
              onChange={(e) => setLogin(e.target.value.trim())}
              placeholder="Digite seu e-mail"
              type="text"
            />
            <div className="relative">
              <Input
                className="pr-10"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                type={!showPassword ? 'password' : 'text'}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 "
              >
                {!showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                )}
              </span>
            </div>
            <div>
              <Button
                className="w-full bg-[#1A120B] rounded-none"
                type="submit"
              >
                ENTRAR
              </Button>
            </div>
          </form>
          <div className="flex items-center justify-center space-x-2 text-zinc-900">
            Feito com <span className="text-red-500 mx-1">❤</span> Triforsys
            Versão: {version}
          </div>
        </div>
      </div>
    </div>
  );
}
