import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { workspacesApi } from '@/shared/api/queries/workspaces';

export default async function WorkspacesPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>
}) {
  const { workspaceSlug } = await params;

  const workspace = await workspacesApi.get({ uuid: workspaceSlug });

  return (
    <Box id="workspaces-page">
      <Typography variant="h2" gutterBottom>
        {workspace?.title}
      </Typography>
      <Typography gutterBottom>
        {workspace?.description}
      </Typography>
    </Box>
  )
}