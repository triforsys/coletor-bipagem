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
      transport: 175582,
      transporter: 'TAFF',
      vehicle: 'Carreta',
      plate: 'ABC-1234',
      dock: '24',
      driverName: 'Rafael Silva',
      statusColeta: 'acionada',
      invoiced: 0,
      readVolumes: 1,
    },
    {
      transport: 175583,
      transporter: 'KMC',
      vehicle: 'Carreta',
      plate: 'ABC-1235',
      dock: '25',
      driverName: 'Junior Silva',
      statusColeta: '',
      invoiced: 0,
      readVolumes: 1,
    },
    {
      transport: 175584,
      transporter: 'PTS',
      vehicle: 'Carreta',
      plate: 'ABC-1236',
      dock: '26',
      driverName: 'Mateus Oliveira',
      statusColeta: '',
      invoiced: 1,
      readVolumes: 0,
    },
  ];

  const redirectToTransportPage = (transport) => navigate(`/transporte/${transport}`);

  const CardReport = ({ children: report }) => {
    return (
      <div className="flex rounded-2xl card-shadow min-w-[370px] sm:w-96 h-[171px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-slate-400">
          <TruckIcon className="w-[78px] h-[75px]" />
          <Button
            className="rounded-[10px] w-20 h-6"
            onClick={() => redirectToTransportPage(report.transport)}
          >
            Iniciar
          </Button>
        </div>
        <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Transporte: {report.transport}</p>

          <p>Transportadora: {report.transporter}</p>
          <p>Tipo Veículo: {report.vehicle}</p>
          <p>Placa Veículo: {report.plate}</p>
          <p>Doca: {report.dock}</p>
          <p>N. Motorista: {report.driverName}</p>
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
          <CardReport key={report.transport}>{report}</CardReport>
        ))}
      </div>
    </div>
  );
}
