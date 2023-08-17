import { useQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { CONTACT_LIST } from '../../data/graphQL/queries';
import ContactCardList, {
  ContactCardListProps,
} from '../../components/ContactCardList/ContactCardList';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import useFavoriteContactStore from '../../stores/useFavoriteContactStore';
import AddContactFloatingButton from '../../components/AddContactFloatingButton/AddContactFloatingButton';

const DashboardPage = () => {
  const { favoriteContactIds } = useFavoriteContactStore();
  const { data, loading } = useQuery<ContactListResponseData>(CONTACT_LIST, {
    pollInterval: 1000,
  });

  const contactFilter = (
    contactResponseData: ContactListResponseData | undefined,
    isFavorite = false
  ) => {
    if (contactResponseData) {
      return contactResponseData.contact
        .filter((contact) =>
          isFavorite
            ? favoriteContactIds.includes(contact.id)
            : !favoriteContactIds.includes(contact.id)
        )
        .map((filteredContact) => ({
          id: filteredContact.id,
          firstName: filteredContact.first_name,
          lastName: filteredContact.last_name,
          phoneNumber:
            filteredContact.phones.length > 0
              ? filteredContact.phones[0].number
              : '-',
        }));
    }
    return [];
  };

  const contacts = useMemo<ContactCardListProps['contactList']>(
    () => contactFilter(data),
    [favoriteContactIds, data]
  );
  const favoritedContacts = useMemo<ContactCardListProps['contactList']>(
    () => contactFilter(data, true),
    [favoriteContactIds, data]
  );

  return (
    <Box className="flex flex-col w-full h-full gap-3">
      {loading ? (
        <LoadingProgress />
      ) : (
        <>
          {favoritedContacts.length > 0 ? (
            <Box component="section">
              <Typography
                variant="caption"
                component="h5"
                color="text.secondary"
              >
                Favorite
              </Typography>
              <ContactCardList contactList={favoritedContacts} />
            </Box>
          ) : null}

          <Box component="section">
            <Typography variant="caption" component="h5" color="text.secondary">
              My Contacts
            </Typography>
            <ContactCardList contactList={contacts} />
          </Box>
          <AddContactFloatingButton />
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
