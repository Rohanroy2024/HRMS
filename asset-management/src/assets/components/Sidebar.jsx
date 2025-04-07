import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar (open/close)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when a menu item is clicked (for mobile view)
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="layout">
      {/* Mobile Menu Toggler with dynamic icon */}
      <div className="menu-toggler" onClick={toggleSidebar}>
        <span className="material-icons menubar">
          {isOpen ? "close" : "menu"}
        </span>
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <img
            src="https://ik.imagekit.io/sbwxpfy3z/tr:w-192/xlayerLogoColored.png"
            alt="Logo"
          />
        </div>
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeSidebar} // Close sidebar on click
            >
              <span className="material-icons">dashboard</span> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/office"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeSidebar} // Close sidebar on click
            >
              <span className="material-icons">business</span> Office
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employee"
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeSidebar} // Close sidebar on click
            >
              <span className="material-icons">people</span> Employee List
            </NavLink>
          </li>
          {/* Account seetings */}
          <li>
            {/* <NavLink
              to="/aseetings" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
              onClick={closeSidebar} 
            >
              <span className="material-icons">settings</span> Account Settings
            </NavLink> */}
          </li>
        </ul>
      </div>
      <div className="content">{/* Your main content goes here */}</div>
    </div>
  );
};

export default Sidebar;
