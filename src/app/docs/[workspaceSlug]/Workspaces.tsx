'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useWorkspacesGetBySlugQuery } from '@/queries/workspaces/useWorkspacesGetBySlugQuery';

export default function Workspaces({
  workspaceSlug,
}: {
  workspaceSlug: string
}) {
  const { workspace } = useWorkspacesGetBySlugQuery(workspaceSlug);

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        {workspace?.title}
      </Typography>
      <Typography gutterBottom>
        {workspace?.summary}
      </Typography>
      <Typography gutterBottom>
        {workspace?.content}
      </Typography>
    </Box>
  )
}