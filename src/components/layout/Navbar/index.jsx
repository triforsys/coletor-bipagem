import React, { useContext } from 'react'

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/AuthContext'

export default function Navbar({ children }) {
  const { singOut } = useContext(AuthContext)
  const handleLogout = async () => {
    await singOut()
  }

  return (
    <>
      <div className="max-w-full flex justify-between gap-4 p-4 border-b shadow-2xl bg-white">
        <div></div>
        <div className="flex items-center justify-end">
          <Button onClick={handleLogout} variant="link">
            Logout
          </Button>
        </div>
      </div>
      <div className="p-4 bg-slate-50 overflow-hidden">{children}</div>
    </>
  )
}
