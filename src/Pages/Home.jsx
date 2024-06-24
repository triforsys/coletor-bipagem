import React, { useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import Menu from '@/components/layout/Menu';
import { TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  // const [user, setUser] = useState(userDecode());

  const navigate = useNavigate();

  const reportList = [
    {
      collect: 175582,
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
      collect: 175583,
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
      collect: 175584,
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

  const reportListFiltered = reportList.filter(
    (report) => report.statusColeta !== 'acionada',
  );

  const redirectToReportPage = (collect) => navigate(`/coleta/${collect}`);

  const getButtonType = (report) => {
    if (report.readVolumes > 0) return 'progress';
    if (report.invoiced) return 'released';
    // TODO: check finished status
  };

  const CardReport = ({ children: report }) => {
    const buttonType = getButtonType(report);

    return (
      <div className="flex rounded-2xl bg-[#f3f3f3] min-w-[370px] sm:w-96 h-[171px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-slate-400">
          <TruckIcon className="w-[78px] h-[75px]" />
          {buttonType === 'released' ? (
            <Button
              className="rounded-[10px] w-20 h-6"
              onClick={() => redirectToReportPage(report.collect)}
            >
              Iniciar
            </Button>
          ) : (
            <Button className="rounded-[10px] w-20 h-6 text-xs" disabled>
              Em progresso
            </Button>
          )}
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
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4">
        {reportListFiltered.map((report) => (
          <CardReport key={report.collect}>{report}</CardReport>
        ))}
      </div>
    </div>
  );
}
