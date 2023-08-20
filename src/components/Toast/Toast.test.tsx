/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Toast from './Toast';

const onClose = () => {};
describe('Toast Component', () => {
  it('Should show toast error', () => {
    const { container } = render(
      <Toast message="Test" open onClose={onClose} severity="error" />
    );
    const addContactTitleText = screen.getByText('Test');
    expect(addContactTitleText).toBeInTheDocument();
    expect(
      container.getElementsByClassName('MuiAlert-standardError').length
    ).toBe(1);
  });
  it('Should show toast success', () => {
    const { container } = render(
      <Toast message="Test" open onClose={onClose} severity="success" />
    );
    const addContactTitleText = screen.getByText('Test');
    expect(addContactTitleText).toBeInTheDocument();
    expect(
      container.getElementsByClassName('MuiAlert-standardSuccess').length
    ).toBe(1);
  });
  it('Should show toast warning', () => {
    const { container } = render(
      <Toast message="Test" open onClose={onClose} severity="warning" />
    );
    const addContactTitleText = screen.getByText('Test');
    expect(addContactTitleText).toBeInTheDocument();
    expect(
      container.getElementsByClassName('MuiAlert-standardWarning').length
    ).toBe(1);
  });
  it('Should show toast info', () => {
    const { container } = render(
      <Toast message="Test" open onClose={onClose} severity="info" />
    );
    const addContactTitleText = screen.getByText('Test');
    expect(addContactTitleText).toBeInTheDocument();
    expect(
      container.getElementsByClassName('MuiAlert-standardInfo').length
    ).toBe(1);
  });
});
