'use client'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'
import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'
import routes from '@/services/routes-provider'
import { useManagingDocsSidebar } from '@/widgets/managing-docs/sidebar/useManagingDocsSidebar'

export default function ManagingDocsSidebar() {
  const { push } = useRouter()
  const { segmentWorkspaceId } = useManagingDocsSidebar()
  
  const [workspaceId, setWorkspaceId] = useState('')
  const { workspace } = useWorkspacesGetQuery({ workspaceId: segmentWorkspaceId })

  const { categoriesList } = useCategoriesGetManyQuery({
    workspaceId,
    enabled: !!workspaceId,
  })

  useEffect(() => {
    setWorkspaceId(segmentWorkspaceId ?? '')
  }, [segmentWorkspaceId])

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    if (workspaceId) {
      setWorkspaceId(workspaceId)
      push(routes.managingWorkspacesUpdate({ workspaceSlug: workspaceId }).path)
    } else {
      setWorkspaceId('')
      push(routes.managingWorkspaces.path)
    }
  }, [push])

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection="column"
    >
      <WorkspacesMenuSelect
        id="managing-docs-workspaces"
        workspace={workspace}
        workspaceId={workspaceId}
        onWorkspaceChangeAction={handleWorkspaceChange}
      />
      <List>
        {workspaceId && categoriesList?.map((category) => (
          <ListItem
            key={category.id}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              LinkComponent={Link}
              href={routes.managingCategoriesUpdate({
                categoryId: category.id,
              }).path}
            >
              <ListItemText primary={category.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}