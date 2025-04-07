import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '../src/assets/components/Navbar';
import Sidebar from '../src/assets/components/Sidebar';
import Dashboard from '../src/assets/components/Dashboard';
import Login from './assets/components/Login';
import Footer from './assets/components/Footer';
import Employee from '../src/assets/components/Employee'; 
import Aseetings from "./assets/components/Aseetings"; 
import Office from './assets/components/Office';
import Registration from './assets/components/Registration'; 

import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/registration';

  return (
    <div className="app-container">
      {/* Show Navbar and Sidebar only if not on the Login/Registration page */}
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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/aseetings" element={<Aseetings />} />
          <Route path="/office" element={<Office />} />
          <Route path="/registration" element={<Registration />} /> {/* Registration route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
