import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  const handleprofile = () => {
    navigate('/aseetings');
  };

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const user = {
    name: "John Doe",
    designation: "Software Engineer",
    profileImage: "https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/avatars/1.png"
  };

  return (
    <nav className="navbar">
      <div className="navbar-center">
        <div className="search-container">
          <span className="material-icons search-icon">search</span>
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
          />
        </div>
      </div>
      <div className="navbar-right">
        <div className="notification-icon">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhk-tO9K6hGY9MvQO3q-gaUUIHnpjE4ZRabQ&s"
            alt="Notification"
          />
        </div>

        {/* Profile icon with click functionality */}
        <div
          className="profile-icon"
          onClick={toggleDropdown}
          ref={profileIconRef}
        >
          <img
            src={user.profileImage}
            alt="Profile"
          />
        </div>

        {/* Dropdown menu with profile details */}
        <div
          className={`dropdown-menu ${isDropdownVisible ? 'visible' : ''}`}
          ref={dropdownRef}
        >
          <div className="dropdown-header">
            <img
              src={user.profileImage}
              alt="Profile"
              className="dropdown-profile-image"
            />
            <div className="dropdown-user-info">
              <p className="dropdown-user-name">{user.name}</p>
              <p className="dropdown-user-designation">{user.designation}</p>
            </div>
          </div>
          <button className="dropdown-item" onClick={handleprofile}>
            <span className="material-icons">account_circle</span>
            My Profile
          </button>
          <button className="dropdown-item">
            <span className="material-icons">settings</span>
            Settings
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            <span className="material-icons">logout</span>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
