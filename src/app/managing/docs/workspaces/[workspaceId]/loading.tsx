import { Box, Skeleton } from '@mui/material'
import Stack from '@mui/material/Stack'

export default function WorkspacePageLoading() {
  return (
    <Stack id="docs-workspaces-loading-page">
      <Box
        py={1}
      >
        <Skeleton
          variant="rounded"
          height={22}
          width="90%"
        />
      </Box>
      <Stack
        my={2}
      >
        <Box
          py={0.5}
        >
          <Skeleton
            variant="rounded"
            height={30}
            width="50%"
          />
        </Box>
        <Skeleton
          variant="rounded"
          height={19}
          width="70%"
        />
      </Stack>
    </Stack>
  )
}