import BaseQueryClientService, {BaseQueryClientServiceParams} from '@/queries/api/BaseQueryClientService';
import { WorkspacesModel, WorkspacesModelInput } from '@/shared/rest-api/workspaces/WorkspacesRestApiService';

export default class WorkspacesQueryClientService
  extends BaseQueryClientService<WorkspacesModel, WorkspacesModelInput>

  {
  constructor(params: BaseQueryClientServiceParams<WorkspacesModel, WorkspacesModelInput>) {
    super(params);
  }
}