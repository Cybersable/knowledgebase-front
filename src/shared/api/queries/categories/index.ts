import categoriesList from '@/generated-fake-data/categories.json';

export interface IApiCategory {
  uuid: string
  title: string
  slug: string
  description?: string
  workspaceUuid: string
  categoryUuid: null | string
}

class Categories {
  constructor(list: Array<IApiCategory>) {
    this.list = list
  }

  list: Array<IApiCategory>

  getAll(): Promise<Array<IApiCategory>> {
    return new Promise(resolve => resolve(this.list));
  }

  get({ uuid }: { uuid: string }): Promise<IApiCategory | undefined> {
    return new Promise((resolve, reject) => {
      const category = this.list.find((item) => item.uuid === uuid)

      if (!category) reject();

      resolve(category);
    });
  }
}

export const categoriesApi = new Categories(categoriesList as Array<IApiCategory>);