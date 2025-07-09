'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CategoryModel } from '@/entities/categories/model'
import CategoriesDeleteDialog from '@/features/categories/DeleteDialog'
import routes from '@/services/routes-provider'

export default function CategoriesDeleteWidget({
  category,
}: {
  category: CategoryModel
}) {
  const { push } = useRouter()
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        size="small"
        color="secondary"
        onClick={() => setOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <CategoriesDeleteDialog
        category={category}
        open={open}
        onSuccessAction={() => push(routes.managingWorkspaces.path)}
        onCloseAction={() => setOpen(false)}
      />
    </>
  )
}