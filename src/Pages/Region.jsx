import { ButtonBack } from '@/components/layout/ButtonBack'
import { Card, leftSideIcons } from '@/components/layout/Card'
import Navbar from '@/components/layout/Navbar'
import { Button } from '@/components/ui/button'
import { useLoadingToFetch } from '@/hook/useLoadingToFetch'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Region() {
  const navigate = useNavigate()
  const { ordemColeta, idColeta } = useParams()

  const { data, isLoading, isFetched, refetch } = useQuery({
    queryKey: ['list', ordemColeta, idColeta],
    queryFn: async () =>
      await useLoadingToFetch(
        'Buscando dados...',
        `/bipagem/lista/regiao/${ordemColeta}/${idColeta}`,
        'get',
      ),
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
            {data.map((item) => (
              <Card leftSideIcon={leftSideIcons('box')} leftSideChildren={<Button></Button>} key={item.idRegiaoBloc} classNameCard="h-[130px]">
                <p className="font-bold">Região: {item.regiao}</p>
              </Card>
            ))}
          </div>
        </div>
      </Navbar>
    </>
  )
}
