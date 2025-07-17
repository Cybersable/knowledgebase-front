'use client'

import Button from '@mui/material/Button'
import List from '@mui/material/List'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'

import { ArticlesModel } from '@/entities/articles/model'
import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import { NestedList, NestedListContainer } from '@/features/categories/tree/styled'
import routes from '@/services/routes-provider'
import { articlesQueryClientKeys } from '@/shared/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import { articlesRestApiService } from '@/shared/rest-api/articles'
import TreeItem from '@/shared/ui/tree-item'

export default function CategoriesTree({
  workspaceId,
  categoryId,
  articleId,
}: {
  workspaceId?: string;
  categoryId?: string;
  articleId?: string;
}) {
  const { categoriesList } = useCategoriesGetManyQuery({
    workspaceId,
    enabled: !!workspaceId,
    limit: '30',
    page: '1',
  })

  const [articlesList, setArticlesList] = useState<Record<string, ArticlesModel[]>>({})

  const queryClient = useQueryClient()
  const onCategoryClick = useCallback(async (categoryId: string) => {
    if (!categoryId) return

    const limit = '10'
    let page = '1'

    if (articlesList[categoryId]) {
      page = ((articlesList[categoryId].length / Number(limit)) + 1).toString()
    }

    const articlesQueryKey = articlesQueryClientKeys.getMany(filterQueryParams({
      workspaceId,
      categoryId,
      limit,
      page,
    }))

    const articles = await queryClient.fetchQuery({
      queryKey: articlesQueryKey,
      queryFn: ({ signal }: { signal: AbortController['signal'] }) => articlesRestApiService.getMany({
        categoryId,
        limit,
        page,
      }, signal),
    })

    setArticlesList((prevList) => ({
      ...prevList,
      [categoryId]: prevList[categoryId]
        ? [...prevList[categoryId], ...articles.data]
        : articles.data,
    }))
  }, [articlesList, queryClient, workspaceId])

  const [defaultOpenCategoryId, setDefaultOpenCategoryId] = useState('')
  const runOnMount = useCallback(() => {
    if (!categoryId) return

    onCategoryClick(categoryId)
    setDefaultOpenCategoryId(categoryId)
  }, [categoryId, onCategoryClick])

  useEffect(() => {
    runOnMount()
  }, [])

  return (
    <List>
      {categoriesList?.map((category) => (
        <TreeItem
          key={category.id}
          id={category.id}
          label={category.title}
          selected={!articleId && categoryId === category.id}
          defaultOpen={defaultOpenCategoryId === category.id}
          href={routes.docsCategories({
            workspaceSlug: category.workspaceId,
            categorySlug: category.id,
          }).path}
          onClick={onCategoryClick}
          canExpand={category.childrenCount > 0}
        >
          {articlesList[category.id] && (
            <NestedListContainer>
              <NestedList>
                {articlesList[category.id].map((article) => (
                  <TreeItem
                    href={routes.docsArticles({
                      workspaceSlug: category.workspaceId,
                      categorySlug: article.categoryId,
                      articleSlug: article.id,
                      articleId: article.id,
                    }).path}
                    key={article.id}
                    id={article.id}
                    label={article.title}
                    selected={article.id === articleId}
                  />
                ))}
                {
                  articlesList[category.id].length < category.childrenCount && (
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => onCategoryClick(category.id)}
                    >
                      Load more
                    </Button>
                  )
                }
              </NestedList>
            </NestedListContainer>
          )}
        </TreeItem>
      ))}
    </List>
  )
}