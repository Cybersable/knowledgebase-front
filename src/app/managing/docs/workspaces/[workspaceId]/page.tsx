'use client'

import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { use, useMemo } from 'react'

import CreateCategoryModalForm from '@/app/managing/docs/workspaces/[workspaceId]/CreateCategoryModalForm'
import DeleteWorkspacesDialog from '@/app/managing/docs/workspaces/[workspaceId]/DeleteWorkspacesDialog'
import { CategoryModel } from '@/entities/categories/model'
import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'
import routes from '@/services/routes-provider'
import Breadcrumbs from '@/shared/ui/breadcrumbs'
import { useAppModal } from '@/shared/ui/hooks/useAppModal'
import CategoriesList from '@/widgets/categories-list'
import WorkspacesEditModal from '@/widgets/workspaces/edit-modal'

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
  const { workspaceId } = use(params)
  const { workspace } = useWorkspacesGetQuery({ workspaceId })

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

  const {
    open: openWorkspacesEditModal,
    handleOpen: onOpenWorkspacesEditModal,
    handleClose: onCloseWorkspacesEditModal,
  } = useAppModal()

  if (!workspace) return

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
          <IconButton
            onClick={onOpenWorkspacesEditModal}
            size="small"
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <WorkspacesEditModal
            workspace={workspace}
            open={openWorkspacesEditModal}
            handleClose={onCloseWorkspacesEditModal}
          />
          <DeleteWorkspacesDialog workspace={workspace} />
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
        <CreateCategoryModalForm
          workspaceId={workspace.id}
        />
      </Stack>
      <CategoriesList
        makePath={makePath}
        workspaceSlug={workspace.id}
      />
    </Stack>
  )
}