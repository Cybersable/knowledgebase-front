'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ReactNode } from 'react'

import {
  colorSchemes,
  dataDisplayCustomizations,
  feedbackCustomizations,
  inputsCustomizations,
  navigationCustomizations,
  shadows,
  shape,
  surfacesCustomizations,
  typography
} from './customizations'

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
    cssVarPrefix: 'template',
  },
  colorSchemes,
  typography,
  shadows,
  shape,
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
})

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider
        theme={theme}
        disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  )
}
