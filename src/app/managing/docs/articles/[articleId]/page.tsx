'use client'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { use } from 'react'

import { useArticlesGetQuery } from '@/entities/articles/queries'
import ArticlesForm from '@/features/articles/Form'
import ArticlesDeleteWidget from '@/widgets/articles/delete'

export default function ArticlesUpdatePage({
  params,
}: {
  params: Promise<{ articleId: string }>
}) {
  const { back } = useRouter()

  const { articleId } = use(params)

  const { article } = useArticlesGetQuery({ articleId })

  return (
    <Box id="articles-update-page">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          Update article
        </Typography>
        {article && (
          <ArticlesDeleteWidget article={article} />
        )}
      </Stack>
      <ArticlesForm
        articleId={articleId}
        defaultValues={article}
        onCancelAction={back}
      />
    </Box>
  )
}
