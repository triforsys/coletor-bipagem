import { toast } from 'sonner'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { BoxIcon, ChevronLeftIcon } from 'lucide-react'

import { api } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import BipError from '../assets/notifications/erroBip.mp3'
import BipSuccess from '../assets/notifications/Papa-Leguas.mp3'

const CardReport = ({ data }) => (
  <div className="flex rounded-2xl card-shadow min-w-[370px] w-full text-ellipsis overflow-hidden pr-1 h-[180px] gap-2">
    <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
      <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />
    </div>
    <div className="flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px]">
      <p className="font-bold">Transporte: {Number(data.id)}</p>
      <p className="text-ellipsis overflow-hidden">Campanha: {data.campanha}</p>
      <p className="text-ellipsis overflow-hidden">Região: {data.regiao}</p>
      <div className="flex gap-3">
        <p className="text-ellipsis overflow-hidden">Peso: {data.peso}</p>
        <p className="text-ellipsis overflow-hidden">M3: {data.m3}</p>
      </div>
      <p>Caixas: {data.caixas}</p>
    </div>
  </div>
)

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

  const goBack = () => navigate(-1)
  const goToHomepage = () => navigate('/coletas')

  const handleReleaseReading = () => {
    if (confirm('Deseja liberar a leitura?')) {
      barcodeRef.current.disabled = false
      releaseReadingRef.current.disabled = true
    }
  }

  const handleStop = async () => {
    const stopMotivate = prompt(
      'Informe o motivo da parada (30 caracteres)',
    ).slice(0, 30)

    if (stopMotivate.length < 10)
      prompt('Motivo precisa ter pelo menos 10 caracteres')

    if (confirm('Deseja realmente parar?')) {
      try {
        const result = await motivateMutation.mutateAsync(stopMotivate)
        console.log(result)
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
        } else if (result.status === 200) {
          toast.warning(result.data.msg)
          await playAudio(true)
          return
        }

        barcodeInput.disabled = false
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
      await api.post('/bipagem/set/motivo/coleta', {
        transporte: params.id,
        motivo,
      }).then((response) => response.data),
  })

  useEffect(() => {
    releaseReadingRef.current.disabled = true

    barcodeRef.current.focus()
  }, [])

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center xl:justify-normal p-4 gap-4">
        <div className="w-full flex justify-center relative mb-4 items-center">
          <div className="left-0 absolute">
            <Button
              onClick={goBack}
              className="bg-tangaroa-400 hover:bg-tangaroa-300 h-10 w-14"
            >
              <ChevronLeftIcon />
            </Button>
          </div>
          <div className="flex justify-center">
            <h1 className="text-xl text-neutral-500">
              Relatório de carregamento
            </h1>
          </div>
        </div>
        <CardReport data={params} />
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
  )
}
