import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Illustration } from '../../assets/images/illustration-notfoundpage.svg';
import { DASHBOARD_PATH } from '../../constants/router';

export default function NotFoundPage() {
  return (
    <Box
      className="flex flex-col items-center justify-center w-full min-h-screen"
      sx={{
        background:
          'linear-gradient(to left top,#0d1219,#06090e,#111922,#131f2b,#142535)',
      }}
    >
      <Illustration className="w-60 h-fit" />
      <Typography variant="h2" color="error.main" className="font-bold mt-7">
        Sorry, Page not found!
      </Typography>
      <NavLink to={DASHBOARD_PATH} className="no-underline mt-7">
        <Button aria-label="Back to Dashboard" color="info" variant="outlined">
          Back to Home
        </Button>
      </NavLink>
    </Box>
  );
}
