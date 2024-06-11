import { useState, useContext, useEffect } from 'react';

import packageJson from '../../package.json';
import { Label } from '@/components/ui/label';
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
    <div className="h-screen w-screen gap-10 lg:grid  lg:grid-cols-2 lg:gap-0  xl:min-h-screen bg-blue-900 font-poppins">
      <div className="items-center justify-center  lg:bg-gray-100 ">
        <span className=" grid  gap-3  sm:hidden lg:block">
          <img
            alt="Company"
            className=" object-fill w-screen h-screen"
            src={Company}
          />
        </span>
      </div>
      <div className="flex items-center justify-center p-6 xl:p-10">
        <div className="mx-auto w-[36rem] space-y-6 font-poppins">
          <div className="space-y-2 text-center flex flex-col">
            <h1 className="text-3xl font-bold text-white">Login</h1>
            <span className="uppercase text-sm text-neutral-500">
              acs web KMC
            </span>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white" htmlFor="email">
                Usuário
              </Label>
              <Input
                id="email"
                value={login}
                onChange={(e) => setLogin(e.target.value.trim())}
                placeholder="Usuário"
                type="text"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white" htmlFor="password">
                Senha
              </Label>
              <div className="relative">
                <Input
                  className="pr-10"
                  id="password"
                  placeholder="Senha"
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
            </div>

            <Button className="w-full" type="submit">
              Login
            </Button>
          </form>
          <div className="flex items-center justify-center space-x-2 text-white">
            Feito com ❤ Triforsys Versão: {version}
          </div>
        </div>
      </div>
    </div>
  );
}
