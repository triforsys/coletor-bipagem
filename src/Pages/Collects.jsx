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
import { toast } from 'sonner'

export default function Collects() {
  const navigate = useNavigate()

  const coletaRef = useRef()

  const [openDrawer, setOpenDrawer] = useState(false)
  const [collectionOrder, setCollectionOrder] = useState('')
  const [region, setRegion] = useState('')
  const [idCollection, setIdCollection] = useState('')
  const [hasRegion, setHasRegion] = useState(false)

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

  const redirectToCollectPage = (collect) => navigate(`/coleta/${collect}`)

  const handleNavigateRegion = async (collectionOrder, idCollection) => {
    navigate(`/regiao/${collectionOrder}/${idCollection}`)
  }
  const toggleDrawer = async () => {
    setOpenDrawer(false)
    setCollectionOrder('')
    setRegion('')
    setIdCollection('')
    setHasRegion(false)
  }

  const handleClick = async (ordemColeta, regiaodb, idColeta, idRegiaoBloc) => {
    setCollectionOrder(ordemColeta)
    setRegion(regiaodb)
    setIdCollection(idColeta)
    if (idRegiaoBloc === null) {
      setOpenDrawer(true)
      setHasRegion(true)
    } else {
      handleNavigateRegion(ordemColeta, idColeta)
    }
  }

  const mutationRegion = useMutation({
    mutationFn: async () =>
      useLoadingToFetch(
        'Inserindo dados da região.',
        '/bipagem/set/regiao/blocado',
        'post',
        {
          ordemColeta: collectionOrder,
          regiao: region,
          idColeta: idCollection,
        },
      ),
    mutationKey: ['saveDataRegionOnCollection'],
    onSuccess: async () => {
      handleNavigateRegion(collectionOrder, idCollection)
      toggleDrawer()
      refetch()
    },
  })
  const handleSaveRegion = async () => {
    setOpenDrawer(false)
    mutationRegion.mutateAsync()
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
                <p>Região: {report.regiao}</p>
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
                      handleClick(
                        report.Coleta,
                        report.regiao,
                        report.idColeta,
                        report.idRegiaoBloc,
                      )
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
          handleSave={handleSaveRegion}
        ></DrawerUtils>
      </div>
    </Navbar>
  )
}
