interface ContactData {
  first_name: string;
  last_name: string;
  phones: {
    number: string;
  }[];
}

interface ContactDetailData extends ContactData {
  created_at: string;
  id: number;
}

/**
 * Request Body
 */

interface DeleteContactReqBody {
  id: number;
}

interface DetailContactReqBody {
  id: number;
}

type AddContactReqBody = ContactData;

/**
 * Response Data
 */

interface ContactListResponseData {
  contact: ContactDetailData[];
}
interface AddContactResponseData {
  insert_contactcontact: {
    returning: ContactDetailData[];
  };
}
interface DetailContactResponseData {
  contact_by_pk: ContactDetailData;
}
