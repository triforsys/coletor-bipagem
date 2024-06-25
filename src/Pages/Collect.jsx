import React, { useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import Menu from '@/components/layout/Menu';
import { BoxIcon, TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function Collect() {
  // const [user, setUser] = useState(userDecode());

  const navigate = useNavigate();

  const reportList = [
    {
      charge: 175582,
      campaign: 'M&N_BISC_BYTES_MONT_SJ',
      region: 'AL_MA_PB_PE_RN_SE',
      transporter: 'TAFF',
      boxes: 2665,
    },
    {
      charge: 175583,
      campaign: 'M&N_BYTES_MONT',
      region: 'LINHA',
      transporter: 'TAFF',
      boxes: 4532,
    },
    {
      charge: 175584,
      campaign: 'COMERCIAL FERNANDES STL LTDA',
      region: 'AL_MA_PB_PE_RN_SE',
      transporter: 'TAFF',
      boxes: 1234,
    },
  ];

  const redirectToTransportPage = (transport) =>
    navigate(`/transporte/${transport}`);

  const CardReport = ({ children: report }) => {
    return (
      <div className="flex rounded-2xl max-sm: card-shadow min-w-[370px] max-w-[370px] text-ellipsis overflow-hidden pr-1 sm:w-96 h-[180px] gap-2">
        <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-slate-400">
          <BoxIcon className="w-[78px] h-[75px]" />
          <Button
            className="rounded-[10px] w-20 h-6"
            onClick={() => redirectToTransportPage(report.transport)}
          >
            Iniciar
          </Button>
        </div>
        <div className="flex max-w-56 flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Carga: {report.charge}</p>
          <p className='text-ellipsis overflow-hidden'>Campanha: {report.campaign}</p>
          <p className='text-ellipsis overflow-hidden'>Região: {report.region}</p>
          <p className='text-ellipsis overflow-hidden'>Transportadora: {report.transporter}</p>
          <p>Caixas: {report.boxes}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4">
        <div className="w-full">
          <h1 className="text-center text-neutral-500 text-2xl">
            Coleta: {window.location.pathname.split('/')[2]}
          </h1>
        </div>
        {reportList.map((report) => (
          <CardReport key={report.charge}>{report}</CardReport>
        ))}
      </div>
    </div>
  );
}
