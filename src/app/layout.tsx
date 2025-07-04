import Container from '@mui/material/Container'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

import NotifyProvider from '@/services/notify-provider'
import QueryClientProvider from '@/services/query-provider'
import ThemeProvider from '@/services/theme-provider'
import Footer from '@/widgets/footer'
import MainNavBar from '@/widgets/main-nav-bar'

export const metadata: Metadata = {
  title: 'Knowledgebase',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <ThemeProvider>
            <NotifyProvider>
              <MainNavBar />

              <Container
                maxWidth="lg"
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
              >
                {children}
              </Container>
              <Footer />
            </NotifyProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
