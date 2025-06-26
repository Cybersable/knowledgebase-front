'use client'

import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import {
  use,
  useCallback,
  useState
} from 'react'

import {
  useCategoriesDeleteMutation,
  useCategoriesGetQuery
} from '@/entities/categories/queries'
import CategoriesForm from '@/features/categories/form'
import Dialog from '@/shared/ui/dialog'

export default function CategoriesUpdatePage({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const { back } = useRouter()
  
  const { categoryId } = use(params)

  const { category } = useCategoriesGetQuery({ categoryId })

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false)
  const {
    deleteCategoryAsync,
    deleteCategoryPending,
  } = useCategoriesDeleteMutation({
    onSuccess: back,
  })
  const handleDeleteCategory = useCallback(async () => {
    await deleteCategoryAsync(categoryId)

    setDeletingDialogOpen(false)
  }, [deleteCategoryAsync, categoryId])

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
          content={`Delete "${category?.title}" category, with their articles forever?`}
          open={deletingDialogOpen}
          onCloseAction={() => setDeletingDialogOpen(false)}
          onSubmitAction={handleDeleteCategory}
          disabled={deleteCategoryPending}
          pending={deleteCategoryPending}
          submitBtnText={'Delete'}
        />
      </Stack>
      <CategoriesForm
        categoryId={categoryId}
        defaultValues={category}
        onCancelAction={back}
      />
    </Box>
  )
}