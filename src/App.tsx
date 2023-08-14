/**
 * Node module import
 */
import React from 'react';
import { Box } from '@mui/material';

/**
 * Local module import
 */
import Router from './routes';

function App() {
  return (
    <Box className='min-w-screen min-h-screen'>
      <Router />
    </Box>
  );
}

export default App;
