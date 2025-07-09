
import { WorkspacesModel } from '@/entities/workspaces/model'
import { useWorkspacesDeleteMutation } from '@/entities/workspaces/queries'
import Dialog from '@/shared/ui/dialog'

export default function WorkspacesDeleteDialog({
  open,
  workspace,
  onSuccessAction,
  onCloseAction,
}: {
  open: boolean
  workspace: WorkspacesModel
  onSuccessAction: () => void
  onCloseAction: () => void
}) {
  const { deleteWorkspace, deleteWorkspacePending } = useWorkspacesDeleteMutation({
    onSuccess: onSuccessAction,
  })

  return (
    <Dialog
      title="Deleting workspace"
      content={`Delete "${workspace?.title}" workspace, with their categories and articles forever?`}
      open={open}
      onCloseAction={onCloseAction}
      onSubmitAction={() => deleteWorkspace(workspace.id)}
      disabled={deleteWorkspacePending}
      pending={deleteWorkspacePending}
      submitBtnText={'Delete'}
    />
  )
}