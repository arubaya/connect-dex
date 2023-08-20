import { Avatar, Box, ButtonBase, Typography } from '@mui/material';
import React from 'react';
import ContactCardMenuOption from '../ContactCardMenuOption/ContactCardMenuOption';
import { NavLink } from 'react-router-dom';
import { replacePath } from '../../utils/helper';
import { DETAIL_CONTACT_PATH } from '../../constants/router';

export interface ContactCardProps {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ContactCard = ({
  firstName,
  lastName,
  phoneNumber,
  id,
}: ContactCardProps) => {
  return (
    <Box id={`${id}`} className="w-full">
      <Box className="flex items-center justify-between w-full">
        <ButtonBase aria-label="Contact Card" className="w-full px-3 py-5">
          <NavLink
            to={replacePath(DETAIL_CONTACT_PATH, {
              contactId: id,
            })}
            className="flex items-center flex-1 gap-4 no-underline text-inherit"
          >
            <Avatar sx={{ backgroundColor: 'text.secondary' }}></Avatar>
            <Box className="flex flex-col items-start max-w-[180px]">
              <Typography
                id="contactName"
                variant="body1"
                className="w-full text-left truncate"
              >{`${firstName} ${lastName}`}</Typography>
              <Typography
                id="contactNumber"
                variant="caption"
                color="text.secondary"
              >
                {phoneNumber}
              </Typography>
            </Box>
          </NavLink>
        </ButtonBase>
        <Box className="px-3 py-5">
          <ContactCardMenuOption id={id} />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCard;
