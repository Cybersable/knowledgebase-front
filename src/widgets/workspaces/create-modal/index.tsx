'use client'

import Typography from '@mui/material/Typography'

import WorkspacesForm from '@/features/workspaces/form'
import AppModal from '@/shared/ui/app-modal'

const WorkspacesCreateModal = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) => {
  return (
    <AppModal
      open={open}
      onClose={handleClose}
    >
      <Typography variant="h4">
        Creating workspace
      </Typography>
      <WorkspacesForm
        onSuccessAction={handleClose}
        onCancelAction={handleClose}
      />
    </AppModal>
  )
}

export default WorkspacesCreateModal
