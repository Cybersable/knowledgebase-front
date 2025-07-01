'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import WorkspacesForm from '@/features/workspaces/form'
import routes from '@/services/routes-provider'

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

export default function CreateWorkspacesModalForm() {
  const { push } = useRouter()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <WorkspacesForm
            onSuccessAction={() => push(routes.managingWorkspaces.path)}
            onCancelAction={handleClose}
          />
        </Box>
      </Modal>
    </>
  )
}