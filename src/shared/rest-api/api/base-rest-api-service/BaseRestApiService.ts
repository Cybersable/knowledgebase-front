import { AxiosInstance } from 'axios';
import queryString, { StringifyOptions } from 'query-string';
import { provideRestApiMethods } from '@/shared/rest-api/api/provideRestApiMethods';

export interface QueryParams {
  search?: string | string[]
  limit?: string
  offset?: string
}

export interface BaseRestApiServiceInterface<Model, ModelInput> {
  get: (id: string) => Promise<Model>
  getBySlug: (slug: string) => Promise<Model>
  getMany: (
    params?: QueryParams,
    abort?: AbortController
  ) => Promise<{
    data: Array<Model>
    total: number
  }>
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

  public getBySlug(slug: string) {
    return provideRestApiMethods(this._client).get<Model>(`/${this._resource}/slug/${slug}`);
  }

  public getMany<Model>(query?: QueryParams, abort?: AbortController) {
    if (!abort?.signal) {
      abort = new AbortController()
    }

    let url = `/${this._resource}`;

    if (query) {
      url += this._stringify(query);
    }

    return provideRestApiMethods(this._client).get<{
      data: Array<Model>,
      total: number,
    }>(
      url,
      {
        signal: abort.signal
      })
  }

  public create(data: ModelInput) {
    return provideRestApiMethods(this._client).post<Model>(`/${this._resource}`, { data });
  }

  public update(id: string, data: Partial<ModelInput>) {
    return provideRestApiMethods(this._client).patch<Model>(`/${this._resource}/${id}`, { data });
  }

  public delete(id: string) {
    return provideRestApiMethods(this._client).del(`/${this._resource}/${id}`);
  }

  [key: string]: CallableFunction | unknown
}