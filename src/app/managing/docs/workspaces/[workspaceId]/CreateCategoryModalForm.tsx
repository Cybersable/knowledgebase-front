'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { useState } from 'react'

import { WorkspacesModel } from '@/entities/workspaces/model'
import CategoriesForm from '@/features/categories/form'
import AppModal from '@/shared/ui/app-modal'

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
      <AppModal
        open={open}
        onClose={handleClose}
      >
        <CategoriesForm
          defaultValues={{
            workspaceId,
          }}
          onSuccessAction={handleClose}
          onCancelAction={handleClose}
        />
      </AppModal>
    </>
  )
}