'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Suspense } from 'react'

import { CategoryModel } from '@/entities/categories/model'
import CategoriesList from '@/features/categories/Grid'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import CategoriesCreateWidget from '@/widgets/managing-docs/categories/create'

const staticBreadcrumbs = [
  {
    key: routes.managingWorkspaces.key,
    title: 'Docs',
    href: routes.managingWorkspaces.path,
  },
  {
    key: 'categories',
    title: 'Categories',
  }
]

export default function DocsManagingCategoriesPage() {
  const makePath = (category: CategoryModel) => {
    return routes.managingCategoriesUpdate({ categoryId: category.id }).path
  }

  return (
    <Stack id="managing-docs-categories-page">
      <Breadcrumbs breadcrumbs={staticBreadcrumbs} />
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h4">
          Managing Categories
        </Typography>
        <CategoriesCreateWidget />
      </Stack>
      <Suspense>
        <CategoriesList makePath={makePath} />
      </Suspense>
    </Stack>
  )
}