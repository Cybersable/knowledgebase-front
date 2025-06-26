'use client'

import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useMemo } from 'react'

import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'
import routes from '@/services/routes-provider'
import SummaryList from '@/shared/ui/summary-list'

export default function ManagingDocsWorkspacesPage() {
  const { workspacesList } = useWorkspacesGetManyQuery()

  const summaryList = useMemo(() => {
    return workspacesList?.map((workspace) => ({
      id: workspace.id,
      title: workspace.title,
      summary: workspace.summary,
      href: routes.workspacesUpdate({ workspaceId: workspace.id }).path,
    }))
  }, [workspacesList])

  return (
    <Box id="managing-workspaces-page">
      <Stack
        direction="row"
        justifyContent="space-between">
        <Typography
          variant="h4"
          gutterBottom>
          Managing Workspaces
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          endIcon={<AddIcon />}
          LinkComponent={Link}
          href={routes.workspacesCreate.path}
        >
          Create workspace
        </Button>
      </Stack>
      <SummaryList list={summaryList} />
    </Box>
  )
}