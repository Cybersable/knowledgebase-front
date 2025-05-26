import type { Metadata } from 'next';
import { ReactNode } from 'react';
import ThemeProvider from '@/services/theme-provider';
import MainNavBar from "@/widgets/main-nav-bar";
import Container from "@mui/material/Container";
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
      </body>
    </html>
  );
}
