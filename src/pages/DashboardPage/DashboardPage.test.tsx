import React from 'react';
import { queryByAttribute, render } from '@testing-library/react';
import DashboardPage from './DashboardPage';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from '@apollo/client/testing';
import { DASHBOARD_PATH } from '../../constants/router';
import { CONTACT_LIST } from '../../data/graphQL/queries';

describe('Dashboard Page', () => {
  it('Should show dashboard page', () => {
    const mocks = [
      {
        request: {
          query: CONTACT_LIST,
          variables: {},
        },
        result: {
          data: {
            contact: [
              {
                created_at: '2023-08-20T07:29:28.70424+00:00',
                first_name: 'Xenos',
                id: 3827,
                last_name: 'Simmons',
                phones: [
                  {
                    number: '147356457474767',
                  },
                  {
                    number: '995123243534645',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        request: {
          query: CONTACT_LIST,
          variables: {
            limit: 10,
            offset: 0,
            order_by: { first_name: 'asc' },
          },
        },
        result: {
          data: {
            contact: [
              {
                created_at: '2023-08-20T07:29:28.70424+00:00',
                first_name: 'Xenos',
                id: 3827,
                last_name: 'Simmons',
                phones: [
                  {
                    number: '147356457474767',
                  },
                  {
                    number: '995123243534645',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        request: {
          query: CONTACT_LIST,
          variables: {
            order_by: { first_name: 'asc' },
            where: {
              _or: [{ irst_name: { _like: '' } }],
            },
          },
        },
        result: {
          data: {
            contact: [
              {
                created_at: '2023-08-20T07:29:28.70424+00:00',
                first_name: 'Xenos',
                id: 3827,
                last_name: 'Simmons',
                phones: [
                  {
                    number: '147356457474767',
                  },
                  {
                    number: '995123243534645',
                  },
                ],
              },
            ],
          },
        },
      },
    ];
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={[DASHBOARD_PATH]}>
          <DashboardPage />
        </MemoryRouter>
      </MockedProvider>
    );
    const getById = queryByAttribute.bind(null, 'id');
    expect(getById(container, 'dashboardPageContainer')).toBeInTheDocument();
  });
});
