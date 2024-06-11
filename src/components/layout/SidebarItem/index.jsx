import React, { useState } from 'react';
import { userDecode } from '../../../lib/jwtDecode';

export default function SidebarItem() {
  const [user, setUser] = useState(userDecode());
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="avatar rounded-full min-h-10 min-w-10 bg-blue-500 text-white font-[700] flex items-center justify-center">
        <p className="uppercase">{user.login.charAt(0)}</p>
      </div>
      <div className="grow">
        <p className="text-[16px] font-bold text-zinc-50">{user.login}</p>
        <p className="text-[12px] text-neutral-500">{user.email}</p>
      </div>
    </div>
  );
}
