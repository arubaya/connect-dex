import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';

describe('Add Contcat Page', () => {
  it('Should show add contact page', () => {
    render(
      <MockedProvider>
        <MemoryRouter initialEntries={['/fewt44']}>
          <NotFoundPage />
        </MemoryRouter>
      </MockedProvider>
    );
    const notFoundPageText = screen.getByText('Sorry, Page not found!');
    expect(notFoundPageText).toBeInTheDocument();
  });
});
