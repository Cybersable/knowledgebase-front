'use client'


import { useWorkspacesMenuSelectOptions } from '@/entities/workspaces/api'
import { WorkspacesModel } from '@/entities/workspaces/model'
import { useWorkspacesGetManyQuery } from '@/entities/workspaces/queries'
import MenuSelect from '@/shared/ui/menu-select'

export default function WorkspacesMenuSelect({
  workspace,
  id,
  workspaceId = '',
  onWorkspaceChangeAction,
}: {
  workspace?: WorkspacesModel
  id: string
  workspaceId: string
  onWorkspaceChangeAction: (workspaceId: string) => void
}) {
  const { workspacesList } = useWorkspacesGetManyQuery({})

  const workspacesOptions = useWorkspacesMenuSelectOptions(
    workspacesList,
    workspace
  )

  return (
    <MenuSelect
      id={`${id}-workspaces-menu-select`}
      options={workspacesOptions}
      onChangeAction={onWorkspaceChangeAction}
      value={workspaceId}
      clearable
      emptyValue={{
        label: 'All Workspaces',
        subLabel: 'Select workspace',
      }}
    />
  )
}