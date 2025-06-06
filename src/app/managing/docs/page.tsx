import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ManagingDocsMenu from "@/app/managing/docs/ManagingDocsMenu";

export default function ManagingDocsPage() {
  return (
    <Box id="managing-docs-page">
      <Typography variant="h4" gutterBottom>
        Managing docs
      </Typography>
      <ManagingDocsMenu />
    </Box>
  );
}