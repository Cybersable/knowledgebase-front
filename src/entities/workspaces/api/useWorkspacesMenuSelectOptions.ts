import { useMemo } from 'react'

import { WorkspacesModel } from '@/entities/workspaces/model'

export const useWorkspacesMenuSelectOptions = (
  list?: Array<Pick<WorkspacesModel, 'id' | 'title' | 'summary'>>
) => {
  return useMemo(() => {
    return list?.map((item) => {
      return {
        value: item.id,
        label: item.title,
        subLabel: item.summary,
      }
    })
  }, [list])
}
