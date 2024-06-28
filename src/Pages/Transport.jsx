import React, { useEffect, useRef } from 'react';
import { BoxIcon, ChevronLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const list = [
  {
    code: 12341234132,
    error: false,
  },
  {
    code: 56789012345,
    error: false,
  },
];

const CardReport = ({ children: report }) => {
  return (
    <div className="flex rounded-2xl card-shadow min-w-[370px] w-full text-ellipsis overflow-hidden pr-1 h-[180px] gap-2">
      <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
        <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />
        {/* <Button
          className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
          // onClick={() => redirectToTransportPage(report.charge)}
        >
          Iniciar
        </Button> */}
      </div>
      <div className="flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px]">
        <p className="font-bold">Transporte: {report.charge}</p>
        <p className="text-ellipsis overflow-hidden">
          Campanha: {report.campaign}
        </p>
        <p className="text-ellipsis overflow-hidden">Região: {report.region}</p>
        <div className="flex gap-3">
          <p className="text-ellipsis overflow-hidden">Peso: {report.weight}</p>
          <p className="text-ellipsis overflow-hidden">M3: {report.m3}</p>
        </div>
        <p>Caixas: {report.boxes}</p>
      </div>
    </div>
  );
};

export default function Report() {
  const navigate = useNavigate();
  const barcodeRef = useRef();

  const goBack = () => navigate(-1);
  const goToHomepage = () => navigate('/coletas');

  const handleReleaseReading = () => {};

  const handleStop = () => {
    const stopMotivate = prompt(
      'Informe o motivo da parada (30 caracteres)',
    ).slice(0, 30);

    if (stopMotivate.length < 10)
      prompt('Motivo precisa ter pelo menos 10 caracteres');

    if (confirm('Deseja realmente parar?')) goBack();
  };

  const handleFinish = () => {
    goToHomepage();
  };
  const handleExit = () => {
    const reallyExit = confirm('Deseja realmente sair?');

    if (reallyExit) {
      goToHomepage();
    }
  };

  const handleBarcode = (obj) => {
    // const barcode = barcodeRef.current.value;
    // console.log(barcode);

    if (obj.error) {
      alert('Código inválido!');
      return true;
    }
    barcodeRef.current.value = obj.code;
    return false;
  };

  useEffect(() => {
    let index = 0;
    setInterval((e) => {
      if (!list[index]) {
        alert('Bipagem finalizada')
        e.clearInterval();
        return
      }

      const error = handleBarcode(list[index]);
      if (error) return;

      index++;
    }, [5000]);
  }, []);

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
          children={{
            charge: 198179,
            campaign: 'M&N_BISC_BYTES_MONT_SJ',
            region: 'BA',
            boxes: 980,
            weight: 13061.02,
            m3: 14.41,
          }}
        />
        <div className="border border-tangaroa-300 rounded-md w-full h-10 text-center justify-center flex flex-col">
          {1234123}
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
  );
}
