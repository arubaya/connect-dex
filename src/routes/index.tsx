import { Routes, Route } from 'react-router-dom';

import * as Page from './Pages';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';
import {
  ADD_CONTACT_PATH,
  DASHBOARD_PATH,
  DETAIL_CONTACT_PATH,
} from '../constants/router';

export default function Router() {
  return (
    <Routes>
      <Route
        path={DASHBOARD_PATH}
        element={
          <DefaultLayout>
            <Page.DashboardPage />
          </DefaultLayout>
        }
      />
      <Route
        path={ADD_CONTACT_PATH}
        element={
          <DefaultLayout>
            <Page.AddContactPage />
          </DefaultLayout>
        }
      />
      <Route
        path={DETAIL_CONTACT_PATH}
        element={
          <DefaultLayout>
            <Page.AddContactPage isEdit={true} />
          </DefaultLayout>
        }
      />
    </Routes>
  );
}
