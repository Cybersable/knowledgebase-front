'use client'

import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

import { WorkspacesModel } from '@/entities/workspaces/model'
import WorkspacesForm from '@/features/workspaces/form'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function EditWorkspacesModalForm({
  workspace,
}: {
  workspace: WorkspacesModel
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        color="primary"
      >
        <EditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <WorkspacesForm
            workspaceId={workspace.id}
            defaultValues={workspace}
            onCancelAction={handleClose}
            onSuccessAction={handleClose}
          />
        </Box>
      </Modal>
    </>
  )
}