'use client'

import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api'
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'
import MenuSelect from '@/shared/ui/menu-select'

export default function WorkspacesMenuSelect({
  id,
  workspaceId = '',
  onWorkspaceChangeAction,
}: {
  id: string
  workspaceId: string
  onWorkspaceChangeAction: (workspaceId: string) => void
}) {
  const { workspacesList } = useWorkspacesGetManyQuery()

  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList)

  return (
      <MenuSelect
        id={`${id}-workspaces-menu-select`}
        options={workspacesOptions}
        onChange={onWorkspaceChangeAction}
        value={workspaceId}
        clearable
        emptyValue={{
          label: 'All Workspaces',
          subLabel: 'Select workspace',
        }}
      />
  )
}