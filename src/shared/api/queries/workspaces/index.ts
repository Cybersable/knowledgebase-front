import workspacesList from '@/generated-fake-data/workspaces.json';

export interface IApiWorkspace {
  uuid: string
  title: string
  slug: string
  description?: string
}

class Workspaces {
  constructor(list: Array<IApiWorkspace>) {
    this.list = list;
  }

  list: Array<IApiWorkspace>;

  getAll(): Promise<Array<IApiWorkspace>> {
    return new Promise(resolve => resolve(this.list));
  }

  get({ uuid }: { uuid?: string }): Promise<IApiWorkspace | undefined> {
    return new Promise((resolve, reject) => {
      const workspace = this.list.find((item) => uuid && item.uuid === uuid)

      if (!workspace) reject();

      resolve(workspace);
    });
  }
}

export const workspacesApi = new Workspaces(workspacesList as Array<IApiWorkspace>);