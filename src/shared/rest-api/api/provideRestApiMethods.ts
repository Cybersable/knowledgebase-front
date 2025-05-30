import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
  Method,
} from 'axios';

type AxiosOptions = Omit<AxiosRequestConfig, 'url' | 'method'>;
type GenericParams = Record<string, unknown>;
type GenericData = Record<string, unknown>;

export const provideRestApiMethods = (axiosInstance: AxiosInstance) => {
  const request = async <T>(
    method: Method,
    url: string,
    options?: AxiosOptions,
    hideMessage?: boolean,
  ) => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.request({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      if (!hideMessage) requestErrorMessage(err);
      console.error(err.response);

      throw err;
    }
  };

  const requestErrorMessage = (error: AxiosError) => {
    const errorMessage: string =
      error.response?.status || error.request || error.message || 'Something went wrong';

    return console.error(`Knowledgebase app, catch an error: ${errorMessage}`);
  };

  const get = <T, P = GenericParams>(
    url: string,
    params?: P,
    hideMessage?: boolean,
    cancelToken?: CancelToken,
    options?: AxiosOptions,
  ) =>
    request<T>(
      'get',
      url,
      {
        params,
        cancelToken,
        ...options,
      },
      hideMessage,
    );

  const post = <T, D = GenericData>(
    url: string,
    data?: D,
    hideMessage?: boolean,
    options?: AxiosOptions,
  ) => request<T>('post', url, { data, ...options }, hideMessage);

  const put = <T, D = GenericData>(
    url: string,
    data?: D,
    hideMessage?: boolean,
    options?: AxiosOptions,
  ) => request<T>('put', url, { data, ...options }, hideMessage);

  const patch = <T, D = GenericData>(
    url: string,
    data?: D,
    hideMessage?: boolean,
    options?: AxiosOptions,
  ) => request<T>('patch', url, { data, ...options }, hideMessage);

  const del = <T, D = GenericData>(url: string, data?: D, options?: AxiosOptions) =>
    request<T>('delete', url, { data, ...options });

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};
