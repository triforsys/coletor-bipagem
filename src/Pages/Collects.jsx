import React, { Suspense, useEffect, useRef, useState } from 'react'
import { TruckIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import Toggle from '@/components/utils/Toggle'
import { Input } from '@/components/ui/input'

export default function Collects() {
  const navigate = useNavigate()
  const coletaRef = useRef()
  // const [isLoading, setIsLoading] = useState(false)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['list'],
    queryFn: async () => {
      const query = await api
        .post('/bipagem/coletas', { coleta: coletaRef.current.value })
        .then((response) => response.data)
      return query
    },
    initialData: [],
  })

  // const reportListFiltered = data.filter(
  //   (report) => report.statusColeta !== 'acionada',
  // )

  const redirectToCollectPage = (collect) => navigate(`/coleta/${collect}`)
  const redirectToTransportPage = (report) =>
    navigate(
      `/transporte/?tranporte&id=${report.Coleta}&campanha=${String(report.campaign).replaceAll('&', '%26')}&regiao=${report.region}&peso=${report.weight}&m3=${report.m3}&caixas=${report.boxes}`,
    )

  const getButtonType = (report) => {
    // if (report.readVolumes > 0) return 'progress' // TODO: GET QTD VOLUMES
    if (report.invoiced) return 'released'
    // TODO: check finished status
  }

  const CardReport = ({ children: report }) => {
    const buttonType = getButtonType(report)

    return (
      <div className="flex rounded-2xl card-shadow min-w-[370px] sm:w-96 h-[250px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
          <TruckIcon className="w-[78px] h-[75px] text-tangaroa-100" />
          {/* {buttonType === 'released' ? (
            <Button
              className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
              onClick={() => redirectToCollectPage(report.collect)}
            >
              Iniciar
            </Button>
          ) : (
            <Button
              className="rounded-[10px] w-20 h-6 text-xs disabled:bg-tangaroa-100 disabled:text-tangaroa-950"
              disabled
            >
              Em progresso
            </Button>
          )} */}
        </div>
        <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Coleta: {report.Coleta}</p>
          <p>Agenda: {new Date(report.Agenda).toLocaleString()}</p>
          <p>Transportadora: {report.Transportadora}</p>
          <p>Tipo Veículo: {report.Veiculo}</p>
          <p>Placa Veículo: {report.Placa}</p>
          <p>Motorista: {report.Motorista}</p>
          <p>Doca: {report.Doca}</p>
          {/* {buttonType === 'released' ? ( */}
          <div className="flex gap-2">
            <Button
              // disabled={!report.transportList.length}
              onClick={() => redirectToCollectPage(report.Coleta)}
              className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
            >
              Remessa
            </Button>
            <Button
              disabled
              onClick={() => redirectToTransportPage(report)}
              className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
            >
              Blocado
            </Button>
          </div>
          {/* ) : (
            <div className="flex justify-center">
              <Button disabled className="size-28 h-10 bg-tangaroa-500">
                Em progresso
              </Button>
            </div>
          )} */}
        </div>
      </div>
    )
  }

  const CardSkeleton = () => {
    return (
      <div className="flex rounded-2xl card-shadow min-w-[370px] sm:w-96 h-[250px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
          <TruckIcon className="w-[78px] h-[75px] text-tangaroa-100" />
        </div>
        <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
          <Skeleton className="h-5 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <Skeleton className="h-4 w-[220px]" />
          <div className="flex gap-2">
            <Skeleton>
              <Button
                disabled
                className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
              />
            </Skeleton>
            <Skeleton>
              <Button
                disabled
                className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
              />
            </Skeleton>
          </div>
        </div>
      </div>
    )
  }

  const handleFilter = (e) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4 w-full xl:max-w-screen-xl">
        <div className="w-[370px] md:w-full">
          <Toggle>
            <form className="flex flex-col gap-2" onSubmit={handleFilter}>
              <div className="flex flex-wrap items-end gap-4">
                <div className="w-full md:w-2/5">
                  <label htmlFor="input-charge" className="text-white gap-1">
                    Coleta
                  </label>
                  <Input
                    id="input-charge"
                    ref={coletaRef}
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
        {isLoading
          ? [0, 1].map((item) => <CardSkeleton key={item} />)
          : data.map((report, index) => (
              <CardReport key={report.Coleta + index}>{report}</CardReport>
            ))}
      </div>
    </div>
  )
}
