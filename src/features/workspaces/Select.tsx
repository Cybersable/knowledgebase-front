'use client'

import MenuItem from '@mui/material/MenuItem'
import Select, {
  SelectChangeEvent,
  SelectProps
} from '@mui/material/Select'
import {
  useCallback
} from 'react'

import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api'
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'

export default function WorkspacesSelect({
  id = 'workspaces-select',
  name = 'workspaces-select',
  size,
  required,
  workspaceId = '',
  onWorkspaceChangeAction,
}: {
  id: string
  name: string
  required: SelectProps['required']
  size: SelectProps['size']
  workspaceId: string
  onWorkspaceChangeAction: (workspaceId: string) => void
}) {
  const { workspacesList } = useWorkspacesGetManyQuery({})

  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList)

  const handleWorkspaceChange = useCallback((event: SelectChangeEvent) => {
    const value = event.target.value as string

    onWorkspaceChangeAction(value)
  }, [onWorkspaceChangeAction])

  return (
    <Select
      id={id}
      name={name}
      size={size}
      required={required}
      value={workspaceId}
      label="Workspace"
      onChange={handleWorkspaceChange}
    >
      {workspacesOptions?.map((option) => (
        <MenuItem
          value={option.value}
          key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}