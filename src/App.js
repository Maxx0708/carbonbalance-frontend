import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import AdminCreateUser from './pages/AdminCreateUser';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import ThemeRating from './pages/ThemeRating';
import InterventionSelection from './pages/InterventionSelection';
import ResultsMatrix from './pages/ResultsMatrix';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Admin page as the first/default route */}
          <Route path="/admin" element={<AdminCreateUser />} />
          <Route path="/Admin" element={<Navigate to="/admin" replace />} />
          
          {/* Login routes - handle both cases and redirect to lowercase */}
          <Route path="/login" element={<Login />} />
          <Route path="/Login" element={<Navigate to="/login" replace />} />
          <Route path="/LOGIN" element={<Navigate to="/login" replace />} />
          
          {/* Other routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/theme-rating" element={<ThemeRating />} />
          <Route path="/intervention-selection" element={<InterventionSelection />} />
          <Route path="/results" element={<ResultsMatrix />} />
          
          {/* Default route redirects to admin page */}
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;