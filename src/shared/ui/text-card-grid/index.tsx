import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import TextCard from '@/shared/ui/text-card'

export default function TextCardGrid({
  id,
  list,
}: {
  id: string
  list: Array<{
    key: string
    title: string
    summary?: string
    href: string
  }>
}) {
  return (
    <Grid
      id={id}
      container
      spacing={2}
      columns={12}
    >
      {list.map((item) => (
        <Grid
          key={item.key}
          size={6}
        >
          <Box
            height={110}
          >
            <TextCard
              title={item.title}
              description={item.summary}
              href={item.href}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}