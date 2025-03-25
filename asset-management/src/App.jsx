import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../src/assets/components/Navbar';
import Sidebar from '../src/assets/components/Sidebar';
import Dashboard from '../src/assets/components/Dashboard';
import Login from './assets/components/Login';
import Footer from './assets/components/Footer';
import Employee from '../src/assets/components/Employee'; // Import Employee component

import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="app-container">
      {/* Show Navbar and Sidebar only if not on the Login page */}
      {!isLoginPage && <Navbar />}
      
      <div className="main-content">
        {!isLoginPage && <Sidebar />}

        <div className="content">{children}</div>
      </div>
      {!isLoginPage && <Footer />}
      
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Default to Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
          <Route path="/employee" element={<Employee />} /> {/* Dashboard route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
