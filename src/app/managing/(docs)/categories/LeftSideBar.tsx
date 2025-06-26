'use client'

import Stack from '@mui/material/Stack'
import {
  useRouter,
  useSearchParams, useSelectedLayoutSegment
} from 'next/navigation'
import {
  useCallback, useEffect,
  useMemo, useState
} from 'react'

import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'

export default function CategoriesLeftSideBar() {
  const { replace } = useRouter()

  const [workspaceId, setWorkspaceId] = useState('')

  const segment = useSelectedLayoutSegment()
  const canUseQueryParams = useMemo(() => {
    return !segment
  }, [segment])

  const searchParams = useSearchParams()
  useEffect(() => {
    if (!canUseQueryParams) return

    setWorkspaceId(searchParams.get('workspaceId') ?? '')
  }, [canUseQueryParams, searchParams])

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    setWorkspaceId(workspaceId)
  }, [])

  useEffect(() => {
    if (!canUseQueryParams) return

    if (!workspaceId) {
      return replace(`?`)
    }

    replace(`?workspaceId=${workspaceId}`)
  }, [replace, workspaceId, canUseQueryParams])

  return (
    <Stack>
      <WorkspacesMenuSelect
        id="docs-side-nav-workspaces"
        workspaceId={workspaceId}
        onWorkspaceChangeAction={handleWorkspaceChange}
      />
    </Stack>
  )
}