import { Box, Button, alpha, useTheme } from '@mui/material';
import React from 'react';
import { DEFAULT_HEADER_HEIGHT } from '../../constants/var';
import { APP_LOGO } from '../../constants/app';
import { NavLink, useNavigate } from 'react-router-dom';
import { ADD_CONTACT_PATH, DASHBOARD_PATH } from '../../constants/router';
import { AddRounded, PersonRounded } from '@mui/icons-material';

const Sidenav = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigateToAdd = () => {
    navigate(ADD_CONTACT_PATH);
  };
  return (
    <Box className="flex flex-col w-full">
      <Box
        className="flex items-center justify-start w-full max-w-[200px] px-3"
        sx={{ height: `${DEFAULT_HEADER_HEIGHT}px` }}
      >
        <img src={APP_LOGO} alt="ConnectDex" width="100%" />
      </Box>
      <Box className="flex items-center justify-center w-full px-3 my-3 ">
        <Button
          variant="contained"
          size="large"
          color="primary"
          startIcon={<AddRounded />}
          onClick={handleNavigateToAdd}
        >
          Add Contact
        </Button>
      </Box>
      <Box component="nav" className="flex flex-col w-full mt-4">
        <NavLink
          end
          to={DASHBOARD_PATH}
          className="w-full no-underline rounded-tr-full rounded-br-full text-inherit"
          style={({ isActive }) => ({
            background: isActive
              ? `${alpha(theme.palette.primary.main, 0.2)}`
              : 'transparent',
          })}
        >
          <Box className="flex items-center w-full gap-3 py-3 pl-4 pr-2">
            <PersonRounded /> Contacts
          </Box>
        </NavLink>
      </Box>
      {/* <Box component="nav" className="flex flex-col w-full mt-4">
        <NavLink
          to={DASHBOARD_PATH}
          className="w-full no-underline bg-blue-500 rounded-tr-full rounded-br-full text-inherit"
        >
          <Box className="flex w-full gap-3 py-3 pl-4 pr-2">Contacts</Box>
        </NavLink>
      </Box> */}
    </Box>
  );
};

export default Sidenav;
