interface ContactFormData {
  value: string;
  isError: boolean;
  errorMessage: string;
}

interface ContactFormDataState {
  firstName: ContactFormData;
  lastName: ContactFormData;
  mobilePhone: ContactFormData;
  homePhone: ContactFormData;
}

interface ContactDetailDataState {
  contactId: number;
  firstName: string;
  lastName: string;
  mobilePhone: string | null;
  homePhone: string | null;
}
