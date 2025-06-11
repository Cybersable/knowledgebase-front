'use client';

import { useMemo } from 'react';

import routes from '@/services/routes-provider';
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SummaryList from '@/shared/ui/summary-list';

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
    <Box id="managing-workspaces-page">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
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
  );
}