'use client'

import ArticleIcon from '@mui/icons-material/Article'
import CategoryIcon from '@mui/icons-material/Category'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MenuIcon from '@mui/icons-material/Menu'
import WorkspacesOutlineIcon from '@mui/icons-material/WorkspacesOutline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

import routes from '@/services/routes-provider'
import SitemarkIcon from '@/shared/ui/icons/SitemarkIcon'
import MenuDropdown from '@/widgets/navbar/ui/MenuDropdown'

import { StyledToolbar } from './styled'
import ColorModeIconDropdown from './ui/ColorModeIconDropdown'

const navigationList = [
  {
    id: 'home',
    title: 'Home',
    href: routes.home.path,
  },
  {
    id: 'docs',
    title: 'Docs',
    href: routes.docs.path,
  },
  {
    id: 'managing',
    title: 'Managing',
    href: routes.managingArticles().path,
    children: [
      {
        id: 'managing-articles',
        icon: <ArticleIcon />,
        title: 'Articles',
        href: '/managing/docs/articles',
      },
      {
        id: 'managing-categories',
        title: 'Categories',
        icon: <CategoryIcon />,
        href: '/managing/docs/categories',
      },
      {
        id: 'managing-workspaces',
        title: 'Workspaces',
        icon: <WorkspacesOutlineIcon />,
        href: '/managing/docs/workspaces',
      }
    ],
  }
]

export default function MainNavBar() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar
          variant="dense"
          disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <SitemarkIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
              {navigationList.map((item) => (
                <MenuDropdown
                  key={item.id}
                  href={item.href}
                  list={item.children}
                  menuId={`nav-menu-${item.id}`}
                >
                  {item.title}
                </MenuDropdown>
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {/*<Button color="primary" variant="text" size="small">*/}
            {/*  Sign in*/}
            {/*</Button>*/}
            {/*<Button color="primary" variant="contained" size="small">*/}
            {/*  Sign up*/}
            {/*</Button>*/}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Workspaces</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}