import { MenuRounded } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { APP_LOGO } from '../../constants/app';
import { NavLink } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../constants/router';

const Header = () => {
  return (
    <Box
      component="header"
      className="fixed top-0 z-50 flex w-full p-3"
      sx={{ backgroundColor: 'background.default' }}
    >
      <Box className="flex items-center justify-between w-full h-14">
        <NavLink
          to={DASHBOARD_PATH}
          className="flex items-center justify-start no-underline text-inherit w-2/6 max-w-[200px]"
        >
          <img src={APP_LOGO} alt="ConnectDex" className="w-full" />
        </NavLink>
        <IconButton size="small">
          <MenuRounded />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
