'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'

import CategoriesForm from '@/features/categories/form'
import routes from '@/services/routes-provider'

export default function CategoriesCreatePage() {
  const { back, push } = useRouter()
  const searchParams = useSearchParams()
  const workspaceId = searchParams.get('workspaceId') ?? ''

  return (
    <Box id="categories-create-page">
      <Typography
        variant="h4"
        gutterBottom
      >
        Add new category
      </Typography>
      <CategoriesForm
        onSuccessAction={() => push(routes.managingCategories({
          workspaceId,
        }).path)}
        onCancelAction={back}
        defaultValues={{
          workspaceId,
        }}
      />
    </Box>
  )
}
