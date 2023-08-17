import { AddRounded } from '@mui/icons-material';
import { Fab } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_CONTACT_PATH } from '../../constants/router';

const AddContactFloatingButton = () => {
  const navigate = useNavigate();

  const handleNavigateToAdd = () => {
    navigate(ADD_CONTACT_PATH);
  };
  return (
    <Fab
      color="primary"
      aria-label="add contact"
      className="fixed bottom-0 right-0 mb-12 mr-8"
      onClick={handleNavigateToAdd}
    >
      <AddRounded />
    </Fab>
  );
};

export default AddContactFloatingButton;
