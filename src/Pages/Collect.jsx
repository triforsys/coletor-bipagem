import React, { useEffect, useRef, useState } from 'react'
import { BoxIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Toggle from '@/components/utils/Toggle'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

export default function Collect() {
  const navigate = useNavigate()
  const goBack = () => navigate(-1)

  const collectId = window.location.pathname.split('/')[2]

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['list'],
    queryFn: async () => {
      const query = await api
        .get(`/bipagem/transportes/${collectId}`)
        .then((response) => response.data)
      setList(query)
      return query
    },
    initialData: [],
  })

  const [list, setList] = useState([])

  const redirectToTransportPage = (report) =>
    navigate(
      `/transporte/?tranporte&id=${report.Transporte}&campanha=${String(report.Campanha).replaceAll('&', '%26')}&regiao=${report.Regiao}&peso=${report.Peso}&m3=${report.M3}&caixas=${report.TotalCaixas}`,
    )

  const CardReport = ({ children: report }) => {
    return (
      <div className="flex rounded-2xl card-shadow min-w-[370px] max-w-[370px] text-ellipsis overflow-hidden pr-1 sm:w-96 h-[180px] gap-2">
        <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
          <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />
          <Button
            className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
            onClick={() => redirectToTransportPage(report)}
          >
            Iniciar
          </Button>
        </div>
        <div className="flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Transporte: {report.Transporte}</p>
          <p className="text-ellipsis overflow-hidden">
            Campanha: {report.Campanha}
          </p>
          <p className="text-ellipsis overflow-hidden">
            Região: {report.Regiao}
          </p>
          <div className="flex gap-3">
            <p className="text-ellipsis overflow-hidden">Peso: {report.Peso}</p>
            <p className="text-ellipsis overflow-hidden">M3: {report.M3}</p>
          </div>
          <p>Caixas: {report.TotalCaixas}</p>
        </div>
      </div>
    )
  }

  const transportRef = useRef()

  const filter = (e) => {
    e.preventDefault()
    const transportValue = transportRef.current.value

    if (transportValue.length < 5) setList(data)
    else
      setList(
        data.filter((item) =>
          String(item.Transporte).startsWith(transportValue),
        ),
      )
  }

  return (
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
              <h1 className="text-2xl text-neutral-500">Coleta: {collectId}</h1>
            </div>
          </div>
          <Toggle>
            <form className="flex flex-col gap-2" onSubmit={filter}>
              <div className="flex flex-wrap items-end gap-4">
                <div className=" w-full md:w-2/5">
                  <label htmlFor="input-charge" className="text-white gap-1">
                    Transporte
                  </label>
                  <Input
                    minLength={5}
                    id="input-charge"
                    ref={transportRef}
                    className="bg-white"
                  />
                </div>
                <div className="flex mt-4 w-full md:w-1/6 ml-auto">
                  <Button className="w-full h-10 bg-tangaroa-400 hover:bg-tangaroa-300">
                    Filtrar
                  </Button>
                </div>
              </div>
            </form>
          </Toggle>
        </div>

        {isFetched && !list.length ? (
          <div className='flex justify-center mt-4 text-2xl w-full'>Nenhum resultado encontrado</div>
        ) : (
          list.map((report) => (
            <CardReport key={report.Transporte}>{report}</CardReport>
          ))
        )}
      </div>
    </div>
  )
}
