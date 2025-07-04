'use client'

import { SnackbarProvider } from 'notistack'
import { ReactNode } from 'react'

export default function NotifyProvider({ children }: {children: ReactNode}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      {children}
    </SnackbarProvider>
  )
}