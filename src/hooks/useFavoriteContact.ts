import { useEffect, useState } from 'react';
import { LOCAL_STORAGE_NAME } from '../constants/app';

const useFavoriteContact = () => {
  const [favoriteContactIds, setFavoriteContactIds] = useState<number[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) as string) || []
  );

  const addToLocalStorage = (ids: number[]) => {
    const favoriteIdsStringify = JSON.stringify(ids);
    localStorage.setItem(LOCAL_STORAGE_NAME, favoriteIdsStringify);
  };

  // const initiateLocalStorage = (event: StorageEvent) => {
  //   if (event.key === LOCAL_STORAGE_NAME) {
  //     const getFavoriteIdsLocalStorage = event.newValue;
  //     if (getFavoriteIdsLocalStorage !== null) {
  //       const favoriteIds = JSON.parse(getFavoriteIdsLocalStorage) as number[];
  //       setFavoriteContactIds(favoriteIds);
  //     } else {
  //       addToLocalStorage([]);
  //       setFavoriteContactIds([]);
  //     }
  //   }
  // };

  useEffect(() => {
    // initiateLocalStorage();

    const initiateLocalStorage = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_NAME) {
        const getFavoriteIdsLocalStorage = event.newValue;
        if (getFavoriteIdsLocalStorage !== null) {
          const favoriteIds = JSON.parse(
            getFavoriteIdsLocalStorage
          ) as number[];
          setFavoriteContactIds(favoriteIds);
        } else {
          addToLocalStorage([]);
          setFavoriteContactIds([]);
        }
      }
    };
    window.addEventListener('storage', initiateLocalStorage);
    return () => {
      window.removeEventListener('storage', initiateLocalStorage);
    };
  }, []);

  const addContactToFavorite = (contactId: number) => {
    const newFavoriteContactIds = favoriteContactIds;
    if (!favoriteContactIds.includes(contactId)) {
      newFavoriteContactIds.push(contactId);
    }
    addToLocalStorage(newFavoriteContactIds);
    setFavoriteContactIds(newFavoriteContactIds);
    window.dispatchEvent(new Event('storage'));
  };

  const removeContactFromFavorite = (contactId: number) => {
    const newFavoriteContactIds = favoriteContactIds;
    const contactIdIndex = newFavoriteContactIds.indexOf(contactId);
    if (contactIdIndex >= 0) {
      newFavoriteContactIds.splice(contactIdIndex, 1);
    }
    addToLocalStorage(newFavoriteContactIds);
    setFavoriteContactIds(newFavoriteContactIds);
    window.dispatchEvent(new Event('storage'));
  };

  const isFavoritedContact = (contactId: number) => {
    return favoriteContactIds.includes(contactId);
  };

  return {
    favoriteContactIds,
    addContactToFavorite,
    isFavoritedContact,
    removeContactFromFavorite,
  };
};

export default useFavoriteContact;
