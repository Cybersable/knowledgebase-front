'use client'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CreateCategoryModalForm from '@/app/managing/docs/workspaces/[workspaceId]/CreateCategoryModalForm'
import { CategoryModel } from '@/entities/categories/model'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import CategoriesList from '@/widgets/categories-list'

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
    return routes.managingCategoriesUpdate({ id: category.id }).path
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
          Categories
        </Typography>
        <CreateCategoryModalForm />
      </Stack>
      <CategoriesList
        makePath={makePath}
      />
    </Stack>
  )
}