'use client'

import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import MUIBreadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'

const StyledBreadcrumbs = styled(MUIBreadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}))

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Array<{
    key: string
    title: string
    href: string
  }>
}) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((item) => (
        <Link
          key={item.key}
          href={item.href}
        >
          {item.title}
        </Link>
      ))}
      {/*<Typography variant="body1">Dashboard</Typography>*/}
      {/*<Typography*/}
      {/*  variant="body1"*/}
      {/*  sx={{ color: 'text.primary', fontWeight: 600 }}>*/}
      {/*  Home*/}
      {/*</Typography>*/}
    </StyledBreadcrumbs>
  )
}