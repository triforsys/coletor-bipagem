import React, { useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import Menu from '@/components/layout/Menu';
import { BoxIcon, TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function Collects() {
  // const [user, setUser] = useState(userDecode());

  const navigate = useNavigate();

  const reportList = [
    {
      collect: 1234,
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
      collect: 198173,
      transporter: 'TAFF',
      vehicle: 'CARRETA',
      plate: '',
      dock: '25',
      driverName: '',
      statusColeta: '',
      invoiced: 0,
      readVolumes: 1,
    },
    {
      collect: 198174,
      transporter: 'TAFF',
      vehicle: 'TRUCK',
      plate: '',
      dock: '26',
      driverName: '',
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
      <div className="flex rounded-2xl card-shadow min-w-[370px] sm:w-96 h-[171px] gap-2">
        <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
          <TruckIcon className="w-[78px] h-[75px] text-tangaroa-100" />
          {buttonType === 'released' ? (
            <Button
              className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
              onClick={() => redirectToReportPage(report.collect)}
            >
              Iniciar
            </Button>
          ) : (
            <Button className="rounded-[10px] w-20 h-6 text-xs disabled:bg-tangaroa-100 disabled:text-tangaroa-950" disabled>
              Em progresso
            </Button>
          )}
        </div>
        <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
          <p className="font-bold">Coleta: {report.collect}</p>
          <p>Transportadora: {report.transporter}</p>
          <p>Tipo Veículo: {report.vehicle}</p>
          <p>Placa Veículo: {report.plate}</p>
          <p>Motorista: {report.driverName}</p>
          <p>Doca: {report.dock}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center md:justify-normal p-4 gap-4">
        {reportListFiltered.map((report, index) => (
          <CardReport key={report.collect + index}>{report}</CardReport>
        ))}
      </div>
    </div>
  );
}
