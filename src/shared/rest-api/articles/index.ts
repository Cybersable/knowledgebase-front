import { restApi } from '@/shared/rest-api/api';
import { ArticlesRestApiService } from './ArticlesRestApiService';

export type {
  ArticlesApiModel,
  ArticlesApiModelInput
} from './ArticlesRestApiService';

export const articlesRestApiService = new ArticlesRestApiService({
  client: restApi,
  resource: 'articles',
});