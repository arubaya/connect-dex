import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { Box, Button, alpha } from '@mui/material';
import React from 'react';

interface PaginationButtonProps {
  disabledPagination: (type: 'next' | 'previous') => boolean;
  onClick: (type: 'next' | 'previous') => void;
}

const PaginationButton = ({
  disabledPagination,
  onClick,
}: PaginationButtonProps) => {
  return (
    <Box
      className="flex items-center justify-center w-full gap-3 pt-5"
      sx={{
        borderTop: (theme) =>
          `1px solid ${alpha(theme.palette.text.disabled, 0.2)}`,
      }}
    >
      <Button
        aria-label="previous pagination"
        disabled={disabledPagination('previous')}
        color="secondary"
        startIcon={<KeyboardArrowLeftRounded />}
        onClick={() => onClick('previous')}
      >
        Previous
      </Button>
      <Button
        aria-label="next pagination"
        disabled={disabledPagination('next')}
        color="secondary"
        endIcon={<KeyboardArrowRightRounded />}
        onClick={() => onClick('next')}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationButton;
