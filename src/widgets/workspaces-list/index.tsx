'use client'

import Box from '@mui/material/Box'
import { useMemo } from 'react'

import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'
import SummaryList from '@/shared/ui/summary-list'

export default function WorkspacesList() {
  const {
    workspacesList,
    workspacesListLoading,
  } = useWorkspacesGetManyQuery({
    limit: '50',
  })

  const summaryList = useMemo(() =>
    workspacesList?.map(({ id, title, summary }) =>
      ({
        id,
        title,
        summary,
        href: `/docs/${id}`,
      })), [workspacesList])

  return (
    <Box
      id="categories-list"
    >
      <SummaryList
        list={summaryList}
        loading={workspacesListLoading}
        emptyPlaceholder="Categories list is empty."
      />
    </Box>
  )
}