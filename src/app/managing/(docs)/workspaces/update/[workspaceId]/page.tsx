'use client';

import {
  use,
  useCallback,
  useState
} from 'react';
import {
  useWorkspacesGetQuery,
  useWorkspacesUpdateMutation,
  useWorkspacesDeleteMutation,
} from '@/entities/workspaces/queries';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkspacesForm from '@/features/workspaces/form';
import Dialog from '@/shared/ui/dialog';

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

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false);
  const { deleteWorkspace } = useWorkspacesDeleteMutation({ workspaceId });
  const handleDeleteWorkspace = useCallback(() => {
    deleteWorkspace();
    setDeletingDialogOpen(false);
  }, [deleteWorkspace]);

  return (
    <Box id="managing-workspaces-update-page">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Update workspace
        </Typography>
        <Button
          variant="text"
          size="small"
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={() => setDeletingDialogOpen(true)}
        >
          Delete
        </Button>
        <Dialog
          title="Deleting workspace"
          content={`Delete "${workspace?.title}" workspace forever?`}
          open={deletingDialogOpen}
          onClose={() => setDeletingDialogOpen(false)}
          onSubmit={handleDeleteWorkspace}
        />
      </Stack>
      <WorkspacesForm
        defaultValues={workspace}
        onSubmit={updateWorkspace}
      />
    </Box>
  );
}
