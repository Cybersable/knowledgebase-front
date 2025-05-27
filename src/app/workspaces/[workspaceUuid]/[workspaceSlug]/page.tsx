import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { workspacesApi } from "@/shared/api/queries/workspaces";
import { categoriesApi } from "@/shared/api/queries/categories";
import Grid from "@mui/material/Grid";
import TextCard from "@/shared/ui/text-card";

export default async function WorkspacesPage({
  params
}: {
  params: Promise<{ workspaceUuid: string, workspaceSlug: string }>
}) {
  const { workspaceUuid } = await params;

  const workspace = await workspacesApi.get({ uuid: workspaceUuid });

  const categoriesFilteredList = await categoriesApi.getAll().then((categoriesList) => {
    return categoriesList.filter((category) => category.workspaceUuid === workspace?.uuid);
  });

  return (
    <Box id="workspaces-categories">
      <Typography variant="h2" gutterBottom>
        {workspace?.title}
      </Typography>
      <Typography gutterBottom>
        {workspace?.description}
      </Typography>
      <Typography variant="h4">
        Categories
      </Typography>
        {categoriesFilteredList && workspace &&
					<Grid container spacing={4} columns={12} sx={{ my: 2 }}>
            {categoriesFilteredList.map((item) => (
              <Grid key={item.uuid} size={{ xs: 12, sm: 6, lg: 4 }}>
                <TextCard
                  href={`/categories/${item.uuid}/${item.slug}`}
                  title={item.title}
                  description={item.description}
                />
              </Grid>
            ))}
					</Grid>
        }
    </Box>
  )
}