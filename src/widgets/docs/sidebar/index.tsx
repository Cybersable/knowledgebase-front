'use client'

import Box from '@mui/material/Box'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'
import CategoriesTree from '@/features/categories/tree'
import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'
import routes from '@/services/routes-provider'

export default function DocsSideNav() {
  const [workspaceSlug, categorySlug, articleSlug] = useSelectedLayoutSegments()
  const { push } = useRouter()

  const [workspaceId, setWorkspaceId] = useState('')
  const { workspace } = useWorkspacesGetQuery({ workspaceId: workspaceSlug })

  useEffect(() => {
    setWorkspaceId(workspaceSlug ?? '')
  }, [workspaceSlug])

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    if (workspaceId) {
      setWorkspaceId(workspaceId)
      push(routes.docsWorkspaces({ workspaceSlug: workspaceId }).path)
    } else {
      setWorkspaceId('')
      push(routes.docs.path)
    }
  }, [push])

  return (
    <Box
      id="docs-side-nav"
      display="flex"
      gap={2}
      flexDirection="column"
    >
      <WorkspacesMenuSelect
        id="docs-side-nav-workspaces"
        workspace={workspace}
        workspaceId={workspaceId}
        onWorkspaceChangeAction={handleWorkspaceChange}
      />
      <CategoriesTree
        workspaceId={workspaceId}
        categoryId={categorySlug}
        articleId={articleSlug}
      />
    </Box>
  )
}
