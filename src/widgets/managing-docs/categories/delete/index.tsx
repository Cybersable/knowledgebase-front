'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { CategoryModel } from '@/entities/categories/model'
import { useCategoriesDeleteMutation } from '@/entities/categories/queries'
import routes from '@/services/routes-provider'
import Dialog from '@/shared/ui/dialog'

export default function CategoriesDeleteWidget({
  category,
}: {
  category: CategoryModel
}) {
  const { push } = useRouter()

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const { deleteCategoryAsync, deleteCategoryPending } = useCategoriesDeleteMutation({
    onSuccess: () => push(routes.managingWorkspaces.path),
  })
  const handleDeleteWorkspace = useCallback(async () => {
    await deleteCategoryAsync(category.id)
    setDeletingDialogOpen(false)
  }, [deleteCategoryAsync, category])

  return (
    <>
      <IconButton
        size="small"
        color="secondary"
        onClick={() => setDeletingDialogOpen(true)}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        title="Deleting workspace"
        content={`Delete "${category.title}" workspace, with their categories and articles forever?`}
        open={deletingDialogOpen}
        onCloseAction={() => setDeletingDialogOpen(false)}
        onSubmitAction={handleDeleteWorkspace}
        disabled={deleteCategoryPending}
        pending={deleteCategoryPending}
        submitBtnText={'Delete'}
      />
    </>
  )
}