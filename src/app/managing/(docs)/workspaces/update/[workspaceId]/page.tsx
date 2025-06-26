'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import {
  use,
  useCallback,
  useState
} from 'react'

import {
  useWorkspacesDeleteMutation,
  useWorkspacesGetQuery
} from '@/entities/workspaces/queries'
import WorkspacesForm from '@/features/workspaces/form'
import routes from '@/services/routes-provider'
import Dialog from '@/shared/ui/dialog'

export default function WorkspacesUpdatePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>
}) {
  const { back, push } = useRouter()

  const { workspaceId } = use(params)

  const { workspace } = useWorkspacesGetQuery({ workspaceId })

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const { deleteWorkspaceAsync, deleteWorkspacePending } = useWorkspacesDeleteMutation({
    onSuccess: () => push(routes.managingWorkspaces.path),
  })
  const handleDeleteWorkspace = useCallback(async () => {
    await deleteWorkspaceAsync(workspaceId)
    setDeletingDialogOpen(false)
  }, [deleteWorkspaceAsync, workspaceId])

  return (
    <Box id="managing-workspaces-update-page">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          gutterBottom>
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
          content={`Delete "${workspace?.title}" workspace, with their categories and articles forever?`}
          open={deletingDialogOpen}
          onCloseAction={() => setDeletingDialogOpen(false)}
          onSubmitAction={handleDeleteWorkspace}
          disabled={deleteWorkspacePending}
          pending={deleteWorkspacePending}
          submitBtnText={'Delete'}
        />
      </Stack>
      <WorkspacesForm
        workspaceId={workspaceId}
        defaultValues={workspace}
        onCancelAction={back}
      />
    </Box>
  )
}
