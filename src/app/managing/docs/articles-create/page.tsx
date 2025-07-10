'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'

import { ArticlesModel } from '@/entities/articles/model'
import { useCategoriesGetQuery } from '@/entities/categories/queries'
import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'
import ArticlesForm from '@/features/articles/form'
import routes from '@/services/routes-provider'

function ArticlesCreate() {
  const { back, push } = useRouter()
  
  const searchParams = useSearchParams()

  const params = {
    workspaceId: searchParams.get('workspaceId') ?? '',
    categoryId: searchParams.get('categoryId') ?? '',
  }

  const { workspace } = useWorkspacesGetQuery({
    workspaceId: params.workspaceId,
  })
  const { category } = useCategoriesGetQuery({
    categoryId: params.categoryId,
  })

  const onSuccessAction = useCallback((article: ArticlesModel) =>
    push(routes.managingCategoriesUpdate({
      categoryId: article.categoryId,
    }).path), [push])

  return (
    <Box id="articles-create-page">
      <Typography
        variant="h4"
        gutterBottom
      >
        Add new article
      </Typography>
      <ArticlesForm
        workspace={workspace}
        category={category}
        onSuccessAction={onSuccessAction}
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