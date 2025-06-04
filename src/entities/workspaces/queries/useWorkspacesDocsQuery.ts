import { useQuery } from '@tanstack/react-query';

import { workspacesQueryClientKeys } from '@/shared/queries';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';

export const useWorkspacesDocsQuery = () => {
  const { data } = useQuery({
    queryKey: workspacesQueryClientKeys.getDocs(),
    queryFn: () => workspacesRestApiService.getDocs(),
  })

  return {
    workspacesDocsList: data,
  }
}