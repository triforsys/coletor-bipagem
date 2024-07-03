import React, { Suspense, useEffect, useState } from 'react'
import { TruckIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'

export default function Collects() {
  const navigate = useNavigate()
  const [reportList, setReportList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getCollectList = async () => {
    setIsLoading(true)
    const response = await api.post('bipagem/coletas', {})
    const collectList = response.data
    setIsLoading(false)
    setReportList(collectList)
  }

  useEffect(() => {
    getCollectList()
  }, [])

  // const reportList = [
  //   {
  //     collect: 1234,
  //     calendar: '2024-06-12 06:00',
  //     transporter: 'TAFF',
  //     vehicle: 'Carreta',
  //     plate: 'ABC-1234',
  //     dock: '24',
  //     driverName: 'Rafael Silva',
  //     statusColeta: 'acionada',
  //     invoiced: 0,
  //     readVolumes: 1,
  //   },
  //   {
  //     collect: 198173,
  //     calendar: '2024-06-13 06:00',
  //     transporter: 'TAFF',
  //     vehicle: 'CARRETA',
  //     plate: '',
  //     dock: '25',
  //     driverName: '',
  //     statusColeta: '',
  //     invoiced: 0,
  //     readVolumes: 1,
  //     transportList: [],
  //   },
  //   {
  //     collect: 198174,
  //     calendar: '2024-06-14 06:00',
  //     transporter: 'TAFF',
  //     vehicle: 'TRUCK',
  //     plate: '',
  //     dock: '26',
  //     driverName: '',
  //     statusColeta: '',
  //     invoiced: 1,
  //     readVolumes: 0,
  //     transportList: [
  //       {
  //         transport: 198174,
  //         campaign: 'LINHA',
  //         region: 'BA',
  //         boxes: 2024,
  //         weight: 13061.02,
  //         m3: 14.41,
  //       },
  //       {
  //         transport: 198179,
  //         campaign: 'M&N_BISC_BYTES_MONT_SJ',
  //         region: 'BA',
  //         boxes: 980,
  //         weight: 13061.02,
  //         m3: 14.41,
  //       },
  //     ],
  //   },
  // ]

  const reportListFiltered = reportList.filter(
    (report) => report.statusColeta !== 'acionada',
  )

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
              // disabled={report.transportList.length}
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

  return (
    <div className="flex justify-cen ter gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4">
        {isLoading
          ? [0, 1].map((item) => <CardSkeleton key={item} />)
          : reportList.map((report, index) => (
              <CardReport key={report.Coleta + index}>{report}</CardReport>
            ))}
      </div>
    </div>
  )
}
