import {
  DeleteRounded,
  MoreVertRounded,
  StarOutlineRounded,
  StarRounded,
} from '@mui/icons-material';
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React from 'react';
import useFavoriteContactStore from '../../stores/useFavoriteContactStore';
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT } from '../../data/graphQL/mutation';

interface ContactCardMenuOptionProps {
  id: number;
}

const ContactCardMenuOption = ({ id }: ContactCardMenuOptionProps) => {
  const {
    addContactToFavorite,
    removeContactFromFavorite,
    isFavoritedContact,
    refetchList,
  } = useFavoriteContactStore();

  const [delete_contact_by_pk] = useMutation<any, DeleteContactReqBody>(
    DELETE_CONTACT
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addToFavorite = () => {
    addContactToFavorite(id);
    handleClose();
  };

  const removeFromFavorite = () => {
    removeContactFromFavorite(id);
    handleClose();
  };

  const deleteContact = () => {
    delete_contact_by_pk({
      variables: {
        id,
      },
    });
    refetchList();
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="contactCardMenuOptionButton"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
      >
        <MoreVertRounded />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isFavoritedContact(id) ? (
          <MenuItem onClick={removeFromFavorite}>
            <ListItemIcon>
              <StarOutlineRounded fontSize="small" />
            </ListItemIcon>
            <Typography>Remove from favorites</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={addToFavorite}>
            <ListItemIcon>
              <StarRounded fontSize="small" />
            </ListItemIcon>
            <Typography>Add to favorites</Typography>
          </MenuItem>
        )}
        <MenuItem onClick={deleteContact}>
          <ListItemIcon>
            <DeleteRounded color="error" fontSize="small" />
          </ListItemIcon>
          <Typography color="error.main">Delete</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ContactCardMenuOption;
