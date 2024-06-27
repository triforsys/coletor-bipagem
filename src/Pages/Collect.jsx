import React, { useEffect, useRef, useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import { BoxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Toggle from '@/components/utils/Toggle';
import { Input } from '@/components/ui/input';

const reportList = [
  {
    charge: 198174,
    campaign: 'LINHA',
    region: 'BA',
    boxes: 2024,
    weight: 13061.02,
    m3: 14.41,
  },
  {
    charge: 198179,
    campaign: 'M&N_BISC_BYTES_MONT_SJ',
    region: 'BA',
    boxes: 980,
    weight: 13061.02,
    m3: 14.41,
  },
  // {
  //   charge: 175584,
  //   campaign: 'COMERCIAL FERNANDES STL LTDA',
  //   region: 'AL_MA_PB_PE_RN_SE',
  //   transporter: 'TAFF',
  //   boxes: 1234,
  // },
];

export default function Collect() {
  // const [user, setUser] = useState(userDecode());

  const navigate = useNavigate();
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    setFilteredList(reportList);
  }, []);

  const redirectToTransportPage = (transport) =>
    navigate(`/transporte/${transport}`);

  const CardReport = ({ children: report }) => {
    return (
      <div className="flex rounded-2xl card-shadow min-w-[370px] max-w-[370px] text-ellipsis overflow-hidden pr-1 sm:w-96 h-[180px] gap-2">
        <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
          <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />
          <Button
            className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
            onClick={() => redirectToTransportPage(report.charge)}
          >
            Iniciar
          </Button>
        </div>
        <div className="flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Transporte: {report.charge}</p>
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
            <p className="text-ellipsis overflow-hidden">
              M3: {report.m3}
            </p>
          </div>
          <p>Caixas: {report.boxes}</p>
        </div>
      </div>
    );
  };

  const chargeRef = useRef();

  const filter = (e) => {
    e.preventDefault();
    const chargeValue = chargeRef.current.value;

    if (chargeValue.length < 5) setFilteredList(reportList);
    else
      setFilteredList(
        reportList.filter((item) =>
          String(item.charge).startsWith(chargeValue),
        ),
      );
  };

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4">
        <div className="w-[370px] md:w-full">
          <h1 className="text-center text-neutral-500 text-2xl">
            Coleta: {window.location.pathname.split('/')[2]}
          </h1>
          <Toggle>
            <form className="flex flex-col gap-2" onSubmit={filter}>
              <div className="flex flex-wrap items-end">
                <div className=" w-full md:w-2/4">
                  <label htmlFor="input-charge" className="text-white gap-1">
                    Carga
                  </label>
                  <Input
                    id="input-charge"
                    ref={chargeRef}
                    className="bg-white"
                  />
                </div>
                <div className=" w-full md:w-2/4"></div>
                <div className="flex mt-4 justify-end w-full md:w-24">
                  <Button className="w-full h-10 bg-tangaroa-400 hover:bg-tangaroa-300">
                    Filtrar
                  </Button>
                </div>
              </div>
            </form>
          </Toggle>
        </div>
        {filteredList.map((report) => (
          <CardReport key={report.charge}>{report}</CardReport>
        ))}
      </div>
    </div>
  );
}
