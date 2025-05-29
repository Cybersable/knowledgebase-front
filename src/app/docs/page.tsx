import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

export default function DocsPage() {
  return (
    <Box id="docs-page">
      <Typography variant="h2">
        <Skeleton />
      </Typography>
      <Typography gutterBottom>
        <Skeleton />
      </Typography>
    </Box>
  );
}