'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from 'notistack'
import { use, useEffect, useMemo } from 'react'

import WorkspacePageLoading from '@/app/managing/docs/workspaces/[workspaceId]/loading'
import { CategoryModel } from '@/entities/categories/model'
import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'
import CategoriesList from '@/features/categories/Grid'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import CategoriesCreeate from '@/widgets/managing-docs/categories/create'
import WorkspacesDeleteWidget from '@/widgets/managing-docs/workspaces/delete'
import WorkspacesEditWidget from '@/widgets/managing-docs/workspaces/edit'

const staticBreadcrumbs = [
  {
    key: routes.managingWorkspaces.key,
    title: 'Docs',
    href: routes.managingWorkspaces.path,
  }
]

export default function ManagingDocsWorkspacesPage({
  params,
}: {
  params: Promise<{
    workspaceId: string
  }>
}) {
  const { push } = useRouter()
  
  const { workspaceId } = use(params)
  const { workspace, workspaceError, workspaceLoading } = useWorkspacesGetQuery({
    workspaceId,
  })

  useEffect(() => {
    if (workspaceError) {
      push(routes.managingWorkspaces.path)
      enqueueSnackbar(workspaceError.message, { variant: 'error' })
    }
  }, [push, workspaceError])

  const breadcrumbs = useMemo(() => {
    if (!workspace) return staticBreadcrumbs

    return [
      ...staticBreadcrumbs,
      {
        key: workspace.id,
        title: workspace.title,
      }
    ]
  }, [workspace])

  const makePath = (category: CategoryModel) => {
    return routes.managingCategoriesUpdate({ categoryId: category.id }).path
  }

  if (workspaceLoading) return <WorkspacePageLoading />

  if (!workspace) return null

  return (
    <Stack id="docs-workspaces-page">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Box>
          <Typography variant="h4">
            {workspace.title}
          </Typography>
          <Typography>
            {workspace.summary}
          </Typography>
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={1}
        >
          <WorkspacesEditWidget workspace={workspace} />
          <WorkspacesDeleteWidget workspace={workspace} />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h6">
          Categories
        </Typography>
        <CategoriesCreeate workspaceId={workspace.id} />
      </Stack>
      <CategoriesList
        makePath={makePath}
        workspaceSlug={workspace.id}
      />
    </Stack>
  )
}