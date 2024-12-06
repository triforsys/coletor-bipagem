import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { api } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import BipError from '../assets/notifications/erroBip.mp3'
import BipSuccess from '../assets/notifications/Papa-Leguas.mp3'
import Navbar from '@/components/layout/Navbar'
import { Card, leftSideIcons } from '@/components/layout/Card'
import { ButtonBack } from '@/components/layout/ButtonBack'
import { useLoadingToFetch } from '@/hook/useLoadingToFetch'

export default function Bipagem() {
  const params = useParams()
  const [searchParams] = useSearchParams()

  const ordemColeta = params.id
  const regiao = searchParams.get('regiao')
  const blocado = searchParams.get('blocado')
  const idColeta = searchParams.get('idColeta')

  const navigate = useNavigate()

  const barcodeRef = useRef()
  const releaseReadingRef = useRef()

  const goToHomepage = () => navigate('/coletas')

  const handleReleaseReading = () => {
    if (confirm('Deseja liberar a leitura?')) {
      barcodeRef.current.disabled = false
      releaseReadingRef.current.disabled = true
    }
  }

  const handleStop = async () => {
    let motivate = ''
    motivate = prompt('Informe o motivo da parada (30 caracteres)')

    if (!motivate || motivate.length < 10)
      motivate = prompt('Motivo precisa ter pelo menos 10 caracteres')

    if (!motivate || motivate.length < 10) return

    if (confirm('Deseja realmente parar?')) {
      try {
        const result = await motivateMutation.mutateAsync(motivate.slice(0, 30))
        if (result === true) goBack()
      } catch {
        toast.error('Erro ao adicionar motivo da parada')
      }
    }
  }

  const handleFinish = async () => {
    if (confirm('Deseja realmente FINALIZAR?')) finishMutation.mutate()
  }

  const handleExit = () => {
    const reallyExit = confirm('Deseja realmente sair?')

    if (reallyExit) {
      goToHomepage()
    }
  }

  const playAudio = async (type) => {
    const audio = new Audio(type === true ? BipSuccess : BipError)
    audio.play()
  }

  const bipError = async (msg) => {
    toast.error(msg || 'Erro ao validar código de barras.')
    await playAudio(false)
  }

  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['info', idColeta],
    queryFn: async () => {
      if (blocado)
        return await useLoadingToFetch(
          'Buscando dados...',
          `/bipagem/blocado/${ordemColeta}/${idColeta}/${regiao}`,
          'get',
        )

      return await useLoadingToFetch(
        'Buscando dados...',
        `/bipagem/remessa/${ordemColeta}`,
        'get',
      )
    },
  })

  const barcodeMutation = useMutation({
    mutationFn: async () => {
      const barcodeInput = barcodeRef.current
      if (!barcodeInput.value.length) return

      barcodeInput.disabled = true

      try {
        let result
        if (blocado)
          result = await api.post('/bipagem/blocado/codigo', {
            regiao,
            idColeta,
            ordemColeta: params.id,
            codigo: barcodeInput.value,
          })
        else
          result = await api.post('/bipagem/codigoDeBarras', {
            transporte: params.id,
            codigoDeBarras: barcodeInput.value,
          })
        if (result.data === true) {
          if (blocado) toast.success('Bipagem realizada com sucesso!')
          else toast.success('Código de barras validado com sucesso!')

          await playAudio(true)
          barcodeInput.disabled = false
        } else if (result.status === 200) {
          toast.warning(result.data.msg)
          await playAudio(true)
        }
        barcodeInput.value = ''
      } catch (error) {
        if (error.response && error.response.data.msg)
          await bipError(error.response.data.msg)
        else await bipError()
        releaseReadingRef.current.disabled = false
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(['info', idColeta], (prev) => ({
        ...prev,
        qtdLida: prev.qtdLida + 1,
      }))
    },
    mutationKey: ['barcode'],
  })

  const finishMutation = useMutation({
    mutationFn: async () => {
      try {
        if (blocado)
          await api.post('/bipagem/blocado/finalizar', {
            regiao,
            idColeta,
            ordemColeta: params.id,
          })
        else
          await api.post('/bipagem/finalizar', {
            idColeta,
          })

        goToHomepage()
      } catch (error) {
        toast.error('Erro ao finalizar bipagem')
      }
    },
    mutationKey: ['finish'],
  })

  const motivateMutation = useMutation({
    mutationFn: async (motivo) =>
      await api
        .post('/bipagem/set/motivo/coleta', {
          transporte: params.id,
          motivo,
        })
        .then((response) => response.data),
  })

  useEffect(() => {
    releaseReadingRef.current.disabled = true

    barcodeRef.current.focus()
  }, [])

  return (
    <Navbar>
      <div className="flex justify-center gap-2 mt-4 font-poppins">
        <div className="flex flex-wrap min-w-[360px] justify-center xl:justify-normal p-4 gap-4">
          <div className="w-full flex justify-center relative mb-4 items-center">
            <ButtonBack />
            <div className="flex justify-center">
              <h1 className="text-xl text-neutral-500">
                Relatório de coleta
              </h1>
            </div>
          </div>
          <Card leftSideIcon={leftSideIcons('box')}>
            <p className="font-bold">
              Transporte: {blocado ? data?.ordemColeta : data?.Transporte}
            </p>
            <p className="text-ellipsis overflow-hidden">
              Campanha: {data?.Campanha}
            </p>
            <p className="text-ellipsis overflow-hidden">
              Região: {blocado ? data?.regiao : data?.Regiao}
            </p>
            <div className="flex gap-3">
              <p className="text-ellipsis overflow-hidden">
                Peso: {data?.Peso}
              </p>
              <p className="text-ellipsis overflow-hidden">M3: {data?.M3}</p>
            </div>
            <p>Caixas: {data?.TotalCaixas}</p>
          </Card>
          <div className="border border-tangaroa-300 bg-white rounded-md w-full h-10 text-center justify-center flex flex-col">
            {data && Number(data?.qtdLida)}
          </div>
          <Input
            ref={barcodeRef}
            onChange={barcodeMutation.mutate}
            className="text my-10 h-16 bg-white"
            placeholder="Código de barras"
          />
          <div className="w-full text-center flex justify-center border-t-[1px] border-t-black pt-2">
            <div className="w-full  flex flex-col lg:flex-row gap-2">
              <Button
                className="w-full rounded-md bg-tangaroa-400 hover:bg-tangaroa-300"
                onClick={handleReleaseReading}
                ref={releaseReadingRef}
              >
                LIBERAR LEITURA
              </Button>
              <Button className="w-full button rounded-md" onClick={handleStop}>
                PARAR
              </Button>
              <Button
                className="w-full rounded-md bg-red-500 hover:bg-red-400"
                onClick={handleFinish}
              >
                FINALIZAR
              </Button>
              <Button
                className="w-full rounded-md bg-black hover:bg-gray-900"
                onClick={handleExit}
              >
                SAIR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
