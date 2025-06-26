import { restApi } from '@/shared/rest-api/api'
import { WorkspacesRestApiService } from '@/shared/rest-api/workspaces/WorkspacesRestApiService'

export type {
  WorkspacesApiModel,
  WorkspacesApiModelInput
} from './WorkspacesRestApiService'

export const workspacesRestApiService = new WorkspacesRestApiService({
  client: restApi,
  resource: 'workspaces',
})