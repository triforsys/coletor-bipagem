import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BoxIcon, ChevronLeftIcon } from 'lucide-react'

import { api } from '@/lib/api'
import { Input } from '@/components/ui/input'
import Toggle from '@/components/utils/Toggle'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'
import { Card, leftSideIcons } from '@/components/layout/Card'

export default function CollectBlocked() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  const [params, setParams] = useSearchParams()
  const regiao = params.get('regiao')

  const collect = useParams()
  console.log()
  // const collectId = window.location.pathname.split('/')[3]

  // const { data, isFetched } = useQuery({
  //   queryKey: ['list'],
  //   queryFn: async () => {
  //     const query = await api
  //       .get(`/bipagem/transportes/${collectId}`)
  //       .then((response) => response.data)
  //     setList(query)
  //     return query
  //   },
  //   initialData: [],
  // })

  // const [list, setList] = useState([])

  const redirectToTransportPage = (report) =>
    navigate(
      `/transporte/blocado/?tranporte&id=${report.Transporte}&campanha=${String(report.Campanha).replaceAll('&', '%26')}&regiao=${report.Regiao}&peso=${report.Peso}&m3=${report.M3}&caixas=${report.TotalCaixas}`,
    )

  return (
    <Navbar>
      <div className="flex justify-center gap-2 mt-4 font-poppins">
        <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4 w-full xl:max-w-screen-xl">
          <div className="w-[370px] md:w-full">
            <div className="w-full flex justify-center relative mb-6 items-center">
              <div className="left-0 absolute">
                <Button
                  onClick={goBack}
                  className="bg-tangaroa-400 hover:bg-tangaroa-300 h-10 w-14"
                >
                  <ChevronLeftIcon />
                </Button>
              </div>
              <div className="flex justify-center">
                <h1 className="text-2xl text-neutral-500">
                  Coleta: {collect.id}
                </h1>
              </div>
            </div>
          </div>

          {regiao && regiao.split('_').map((report) => (
            <Card
              leftSideIcon={leftSideIcons('box')}
              key={report.Transporte}
              classNameCard="sm:w-[250px] h-[120px]"
              leftSideChildren={
                <Button
                  className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
                  onClick={() => redirectToTransportPage(report)}
                >
                  Iniciar
                </Button>
              }
            >
              <p className="font-bold">
                Transporte: {Number(transporte)}
              </p>
              <p className="text-ellipsis overflow-hidden">
                Região: {report.Regiao}
              </p>
              <div></div>
              <div></div>
            </Card>
          ))}
        </div>
      </div>
    </Navbar>
  )
}
