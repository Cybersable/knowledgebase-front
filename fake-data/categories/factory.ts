import { faker } from '@faker-js/faker/locale/en';
import { ICategory } from '@/entities/categories/model';

export const fakeCategories = (workspaceUuid: string, categoryUuid?: string): ICategory => {
  const title = faker.commerce.productMaterial();

  return {
    uuid: faker.string.uuid(),
    title,
    slug: title.toLowerCase().replace(' ', '-'),
    description: faker.lorem.paragraph(3),
    workspaceUuid,
    categoryUuid: categoryUuid ?? null,
  };
};

export const fakeSubCategories = (category: ICategory): ICategory => {
  return fakeCategories(category.workspaceUuid, category.uuid);
};

export const fakeCategoriesList = (workspaceUuid: string, count: number): Array<ICategory> => {
  const categoriesList = Array(count)
    .fill({})
    .map(() => fakeCategories(workspaceUuid))

  const subCategories = categoriesList
    .map((category) => Array(count / 2)
      .fill({})
      .map(() => fakeSubCategories(category))
    );

  return categoriesList.concat(subCategories.flat());
};