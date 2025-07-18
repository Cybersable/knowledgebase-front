'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import visuallyHidden from '@mui/utils/visuallyHidden'

import DocsSearching from '@/widgets/docs/searching'

export default function Home() {
  return (
    <Box id="hero">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 22 },
          pb: { xs: 14, sm: 22 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' }}}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Knowledge
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              base
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            The knowledge base is the basis of the knowledge management methodology.
            Knowledge management allows you to create, select and use knowledge,
            share and manage it within a company or various industries.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' }}}
          >
            <InputLabel
              htmlFor="search-hero"
              sx={visuallyHidden}
            >
              Search
            </InputLabel>
            <DocsSearching />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
