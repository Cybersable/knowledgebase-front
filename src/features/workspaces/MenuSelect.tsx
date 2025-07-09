'use client'

import { useMemo } from 'react'

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

  const workspacesOptions = useWorkspacesMenuSelectOptions(workspacesList)

  const defaultOption = useMemo(() => {
    if (!workspace) return

    return {
      value: workspace.id,
      label: workspace.title,
      subLabel: workspace.summary,
    }
  }, [workspace])

  return (
    <MenuSelect
      id={`${id}-workspaces-menu-select`}
      options={workspacesOptions}
      onChangeAction={onWorkspaceChangeAction}
      value={workspaceId}
      clearable
      defaultOption={defaultOption}
      emptyValue={{
        label: 'All Workspaces',
        subLabel: 'Select workspace',
      }}
    />
  )
}