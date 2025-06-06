import { faker } from '@faker-js/faker/locale/en';
import { WorkspacesModel } from '@/entities/workspaces/model';

export interface FakeWorkspaceModel 
  extends Pick<WorkspacesModel, 'id' | 'title' | 'slug' | 'summary'> {}

export const fakeWorkspaces = (): FakeWorkspaceModel => {
  const title = faker.commerce.department();

  return {
    id: faker.string.uuid(),
    title,
    slug: title.toLowerCase().replace(' ', '-'),
    summary: faker.lorem.paragraph(1),
  };
};

export const fakeWorkspacesList = (count: number): Array<FakeWorkspaceModel> => {
  return Array(count)
      .fill({})
      .map(fakeWorkspaces);
};