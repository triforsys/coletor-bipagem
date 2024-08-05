import React, { useEffect, useRef, useState } from 'react'
import { BoxIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Toggle from '@/components/utils/Toggle'
import { Input } from '@/components/ui/input'

const reportList = [
  {
    transport: 198174,
    campaign: 'LINHA',
    region: 'BA',
    boxes: 2024,
    weight: 13061.02,
    m3: 14.41,
  },
  {
    transport: 198179,
    campaign: 'M&N_BISC_BYTES_MONT_SJ',
    region: 'BA',
    boxes: 980,
    weight: 13061.02,
    m3: 14.41,
  },
]

export default function Collect() {
  const navigate = useNavigate()
  const [filteredList, setFilteredList] = useState([])

  const goBack = () => navigate(-1)

  useEffect(() => {
    setFilteredList(reportList)
  }, [])

  const redirectToTransportPage = (report) =>
    navigate(
      `/transporte/?tranporte&id=${report.transport}&campanha=${String(report.campaign).replaceAll('&', '%26')}&regiao=${report.region}&peso=${report.weight}&m3=${report.m3}&caixas=${report.boxes}`,
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
          <p className="font-bold">Transporte: {report.transport}</p>
          <p className="text-ellipsis overflow-hidden">
            Campanha: {report.campaign}
          </p>
          <p className="text-ellipsis overflow-hidden">
            Região: {report.region}
          </p>
          <div className="flex gap-3">
            <p className="text-ellipsis overflow-hidden">
              Peso: {report.weight}
            </p>
            <p className="text-ellipsis overflow-hidden">M3: {report.m3}</p>
          </div>
          <p>Caixas: {report.boxes}</p>
        </div>
      </div>
    )
  }

  const transportRef = useRef()

  const filter = (e) => {
    e.preventDefault()
    const transportValue = transportRef.current.value

    if (transportValue.length < 5) setFilteredList(reportList)
    else
      setFilteredList(
        reportList.filter((item) =>
          String(item.transport).startsWith(transportValue),
        ),
      )
  }

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4">
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
                Coleta: {window.location.pathname.split('/')[2]}
              </h1>
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
        {filteredList.map((report) => (
          <CardReport key={report.transport}>{report}</CardReport>
        ))}
      </div>
    </div>
  )
}
