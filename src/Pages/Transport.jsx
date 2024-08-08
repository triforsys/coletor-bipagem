import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'

import { api } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import BipError from '../assets/notifications/erroBip.mp3'
import BipSuccess from '../assets/notifications/Papa-Leguas.mp3'
import Navbar from '@/components/layout/Navbar'
import { Card, leftSideIcons } from '@/components/layout/Card'
import { ButtonBack } from '@/components/layout/ButtonBack'

export default function Report() {
  const url = new URLSearchParams(document.location.href)
  const params = {}
  const getParam = (key) => {
    params[key] = url.get(key)
  }

  const urlKeys = ['id', 'campanha', 'regiao', 'peso', 'm3', 'caixas']
  urlKeys.map(getParam)

  const navigate = useNavigate()

  const barcodeRef = useRef()
  const releaseReadingRef = useRef()

  const [quantityBip, setQuantityBip] = useState(0)

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

  const handleFinish = () => {
    if (confirm('Deseja realmente FINALIZAR?')) goToHomepage()
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

  const barcodeMutation = useMutation({
    mutationFn: async () => {
      const barcodeInput = barcodeRef.current
      if (!barcodeInput.value.length) return

      barcodeInput.disabled = true

      try {
        const result = await api.post('/bipagem/codigoDeBarras', {
          transporte: params.id,
          codigoDeBarras: barcodeInput.value,
        })

        if (result.data === true) {
          toast.success('Código de barras validado com sucesso!')
          setQuantityBip(quantityBip + 1)
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
    mutationKey: ['barcode'],
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
        <div className="flex flex-wrap justify-center xl:justify-normal p-4 gap-4">
          <div className="w-full flex justify-center relative mb-4 items-center">
            <ButtonBack />
            <div className="flex justify-center">
              <h1 className="text-xl text-neutral-500">
                Relatório de carregamento
              </h1>
            </div>
          </div>
          <Card leftSideIcon={leftSideIcons('box')}>
            <p className="font-bold">Transporte: {Number(params.id)}</p>
            <p className="text-ellipsis overflow-hidden">
              Campanha: {params.campanha}
            </p>
            <p className="text-ellipsis overflow-hidden">
              Região: {params.regiao}
            </p>
            <div className="flex gap-3">
              <p className="text-ellipsis overflow-hidden">
                Peso: {params.peso}
              </p>
              <p className="text-ellipsis overflow-hidden">M3: {params.m3}</p>
            </div>
            <p>Caixas: {params.caixas}</p>
          </Card>
          <div className="border border-tangaroa-300 rounded-md w-full h-10 text-center justify-center flex flex-col">
            {quantityBip}
          </div>
          <Input
            ref={barcodeRef}
            onChange={barcodeMutation.mutate}
            className="text my-10 h-16"
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
