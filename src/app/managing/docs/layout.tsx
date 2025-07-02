'use client'

import { useSelectedLayoutSegments } from 'next/navigation'
import { ReactNode, Suspense, useMemo } from 'react'

import { useArticlesGetQuery } from '@/entities/articles/queries'
import { useCategoriesGetQuery } from '@/entities/categories/queries'
import { useWorkspacesGetQuery } from '@/entities/workspaces/queries'
import MainLayout from '@/widgets/layouts/main-layout'
import ManagingDocsMenu from '@/widgets/managing-docs-menu'
import ManagingDocsSideNav from '@/widgets/managing-docs-side-nav'

const segments = {
  articles: 'articleId',
  categories: 'categoryId',
  workspaces: 'workspaceId',
} as const

type Segment = keyof typeof segments

export default function ManagingDocsLayout({
  children,
}: {
  children: ReactNode
}) {
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


  return (
    <MainLayout
      id="managing-docs-workspaces-layout"
      leftChildren={(
        <Suspense>
          <ManagingDocsSideNav
            segmentWorkspaceId={segmentParams?.workspaceId}
            segmentCategoryId={segmentParams?.categoryId}
          />
        </Suspense>
      )}
      rightChildren={(<ManagingDocsMenu />)}
    >
      {children}
    </MainLayout>
  )
}

