import { ReactNode } from 'react';
import type { Metadata } from 'next';

import QueryClientProvider from "@/services/query-provider";
import ThemeProvider from '@/services/theme-provider';

import Container from "@mui/material/Container";
import MainNavBar from "@/widgets/main-nav-bar";
import Footer from "@/widgets/footer";

export const metadata: Metadata = {
  title: "Knowledgebase",
  description: "",
};

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
            <MainNavBar />

            <Container
              maxWidth="lg"
              component="main"
              sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
            >
              {children}
            </Container>
            <Footer />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
