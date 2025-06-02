import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { workspacesQueryClientKeys } from '@/queries/workspaces/api';
import { workspacesRestApiService } from '@/shared/rest-api/workspaces';
import Typography from '@mui/material/Typography';

export default async function WorkspacesPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>
}) {
  const { workspaceSlug } = await params;

  const queryClient = new QueryClient();

  const workspace = await queryClient.fetchQuery({
    queryKey: workspacesQueryClientKeys.getBySlug(workspaceSlug),
    queryFn:() => workspacesRestApiService.getBySlug(workspaceSlug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Typography variant="h2" gutterBottom>
        {workspace?.title}
      </Typography>
      <Typography gutterBottom>
        {workspace?.summary}
      </Typography>
      <Typography gutterBottom>
        {workspace?.content}
      </Typography>
    </HydrationBoundary>
  );
}