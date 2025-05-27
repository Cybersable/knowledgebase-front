import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { workspacesApi } from '@/shared/api/queries/workspaces';
import Grid from "@mui/material/Grid";
import TextCard from "@/shared/ui/text-card";

export default async function WorkspacesPage() {
  const workspacesList = await workspacesApi.getAll();

  return (
    <Box id="workspaces">
      <Typography variant="h2" gutterBottom>
        Workspaces
      </Typography>
      <Grid container spacing={4} columns={12} sx={{ my: 4 }}>
        {workspacesList.map((item) => (
          <Grid key={item.uuid} size={{ xs: 12, sm: 6 }}>
            <TextCard
              href={`/workspaces/${item.uuid}/${item.slug}`}
              title={item.title}
              description={item.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}