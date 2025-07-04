import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'

import { CategoryModel } from '@/entities/categories/model'
import CategoriesForm from '@/features/categories/form'
import AppModal from '@/shared/ui/app-modal'

export default function EditCategoriesModalForm({
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
        <CategoriesForm
          categoryId={category.id}
          defaultValues={category}
          onCancelAction={handleClose}
        />
      </AppModal>
    </>
  )
}