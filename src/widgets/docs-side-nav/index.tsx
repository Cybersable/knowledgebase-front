'use client'

import Box from '@mui/material/Box'
import {
  useRouter,
  useSearchParams
} from 'next/navigation'
import {
  useCallback,
  useEffect,
  useState
} from 'react'

import {
  useArticlesGetQuery
} from '@/entities/articles/queries'
import CategoriesMenuSelect from '@/features/categories/MenuSelect'
import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'

export default function DocsSideNav({
  articleId = '',
  canUseQueryParams,
}: {
  articleId?: string
  canUseQueryParams?: boolean
}) {
  const { replace } = useRouter()

  const [workspaceId, setWorkspaceId] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const { article } = useArticlesGetQuery({ articleId })

  useEffect(() => {
    if (article) {
      setWorkspaceId(article.workspaceId)
      setCategoryId(article.categoryId)
    }
  }, [article])

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
      {/*<List>*/}
      {/*  {articlesList?.map((item) => (*/}
      {/*    <ListItem*/}
      {/*      key={item.id}*/}
      {/*      disablePadding*/}
      {/*      sx={{ display: 'block' }}*/}
      {/*    >*/}
      {/*      <ListItemButton*/}
      {/*        LinkComponent={Link}*/}
      {/*        href={routes.docsArticles({*/}
      {/*          articleId: item.id,*/}
      {/*          articleSlug: item.slug,*/}
      {/*        }).path}*/}
      {/*      >*/}
      {/*        <ListItemText primary={item.title} />*/}
      {/*      </ListItemButton>*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </Box>
  )
}
