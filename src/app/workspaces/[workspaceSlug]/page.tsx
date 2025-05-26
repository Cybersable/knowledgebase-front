import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoriesGrid from "@/entities/categories/ui/grid";
import {workspacesList} from "@/entities/workspaces/model/workspaces";
import {categoriesList} from "@/entities/categories/model/categories";

export default async function WorkspacesPage({
  params
}: {
  params: Promise<{ workspaceSlug: string }>
}) {
  const { workspaceSlug } = await params;

  const workspace = workspacesList.find((item) => item.slug === workspaceSlug);

  const categoriesFilteredList = categoriesList.filter((category) => category.workspaceId === workspace?.id);

  return (
    <Box id="workspaces-categories">
      <Typography variant="h2" gutterBottom>
        {workspace?.title}
      </Typography>
      <Typography>
        {workspace?.description}
      </Typography>

      <Typography variant="h3" gutterBottom>
        Categories
      </Typography>
        {categoriesFilteredList && workspace &&
          <CategoriesGrid list={categoriesFilteredList} workspaceSlug={workspace.slug} />
        }
    </Box>
  )
}