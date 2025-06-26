'use client'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import {
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment
} from 'next/navigation'
import {
  useCallback,
  useEffect, useMemo,
  useState
} from 'react'

import {
  useArticlesGetManyQuery,
  useArticlesGetQuery
} from '@/entities/articles/queries'
import CategoriesMenuSelect from '@/features/categories/MenuSelect'
import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'
import routes from '@/services/routes-provider'

export default function DocsSideNav() {
  const { replace } = useRouter()

  const [workspaceId, setWorkspaceId] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const articleId = useSelectedLayoutSegment()
  const canUseQueryParams = useMemo(() => {
    return !articleId
  }, [articleId])

  const { article } = useArticlesGetQuery({ articleId })

  useEffect(() => {
    if (article) {
      setWorkspaceId(article.workspaceId)
      setCategoryId(article.categoryId)
    }
  }, [article])

  const { articlesList } = useArticlesGetManyQuery({
    workspaceId,
    categoryId,
    limit: '10',
    page: '1',
  })

  const searchParams = useSearchParams()
  useEffect(() => {
    if (!canUseQueryParams) return

    const [queryWorkspaceId, queryCategoryId] = [
      searchParams.get('workspaceId'),
      searchParams.get('categoryId')
    ]

    setWorkspaceId(queryWorkspaceId ?? '')
    setCategoryId(queryCategoryId ?? '')
  }, [canUseQueryParams, searchParams])

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    setCategoryId('')
    setWorkspaceId(workspaceId)
  }, [])

  useEffect(() => {
    if (!canUseQueryParams) return

    if (!workspaceId) {
      return replace(`?`)
    }

    if (!categoryId) {
      return replace(`?workspaceId=${workspaceId}`)
    }

    replace(`?workspaceId=${workspaceId}&categoryId=${categoryId}`)
  }, [workspaceId, categoryId, canUseQueryParams, replace])

  return (
    <Box
      id="docs-side-nav"
      display="flex"
      gap={2}
      flexDirection="column">
      <WorkspacesMenuSelect
        id="docs-side-nav-workspaces"
        workspaceId={workspaceId}
        onWorkspaceChangeAction={handleWorkspaceChange}
      />
      <CategoriesMenuSelect
        id="docs-side-nav-categories"
        workspaceId={workspaceId}
        categoryId={categoryId}
        onCategoryChangeAction={setCategoryId}
      />
      <List>
        {articlesList?.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              LinkComponent={Link}
              href={routes.docsArticles({
                articleId: item.id,
                articleSlug: item.slug,
              }).path}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
