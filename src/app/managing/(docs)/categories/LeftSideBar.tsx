'use client'

import Stack from '@mui/material/Stack'
import {
  useRouter,
  useSearchParams
} from 'next/navigation'
import {
  useCallback,
  useMemo
} from 'react'

import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'

export default function CategoriesLeftSideBar() {
  const { replace } = useRouter()

  const searchParams = useSearchParams()

  const { workspaceId } = useMemo(() => {
    return {
      workspaceId: searchParams.get('workspaceId') ?? '',
    }
  }, [searchParams])

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    if (!workspaceId) return replace(`?`)

    replace(`?workspaceId=${workspaceId}`)
  }, [replace])

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