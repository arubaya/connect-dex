/**
 * Node module import
 */
import React from 'react';
import { Box } from '@mui/material';

/**
 * Local module import
 */
import Router from './routes';
import classNames from 'classnames';

function App() {
  return (
    <Box className={classNames('min-w-screen min-h-screen')}>
      <Router />
    </Box>
  );
}

export default App;
