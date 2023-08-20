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

interface DefaultContactListOrder {
  order_by: {
    first_name: 'asc' | 'dsc';
  };
}

/**
 * Request Body
 */

interface ContactListWithPaginationReqBody extends DefaultContactListOrder {
  limit: number;
  offset: number;
}

interface ContactListSearchReqBody extends DefaultContactListOrder {
  where: {
    _or: { [columnKey: 'first_name' | 'last_name']: { _like: string } }[];
  };
}

interface DeleteContactReqBody {
  id: number;
}

interface DetailContactReqBody {
  id: number;
}

interface CheckPhoneListReqBody {
  where: {
    number: {
      _like: string;
    };
  };
}

interface CheckContactListReqBody {
  where: {
    [key: first_name | last_name]: {
      _like: string;
    };
  };
}

type AddContactReqBody = ContactData;

interface AddPhoneToContactReqBody {
  contact_id: number;
  phone_number: string;
}

interface EditContactReqBody {
  id: number;
  _set: Pick<ContactData, 'first_name' | 'last_name'>;
}

interface EditContactPhoneReqBody {
  pk_columns: {
    number: string;
    contact_id: number;
  };
  new_phone_number: string;
}

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
interface CheckPhoneListResponseData {
  phone: {
    id: string;
    number: string;
  }[];
}
