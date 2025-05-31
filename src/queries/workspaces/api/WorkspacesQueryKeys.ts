class WorkspacesQueryKeys {
  private BASE_KEY = 'workspaces'

  get(id: string) {
    return [this.BASE_KEY, 'get', id];
  }

  getBySlug(slug: string) {
    return [this.BASE_KEY, 'get-by-id', slug];
  }

  getMany() {
    return [this.BASE_KEY, 'get-many'];
  }
}

export const workspacesQueryKeys = new WorkspacesQueryKeys();