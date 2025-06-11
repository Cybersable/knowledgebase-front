'use client';

import {
  use,
  useCallback,
  useState
} from 'react';
import {
  useArticlesGetQuery,
  useArticlesUpdateMutation,
  useArticlesDeleteMutation,
} from '@/entities/articles/queries';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticlesForm from '@/features/articles/form';
import Dialog from '@/shared/ui/dialog';

export default function ArticlesUpdatePage({
  params,
}: {
  params: Promise<{ articleId: string }>
}) {
  const { articleId } = use(params);

  const { article } = useArticlesGetQuery({ articleId });

  const { updateArticle } = useArticlesUpdateMutation({
    articleId,
  });

  const [deletingDialogOpen, setDeletingDialogOpen] = useState(false);
  const { deleteArticle } = useArticlesDeleteMutation({ articleId });
  const handleDeleteArticle = useCallback(() => {
    deleteArticle();
    setDeletingDialogOpen(false);
  }, [deleteArticle]);

  return (
    <Box id="articles-update-page">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Add new article
        </Typography>
        <Button
          variant="text"
          size="small"
          color="primary"
          endIcon={<DeleteIcon />}
          onClick={() => setDeletingDialogOpen(true)}
        >
          Delete
        </Button>
        <Dialog
          title="Deleting article"
          content={`Delete "${article?.title}" article forever?`}
          open={deletingDialogOpen}
          onClose={() => setDeletingDialogOpen(false)}
          onSubmit={handleDeleteArticle}
        />
      </Stack>
      <ArticlesForm
        defaultValues={article}
        onSubmit={updateArticle}
      />
    </Box>
  );
}
