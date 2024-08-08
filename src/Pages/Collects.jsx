import React, { useRef, useState } from 'react'
import { TruckIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import { useLoadingToFetch } from '@/hook/useLoadingToFetch'
import { Input } from '@/components/ui/input'
import Toggle from '@/components/utils/Toggle'
import { Skeleton } from '@/components/ui/skeleton'
import Navbar from '@/components/layout/Navbar'
import DrawerUtils from '@/components/utils/Drawer'
import dayjs from 'dayjs'
import { Card, leftSideIcons } from '@/components/layout/Card'
import { CardSkeleton } from '@/components/layout/CardSkeleton'

export default function Collects() {
  const navigate = useNavigate()

  const coletaRef = useRef()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [collectionOrder, setCollectionOrder] = useState('')
  const [region, setRegion] = useState('')
  const [idCollection, setIdCollection] = useState('')

  const { data, isLoading, isFetched, refetch } = useQuery({
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
  const toggleDrawer = async () => {
    setOpenDrawer(false)
    setCollectionOrder('')
    setRegion('')
    setIdCollection('')
  }

  const handleClick = async (ordemColeta, regiao, idColeta) => {
    setOpenDrawer(true)
    setCollectionOrder(ordemColeta)
    setRegion(regiao)
    setIdCollection(idColeta)
  }

  const mutationRegion = useMutation({
    mutationFn: async () =>
      useLoadingToFetch(
        'Inserindo dados da região.',
        '/bipagem/set/regiao/blocado',
        'post',
        {
          ordemColeta: collectionOrder,
          region: region,
          idColeta: idCollection,
        },
      ),
  })
  const handleSaveRegion = async () => {}

  const CardReport = ({ children: report }) => {
    const buttonType = getButtonType(report)

    return (
      <div className="flex rounded-2xl card-shadow min-w-[370px] sm:w-96 h-[250px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
          <TruckIcon className="w-[78px] h-[75px] text-tangaroa-100" />
        </div>
        <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">
            Coleta: {report.Coleta} / {report.transporte}
          </p>
          <p>Agenda: {dayjs(report.Agenda).format('DD/MM/YYYY HH:mm')}</p>
          <p>Transportadora: {report.Transportadora}</p>
          <p>Tipo Veículo: {report.Veiculo}</p>
          <p>Placa Veículo: {report.Placa}</p>
          <p>Motorista: {report.Motorista}</p>
          <p>Doca: {report.Doca}</p>
          <p>Região: {report.regiao}</p>
          <div className="flex gap-2 my-2">
            <Button
              disabled={report.qtdNotas === 0}
              onClick={() => redirectToCollectPage(report.Coleta)}
              className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
            >
              Remessa
            </Button>
            <Button
              disabled={report.qtdNotas > 0}
              onClick={() =>
                handleClick(report.Coleta, report.regiao, report.idColeta)
              }
              className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
            >
              Blocado
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleFilter = (e) => {
    e.preventDefault()
    const coleta = coletaRef.current.value
    if (coleta.length === 0 || coleta.length >= 5) refetch()
  }

  return (
    <Navbar>
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
                      minLength={5}
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
          {isLoading ? (
            [0, 1].map((item) => <CardSkeleton key={item} />)
          ) : isFetched && !data.length ? (
            <div className="flex justify-center mt-4 text-2xl w-full">
              Nenhum resultado encontrado
            </div>
          ) : (
            data.map((report, index) => (
              <Card
                key={report.Coleta + index}
                leftSideIcon={leftSideIcons('truck')}
                classNameCard="h-[250px] sm:w-96"
              >
                <p className="font-bold">
                  Coleta: {report.Coleta} / {report.transporte}
                </p>
                <p>Agenda: {dayjs(report.Agenda).format('DD/MM/YYYY HH:mm')}</p>
                <p>Transportadora: {report.Transportadora}</p>
                <p>Tipo Veículo: {report.Veiculo}</p>
                <p>Placa Veículo: {report.Placa}</p>
                <p>Motorista: {report.Motorista}</p>
                <p>Doca: {report.Doca}</p>
                <div className="flex gap-2">
                  <Button
                    disabled={report.qtdNotas === 0}
                    onClick={() => redirectToCollectPage(report.Coleta)}
                    className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
                  >
                    Remessa
                  </Button>
                  <Button
                    disabled={report.qtdNotas > 0}
                    onClick={() =>
                      handleClick(report.Coleta, report.regiao, report.idColeta)
                    }
                    className="size-24 h-10 bg-tangaroa-500 hover:bg-tangaroa-400"
                  >
                    Blocado
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
        <DrawerUtils
          drawerOpen={openDrawer}
          drawerClose={() => setOpenDrawer(!openDrawer)}
          onOpenChange={setOpenDrawer}
          title="Deseja realizar a bipagem blocada?"
          textButtonConfirm="Confirmar"
        ></DrawerUtils>
      </div>
    </Navbar>
  )
}
