import { AxiosInstance } from 'axios';
import queryString, { StringifyOptions } from 'query-string';
import { provideRestApiMethods } from '@/shared/rest-api/api/provideRestApiMethods';


export type QueryValue = string | null;

export interface QueryParams {
  [key: string]: QueryValue | QueryValue[]
}

export interface Pagination<Model> {
  data: Array<Model>
  total: number
}

export interface BaseRestApiServiceInterface<Model, ModelInput> {
  get: (id: string) => Promise<Model>
  getMany: (
    params?: QueryParams,
    abort?: AbortController
  ) => Promise<Pagination<Model>>
  create: (data: ModelInput) => Promise<Model>
  update: (id: string, data: Partial<ModelInput>) => Promise<Model>
  delete: (id: string) => Promise<unknown>
}

export interface BaseRestApiServiceParams {
  resource: string
  client: AxiosInstance
}

export default abstract class BaseRestApiService<Model, ModelInput>
  implements BaseRestApiServiceInterface<Model, ModelInput>
{
  protected _resource: string
  protected _client: AxiosInstance

  protected constructor(params: BaseRestApiServiceParams) {
    this._client = params.client
    this._resource = params.resource
  }

  protected _stringify = (obj: QueryParams, options?: StringifyOptions): string => {
    return queryString.stringify(obj, options)
  }

  public get(id: string) {
    return provideRestApiMethods(this._client).get<Model>(`/${this._resource}/${id}`);
  }

  public getMany(query?: QueryParams, abort?: AbortController) {
    // if (!abort?.signal) {
    //   abort = new AbortController()
    // }

    let url = `/${this._resource}`;

    if (query) {
      url += `?${this._stringify(query)}`;
    }

    return provideRestApiMethods(this._client).get<Pagination<Model>>(
      url
      // {
      //   signal: abort.signal
      // }
    )
  }

  public create(data: ModelInput) {
    console.log(`/${this._resource}`);
    return provideRestApiMethods(this._client).post<Model, ModelInput>(`/${this._resource}`, data);
  }

  public update(id: string, data: Partial<ModelInput>) {
    return provideRestApiMethods(this._client).patch<Model>(`/${this._resource}/${id}`, { data });
  }

  public delete(id: string) {
    return provideRestApiMethods(this._client).del(`/${this._resource}/${id}`);
  }

  [key: string]: CallableFunction | unknown
}