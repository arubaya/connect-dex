import { useLazyQuery } from '@apollo/client';
import { CONTACT_LIST, PHONE_LIST } from '../data/graphQL/queries';
import {
  NAME_EXIST_ERROR_MESSAGE,
  NAME_VALIDATION_ERROR_MESSAGE,
  PHONE_EXIST_ERROR_MESSAGE,
} from '../constants/message';

const useContactFormValidator = () => {
  const [checkPhoneList] = useLazyQuery<
    CheckPhoneListResponseData,
    CheckPhoneListReqBody
  >(PHONE_LIST);

  const [checkContactList] = useLazyQuery<
    ContactListResponseData,
    CheckContactListReqBody
  >(CONTACT_LIST);

  const isSameValue = (text: string, compareText: string) =>
    text === compareText;

  const contactValiator = async (
    contactKeyName: 'first_name' | 'last_name',
    newValue: string,
    oldValue?: string | null
  ) => {
    if (newValue !== '') {
      const specialCharRegex = /[^A-Za-z0-9]/;
      if (!specialCharRegex.test(newValue)) {
        const { data: result } = await checkContactList({
          variables: {
            where: {
              [contactKeyName]: {
                _like: newValue,
              },
            },
          },
        });
        if (oldValue && oldValue !== null && isSameValue(newValue, oldValue)) {
          return { isValid: true };
        } else {
          if (result && result.contact.length > 0) {
            return { isValid: false, message: NAME_EXIST_ERROR_MESSAGE };
          } else {
            return { isValid: true };
          }
        }
      }
      return { isValid: false, message: NAME_VALIDATION_ERROR_MESSAGE };
    }
    return { isValid: true };
  };

  const phoneValiator = async (newValue: string, oldValue?: string | null) => {
    if (newValue !== '') {
      const { data: result } = await checkPhoneList({
        variables: {
          where: {
            number: {
              _like: newValue,
            },
          },
        },
      });

      if (oldValue && oldValue !== null && isSameValue(newValue, oldValue)) {
        return { isValid: true };
      } else {
        if (result && result.phone.length > 0) {
          return { isValid: false, message: PHONE_EXIST_ERROR_MESSAGE };
        } else {
          return { isValid: true };
        }
      }
    }
    return { isValid: true };
  };

  return { contactValiator, phoneValiator };
};

export default useContactFormValidator;
