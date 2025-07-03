'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'
import TextCard from '@/shared/ui/text-card'

export default function Workspaces({
  pathPrefix,
}: {
  pathPrefix: string
}) {
  const { workspacesList } = useWorkspacesGetManyQuery({})

  return (
    <Box id="workspaces">
      <Grid
        container
        spacing={2}
        columns={12}
      >
        {workspacesList?.map((workspace) => (
          <Grid
            key={workspace.id}
            size={6}
          >
            <Box
              height={110}
            >
              <TextCard
                title={workspace.title}
                description={workspace.summary}
                href={`${pathPrefix}/${workspace.id}`}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}