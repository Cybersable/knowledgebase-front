'use client'

import Typography from '@mui/material/Typography'

import { WorkspacesModel } from '@/entities/workspaces/model'
import WorkspacesForm from '@/features/workspaces/form'
import AppModal from '@/shared/ui/app-modal'

export default function WorkspacesEditModal({
  workspace,
  open,
  handleClose,
}: {
  workspace: WorkspacesModel
  open: boolean
  handleClose: () => void
}) {
  return (
    <AppModal
      open={open}
      onClose={handleClose}
    >
      <Typography variant="h4">
        Editing workspace
      </Typography>
      <WorkspacesForm
        workspaceId={workspace.id}
        defaultValues={workspace}
        onCancelAction={handleClose}
        onSuccessAction={handleClose}
      />
    </AppModal>
  )
}