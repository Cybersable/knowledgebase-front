import { WorkspacesRestApiService } from '@/shared/rest-api/workspaces/WorkspacesRestApiService';
import { restApi } from '@/shared/rest-api/api';
import BaseQueryClientKeysService from '@/shared/rest-api/api/BaseQueryClientKeysService';
import BaseQueryClientService from '@/shared/rest-api/api/BaseQueryClientService';

export const workspacesRestApiService = new WorkspacesRestApiService({
  client: restApi,
  resource: 'workspaces',
});

export const workspacesQueryClientKeys = new BaseQueryClientKeysService({
  resource: 'workspaces',
});

export const workspacesQueryClientService = new BaseQueryClientService({
  resource: 'workspaces',
  restApiService: workspacesRestApiService,
  queryClientKey: workspacesQueryClientKeys,
});