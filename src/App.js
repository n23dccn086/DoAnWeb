import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Exam from './pages/Exam';
import History from './pages/History';
import Admin from './pages/Admin';

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/" />} />
      <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/exam" element={currentUser ? <Exam /> : <Navigate to="/login" />} />
      <Route path="/history" element={currentUser ? <History /> : <Navigate to="/login" />} />
      <Route path="/admin" element={currentUser?.email === 'admin@example.com' ? <Admin /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}