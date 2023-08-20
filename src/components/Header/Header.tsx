import { MenuRounded } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { APP_LOGO } from '../../constants/app';
import { NavLink } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../constants/router';
import {
  DEFAULT_DRAWER_WIDTH,
  DEFAULT_HEADER_HEIGHT,
} from '../../constants/var';

interface HeaderProps {
  toggleDrawer: () => void;
}

const Header = ({ toggleDrawer }: HeaderProps) => {
  return (
    <Box
      component="header"
      className="fixed top-0 z-50 p-3 transition-all"
      sx={{
        backgroundColor: 'background.default',
        width: { xs: '100%', md: `calc(100% - ${DEFAULT_DRAWER_WIDTH}px)` },
        marginLeft: { md: `${DEFAULT_DRAWER_WIDTH}px` },
        height: DEFAULT_HEADER_HEIGHT,
        display: { xs: 'flex', md: 'none' },
      }}
    >
      <Box className="flex items-center justify-between w-full h-14">
        <NavLink
          to={DASHBOARD_PATH}
          className="flex items-center justify-start no-underline text-inherit w-2/6 max-w-[200px] md:hidden"
        >
          <img src={APP_LOGO} alt="ConnectDex" width="100%" />
        </NavLink>
        <IconButton
          aria-label="Open Drawer"
          onClick={toggleDrawer}
          size="small"
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuRounded />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
