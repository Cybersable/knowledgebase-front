'use client';

import { use } from 'react';
import {
  useWorkspacesGetQuery,
  useWorkspacesUpdateMutation
} from '@/entities/workspaces/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkspacesForm from '@/features/workspaces/form';

export default function WorkspacesUpdatePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const { workspaceId } = use(params);
  const { workspace } = useWorkspacesGetQuery({ workspaceId });
  const { updateWorkspace } = useWorkspacesUpdateMutation({
    workspaceId,
  });

  return (
    <Box id="managing-docs-workspaces-update-page">
      <Typography variant="h4" gutterBottom>
        Update workspace
      </Typography>
      <WorkspacesForm
        defaultValues={workspace}
        onSubmit={updateWorkspace}
      />
    </Box>
  );
}