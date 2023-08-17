import { useMutation, useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CloseRounded, SaveRounded } from '@mui/icons-material';
import { ADD_CONTACT } from '../../data/graphQL/mutation';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../constants/router';
import { CONTACT_DETAIL } from '../../data/graphQL/queries';

interface AddContactPageProps {
  isEdit?: boolean;
}

const AddContactPage = ({ isEdit }: AddContactPageProps) => {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const [insert_contact, { loading }] = useMutation<
    AddContactResponseData,
    AddContactReqBody
  >(ADD_CONTACT);

  const { data } = useQuery<DetailContactResponseData, DetailContactReqBody>(
    CONTACT_DETAIL,
    {
      variables: {
        id: parseInt(contactId ? contactId : ''),
      },
    }
  );

  const [contactData, setContactData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    homePhone: '',
    mobilePhone: '',
  });

  useEffect(() => {
    if (isEdit && data) {
      setContactData({
        firstName: data.contact_by_pk.first_name,
        lastName: data.contact_by_pk.last_name,
        homePhone: data.contact_by_pk.phones[1]?.number,
        mobilePhone: data.contact_by_pk.phones[0]?.number,
      });
    }
  }, [isEdit, data]);

  const handleChangeInput = (key: keyof ContactFormData, newValue: string) => {
    setContactData({ ...contactData, [key]: newValue });
  };

  const handleOnsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await insert_contact({
      variables: {
        first_name: contactData.firstName,
        last_name: contactData.lastName,
        phones: [
          { number: contactData.mobilePhone },
          { number: contactData.homePhone },
        ],
      },
    });
    if (res && !loading) {
      navigate(DASHBOARD_PATH);
    }
  };
  return (
    <Box className="flex flex-col w-full h-full gap-10">
      <Typography variant="h3">Add Contact</Typography>
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
          required
          id="firstNameField"
          label="First Name"
          placeholder="First Name"
          value={contactData.firstName}
          onChange={({ target }) =>
            handleChangeInput('firstName', target.value)
          }
        />
        <TextField
          required
          id="lastNameField"
          label="Last Name"
          placeholder="Last Name"
          value={contactData.lastName}
          onChange={({ target }) => handleChangeInput('lastName', target.value)}
        />
        <Typography variant="caption" color="text.secondary" className="mt-3">
          Phones
        </Typography>
        <TextField
          required
          type="tel"
          id="mobilePhoneField"
          label="Mobile"
          placeholder="Mobile"
          value={contactData.mobilePhone}
          onChange={({ target }) =>
            handleChangeInput('mobilePhone', target.value)
          }
        />
        <TextField
          type="tel"
          id="homePhoneField"
          label="Home"
          placeholder="Home"
          value={contactData.homePhone}
          onChange={({ target }) =>
            handleChangeInput('homePhone', target.value)
          }
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
            disabled={loading}
            id="saveContact"
            type="submit"
            startIcon={
              loading ? (
                <CircularProgress size={20} sx={{ color: 'text.secondary' }} />
              ) : (
                <SaveRounded />
              )
            }
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddContactPage;
