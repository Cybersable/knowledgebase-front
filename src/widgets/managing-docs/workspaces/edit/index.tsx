'use client'

import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { WorkspacesModel } from '@/entities/workspaces/model'
import WorkspacesForm from '@/features/workspaces/form'
import AppModal from '@/shared/ui/app-modal'
import { useAppModal } from '@/shared/ui/hooks'

export default function WorkspacesEditWidget({
  workspace,
}: {
  workspace: WorkspacesModel
}) {
  const { open, handleOpen, handleClose } = useAppModal()

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        color="primary"
      >
        <EditIcon />
      </IconButton>
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
    </>
  )
}