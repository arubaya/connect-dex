import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ContactCardList, {
  ContactCardListProps,
} from '../../components/ContactCardList/ContactCardList';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import useFavoriteContactStore from '../../stores/useFavoriteContactStore';
import AddContactFloatingButton from '../../components/AddContactFloatingButton/AddContactFloatingButton';
import SearchbarTextField from '../../components/SearchbarTextField/SearchbarTextField';
import {
  DEFAULT_CONTACT_LIST_LIMIT,
  DEFAULT_CONTACT_LIST_ORDERED,
  DEFAULT_CONTACT_LIST_VARIABLES,
  DEFAULT_DEBOUNCE_TIME,
} from '../../constants/var';
import useContactList from '../../hooks/useContactList';
import PaginationButton from '../../components/PaginationButton/PaginationButton';

const DashboardPage = () => {
  const { favoriteContactIds, refetchContactList } = useFavoriteContactStore();
  const {
    defaultContactList,
    loadingDefaultContactList,
    loadingSearchedContactList,
    refatchDefaultContactList,
    refatchSearchedContactList,
    searchedContactList,
  } = useContactList();

  const [searchValue, setSearchValue] = useState('');
  const [contactList, setContactList] = useState<ContactDetailData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    refatchDefaultContactList(DEFAULT_CONTACT_LIST_VARIABLES);
  }, [refatchDefaultContactList, refetchContactList]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchValue !== '') {
        refatchSearchedContactList({
          ...DEFAULT_CONTACT_LIST_ORDERED,
          where: {
            _or: [
              {
                first_name: { _like: `%${searchValue}%` },
              },
              {
                last_name: { _like: `%${searchValue}%` },
              },
            ],
          },
        });
      } else {
        refatchDefaultContactList(DEFAULT_CONTACT_LIST_VARIABLES);
      }
      setCurrentPage(1);
    }, DEFAULT_DEBOUNCE_TIME);

    return () => {
      clearTimeout(debounce);
    };
  }, [refatchDefaultContactList, refatchSearchedContactList, searchValue]);

  useEffect(() => {
    if (searchValue !== '') {
      if (searchedContactList) {
        setContactList(searchedContactList.contact);
      }
    } else {
      if (defaultContactList) {
        setContactList(defaultContactList.contact);
      }
    }
  }, [defaultContactList, searchValue, searchedContactList]);

  const contactFilter = useCallback(
    (contactListData: ContactDetailData[], isFavorite = false) => {
      return contactListData
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
    },
    [favoriteContactIds]
  );

  const contacts = useMemo<ContactCardListProps['contactList']>(
    () => contactFilter(contactList),
    [contactFilter, contactList]
  );
  const favoritedContacts = useMemo<ContactCardListProps['contactList']>(
    () => contactFilter(contactList, true),
    [contactFilter, contactList]
  );

  const handleChangeSerchInput = (newValue: string) => {
    setSearchValue(newValue);
  };

  const handleChangePage = (type: 'increase' | 'decrease') => {
    setCurrentPage((state) =>
      type === 'increase' ? state + 1 : state === 1 ? 1 : state - 1
    );
  };

  const disabledPagination = (type: 'next' | 'previous') => {
    switch (type) {
      case 'next':
        if (contactList.length < 10) {
          return true;
        } else {
          return false;
        }
      case 'previous':
        if (currentPage === 1) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  const handleClickPagination = (type: 'next' | 'previous') => {
    switch (type) {
      case 'next':
        refatchDefaultContactList({
          ...DEFAULT_CONTACT_LIST_VARIABLES,
          offset: 0 + currentPage * DEFAULT_CONTACT_LIST_LIMIT,
        });
        handleChangePage('increase');
        break;
      case 'previous':
        if (currentPage >= 1) {
          refatchDefaultContactList({
            ...DEFAULT_CONTACT_LIST_VARIABLES,
            offset: (currentPage - 1) * DEFAULT_CONTACT_LIST_LIMIT - 10,
          });
          handleChangePage('decrease');
        }
        break;
      default:
        break;
    }
  };

  return (
    <Box className="flex flex-col w-full h-full gap-3">
      {loadingDefaultContactList || loadingSearchedContactList ? (
        <LoadingProgress />
      ) : (
        <>
          <Box className="w-full my-4">
            <SearchbarTextField
              variant="outlined"
              dataLength={`${contactList.length}`}
              onChange={({ target }) => handleChangeSerchInput(target.value)}
            />
          </Box>
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
          <PaginationButton
            onClick={handleClickPagination}
            disabledPagination={disabledPagination}
          />
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
