import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {articlesApi} from "@/shared/api/queries/articles";
import {categoriesApi} from "@/shared/api/queries/categories";
import {workspacesApi} from "@/shared/api/queries/workspaces";

const getDocument = async ({ articleUuid, categoryUuid, workspaceUuid }: { articleUuid: string, categoryUuid: string, workspaceUuid: string }) => {
  if (articleUuid) {
    return await articlesApi.get({ uuid: articleUuid });
  }

  if (categoryUuid) {
    return await categoriesApi.get({ uuid: categoryUuid });
  }

  if (workspaceUuid) {
    return await workspacesApi.get({ uuid: workspaceUuid });
  }
}

export default async function DocsPage({
  params,
}: Readonly<{
  params: Promise<{ uuid?: string[] }>
}>) {
  const { uuid } = await params;

  if (!uuid) return (<></>);

  const [workspaceUuid, categoryUuid, articleUuid] = uuid;

  const entity = await getDocument({ articleUuid, categoryUuid, workspaceUuid });

  return (
    <>
      <Box>
        <Typography variant="h2" gutterBottom>
          {entity?.title}
        </Typography>
        {entity && 'content' in entity &&
					<Typography gutterBottom>
            {entity.content}
					</Typography>
        }
        {entity && 'description' in entity &&
					<Typography gutterBottom>
            {entity.description}
					</Typography>
        }
      </Box>
      <Divider />
      <Box>
        <Typography variant="h4" gutterBottom>
          What is Lorem Ipsum?
        </Typography>
        <Typography gutterBottom>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Typography>
        <Typography gutterBottom>
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Typography>
      </Box>

      {/*<Grid container spacing={4} columns={12} sx={{ my: 2 }}>*/}
      {/*  {articlesList?.map((item) => (*/}
      {/*    <Grid key={item.uuid} size={{ xs: 12, sm: 6, lg: 4 }}>*/}
      {/*      <TextCard*/}
      {/*        href={`/docs/articles/${item.uuid}/${item.slug}`}*/}
      {/*        title={item.title}*/}
      {/*        description={item.content}*/}
      {/*      />*/}
      {/*    </Grid>*/}
      {/*  ))}*/}
      {/*</Grid>*/}
    </>
  )
}