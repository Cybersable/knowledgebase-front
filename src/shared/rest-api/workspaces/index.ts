import { WorkspacesRestApiService } from '@/shared/rest-api/workspaces/WorkspacesRestApiService';
import { restApi } from '@/shared/rest-api/api';

export const workspacesRestApiService = new WorkspacesRestApiService({
  client: restApi,
  resource: 'workspaces',
});