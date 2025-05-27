import articlesList from '@/generated-fake-data/articles.json';

export interface IApiArticle {
  uuid: string
  title: string
  slug: string
  content?: string
  categoryUuid: string
  createdAt: Date
  updatedAt: Date
}

class Articles {
  constructor(list: Array<IApiArticle>) {
    this.list = list
  }

  list: Array<IApiArticle>

  getAll(): Promise<Array<IApiArticle>> {
    return new Promise(resolve => resolve(this.list));
  }

  get({ uuid }: { uuid?: string }): Promise<IApiArticle | undefined> {
    return new Promise((resolve, reject) => {
      const category = this.list.find((item) => item.uuid === uuid)

      if (!category) reject();

      resolve(category);
    });
  }
}

export const articlesApi = new Articles(articlesList as Array<IApiArticle>);