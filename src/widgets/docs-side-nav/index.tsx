'use client'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import {
  useRouter
} from 'next/navigation'
import {
  useCallback, useEffect,
  useState
} from 'react'

import { useCategoriesGetManyQuery } from '@/entities/categories/queries'
import WorkspacesMenuSelect from '@/features/workspaces/MenuSelect'

export default function DocsSideNav({
  workspaceSlug,
  categorySlug,
}: {
  workspaceSlug?: string
  categorySlug?: string
}) {
  const { push } = useRouter()

  const [workspaceId, setWorkspaceId] = useState('')

  useEffect(() => {
    setWorkspaceId(workspaceSlug ?? '')
  }, [workspaceSlug])

  const handleWorkspaceChange = useCallback((workspaceId: string) => {
    setWorkspaceId(workspaceId)
    push(`/docs/${workspaceId}`)
  }, [push])

  const { categoriesList } = useCategoriesGetManyQuery({ workspaceId })

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
      <List>
        {categoriesList?.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              LinkComponent={Link}
              href={`/docs/${item.workspaceId}/${item.id}`}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
