import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { categoriesApi } from '@/shared/api/queries/categories';
import Grid from '@mui/material/Grid';
import TextCard from '@/shared/ui/text-card';
import { articlesApi } from '@/shared/api/queries/articles';

export default async function CategoriesArticlesPage({
  params
}: {
  params: Promise<{ categoryUuid: string, categorySlug: string }>
}) {
  const { categoryUuid } = await params;

  const [category, subCategoriesList, articlesList] = await Promise.all([
    categoriesApi.get({ uuid: categoryUuid }),
    categoriesApi.getAll()
      .then((data) => data.filter((item) => item.categoryUuid === categoryUuid)),
    articlesApi.getAll()
      .then((data) => data.filter((item) => item.categoryUuid === categoryUuid)),
  ]);

  return (
    <Box id="categories-articles">
      <Typography variant="h2" gutterBottom>
        {category?.title}
      </Typography>
      <Typography>
        {category?.description}
      </Typography>
      {!!subCategoriesList.length &&
        <>
					<Typography variant="h4">
						SubCategories
					</Typography>
					<Grid container spacing={4} columns={12} sx={{ my: 2 }}>
            {subCategoriesList?.map((item) => (
              <Grid key={item.uuid} size={{ xs: 12, sm: 6, lg: 4 }}>
                <TextCard
                  href={`/categories/${item.uuid}/${item.slug}`}
                  title={item.title}
                  description={item.description}
                />
              </Grid>
            ))}
					</Grid>
        </>
      }
      <Typography variant="h4">
        Articles
      </Typography>
      <Grid container spacing={4} columns={12} sx={{ my: 2 }}>
        {articlesList?.map((item) => (
          <Grid key={item.uuid} size={{ xs: 12, sm: 6, lg: 4 }}>
            <TextCard
              href={`/articles/${item.uuid}/${item.slug}`}
              title={item.title}
              description={item.content}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}