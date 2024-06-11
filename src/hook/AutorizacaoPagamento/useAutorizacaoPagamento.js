import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';

const fetchData = async () => {
  const response = await api.post('/lista/titulos', {
    dataInicial: subDays(new Date(), 3),
    dataFinal: new Date(),
    status: '',
    numeroFatura: '',
    empresa: '',
    dataEmissaoInicial: '',
    dataEmissaoFinal: '',
  });
  return response.data;
};
export function useAutorizacaoPagamentoData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['listaAutorizacaoPagamento'],
    retry: false,
  });
  return query;
}
