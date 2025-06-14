'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import routes from '@/services/routes-provider';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from './ui/ColorModeIconDropdown';
import SitemarkIcon from '@/shared/ui/icons/SitemarkIcon';
import { StyledToolbar } from "./styled";

const navigationList = [
  {
    title: 'Home',
    href: routes.home.path,
  },
  {
    title: 'Docs',
    href: routes.docs.path,
  },
  {
    title: 'Managing',
    href: routes.managingArticles.path,
  },
];

export default function MainNavBar() {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const onNavClick = useCallback((href?: string) => {
    if (!href) return;

    push(href);
  }, [push]);

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
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <SitemarkIcon />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navigationList.map((item, index) => (
                <Button
                  key={index}
                  variant="text"
                  color="info"
                  size="small"
                  onClick={() => onNavClick(item.href)}
                >
                  {item.title}
                </Button>
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
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
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
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}