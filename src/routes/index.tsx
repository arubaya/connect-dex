import { Routes, Route } from 'react-router-dom';

import * as Page from './Pages';
import DefaultLayout from '../components/DefaultLayout/DefaultLayout';

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout>
            <Page.DashboardPage />
          </DefaultLayout>
        }
      />
    </Routes>
  );
}
