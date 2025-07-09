import Box from '@mui/material/Box'
import { outlinedInputClasses } from '@mui/material/OutlinedInput'
import { alpha, styled } from '@mui/material/styles'

import { brand, gray } from '@/services/theme-provider/customizations'

export const EditorContainer = styled(Box)(({ theme })=> ({
  minHeight: 400,
  padding: '8px 12px',
  color: (theme.vars || theme).palette.text.primary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  backgroundColor: (theme.vars || theme).palette.background.default,
  transition: 'border 120ms ease-in',
  '&:hover': {
    borderColor: gray[400],
  },
  [`&.${outlinedInputClasses.focused}`]: {
    outline: `3px solid ${alpha(brand[500], 0.5)}`,
    borderColor: brand[400],
  },
  ...theme.applyStyles('dark', {
    '&:hover': {
      borderColor: gray[500],
    },
  }),
}))