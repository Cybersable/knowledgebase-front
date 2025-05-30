import { restApiMethods } from '@/shared/rest-api/api';
import {
  CreateWorkspaceData,
  GetManyWorkspaceResponse,
  GetWorkspaceResponse,
  UpdateWorkspaceData,
} from '@/shared/rest-api/workspaces/api';

export class WorkspacesRestApiService {
  private BASE_URL = '/workspaces';

  get(id: string) {
    return restApiMethods.get<GetWorkspaceResponse>(`${this.BASE_URL}/${id}`);
  }

  getBySlug(slug: string) {
    return restApiMethods.get<GetWorkspaceResponse>(`${this.BASE_URL}/slug/${slug}`);
  }

  getMany() {
    return restApiMethods.get<GetManyWorkspaceResponse>(this.BASE_URL);
  }

  createTask(data: CreateWorkspaceData) {
    return restApiMethods.post(this.BASE_URL, data);
  }

  updateTask(id: string, data: UpdateWorkspaceData) {
    return restApiMethods.patch(`${this.BASE_URL}/${id}`, data);
  }

  deleteTask(id: string) {
    return restApiMethods.del(`${this.BASE_URL}/${id}`);
  }
}