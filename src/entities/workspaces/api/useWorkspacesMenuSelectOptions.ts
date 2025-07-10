import { useMemo } from 'react'

import { makeWorkspacesOptions, TWorkspaceOption } from '@/entities/workspaces/model/makeWorkspacesOptions'
import { withSelectedOptions } from '@/shared/ui/api/withSelectedOption'

export const useWorkspacesMenuSelectOptions = (
  list?: Array<TWorkspaceOption>,
  workspace?: TWorkspaceOption
) => {
  return useMemo(() => {
    if (!list) {
      if (!workspace) return []

      return makeWorkspacesOptions([workspace])
    }

    if (!workspace) return makeWorkspacesOptions(list)

    return withSelectedOptions(
      makeWorkspacesOptions([workspace]),
      makeWorkspacesOptions(list)
    )
  }, [list, workspace])
}
