import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CloseRounded, EditRounded, SaveRounded } from '@mui/icons-material';

import { NavLink, useNavigate } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../constants/router';

import Toast from '../../components/Toast/Toast';
import useContactDetail from '../../hooks/useContactDetail';
import useAddContact from '../../hooks/useAddContact';
import useEditContact from '../../hooks/useEditContact';
import useContactFormValidator from '../../hooks/useContactFormValidator';
import {
  ADD_CONTACT_ERROR_MESSAGE,
  EDIT_CONTACT_ERROR_MESSAGE,
  FORM_ERROR_MESSAGE,
} from '../../constants/message';

interface AddContactPageProps {
  isEdit?: boolean;
}

const AddContactPage = ({ isEdit }: AddContactPageProps) => {
  // Defult Value
  const DEFAULT_CONTACT_VALUE: ContactFormData = {
    value: '',
    isError: false,
    errorMessage: '',
  };
  const navigate = useNavigate();

  const { contactDetailData, detailLoading } = useContactDetail();
  const { saveContact, savePhoneToContact } = useAddContact();
  const { editContact, editPhoneContact } = useEditContact();
  const { contactValiator, phoneValiator } = useContactFormValidator();

  // State
  const [openAlert, setOpenAlert] = useState({
    open: false,
    message: '',
  });
  const [isFormError, setIsFormError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState<ContactFormDataState>({
    firstName: DEFAULT_CONTACT_VALUE,
    lastName: DEFAULT_CONTACT_VALUE,
    homePhone: DEFAULT_CONTACT_VALUE,
    mobilePhone: DEFAULT_CONTACT_VALUE,
  });

  useEffect(() => {
    if (isEdit) {
      if (contactDetailData !== null && !detailLoading) {
        setContactData((state) => ({
          firstName: {
            ...state.firstName,
            value: contactDetailData.firstName,
          },
          lastName: {
            ...state.lastName,
            value: contactDetailData.lastName,
          },
          homePhone: {
            ...state.homePhone,
            value:
              contactDetailData.homePhone !== null
                ? contactDetailData.homePhone
                : '',
          },
          mobilePhone: {
            ...state.mobilePhone,
            value:
              contactDetailData.mobilePhone !== null
                ? contactDetailData.mobilePhone
                : '',
          },
        }));
      } else {
        // navigate(DASHBOARD_PATH);
      }
    }
  }, [contactDetailData, detailLoading, navigate]);

  useEffect(() => {
    setIsFormError(
      Object.values(contactData).some((item: any) => item.isError)
    );
  }, [contactData]);

  const handleChangeInput = (
    key: keyof ContactFormDataState,
    newValue: string
  ) => {
    setContactData({
      ...contactData,
      [key]: { ...contactData[key], value: newValue },
    });
  };

  const handleChangeErrorInput = (
    key: keyof ContactFormDataState,
    isError: boolean,
    message: string = ''
  ) => {
    setContactData({
      ...contactData,
      [key]: { ...contactData[key], isError: isError, errorMessage: message },
    });
  };

  const handleSaveContact = async (reqBody: ContactData) => {
    const { data, loadingAddContact, errorAddContact } = await saveContact(
      reqBody
    );
    if (data && !loadingAddContact) {
      setOpenAlert({ open: false, message: '' });
      navigate(DASHBOARD_PATH);
    } else if (errorAddContact) {
      setOpenAlert({ open: true, message: ADD_CONTACT_ERROR_MESSAGE });
    }
    return data;
  };

  const handleEditContact = async ({
    editedContactId,
    reqBodyWithoutPhone,
    oldPhoneNumber,
    newPhoneNumbers,
  }: {
    editedContactId: number;
    reqBodyWithoutPhone: Pick<ContactData, 'first_name' | 'last_name'>;
    oldPhoneNumber: {
      number: string;
    }[];
    newPhoneNumbers: {
      number: string;
    }[];
  }) => {
    const { data: resEditContact, loadingEditContact } = await editContact(
      editedContactId,
      reqBodyWithoutPhone
    );

    if (resEditContact && !loadingEditContact) {
      if (oldPhoneNumber.length >= 2) {
        const { errorEditContactPhone: errorEditMobile } =
          await editPhoneContact(
            editedContactId,
            oldPhoneNumber[0].number,
            newPhoneNumbers[0].number
          );
        const { errorEditContactPhone: errorEditHome } = await editPhoneContact(
          editedContactId,
          oldPhoneNumber[1].number,
          newPhoneNumbers[1].number
        );
        if (errorEditMobile || errorEditHome) {
          setOpenAlert({ open: true, message: EDIT_CONTACT_ERROR_MESSAGE });
        } else {
          navigate(DASHBOARD_PATH);
        }
      } else if (oldPhoneNumber.length === 1) {
        const { errorEditContactPhone } = await editPhoneContact(
          editedContactId,
          oldPhoneNumber[0].number,
          newPhoneNumbers[0].number
        );
        const { errorAddPhoneToContact } = await savePhoneToContact(
          editedContactId,
          newPhoneNumbers[1].number
        );
        if (errorEditContactPhone || errorAddPhoneToContact) {
          setOpenAlert({ open: true, message: EDIT_CONTACT_ERROR_MESSAGE });
        } else {
          navigate(DASHBOARD_PATH);
        }
      } else {
        const { errorAddPhoneToContact: errorAddMobile } =
          await savePhoneToContact(editedContactId, newPhoneNumbers[0].number);
        const { errorAddPhoneToContact: errorAddHome } =
          await savePhoneToContact(editedContactId, newPhoneNumbers[1].number);
        if (errorAddMobile && errorAddHome) {
          setOpenAlert({ open: true, message: EDIT_CONTACT_ERROR_MESSAGE });
        } else {
          navigate(DASHBOARD_PATH);
        }
      }
      navigate(DASHBOARD_PATH);
    } else {
      setOpenAlert({ open: true, message: EDIT_CONTACT_ERROR_MESSAGE });
    }
    return resEditContact;
  };

  const handleOnsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const oldPhoneNumber =
      contactDetailData !== null
        ? (Object.keys(contactDetailData)
            .map((key) => {
              if (
                (key === 'mobilePhone' || key === 'homePhone') &&
                contactDetailData[key] !== null
              ) {
                return {
                  number: contactDetailData[key] as string,
                };
              }
            })
            .filter((mapData) => mapData !== undefined) as { number: string }[])
        : [];

    if (!isFormError) {
      setIsLoading(true);
      const phones = [
        { number: contactData.mobilePhone.value },
        { number: contactData.homePhone.value },
      ];
      const reqBodyWithoutPhone: Pick<ContactData, 'first_name' | 'last_name'> =
        {
          first_name: contactData.firstName.value,
          last_name: contactData.lastName.value,
        };
      const reqBody: ContactData = {
        ...reqBodyWithoutPhone,
        phones,
      };
      setIsLoading(false);
      return isEdit
        ? await handleEditContact({
            editedContactId:
              contactDetailData !== null ? contactDetailData.contactId : 0,
            reqBodyWithoutPhone,
            oldPhoneNumber,
            newPhoneNumbers: phones,
          })
        : await handleSaveContact(reqBody);
    } else {
      setIsLoading(false);
      setOpenAlert({ open: true, message: FORM_ERROR_MESSAGE });
    }
  };

  const handlePhoneOnBlur = async (
    key: keyof ContactFormDataState,
    newValue: string
  ) => {
    const oldValue =
      !isEdit && contactDetailData !== null
        ? undefined
        : key === 'mobilePhone'
        ? contactDetailData?.mobilePhone
        : contactDetailData?.homePhone;
    const { isValid, message } = await phoneValiator(newValue, oldValue);
    if (isValid) {
      handleChangeErrorInput(key, false);
    } else {
      handleChangeErrorInput(key, true, message);
    }
  };

  const handleNameOnBlur = async (
    key: keyof ContactFormDataState,
    newValue: string
  ) => {
    const contactKeyName = key === 'firstName' ? 'first_name' : 'last_name';
    const oldValue =
      !isEdit && contactDetailData !== null
        ? undefined
        : key === 'firstName'
        ? contactDetailData?.firstName
        : contactDetailData?.lastName;
    const { isValid, message } = await contactValiator(
      contactKeyName,
      newValue,
      oldValue
    );
    if (isValid) {
      handleChangeErrorInput(key, false);
    } else {
      handleChangeErrorInput(key, true, message);
    }
  };
  return (
    <Box className="flex flex-col w-full h-full gap-10 py-4">
      <Typography variant="h3">
        {isEdit
          ? `Edit Contact - ${
              contactDetailData !== null
                ? `${contactDetailData.firstName} ${contactDetailData.lastName}`
                : ''
            }`
          : 'Add Contact'}
      </Typography>
      <Box className="flex items-center justify-center w-full">
        <Avatar
          sx={{
            width: 80,
            height: 80,
            background:
              'linear-gradient(to right bottom, #487ca3, #3e7099, #34658f, #2a5a85, #204f7b)',
          }}
        />
      </Box>
      <Box
        onSubmit={handleOnsubmit}
        component="form"
        className="flex flex-col w-full gap-4"
      >
        <TextField
          error={contactData.firstName.isError}
          required
          id="firstNameField"
          label="First Name"
          placeholder="First Name"
          value={contactData.firstName.value}
          onChange={({ target }) =>
            handleChangeInput('firstName', target.value)
          }
          onBlur={({ target }) => handleNameOnBlur('firstName', target.value)}
          helperText={contactData.firstName.errorMessage}
        />
        <TextField
          error={contactData.lastName.isError}
          id="lastNameField"
          label="Last Name"
          placeholder="Last Name"
          value={contactData.lastName.value}
          onChange={({ target }) => handleChangeInput('lastName', target.value)}
          onBlur={({ target }) => handleNameOnBlur('lastName', target.value)}
          helperText={contactData.lastName.errorMessage}
        />
        <Typography variant="caption" color="text.secondary" className="mt-3">
          Phones
        </Typography>
        <TextField
          error={contactData.mobilePhone.isError}
          required
          type="tel"
          id="mobilePhoneField"
          label="Mobile"
          placeholder="Mobile"
          value={contactData.mobilePhone.value}
          onChange={({ target }) =>
            handleChangeInput('mobilePhone', target.value)
          }
          onBlur={({ target }) =>
            handlePhoneOnBlur('mobilePhone', target.value)
          }
          helperText={contactData.mobilePhone.errorMessage}
        />
        <TextField
          error={contactData.homePhone.isError}
          type="tel"
          id="homePhoneField"
          label="Home"
          placeholder="Home"
          value={contactData.homePhone.value}
          onChange={({ target }) =>
            handleChangeInput('homePhone', target.value)
          }
          onBlur={({ target }) => handlePhoneOnBlur('homePhone', target.value)}
          helperText={contactData.homePhone.errorMessage}
        />
        <Box className="flex items-center justify-end w-full gap-3 mt-4">
          <NavLink to={DASHBOARD_PATH} className="no-underline text-inherit">
            <Button
              id="cancelAdd"
              startIcon={<CloseRounded />}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
          </NavLink>
          <Button
            disabled={isLoading || (isEdit && contactDetailData === null)}
            id="saveContact"
            type="submit"
            startIcon={
              isLoading ? (
                <CircularProgress size={20} sx={{ color: 'text.secondary' }} />
              ) : isEdit ? (
                <EditRounded />
              ) : (
                <SaveRounded />
              )
            }
            variant="contained"
          >
            {isEdit ? 'Save Edit' : 'Save'}
          </Button>
        </Box>
      </Box>
      <Toast
        open={openAlert.open}
        severity="error"
        message={openAlert.message}
        onClose={(open) => setOpenAlert({ open, message: '' })}
      />
    </Box>
  );
};

export default AddContactPage;
