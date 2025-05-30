import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { categoriesApi } from '@/shared/api/queries/categories';

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string
    categorySlug: string
  }>
}) {
  const { categorySlug } = await params;

  const category = await categoriesApi.get({ uuid: categorySlug });

  return (
    <Box id="categories-page">
      <Typography variant="h2" gutterBottom>
        {category?.title}
      </Typography>
      <Typography gutterBottom>
        {category?.description}
      </Typography>
    </Box>
  )
}