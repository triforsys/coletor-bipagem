import React, { useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import Menu from '@/components/layout/Menu';
import { CaravanIcon, TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
export default function Home() {
  // const [user, setUser] = useState(userDecode());

  const reportList = [
    {
      collect: 175582,
      transporter: 'TAFF',
      vehicle: 'Carreta',
      plate: 'ABC-1234',
      dock: '24',
      driverName: 'Rafael Silva',
    },
    {
      collect: 175583,
      transporter: 'KMC',
      vehicle: 'Carreta',
      plate: 'ABC-1235',
      dock: '25',
      driverName: 'Junior Silva',
    },
    {
      collect: 175584,
      transporter: 'PTS',
      vehicle: 'Carreta',
      plate: 'ABC-1236',
      dock: '26',
      driverName: 'Mateus Oliveira',
    },
  ];

  const CardReport = ({ children: report }) => {
    return (
      <div className="flex rounded-2xl bg-[#f3f3f3] w-[370px] sm:w-[36rem] h-[171px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-[#D5CEA3]">
          <TruckIcon className="w-[78px] h-[75px]" />
          <Button className="rounded-[10px] w-20 h-6">Iniciar</Button>
        </div>
        <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Coleta: {report.collect}</p>
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
      <div className="flex flex-col gap-4">
        {reportList.map((report) => (
          <CardReport key={report.collect}>{report}</CardReport>
        ))}
      </div>
    </div>
  );
}
