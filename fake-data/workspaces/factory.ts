import { faker } from '@faker-js/faker/locale/en';
import { IWorkspace } from '@/entities/workspaces/model';

export const fakeWorkspaces = (): IWorkspace => {
  const title = faker.commerce.department();

  return {
    uuid: faker.string.uuid(),
    title,
    slug: title.toLowerCase(),
    description: faker.lorem.paragraph(3),
  };
};

export const fakeWorkspacesList = (count: number): Array<IWorkspace> => {
  return Array(count)
      .fill({})
      .map(fakeWorkspaces);
};