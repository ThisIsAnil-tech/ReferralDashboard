import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import ReferralDetails from './components/referral/ReferralDetails';
import NotFound from './components/notfound/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

import './styles/globals.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/referral/:id"
        element={
          <ProtectedRoute>
            <ReferralDetails />
          </ProtectedRoute>
        }
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;