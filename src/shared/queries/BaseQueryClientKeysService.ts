import queryString from 'query-string'

import { QueryParams } from '@/shared/rest-api/api/BaseRestApiService'

export interface BaseQueryClientServiceParams {
  resource: string
}

export default class BaseQueryClientKeysService {
  protected _resource: string

  constructor(params: BaseQueryClientServiceParams) {
    this._resource = params.resource
  }

  get(id: string) {
    return [this._resource, 'get', id]
  }

  getManyBase() {
    return [this._resource, 'get-many']
  }

  getMany(query: QueryParams) {
    return [...this.getManyBase(), queryString.stringify(query)]
  }

  create() {
    return [this._resource, 'create']
  }

  update() {
    return [this._resource, 'update']
  }
}