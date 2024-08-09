import { ButtonBack } from '@/components/layout/ButtonBack'
import { Card } from '@/components/layout/Card'
import Navbar from '@/components/layout/Navbar'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Region() {
  const navigate = useNavigate()
  const { ordemColeta, idColeta } = useParams()

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['list'],
    queryFn: async () => {
      const query = await useLoadingToFetch(
        'Buscando dados...',
        '/bipagem/coletas',
        'post',
        { coleta: coletaRef.current.value },
      )
      return query
    },
    initialData: [],
  })

  return (
    <>
      <Navbar>
        <div className="flex justify-center gap-2 mt-4 font-poppins">
          <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4 w-full xl:max-w-screen-xl">
            <div className="w-full flex justify-center relative mb-6 items-center">
              <ButtonBack />
              <div className="flex justify-center">
                <h1 className="text-2xl text-neutral-500">
                  Coleta: {ordemColeta}
                </h1>
              </div>
            </div>
            <Card></Card>
          </div>
        </div>
      </Navbar>
    </>
  )
}
