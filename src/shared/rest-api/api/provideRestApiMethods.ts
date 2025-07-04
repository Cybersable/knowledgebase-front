import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
  Method
} from 'axios'
import { enqueueSnackbar } from 'notistack'
import queryString from 'query-string'

type AxiosOptions = Omit<AxiosRequestConfig, 'url' | 'method'>;
type GenericParams = Record<string, unknown>;
type GenericData = Record<string, unknown>;

export const provideRestApiMethods = (axiosInstance: AxiosInstance) => {
  const request = async <T>(
    method: Method,
    url: string,
    options?: AxiosOptions,
    hideMessage?: boolean
  ) => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.request({
        method,
        url,
        ...options,
      })

      return response.data
    } catch (error) {
      const err = error as AxiosError

      if (!hideMessage) requestErrorMessage(err)
      console.error(err.response)

      throw err
    }
  }

  const requestErrorMessage = (error: AxiosError) => {
    if (error.response) {
      const { data } = error.response
      if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
        return enqueueSnackbar(`KnowledgeBase: ${data.message}`, { variant: 'error' })
      }
    }

    const errorMessage: string = error.message || 'Something went wrong'

    return enqueueSnackbar(`KnowledgeBase: ${errorMessage}`, { variant: 'error' })
  }

  const get = <T, P = GenericParams>(
    url: string,
    params?: P,
    hideMessage?: boolean,
    cancelToken?: CancelToken,
    options?: AxiosOptions
  ) => 
      request<T>(
        'get',
        url,
        {
          params,
          paramsSerializer: (p) => queryString.stringify(p, { arrayFormat: 'comma' }),
          cancelToken,
          ...options,
        },
        hideMessage
      )

  const post = <T, D = GenericData>(
    url: string,
    data?: D,
    hideMessage?: boolean,
    options?: AxiosOptions
  ) => request<T>('post', url, { data, ...options }, hideMessage)

  const put = <T, D = GenericData>(
    url: string,
    data?: D,
    hideMessage?: boolean,
    options?: AxiosOptions
  ) => request<T>('put', url, { data, ...options }, hideMessage)

  const patch = <T, D = GenericData>(
    url: string,
    data?: D,
    hideMessage?: boolean,
    options?: AxiosOptions
  ) => request<T>('patch', url, { data, ...options }, hideMessage)

  const del = <T, D = GenericData>(url: string, data?: D, options?: AxiosOptions) =>
    request<T>('delete', url, { data, ...options })

  return {
    get,
    post,
    put,
    patch,
    del,
  }
}
