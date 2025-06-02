import WorkspacesQueryClientKeys from '@/queries/workspaces/api/WorkspacesQueryClientKeys';
import WorkspacesQueryClientService from "@/queries/workspaces/api/WorkspacesQueryClientService";
import {workspacesRestApiService} from "@/shared/rest-api/workspaces";

export const workspacesQueryClientKeys = new WorkspacesQueryClientKeys({
  resource: 'workspaces',
});

export const workspacesQueryClientService = new WorkspacesQueryClientService({
  resource: 'workspaces',
  restApiService: workspacesRestApiService,
  queryClientKey: workspacesQueryClientKeys,
});