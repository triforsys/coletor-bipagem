import React, { useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import Menu from '@/components/layout/Menu';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function Report() {
  // const [user, setUser] = useState(userDecode());

  const navigate = useNavigate();

  const reportList = [
    {
      collect: 175582,
      transporter: 'TAFF',
      vehicle: 'Carreta',
      plate: 'ABC-1234',
      dock: '24',
      driverName: 'Rafael Silvw',
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

  const redirectToHomePage = () => navigate(`/home`);

  const CardReport = ({ children: report }) => {
    return (
      <div className="flex rounded-2xl bg-[#f3f3f3] w-[370px] sm:w-[36rem] h-[171px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-[#D5CEA3]">
          <ClipboardList className="w-[78px] h-[75px]" />
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

  const CardInfo = ({ children: report }) => {
    // return (
    //   <div className="flex rounded-2xl bg-[#f3f3f3] w-[370px] sm:w-[36rem] h-[171px] gap-2">
    //     <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-[#D5CEA3]">
    //      Carga: 1234
    //     </div>
    //     <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
    //       <p className="font-bold">Nome Transportador: {report.collect}</p>
    //       <p>Transportadora: {report.transporter}</p>
    //       <p>Tipo Veículo: {report.vehicle}</p>
    //       <p>Placa Veículo: {report.plate}</p>
    //       <p>Doca: {report.dock}</p>
    //       <p>N. Motorista: {report.driverName}</p>
    //     </div>
    //   </div>
    // );
  };

  return (
    <div className="flex justify-center gap-2 mt-4 pb-2 font-poppins">
      <div className="flex flex-col gap-4">
        <CardInfo />
        {reportList.map((report) => (
          <CardReport key={report.collect}>{report}</CardReport>
        ))}
        <Button
          className="w-full bg-[#1A120B] rounded-none"
          onClick={redirectToHomePage}
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
}
