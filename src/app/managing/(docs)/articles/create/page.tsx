'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { useArticlesCreateMutation } from '@/entities/articles/queries'
import ArticlesForm from '@/features/articles/form'

export default function ArticlesCreatePage() {
  const { createArticle } = useArticlesCreateMutation()

  return (
    <Box id="articles-create-page">
      <Typography
        variant="h4"
        gutterBottom>
        Add new article
      </Typography>
      <ArticlesForm
        onSubmit={createArticle}
      />
    </Box>
  )
}