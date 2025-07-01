'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { useState } from 'react'

import { WorkspacesModel } from '@/entities/workspaces/model'
import CategoriesForm from '@/features/categories/form'

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

export default function CreateCategoryModalForm({
  workspaceId,
}: {
  workspaceId?: WorkspacesModel['id']
}) {
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
        Create Category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CategoriesForm
            defaultValues={{
              workspaceId,
            }}
            onSuccessAction={handleClose}
            onCancelAction={handleClose}
          />
        </Box>
      </Modal>
    </>
  )
}