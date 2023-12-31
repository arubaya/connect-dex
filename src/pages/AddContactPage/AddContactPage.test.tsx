import React from 'react';
import { render, screen } from '@testing-library/react';
import AddContactPage from './AddContactPage';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { ADD_CONTACT_PATH } from '../../constants/router';

describe('Add Contcat Page', () => {
  it('Should show add contact page', () => {
    render(
      <MockedProvider>
        <MemoryRouter initialEntries={[ADD_CONTACT_PATH]}>
          <AddContactPage />
        </MemoryRouter>
      </MockedProvider>
    );
    const addContactTitleText = screen.getByText('Add Contact');
    expect(addContactTitleText).toBeInTheDocument();
  });
});
