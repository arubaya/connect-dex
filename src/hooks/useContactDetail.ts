import { useLazyQuery } from '@apollo/client';
import { CONTACT_DETAIL } from '../data/graphQL/queries';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const useContactDetail = () => {
  const { contactId } = useParams();

  const [getContactDetail, { data: contactDetail, loading: detailLoading }] =
    useLazyQuery<DetailContactResponseData, DetailContactReqBody>(
      CONTACT_DETAIL
    );

  const [contactDetailData, setContactDetailData] =
    useState<ContactDetailDataState | null>(null);

  useEffect(() => {
    if (contactId) {
      const id = parseInt(contactId ? contactId : '');
      if (contactDetail && !detailLoading) {
        if (contactDetail.contact_by_pk !== null) {
          setContactDetailData({
            contactId: id,
            firstName: contactDetail.contact_by_pk.first_name,
            lastName: contactDetail.contact_by_pk.last_name,
            mobilePhone: contactDetail.contact_by_pk.phones[0]
              ? contactDetail.contact_by_pk.phones[0].number
              : null,
            homePhone: contactDetail.contact_by_pk.phones[1]
              ? contactDetail.contact_by_pk.phones[1].number
              : null,
          });
        } else {
          setContactDetailData(null);
        }
      } else {
        getContactDetail({
          variables: {
            id,
          },
        });
      }
    }
  }, [contactId, contactDetail, detailLoading, getContactDetail]);

  return { contactDetailData, detailLoading };
};

export default useContactDetail;
