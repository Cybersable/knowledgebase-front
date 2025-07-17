import DocumentScannerIcon from '@mui/icons-material/DocumentScanner'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useState } from 'react'

import { useArticlesGetManyQuery } from '@/entities/articles/queries'
import routes from '@/services/routes-provider'
import AppModal from '@/shared/ui/app-modal'
import { useAppModal } from '@/shared/ui/hooks'

export default function DocsSearching() {
  const { open, handleOpen, handleClose } = useAppModal()

  const [search, setSearch] = useState<string>('')
  const { articlesList, articlesListLoading } = useArticlesGetManyQuery({
    search,
    limit: '5',
    enabled: open && search.trim().length >= 3,
  })

  const onClose = () => {
    handleClose()
    setSearch('')
  }

  return (
    <>
      <TextField
        id="search-hero"
        hiddenLabel
        size="small"
        variant="outlined"
        aria-label="Enter your question"
        placeholder="How does it works?"
        fullWidth
        onClick={handleOpen}
      />
      <AppModal
        open={open}
        onClose={onClose}
      >
        <Stack
          gap={2}
          sx={{ width: '600px' }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <FindInPageIcon
              fontSize="large"
            />
            <TextField
              variant="standard"
              placeholder="Search for articles, categories, workspaces, etc."
              size="medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
              fullWidth
            />
            <Chip
              label="esc"
              onClick={handleClose} />
          </Stack>
          {
            !articlesListLoading && articlesList?.length === 0 && (
              <Box>
                <Typography>
                  No resent searches
                </Typography>
              </Box>
            )
          }
          {
            !!articlesList?.length && (
              <List>
                {articlesList.map((article) => (
                  <ListItem
                    key={article.id}
                    disablePadding
                  >
                    <ListItemButton
                      LinkComponent={Link}
                      href={routes.docsArticles({
                        workspaceSlug: article.workspaceId,
                        categorySlug: article.categoryId,
                        articleSlug: article.id,
                        articleId: article.id,
                      }).path}
                    >
                      <ListItemIcon>
                        <DocumentScannerIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={article.title}
                        secondary={article.summary} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )
          }
        </Stack>
      </AppModal>
    </>
  )
}