'use client'

import List from '@mui/material/List'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { ArticlesModel } from '@/entities/articles/model'
import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
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
  })

  const [articlesList, setArticlesList] = useState<Record<string, ArticlesModel[]>>({})

  const queryClient = useQueryClient()
  const onCategoryClick = useCallback(async (categoryId: string) => {
    if (!categoryId) return

    const articlesQueryKey = articlesQueryClientKeys.getMany(filterQueryParams({
      categoryId,
    }))

    const articles = await queryClient.fetchQuery({
      queryKey: articlesQueryKey,
      queryFn: () => articlesRestApiService.getMany({
        categoryId,
      }),
    })

    setArticlesList((prevList) => ({
      ...prevList,
      [categoryId]: articles.data,
    }))
  }, [queryClient])

  return (
    <List>
      {categoriesList?.map((category) => (
        <TreeItem
          key={category.id}
          id={category.id}
          label={category.title}
          selected={!articleId && categoryId === category.id}
          href={routes.docsCategories({
            workspaceSlug: category.workspaceId,
            categorySlug: category.id,
          }).path}
          onClick={onCategoryClick}
          canExpand={category.childrenCount > 0}
        >
          {articlesList[category.id] && (
            <List>
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
            </List>
          )}
        </TreeItem>
      ))}
    </List>
  )
}