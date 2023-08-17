import { Box, Typography } from '@mui/material';
import React from 'react';
import ContactCard, { ContactCardProps } from '../ContactCard/ContactCard';
import { PersonRounded } from '@mui/icons-material';

export interface ContactCardListProps {
  contactList: ContactCardProps[];
}

const ContactCardList = ({ contactList }: ContactCardListProps) => {
  return (
    <Box className="flex flex-col w-full mt-4">
      {contactList.length > 0 ? (
        <Box className="w-full">
          {contactList.map((contact) => (
            <ContactCard key={contact.id} {...contact} />
          ))}
        </Box>
      ) : (
        <Box className="w-full flex flex-col gap-2 justify-center items-center min-h-[300px]">
          <PersonRounded fontSize="large" color="disabled" />
          <Typography color="text.secondary" variant="caption">
            No Contacts
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ContactCardList;
