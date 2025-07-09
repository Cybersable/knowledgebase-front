'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import ArticlesForm from '@/features/articles/Form'
import routes from '@/services/routes-provider'

function ArticlesCreate() {
  const { back, push } = useRouter()
  
  const searchParams = useSearchParams()

  const params = {
    workspaceId: searchParams.get('workspaceId') ?? '',
    categoryId: searchParams.get('categoryId') ?? '',
  }

  return (
    <Box id="articles-create-page">
      <Typography
        variant="h4"
        gutterBottom
      >
        Add new article
      </Typography>
      <ArticlesForm
        onSuccessAction={() => push(routes.managingArticles(params).path)}
        onCancelAction={back}
        defaultValues={params}
      />
    </Box>
  )
}

export default function ArticlesCreatePage() {
  return (
    <Suspense>
      <ArticlesCreate />
    </Suspense>
  )
}