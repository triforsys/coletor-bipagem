import { api } from '@/lib/api';
import { toast } from 'sonner';

/**
 *
 * Fetch de dados e loading com toast. a senha.
 *
 * @param {string} msgLoading - Mesagem a ser exibida no loading.
 * @param {string} url - Url para a requisição.
 * @param {string} type - Tipo de requisição (get, post, put, delete).
 * @param {object} data - Dados a serem enviados na requisição.
 * @returns {object} Objeto com os dados da requisição.
 */
export async function useLoadingToFetch(
  msgLoading = 'Carregando...',
  url,
  type,
  data = null,
) {
  const loadingToast = toast.loading(msgLoading);
  try {
    let response = null;
    if (type === 'post') response = await api[type](url, data);
    if (type === 'get') response = await api[type](url);
    if (response instanceof Error) {
      toast.error('Erro ao buscar dados!', { id: loadingToast });
      return;
    }
    if (response.status === 200) {
      toast.success('Dados encontrados!', { id: loadingToast });
      return response.data;
    }
  } catch (err) {
    toast.error('Erro inesperado.', { id: loadingToast });
    throw err;
  }
}
