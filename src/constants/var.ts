export const DEFAULT_DEBOUNCE_TIME = 500;
export const DEFAULT_CONTACT_LIST_LIMIT = 10;
export const DEFAULT_CONTACT_LIST_ORDERED: DefaultContactListOrder = {
  order_by: {
    first_name: 'asc',
  },
};
export const DEFAULT_CONTACT_LIST_VARIABLES: ContactListWithPaginationReqBody =
  {
    limit: DEFAULT_CONTACT_LIST_LIMIT,
    offset: 0,
    ...DEFAULT_CONTACT_LIST_ORDERED,
  };
