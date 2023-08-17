import React from 'react';
import { render, screen } from '@testing-library/react';
import AddContactPage from './AddContactPage';

test('renders learn react link', () => {
  render(<AddContactPage />);
  const dashboardText = screen.getByText('AddContactPage');
  expect(dashboardText).toBeInTheDocument();
});
