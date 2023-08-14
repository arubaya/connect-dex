import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Illustration } from '../assets/images/illustration-notfoundpage.svg';

export default function NotFoundPage() {
  return (
    <Box className="w-full min-h-screen flex-col flex justify-center items-center">
      <Illustration className="w-60 h-fit" />
      <Typography variant="h2" color="error.main" className="font-bold mt-7">
        Sorry, Page not found!
      </Typography>
      <NavLink to="/Home" className="mt-7 no-underline">
        <Button color="info" variant="contained">
          Back to Home
        </Button>
      </NavLink>
    </Box>
  );
}
