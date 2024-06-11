import { api } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const fetchData = async (data) => {
  const response = await api.post('/lista/titulos', data);
  return response.data;
};
export function useAutorizacaoPagamentoSearch(data) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: fetchData,
    mutationKey: ['listaAutorizacaoPagamentoSearch'],
    onSuccess: () => {
      queryClient.invalidateQueries('listaAutorizacaoPagamento', {
        refetchActive: false,
        refetchInactive: true,
      });
      // queryClient.invalidateQueries({
      //   queryKey: ['listaAutorizacaoPagamento'],
      // });
    },
    retry: false,
  });
  return mutate;
}
