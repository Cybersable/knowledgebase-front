import { useSelectedLayoutSegments } from 'next/navigation'
import { useMemo } from 'react'

import { useArticlesGetQuery } from '@/entities/articles/queries'
import { useCategoriesGetQuery } from '@/entities/categories/queries'
import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'

const segments = {
  articles: 'articleId',
  categories: 'categoryId',
  workspaces: 'workspaceId',
} as const

type Segment = keyof typeof segments

export const useManagingDocsSideNav = () => {
  const [segment, segmentId] = useSelectedLayoutSegments()

  const selectedSegmentId = useMemo(() => {
    if (segment && segmentId && segment in segments) {
      return {
        [segments[segment as Segment]]: segmentId,
      }
    }

    return
  }, [segment, segmentId])

  const { article } = useArticlesGetQuery({ articleId: selectedSegmentId?.articleId })
  const { category } = useCategoriesGetQuery({
    categoryId: selectedSegmentId?.categoryId,
  })
  const { workspace } = useWorkspacesGetQuery({
    workspaceId: selectedSegmentId?.workspaceId,
  })

  const segmentParams = useMemo(() => {
    if (article) {
      return {
        articleId: article.id,
        categoryId: article.categoryId,
        workspaceId: article.workspaceId,
      }
    }

    if (category) {
      return {
        categoryId: category.id,
        workspaceId: category.workspaceId,
      }
    }

    if (workspace) {
      return {
        workspaceId: workspace.id,
      }
    }

    return
  }, [article, category, workspace])

  return {
    segmentWorkspaceId: segmentParams?.workspaceId,
  }
}