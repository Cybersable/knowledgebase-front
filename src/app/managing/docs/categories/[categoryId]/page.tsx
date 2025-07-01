'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { use, useMemo } from 'react'

import DeleteCategoriesDialog from '@/app/managing/docs/categories/[categoryId]/DeleteCategoriesDialog'
import EditCategoriesModalForm from '@/app/managing/docs/categories/[categoryId]/EditCategoriesModalForm'
import { useCategoriesGetQuery } from '@/entities/categories/queries'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import DocsList from '@/widgets/docs-list'


const staticBreadcrumbs = [
  {
    key: routes.managingWorkspaces.key,
    title: 'Docs',
    href: routes.managingWorkspaces.path,
  }
]

export default function DocsManagingCategoryPage({
  params,
}: {
  params: Promise<{
    categoryId: string
  }>
}) {
  const { categoryId } = use(params)
  const { category } = useCategoriesGetQuery({ categoryId })

  const breadcrumbs = useMemo(() => {
    if (!category) return staticBreadcrumbs

    return [
      ...staticBreadcrumbs,
      {
        key: category.workspaceId,
        title: category.workspaceTitle,
        href: `/managing/docs/workspaces/${category.workspaceId}`,
      },
      {
        key: category.id,
        title: category.title,
      }
    ]
  }, [category])

  if (!category) return

  return (
    <Stack id="managing-docs-category-page">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Box>
          <Typography variant="h4">
            {category.title}
          </Typography>
          <Typography>
            {category.summary}
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={1}
        >
          <EditCategoriesModalForm category={category} />
          <DeleteCategoriesDialog category={category} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h6">
            Articles
        </Typography>
      </Stack>
      <DocsList
        pathPrefix={'/managing/docs/articles/'}
        workspaceSlug={category.workspaceId}
        categorySlug={category.id}
      />
    </Stack>
  )
}