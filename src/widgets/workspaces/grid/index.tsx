'use client'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { ChangeEvent, useCallback, useMemo } from 'react'

import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'
import { filterQueryParams } from '@/shared/queries/filterQueryParams'
import TextCard from '@/shared/ui/text-card'

export default function Workspaces({
  pathPrefix,
}: {
  pathPrefix: string
}) {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const {
    limit,
    page,
  } = useMemo(() => {
    return {
      limit: searchParams.get('limit') ?? '10',
      page: searchParams.get('page') ?? '1',
    }
  }, [searchParams])

  const {
    workspacesList,
    workspacesListTotal,
    workspacesListLoading,
  } = useWorkspacesGetManyQuery({
    limit,
    page,
  })

  const onPageChange = useCallback((event: ChangeEvent<unknown>, page: number) => {
    const queryParams = filterQueryParams({
      limit,
      page: page.toString(),
    })

    push(`?${queryString.stringify(queryParams)}`)
  }, [limit, push])

  return (
    <Box id="workspaces">
      <Grid
        container
        spacing={2}
        columns={12}
      >
        {workspacesList?.map((workspace) => (
          <Grid
            key={workspace.id}
            size={6}
          >
            <Box
              height={110}
            >
              <TextCard
                title={workspace.title}
                description={workspace.summary}
                href={`${pathPrefix}/${workspace.id}`}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {workspacesListTotal !== undefined
        && workspacesListTotal > 1
        && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 4,
            justifyContent: 'center',
          }}>
            <Pagination
              disabled={workspacesListLoading}
              count={workspacesListTotal}
              page={Number(page)}
              onChange={onPageChange}
            />
          </Box>
        )}
    </Box>
  )
}