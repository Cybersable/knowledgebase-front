"use client";

import { ReactNode } from 'react';
import {ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {
  colorSchemes,
  typography,
  shadows,
  shape,
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations
} from './customizations';
import CssBaseline from '@mui/material/CssBaseline';

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
});

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <MUIThemeProvider theme={theme} disableTransitionOnChange>
        <CssBaseline enableColorScheme />
        {children}
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}
