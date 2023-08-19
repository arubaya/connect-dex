import { useMutation } from '@apollo/client';
import { EDIT_CONTACT, EDIT_PHONE_NUMBER } from '../data/graphQL/mutation';

const useEditContact = () => {
  const [
    updateContact,
    { loading: loadingEditContact, error: errorEditContact },
  ] = useMutation<any, EditContactReqBody>(EDIT_CONTACT);

  const [
    updateContactPhone,
    { loading: loadingEditContactPhone, error: errorEditContactPhone },
  ] = useMutation<any, EditContactPhoneReqBody>(EDIT_PHONE_NUMBER);

  const editContact = async (
    contactId: number,
    reqBody: Pick<ContactData, 'first_name' | 'last_name'>
  ) => {
    const data = await updateContact({
      variables: {
        id: contactId,
        _set: reqBody,
      },
    });
    return { data, loadingEditContact, errorEditContact };
  };

  const editPhoneContact = async (
    editedContactId: number,
    oldNumber: string,
    newNumber: string
  ) => {
    const data = await updateContactPhone({
      variables: {
        pk_columns: {
          contact_id: editedContactId,
          number: oldNumber,
        },
        new_phone_number: newNumber,
      },
    });
    return { data, loadingEditContactPhone, errorEditContactPhone };
  };

  return { editContact, editPhoneContact };
};

export default useEditContact;
