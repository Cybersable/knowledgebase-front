import { faker } from '@faker-js/faker/locale/en';
import { ICategory } from '@/entities/categories/model';

export const fakeCategories = (workspaceUuid: string): ICategory => {
  const title = faker.commerce.productMaterial();

  return {
    uuid: faker.string.uuid(),
    title,
    slug: title.toLowerCase().replace(' ', '-'),
    description: faker.lorem.paragraph(3),
    workspaceUuid,
  };
};

export const fakeCategoriesList = (workspaceUuid: string, count: number): Array<ICategory> => {
  const categoriesList = Array(count)
    .fill({})
    .map(() => fakeCategories(workspaceUuid))

  return categoriesList;
};