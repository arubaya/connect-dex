import { create } from 'zustand';
import { LOCAL_STORAGE_NAME } from '../constants/app';

interface FavoriteContactInitialState {
  favoriteContactIds: number[];
}

interface FavoriteContactAction {
  addContactToFavorite: (contactId: number) => void;
  isFavoritedContact: (contactId: number) => boolean;
  removeContactFromFavorite: (contactId: number) => void;
}

interface FavoriteContactStoreState
  extends FavoriteContactInitialState,
    FavoriteContactAction {}

const DEFAULT_VALUE_CONTACT_LIST =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME) as string) || [];

const addToLocalStorage = (ids: number[]) => {
  const favoriteIdsStringify = JSON.stringify(ids);
  localStorage.setItem(LOCAL_STORAGE_NAME, favoriteIdsStringify);
};

const useFavoriteContactStore = create<FavoriteContactStoreState>(
  (set, get) => ({
    favoriteContactIds: DEFAULT_VALUE_CONTACT_LIST,
    addContactToFavorite: (contactId: number) => {
      const { favoriteContactIds } = get();
      if (!favoriteContactIds.includes(contactId)) {
        const newFavoriteContactIds = [...favoriteContactIds, contactId];
        addToLocalStorage(newFavoriteContactIds);
        set(() => ({ favoriteContactIds: newFavoriteContactIds }));
      }
    },
    removeContactFromFavorite: (contactId: number) => {
      const { favoriteContactIds } = get();
      if (favoriteContactIds.includes(contactId)) {
        const newFavoriteContactIds = favoriteContactIds.filter(
          (id) => id !== contactId
        );
        addToLocalStorage(newFavoriteContactIds);
        set(() => ({ favoriteContactIds: newFavoriteContactIds }));
      }
    },
    isFavoritedContact: (contactId: number) => {
      const { favoriteContactIds } = get();
      return favoriteContactIds.includes(contactId);
    },
  })
);

export default useFavoriteContactStore;
