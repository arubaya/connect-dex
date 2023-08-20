import { Box, Drawer } from '@mui/material';
import React from 'react';
import { DEFAULT_DRAWER_WIDTH } from '../../constants/var';

interface DrawerContainerProps {
  children: React.ReactNode;
  open: boolean;
  handleDrawerToggle: () => void;
}

const DrawerContainer = ({
  children,
  handleDrawerToggle,
  open,
}: DrawerContainerProps) => {
  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DEFAULT_DRAWER_WIDTH,
          },
        }}
        open
      >
        {children}
      </Drawer>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DEFAULT_DRAWER_WIDTH,
          },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
};

export default DrawerContainer;
