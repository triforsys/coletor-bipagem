import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Region() {
  const navigate = useNavigate()
  const { ordemColeta, idColeta } = useParams()
  return (
    <>
      <Navbar></Navbar>
    </>
  )
}
