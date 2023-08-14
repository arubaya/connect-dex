import { Routes, Route } from 'react-router-dom';

import * as Page from './Pages';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Page.DashboardPage />} />
    </Routes>
  );
}
