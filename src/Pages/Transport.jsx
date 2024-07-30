import React, { useEffect, useRef, useState } from 'react'
import { BoxIcon, ChevronLeftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'

const CardReport = (data) => {
    // const url = new URLSearchParams(document.location.href)
    // const params = {}
    // const getParam = (key) => {
    //   params[key] = url.get(key)
    // }
    
    // const urlKeys = ['id', 'campanha', 'regiao', 'peso', 'm3', 'caixas']
    // urlKeys.map(getParam) 
  
  return (
    <div className="flex rounded-2xl card-shadow min-w-[370px] w-full text-ellipsis overflow-hidden pr-1 h-[180px] gap-2">
      <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
        <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />
      </div>
      <div className="flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px]">
        <p className="font-bold">Transporte: {data.id}</p>
        <p className="text-ellipsis overflow-hidden">
          Campanha: {data.campanha}
        </p>
        <p className="text-ellipsis overflow-hidden">Região: { data.regiao}</p>
        <div className="flex gap-3">
          <p className="text-ellipsis overflow-hidden">Peso: {data.peso}</p>
          <p className="text-ellipsis overflow-hidden">M3: {data.m3}</p>
        </div>
        <p>Caixas: {data.caixas}</p>
      </div>
    </div>
  )
}

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
  const [isReadingBlocked, setIsReadingBlocked] = useState()
  const [quantityBip, setQuantityBip] = useState(0)

  const goBack = () => navigate(-1)
  const goToHomepage = () => navigate('/coletas')

  const toggleReleaseReadingDisabled = () =>
    (releaseReadingRef.current.disabled = !releaseReadingRef.current.disabled)

  const handleReleaseReading = () => {
    if (confirm('Deseja liberar a leitura?')) {
      barcodeRef.current.disabled = false
      toggleReleaseReadingDisabled()
    }
  }

  const handleStop = () => {
    const stopMotivate = prompt(
      'Informe o motivo da parada (30 caracteres)',
    ).slice(0, 30)

    if (stopMotivate.length < 10)
      prompt('Motivo precisa ter pelo menos 10 caracteres')

    if (confirm('Deseja realmente parar?')) goBack()
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

  const barcodeMutation = useMutation({
    mutationFn: async () => {
      const barcodeInput = barcodeRef.current
      if (!barcodeInput.value || barcodeInput.disabled) return
      
      barcodeInput.disabled = true

      // await api.post('/bipagem/codigoDeBarras', {
      //   idNota: '',
      //   transporte: params.id,
      //   codigoDeBarras: barcodeInput.value
      // })
      return {msg: 'erro'}
    },
    mutationKey: ['barcode']
  })

  const handleBarcode = () => {
    const barcodeInput = barcodeRef.current
    if (!barcodeInput.value || barcodeInput.disabled) return
    barcodeInput.disabled = true

    // setTimeout(() => {
    //   alert('Erro: leitura bloqueada')
    //   toggleReleaseReadingDisabled()
    //   return
    // }, [3000])

    // barcodeInput.disabled = false;
  }

  useEffect(() => {
    releaseReadingRef.current.disabled = true
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
        <CardReport
          // children={{
            data={params}
            // charge: 198179,
            // campaign: 'M&N_BISC_BYTES_MONT_SJ',
            // region: 'BA',
            // boxes: 980,
            // weight: 13061.02,
            // m3: 14.41,
          // }}
        />
        <div className="border border-tangaroa-300 rounded-md w-full h-10 text-center justify-center flex flex-col">
          {quantityBip}
        </div>
        <Input
          ref={barcodeRef}
          onChange={handleBarcode}
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
