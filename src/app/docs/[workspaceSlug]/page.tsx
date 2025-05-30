import Box from '@mui/material/Box';
import {
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { useWorkspacesGetBySlugPrefetchQuery } from '@/queries/workspaces/useWorkspacesGetBySlugPrefetchQuery';
import Workspaces from "@/app/docs/[workspaceSlug]/Workspaces";

export default async function WorkspacesPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>
}) {
  const { workspaceSlug } = await params;

  if (!workspaceSlug) return;

  const { queryClient } = await useWorkspacesGetBySlugPrefetchQuery(workspaceSlug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box id="workspaces-page">
        <Workspaces workspaceSlug={workspaceSlug} />
      </Box>
    </HydrationBoundary>
  )
}