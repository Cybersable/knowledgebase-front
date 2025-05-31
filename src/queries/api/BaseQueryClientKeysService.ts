export interface BaseQueryClientServiceParams {
  resource: string
}

export default abstract class BaseQueryClientKeysService {
  protected _resource: string

  protected constructor(params: BaseQueryClientServiceParams) {
    this._resource = params.resource
  }

  get(id: string) {
    return [this._resource, 'get', id];
  }

  getBySlug(slug: string) {
    return [this._resource, 'get-by-slug', slug];
  }

  getMany() {
    return [this._resource, 'get-many'];
  }
}