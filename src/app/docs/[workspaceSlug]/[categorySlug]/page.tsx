import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { categoriesRestApiService } from '@/shared/rest-api/categories';

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string
    categorySlug: string
  }>
}) {
  const { categorySlug } = await params;

  const category = await categoriesRestApiService.getBySlug(categorySlug);

  return (
    <Box id="categories-page">
      <Typography variant="h2" gutterBottom>
        {category?.title}
      </Typography>
      <Typography gutterBottom>
        {category?.content}
      </Typography>
    </Box>
  )
}