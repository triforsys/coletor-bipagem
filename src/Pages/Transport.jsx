import React, { useEffect, useRef, useState } from 'react';
import { userDecode } from '../lib/jwtDecode';
import { ClipboardList, CircleCheck, X, CircleX, BoxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import Select from '@/components/utils/Select';

const formatCNPJ = (cnpj) =>
  cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');

let list = [
  {
    ot: 175582,
    costumer: '123412341234',
    shipping: '123412341234',
    invoice: '23413241234',
    status: 'checked',
  },
  {
    ot: 675644,
    costumer: '09678543234',
    shipping: '09678543234',
    invoice: '09678543234',
    status: 'pending',
  },
  {
    ot: 54632544,
    costumer: '67819283497',
    shipping: '67819283497',
    invoice: '67819283497',
    status: 'checked',
  },
];

// const CardReport = ({ children: report }) => {
//   return (
//     <div className="flex rounded-2xl card-shadow w-[370px] sm:w-[36rem] h-[171px] gap-2">
//       <div className="flex rounded-l-2xl justify-center w-[128px] flex-col items-center gap-2 bg-slate-400">
//         <ClipboardList className="w-[78px] h-[75px]" />
//       </div>
//       <div className="flex flex-col justify-between py-2 pl-2 text-[15px]">
//         <p className="font-bold">O.T: {report.ot}</p>
//         <p>Cliente: {report.costumer}</p>
//         <p>Remessa: {report.shipping}</p>
//         <p>Nota: {report.invoice}</p>
//         <div className="flex justify-around">
//           <CircleCheck
//             className="fill-green-500 text-white"
//             size={50}
//             cursor="pointer"
//           />
//           <CircleX
//             className="fill-red-500 text-white"
//             size={50}
//             cursor="pointer"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

const CardInfo = () => {
  const report = {
    charge: window.location.pathname.split('/')[2],
    cnpj: '43805810000128',
    transporter: 'TAFF BRASIL TRANSPORTES LTDA',
    plate: 'ABC-1234',
    driverName: 'Rafael Silvw',
  };

  return (
    <div className="flex rounded-2xl card-shadow w-[370px] sm:w-[36rem] min-h-24 gap-3">
      <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-black text-white text-md font-bold">
        Carga:
        <p className="text-3xl">{report.charge}</p>
      </div>
      <div className="flex flex-col gap-1 py-2 text-[15px]">
        <p>Nome Transportador: </p>
        <p>{report.transporter}</p>
        <p>CNPJ: {formatCNPJ(report.cnpj)}</p>
        <div className="flex gap-4">
          <p>{report.plate}</p>
          <p>{report.driverName}</p>
        </div>
      </div>
    </div>
  );
};

const CardReport = ({ children: report }) => {
  return (
    <div className="flex rounded-2xl card-shadow min-w-[370px] max-w-[370px] text-ellipsis overflow-hidden pr-1 sm:w-96 h-[180px] gap-2">
      <div className="flex rounded-l-2xl justify-center min-w-[128px] flex-col items-center gap-2 bg-tangaroa-500">
        <BoxIcon className="w-[78px] h-[75px] text-tangaroa-50" />
        <Button
          className="rounded-[10px] w-20 h-6 bg-tangaroa-400 hover:bg-tangaroa-300"
          // onClick={() => redirectToTransportPage(report.charge)}
        >
          Iniciar
        </Button>
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
  // const [user, setUser] = useState(userDecode());
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();

  const otRef = useRef();

  const getFilterListByOt = () => {
    const ot = otRef.current.value;

    if (ot.length < 5) return list;

    return list.filter((item) => String(item.ot).startsWith(ot));
  };

  const handleOt = () => {
    setFilteredList(getFilterListByOt);
  };

  const handleStatus = (value) => {
    if (value === 'all' || !value) {
      setFilteredList(getFilterListByOt);
      return;
    }

    setFilteredList(
      getFilterListByOt().filter((item) => item.status === value),
    );
  };

  const redirectToHomePage = () => navigate(`/coletas`);

  useEffect(() => {
    setFilteredList(list);
  }, []);

  return (
    <div className="flex justify-center gap-2 mt-4 font-poppins">
      <div className="flex flex-wrap justify-center xl:justify-normal p-4 gap-4">
        <div className="w-full">
          <h1 className="text-center text-neutral-500 text-2xl">
            Relatório de Carregamento Remessa / Conferência
          </h1>
        </div>
        {/* <CardInfo /> */}
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
        <div className="flex gap-2 items-center w-[370px] sm:w-[36rem]">
          <Input
            placeholder="Número de O.T"
            onChange={handleOt}
            ref={otRef}
            className="rounded-[5px] bg-white border-black md:w-52 h-10 focus-visible:ring-offset-background focus-visible:ring-transparent text-xl"
          />
          <Select
            options={[
              {
                label: 'Todos',
                value: 'all',
              },
              {
                label: 'Conferido',
                value: 'checked',
              },
              {
                label: 'Pendente',
                value: 'pending',
              },
            ]}
            className="border-black"
            InitialTextOption=""
            handleValueChange={handleStatus}
            valueSelected="all"
          />
        </div>

        {/* {filteredList.map((report, index) => (
          <CardReport key={report.ot + index}>{report}</CardReport>
        ))} */}
        <div className="w-full text-center">
          <Button
            className="w-full bg-[#1A120B] rounded-none max-w-96"
            onClick={redirectToHomePage}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}
