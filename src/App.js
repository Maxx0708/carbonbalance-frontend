import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import AdminCreateUser from './pages/AdminCreateUser';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import ViewExistingProjects from './pages/ViewExistingProject';
import ThemeRating from './pages/ThemeRating';
import InterventionSelection from './pages/InterventionSelection';
import ResultsMatrix from './pages/ResultsMatrix';
import DataIngestion from "./pages/DataIngestion";   // 🆕 New page import

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 🟢 Login page is now the default / entry route */}
          <Route path="/login" element={<Login />} />
          <Route path="/Login" element={<Navigate to="/login" replace />} />
          <Route path="/LOGIN" element={<Navigate to="/login" replace />} />

          {/* 🟠 Admin route (accessible after login if needed) */}
          <Route path="/admin" element={<AdminCreateUser />} />
          <Route path="/Admin" element={<Navigate to="/admin" replace />} />

          {/* 🟣 Main user routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/view-existing" element={<ViewExistingProjects />} />
          <Route path="/theme-rating" element={<ThemeRating />} />
          <Route path="/intervention-selection" element={<InterventionSelection />} />
          <Route path="/results" element={<ResultsMatrix />} />

          {/* 🆕 Data Ingestion route */}
          <Route path="/data-ingestion" element={<DataIngestion />} />

          {/* 🏠 Default route now goes to login instead of admin */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
