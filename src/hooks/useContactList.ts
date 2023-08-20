import { useQuery } from '@apollo/client';
import { CONTACT_LIST } from '../data/graphQL/queries';

const useContactList = () => {
  const {
    data: defaultContactList,
    loading: loadingDefaultContactList,
    refetch: refatchDefaultContactList,
  } = useQuery<ContactListResponseData, ContactListWithPaginationReqBody>(
    CONTACT_LIST
  );
  const {
    data: searchedContactList,
    loading: loadingSearchedContactList,
    refetch: refatchSearchedContactList,
  } = useQuery<ContactListResponseData, ContactListSearchReqBody>(CONTACT_LIST);

  return {
    defaultContactList,
    loadingDefaultContactList,
    refatchDefaultContactList,
    searchedContactList,
    loadingSearchedContactList,
    refatchSearchedContactList,
  };
};

export default useContactList;
