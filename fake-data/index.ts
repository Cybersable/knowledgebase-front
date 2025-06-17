import { fakeWorkspacesList } from './workspaces/factory';
import { fakeCategoriesList } from './categories/factory';
import { fakeArticlesList } from './articles/factory';
import { writeFileSync, mkdirSync, existsSync, rmSync } from 'fs';

const GENERATED_FAKE_DATA_DIR_PATH = './src/generated-fake-data';

const JSONToFile = (obj: Object, filename: string) =>
  writeFileSync(`${filename}.json`, JSON.stringify(obj, null, 2));

export default function generateFakeData() {
  const workspaces = fakeWorkspacesList(15);
  const categories = workspaces.map((workspace) => {
    return fakeCategoriesList(workspace.id, 10);
  }).flat();
  const articles = categories.map((category) => {
    return fakeArticlesList(category.workspaceId, category.id, 20);
  }).flat();

  if (existsSync(GENERATED_FAKE_DATA_DIR_PATH)) {
    rmSync(GENERATED_FAKE_DATA_DIR_PATH, { recursive: true });
  }

  mkdirSync(GENERATED_FAKE_DATA_DIR_PATH, { recursive: true });

  JSONToFile(workspaces, `${GENERATED_FAKE_DATA_DIR_PATH}/workspaces`);
  JSONToFile(categories, `${GENERATED_FAKE_DATA_DIR_PATH}/categories`);
  JSONToFile(articles, `${GENERATED_FAKE_DATA_DIR_PATH}/articles`);

  console.log('Fake data generated success!');
};

generateFakeData();