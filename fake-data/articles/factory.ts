import { faker } from '@faker-js/faker/locale/en';
import { IArticle } from '@/entities/articles/model';

export const fakeArticles = (categoryUuid: string): IArticle => {
  const title = faker.commerce.productName();
  const updatedAt = faker.date.recent();

  return {
    uuid: faker.string.uuid(),
    title,
    slug: title.toLowerCase().replaceAll(' ', '-'),
    content: faker.lorem.paragraph(5),
    categoryUuid,
    createdAt: faker.date.recent({ days: 5, refDate: updatedAt }),
    updatedAt,
  }
}

export const fakeArticlesList = (categoryUuid: string, count: number): Array<IArticle> => {
  return Array(count)
    .fill({})
    .map(() => fakeArticles(categoryUuid));
}