import React, { useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import Menu from '@/components/layout/Menu';
export default function Home() {
  const [user, setUser] = useState(userDecode());
  const test = () => {
    console.log('teste');
  };
  return (
    <>
      <Menu>
        <h1 className="font-poppins">Bem vindo {user.login}!</h1>
      </Menu>
    </>
  );
}
