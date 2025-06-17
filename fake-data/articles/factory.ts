import { faker } from '@faker-js/faker/locale/en';
import { ArticleModel } from '@/entities/articles/model';

export const fakeArticles = (workspaceId: string, categoryId: string): ArticleModel => {
  const title = faker.commerce.productName();
  const updatedAt = faker.date.recent();

  return {
    id: faker.string.uuid(),
    title,
    slug: title.toLowerCase().replaceAll(' ', '-'),
    content: faker.lorem.paragraph(5),
    workspaceId,
    categoryId,
    updatedAt,
  }
}

export const fakeArticlesList = (workspaceId: string, categoryId: string, count: number): Array<ArticleModel> => {
  return Array(count)
    .fill({})
    .map(() => fakeArticles(workspaceId, categoryId));
}