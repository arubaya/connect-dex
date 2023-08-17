import { Box, LinearProgress } from '@mui/material';
import React from 'react';

const LoadingProgress = () => {
  return (
    <Box className="w-full flex justify-center items-center min-h-[400px]">
      <Box className="w-2/4">
        <LinearProgress />
      </Box>
    </Box>
  );
};

export default LoadingProgress;
