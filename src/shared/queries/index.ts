import BaseQueryClientKeysService from './BaseQueryClientKeysService'

class WorkspacesQueryClientKeys extends BaseQueryClientKeysService {
  constructor() {
    super({ resource: 'workspaces' })
  }
}

export const workspacesQueryClientKeys = new WorkspacesQueryClientKeys()

export const categoriesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'categories',
})

export const articlesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'articles',
})
