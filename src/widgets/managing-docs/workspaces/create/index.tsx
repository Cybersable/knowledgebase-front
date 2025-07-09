'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import WorkspacesForm from '@/features/workspaces/form'
import AppModal from '@/shared/ui/app-modal'
import { useAppModal } from '@/shared/ui/hooks'

export default function WorkspacesCreateWidget() {
  const { open, handleOpen, handleClose } = useAppModal()

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        endIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create workspace
      </Button>
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
    </>
  )
}