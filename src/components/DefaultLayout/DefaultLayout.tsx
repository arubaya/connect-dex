import { Box, Drawer } from '@mui/material';
import React, { useState } from 'react';
import Header from '../Header/Header';
import {
  DEFAULT_DRAWER_WIDTH,
  DEFAULT_HEADER_HEIGHT,
} from '../../constants/var';
import DrawerContainer from '../DrawerContainer/DrawerContainer';
import Sidenav from '../Sidenav/Sidenav';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerToggleOpen = () => {
    setMobileOpen(true);
  };
  return (
    <Box className="min-h-screen">
      <Header toggleDrawer={handleDrawerToggleOpen} />
      <DrawerContainer
        open={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      >
        <Sidenav />
      </DrawerContainer>
      <Box
        component="main"
        className="px-3 py-4 md:py-7 md:px-6"
        sx={{
          width: { xs: '100%', md: `calc(100% - ${DEFAULT_DRAWER_WIDTH}px)` },
          marginLeft: { md: `${DEFAULT_DRAWER_WIDTH}px` },
          minHeight: {
            xs: `calc(100vh - ${DEFAULT_HEADER_HEIGHT}px)`,
            md: '100vh',
          },
          marginTop: { xs: `${DEFAULT_HEADER_HEIGHT}px`, md: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DefaultLayout;
