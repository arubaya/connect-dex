import { useMutation } from '@apollo/client';
import { ADD_CONTACT, ADD_PHONE_TO_CONTACT } from '../data/graphQL/mutation';

const useAddContact = () => {
  const [
    insertContact,
    { loading: loadingAddContact, error: errorAddContact },
  ] = useMutation<AddContactResponseData, AddContactReqBody>(ADD_CONTACT);

  const [
    addPhoneToContact,
    { loading: loadingAddPhoneToContact, error: errorAddPhoneToContact },
  ] = useMutation<any, AddPhoneToContactReqBody>(ADD_PHONE_TO_CONTACT);

  const saveContact = async (reqBody: ContactData) => {
    const data = await insertContact({
      variables: reqBody,
    });
    return { data, loadingAddContact, errorAddContact };
  };

  const savePhoneToContact = async (contactId: number, newNumber: string) => {
    const data = await addPhoneToContact({
      variables: {
        contact_id: contactId,
        phone_number: newNumber,
      },
    });
    return { data, loadingAddPhoneToContact, errorAddPhoneToContact };
  };

  return { saveContact, savePhoneToContact };
};

export default useAddContact;
