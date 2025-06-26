'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  use,
  useCallback,
  useState
} from 'react'

import {
  useCategoriesDeleteMutation,
  useCategoriesGetQuery,
  useCategoriesUpdateMutation
} from '@/entities/categories/queries'
import CategoriesForm from '@/features/categories/form'
import Dialog from '@/shared/ui/dialog'

export default function CategoriesUpdatePage({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const { categoryId } = use(params)

  const { category } = useCategoriesGetQuery({ categoryId })

  const { updateCategory } = useCategoriesUpdateMutation({
    categoryId,
  })

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const { deleteCategory } = useCategoriesDeleteMutation({ categoryId })
  const handleDeleteCategory = useCallback(() => {
    deleteCategory()
    setDeletingDialogOpen(false)
  }, [deleteCategory])

  return (
    <Box id="managing-categories-update-page">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          gutterBottom>
          Update category
        </Typography>
        <Button
          variant="text"
          size="small"
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={() => setDeletingDialogOpen(true)}
        >
          Delete
        </Button>
        <Dialog
          title="Deleting category"
          content={`Delete "${category?.title}" category forever?`}
          open={deletingDialogOpen}
          onClose={() => setDeletingDialogOpen(false)}
          onSubmit={handleDeleteCategory}
        />
      </Stack>
      <CategoriesForm
        defaultValues={category}
        onSubmit={updateCategory}
      />
    </Box>
  )
}