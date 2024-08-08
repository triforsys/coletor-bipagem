import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Region() {
  const navigate = useNavigate()
  const { ordemColeta, idColeta } = useParams()
  return (
    <>
      <Navbar>
        <div className="flex justify-center gap-2 mt-4 font-poppins">
          <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4 w-full xl:max-w-screen-xl"></div>
        </div>
      </Navbar>
    </>
  )
}
