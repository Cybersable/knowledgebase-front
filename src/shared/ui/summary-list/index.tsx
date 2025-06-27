'use client'

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import {
  StyledTitle,
  StyledTypography
} from './styled'

export default function SummaryList({
  emptyPlaceholder,
  list,
  loading,
}: {
  emptyPlaceholder?: string
  loading?: boolean
  list?: Array<{
    id: string
    title: string
    summary?: string
    href: string
  }>
}) {
  // if (loading) {
  //   return (
  //     <Stack
  //       gap={1}
  //       my={2}>
  //       {Array(3).fill(1).map((_, idx) => (
  //         <Stack
  //           key={idx}
  //           gap={1}>
  //           <Skeleton
  //             variant="rounded"
  //             sx={{
  //               width: `${Math.random() * (100 - 30) + 30}%`,
  //               height: 28,
  //             }}
  //           />
  //           <Skeleton
  //             variant="rounded"
  //             sx={{
  //               height: 18,
  //             }}
  //           />
  //         </Stack>
  //       ))
  //       }
  //     </Stack>
  //   )
  // }

  return (
    <Grid
      container
      spacing={1}
      columns={12}
      sx={{
        my: 2,
      }}>
      {!loading && !list?.length && emptyPlaceholder &&
        <Typography>
          {emptyPlaceholder}
        </Typography>
      }
      {list?.map((item) => (
        <Grid
          key={item.id}
          size={12}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'space-between',
              // gap: 1,
              height: '100%',
              width: '100%',
            }}
          >
            {/*<Typography gutterBottom variant="caption" component="div">*/}
            {/*  {article.tag}*/}
            {/*</Typography>*/}
            <StyledTitle
              variant="h6"
              tabIndex={0}
              href={item.href}
            >
              {item.title}
              <NavigateNextRoundedIcon
                className="arrow"
                sx={{ fontSize: '1rem' }}
              />
            </StyledTitle>
            <StyledTypography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {item.summary}
            </StyledTypography>
            {/*<Author authors={article.authors} />*/}
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}