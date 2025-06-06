import { QueryParams } from '@/shared/rest-api/api/BaseRestApiService';
import queryString from 'query-string';

export interface BaseQueryClientServiceParams {
  resource: string
}

export default class BaseQueryClientKeysService {
  protected _resource: string

  constructor(params: BaseQueryClientServiceParams) {
    this._resource = params.resource
  }

  get(id: string) {
    return [this._resource, 'get', id];
  }

  getMany(query: QueryParams) {
    return [this._resource, 'get-many', queryString.stringify(query)];
  }
}