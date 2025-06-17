import { faker } from '@faker-js/faker/locale/en';
import { CategoryModel } from '@/entities/categories/model';

export const fakeCategories = (workspaceId: string): CategoryModel => {
  const title = faker.commerce.productMaterial();

  return {
    id: faker.string.uuid(),
    title,
    slug: title.toLowerCase().replace(' ', '-'),
    workspaceId,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  };
};

export const fakeCategoriesList = (workspaceId: string, count: number): Array<CategoryModel> => {
  const categoriesList = Array(count)
    .fill({})
    .map(() => fakeCategories(workspaceId))

  return categoriesList;
};