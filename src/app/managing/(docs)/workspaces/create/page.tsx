'use client';

import { useWorkspacesCreateMutation } from '@/entities/workspaces/queries';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkspacesForm from '@/features/workspaces/form';

export default function WorkspacesCreatePage() {
  const { createWorkspace } = useWorkspacesCreateMutation();

  return (
    <Box id="managing-docs-workspaces-create-page">
      <Typography variant="h4" gutterBottom>
        Add new workspace
      </Typography>
      <WorkspacesForm
        onSubmit={createWorkspace}
      />
    </Box>
  );
}