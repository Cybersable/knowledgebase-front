import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import WorkspacesGrid from '@/entities/workspaces/ui/grid';
import { workspacesList } from "@/entities/workspaces/model/workspaces";

export default function WorkspacesPage() {
  return (
    <Box id="workspaces">
      <Typography variant="h2" gutterBottom>
        Workspaces
      </Typography>
      <WorkspacesGrid list={workspacesList} />
    </Box>
  );
}