'use client';

import { useMemo } from 'react';
import routes from '@/services/routes-provider';
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries';

import SummaryList from '@/shared/ui/summary-list';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ManagingDocsWorkspacesPage() {
  const { workspacesList } = useWorkspacesGetManyQuery();

  const summaryList = useMemo(() => {
    return workspacesList?.map((workspace) => ({
      id: workspace.id,
      title: workspace.title,
      summary: workspace.summary,
      href: routes.workspacesUpdate({ workspaceId: workspace.id }).path,
    }))
  }, [workspacesList]);

  return (
    <Box id="managing-docs-workspaces-page">
      <Typography variant="h4" gutterBottom>
        Managing Workspaces
      </Typography>
      <SummaryList list={summaryList} />
    </Box>
  );
}