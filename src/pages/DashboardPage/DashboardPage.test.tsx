import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from './DashboardPage';

test('renders learn react link', () => {
  render(<DashboardPage />);
  const dashboardText = screen.getByText('DashboardPage');
  expect(dashboardText).toBeInTheDocument();
});
