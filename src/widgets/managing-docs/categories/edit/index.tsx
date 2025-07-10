import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

import { CategoryModel } from '@/entities/categories/model'
import CategoriesForm from '@/features/categories/form'
import AppModal from '@/shared/ui/app-modal'

export default function CategoriesEditWidget({
  category,
}: {
  category: CategoryModel
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
      <AppModal
        open={open}
        onClose={handleClose}
      >
        <Typography variant="h4">
          Editing category
        </Typography>
        <CategoriesForm
          workspace={{
            id: category.workspaceId,
            title: category.workspaceTitle,
          }}
          categoryId={category.id}
          defaultValues={category}
          onCancelAction={handleClose}
          onSuccessAction={handleClose}
        />
      </AppModal>
    </>
  )
}