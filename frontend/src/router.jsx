import { Routes, Route } from 'react-router-dom';
import HomePage         from './pages/HomePage';
import HostelsPage      from './pages/HostelsPage';
import HostelDetailPage from './pages/HostelDetailPage';
import AdminPage        from './pages/AdminPage';
import NotFoundPage     from './pages/NotFoundPage';

/**
 * AppRoutes — all route definitions in one place.
 * Imported and rendered inside App.jsx within BrowserRouter.
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<HomePage />} />
      <Route path="/hostels"     element={<HostelsPage />} />
      <Route path="/hostels/:id" element={<HostelDetailPage />} />
      <Route path="/admin"       element={<AdminPage />} />
      <Route path="*"            element={<NotFoundPage />} />
    </Routes>
  );
}