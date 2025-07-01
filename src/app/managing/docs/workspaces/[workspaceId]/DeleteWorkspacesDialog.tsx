import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { WorkspacesModel } from '@/entities/workspaces/model'
import { useWorkspacesDeleteMutation } from '@/entities/workspaces/queries'
import routes from '@/services/routes-provider'
import Dialog from '@/shared/ui/dialog'

export default function DeleteWorkspacesDialog({
  workspace,
}: {
  workspace: WorkspacesModel
}) {
  const { push } = useRouter()
  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const { deleteWorkspaceAsync, deleteWorkspacePending } = useWorkspacesDeleteMutation({
    onSuccess: () => push(routes.managingWorkspaces.path),
  })
  const handleDeleteWorkspace = useCallback(async () => {
    await deleteWorkspaceAsync(workspace.id)
    setDeletingDialogOpen(false)
  }, [deleteWorkspaceAsync, workspace.id])

  return (
    <>
      <IconButton
        size="small"
        color="secondary"
        onClick={() => setDeletingDialogOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
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
    </>
  )
}