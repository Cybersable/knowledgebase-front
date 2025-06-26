'use client'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { ReactNode } from 'react'

export default function HighlightedCard({
  title,
  summary,
  icon,
  children,
}: {
  title: string
  summary: string
  icon?: ReactNode
  children?: ReactNode
}) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        {icon}
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          {summary}
        </Typography>
        {children}
      </CardContent>
    </Card>
  )
}