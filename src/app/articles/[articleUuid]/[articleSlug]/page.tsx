import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {articlesApi} from "@/shared/api/queries/articles";

export default async function ArticlesPage({
  params
}: {
  params: Promise<{ articleUuid: string, articlesSlug: string }>
}) {
  const { articleUuid } = await params;

  const article = await articlesApi.get({ uuid: articleUuid });

  return (
    <Box id="articles">
      <Typography variant="h2" gutterBottom>
        {article?.title}
      </Typography>
      <Typography>
        {article?.content}
      </Typography>
    </Box>
  )
}