import BaseQueryClientKeysService from './BaseQueryClientKeysService';

class WorkspacesQueryClientKeys extends BaseQueryClientKeysService {
  constructor() {
    super({ resource: 'workspaces' });
  }

  getDocs() {
    return [this._resource, 'get-docs'];
  }

  getDocsBySlug(slug: string) {
    return [this._resource, 'get-docs', slug];
  }
}

export const workspacesQueryClientKeys = new WorkspacesQueryClientKeys();

export const categoriesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'categories',
});

export const articlesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'articles',
});
