import React, { useState } from 'react';
import Menu from '@/components/layout/Menu';
import Table from '@/components/utils/Table';
import { columns } from './Columns';
import { Input } from '@/components/ui/input';
import DatePiker from '@/components/utils/DatePiker';
import { subDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Tooltip from '@/components/utils/Tooltip';
import InputSelect from '@/components/utils/InputSelect';
import { api } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function Comprovante() {
  const queryClient = useQueryClient();
  const [dataInicial, setDataInicial] = useState(subDays(new Date(), 3));
  const [dataFinal, setDataFinal] = useState(new Date());
  const [dataIntegracaoInicial, setDataIntegracaoInicial] = useState();
  const [dataIntegracaoFinal, setDataIntegracaoFinal] = useState();
  const [status, setStatus] = useState('');
  const [notaFiscal, setNotaFiscal] = useState('');
  const [idMovimento, setIdMovimento] = useState('');
  const [listaEmpresa, setListaEmpresa] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [arrFaturas, setArrFaturas] = useState([]);
  const [data, setData] = useState();

  const handleData = async (data) => {
    toast.info('Processando...');
    const response = await api
      .post('/lista/comp', {
        dataInicial,
        dataFinal,
        status: status,
        notaFiscal: notaFiscal,
        idMovimento: idMovimento,
        dataIntegracaoInicial: dataIntegracaoInicial,
        dataIntegracaoFinal: dataIntegracaoFinal,
      })
      .then((res) => setData(res.data));
    if (response) {
    }
  };

  useEffect(() => {
    console.log('sdfsdf');
    handleData(data);
  }, []);
  // const { data, isLoading, isError, refetch } = useQuery({
  //   queryFn: () => {
  //     toast.info('Processando...');
  //     return api
  //       .post('/lista/comp', {
  //         dataInicial,
  //         dataFinal,
  //         status: status,
  //         notaFiscal: notaFiscal,
  //         idMovimento: idMovimento,
  //         dataIntegracaoInicial: dataIntegracaoInicial,
  //         dataIntegracaoFinal: dataIntegracaoFinal,
  //       })
  //       .then((res) => res.data);
  //   },
  //   queryKey: ['listaTrack'],
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return api
  //       .post('/lista/comp', {
  //         dataInicial,
  //         dataFinal,
  //         status: status,
  //         notaFiscal: notaFiscal,
  //         idMovimento: idMovimento,
  //         dataIntegracaoInicial: dataIntegracaoInicial,
  //         dataIntegracaoFinal: dataIntegracaoFinal,
  //       })
  //       .then((res) => res.data);
  //   },
  //   mutationKey: ['listaTrackSearch'],
  //   onSuccess: async (data) => {
  //     // ! usa o refetch para atualizar o use query
  //     refetch();
  //     await queryClient.invalidateQueries(
  //       {
  //         queryKey: ['listaTrack'],
  //         exact,
  //         refetchType: 'none',
  //       },
  //       { throwOnError, cancelRefetch },
  //     );
  //   },
  // });

  // if (mutation?.isLoading) {
  //   setOpenModal(!openModal);
  // }

  const handleIntegration = async () => {
    try {
      toast.info('Processando...');
      const response = await api.post(`/integracao/canhoto`, {
        idMovimentoNotaFiscal: data,
      });

      if (response.status === 200) {
        if (response.data[0].error === true) {
          toast.error('Falha ao integrar.');
        } else {
          toast.success('Sucesso ao Integrar.');
        }
      }
    } catch (err) {
      console.error('err', err);
      toast.error('Erro inesperado, contate o administrador!');
    }
  };
  // const handleIntegration = useMutation({
  //   mutationFn: (data) => {
  //     toast.info('Processando...');
  //     return api
  //       .post(`/integracao/canhoto`, {
  //         idMovimentoNotaFiscal: data,
  //       })
  //       .then((res) => res);
  //   },
  //   mutationKey: ['integrarOcorrencia'],
  //   onSuccess: async (response) => {
  //     // console.log('resposne', response);
  //     if (response.status === 200) {
  //       if (response.data[0].error === true) {
  //         toast.error('Falha ao integrar.');
  //       } else {
  //         toast.success('Sucesso ao Integrar.');
  //       }
  //     }
  //     // ! usa o refetch para atualizar o use query
  //     refetch();
  //     await queryClient.invalidateQueries({
  //       queryKey: ['listaTrack'],
  //       refetchType: 'none',
  //     });
  //   },
  //   onError: (err) => {
  //     console.error('err', err);
  //     toast.error('Erro inesperado, contate o administrador!');
  //   },
  // });

  const handleSubmit = async (row) => {
    try {
      console.log('handleSubmit', row);
      if (row.length <= 0) {
        toast.warning('É preciso selecionar um checkbox');
        return;
      } else if (row.length > 100) {
        toast.warning("Não é possivel selecionar mais de 100 checkbox's");
        return;
      }
      const data = [];
      for await (const item of row) {
        data.push(item.original.id_MovimentoNotaFiscal);
      }
      await handleIntegration(data);
    } catch (err) {
      console.error('err', err);
      toast.error('Erro inesperado, contate o administrador!');
    }
  };

  return (
    <>
      <Menu>
        <div className="max-w-screen-2xl min-h-max mx-auto">
          <div className="flex justify-center mb-6">
            <h1 className="font-semibold">API Canhoto</h1>
          </div>
          <div className="flex flex-wrap rounded-lg bg-white p-3 drop-shadow-2xl space-x-2  ">
            <Tooltip message="Data Criação Inicial">
              <div className="mb-1">
                {/* <input
                  type="date"
                  placeholder="Data Saida Inicial"
                  value={dataIntegracaoInicial}
                  className="peer h-10 w-full border rounded-md bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm bg-white"
                  onChange={(e) => setDataIntegracaoInicial(e.target.value)}
                /> */}
                <DatePiker
                  className="w-[200px]"
                  date={dataIntegracaoInicial}
                  onSelect={setDataIntegracaoInicial}
                  placeholder="Data Criação Inicial"
                />
              </div>
            </Tooltip>

            <Tooltip message="Data Criação Final">
              <div className="mb-1">
                {/* <input
                  type="date"
                  placeholder="Data Saida Inicial"
                  value={dataIntegracaoFinal}
                  className="peer h-10 w-full border rounded-md bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm bg-white"
                  onChange={(e) => setDataIntegracaoFinal(e.target.value)}
                /> */}
                <DatePiker
                  className="w-[200px]"
                  date={dataIntegracaoFinal}
                  onSelect={setDataIntegracaoFinal}
                  placeholder="Data Criação Final"
                />
              </div>
            </Tooltip>
            <Tooltip message="Data Integração Inicial ">
              <div className="mb-1">
                {/* <input
                  type="date"
                  placeholder="Data Saida Inicial"
                  value={dataInicial}
                  className="peer h-10 w-full border rounded-md bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm bg-white"
                  onChange={(e) => setDataInicial(e.target.value)}
                /> */}
                <DatePiker
                  className="w-[200px]"
                  date={dataInicial}
                  onSelect={setDataInicial}
                  placeholder="Data Inicial"
                />
              </div>
            </Tooltip>
            <Tooltip message="Data Integração Final">
              <div className="mb-1">
                {/* <input
                  type="date"
                  placeholder="Data Saida Inicial"
                  value={dataFinal}
                  className="peer h-10 w-full border rounded-md bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm bg-white"
                  onChange={(e) => setDataFinal(e.target.value)}
                /> */}
                <DatePiker
                  className="w-[200px]"
                  date={dataFinal}
                  onSelect={setDataFinal}
                  placeholder="Data Final"
                />
              </div>
            </Tooltip>

            <Tooltip message="Nota Fiscal">
              <div>
                <Input
                  className="w-full"
                  type="text"
                  value={notaFiscal}
                  // onDoubleClick={() => setOpenModal(true)}
                  onChange={(e) => setNotaFiscal(e.target.value.trim())}
                  placeholder="Nota Fiscal (Ex: 11111)"
                />
              </div>
            </Tooltip>
            <Tooltip message="Sequencia">
              <div>
                <Input
                  className="w-full"
                  type="text"
                  value={idMovimento}
                  // onDoubleClick={() => setOpenModal(true)}
                  onChange={(e) => setIdMovimento(e.target.value.trim())}
                  placeholder="Sequencia (Ex: 11111)"
                />
              </div>
            </Tooltip>
            <div className="mb-1">
              <InputSelect
                options={[
                  { value: null, option: 'PENDENTES' },
                  { value: 'S', option: 'OK' },
                  { value: 'N', option: 'ERRO' },
                ]}
                placeholder="Selecione um Status"
                onChange={setStatus}
              />
            </div>
            <div>
              <Tooltip message="Buscar">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleData()}
                  className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </Tooltip>
            </div>
          </div>
          <div className="flex justify-center overflow-y-hidden">
            <Table
              textUpload="Reenviar Ocorrência"
              upload={handleSubmit}
              columns={columns}
              data={data}
            />
          </div>
        </div>
      </Menu>
    </>
  );
}
