import { api } from '@/lib/api'
import { toast } from 'sonner'

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
  const loadingToast = toast.loading(msgLoading, {
    unstyled: false,
    classNames: {
      toast: 'bg-zinc-50 border border-zinc-700',
      title: '', // ! editar a cor do texto pra um edita pra todos os tipo
      // cancelButton: 'hover:border-zinc-900',
      // closeButton:
      //   'bg-zinc-50 text-zinc-900 border border-zinc-700 hover:border-zinc-900',
    },
  })
  try {
    let response = null
    if (type === 'post') response = await api[type](url, data)
    if (type === 'get') response = await api[type](url)
    if (response instanceof Error) {
      toast.error('Erro ao buscar dados!', { id: loadingToast })
      return
    }
    if (response.status === 200) {
      toast.success('Dados encontrados!', { id: loadingToast })
      return response.data
    }
  } catch (err) {
    toast.error('Erro inesperado.', { id: loadingToast })
    throw err
  }
}

export async function useLoadingToFetchLogin(
  msgLoading = 'Carregando...',
  url,
  type,
  data = null,
) {
  const loadingToast = toast(msgLoading)

  try {
    let response = null
    if (type === 'post') response = await api[type](url, data)
    if (type === 'get') response = await api[type](url)

    if (response.status === 200) {
      if (response?.data?.msg !== undefined) {
        if (response?.data?.msg === 'Usuário não encontrado!') {
          toast.error(response?.data?.msg, { id: loadingToast })
          return false
        } else if (response?.data?.msg === 'Usuário desativado!') {
          toast.warning(response?.data?.msg, { id: loadingToast })
          return false
        } else if (response?.data?.msg === 'Usuário não é administrador!') {
          toast.error(response?.data?.msg, { id: loadingToast })
          return false
        } else if (response?.data?.msg === 'Senha inválida!') {
          toast.error(response?.data?.msg, { id: loadingToast })
          return false
        }
      } else {
        toast.dismiss(loadingToast)
        return response?.data
      }
    }
  } catch (err) {
    toast.error('Erro inesperado.', { id: loadingToast })
    throw err
  }
}
