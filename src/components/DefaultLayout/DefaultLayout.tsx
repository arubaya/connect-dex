import { Box } from '@mui/material';
import React from 'react';
import Header from '../Header/Header';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Box>
      <Header />
      <Box className="px-3 mt-20 min-h-[calc(100%_-_80px)]">{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
