import React, { useState } from "react";
import "./Aseetings.css"; // Ensure your CSS file is correctly named and exists

const Aseetings = () => {
  // Example user data (this could come from an API or a global state)
  const [user, setUser] = useState({
    name: "John Doe",
    employeeStatus: "Active", // Active/Inactive
    gender: "Male", // Male/Female/Other
    dob: "01/01/1990", // mm/dd/yyyy
    employeeId: "12345",
    department: "Engineering",
    designation: "Software Developer",
    branch: "Main Office",
    employeeType: "Full-time", // Full-time/Part-time
    phone: "123-456-7890",
    personalEmail: "john.doe@example.com",
    companyEmail: "john.doe@company.com",
    referredEmail: "referrer@example.com",
    reportsTo: "Jane Smith",
    profilePicture: "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?cs=srgb&dl=pexels-sulimansallehi-1704488.jpg&fm=jpg", // Placeholder image URL
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  // State for the new profile picture
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Handle input changes for fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPictureUrl = URL.createObjectURL(file);
      setNewProfilePicture(newPictureUrl);
    }
  };

  // Save the changes (name, email, and profile picture)
  const handleSave = () => {
    setIsEditing(false);
  };

  // Cancel the changes (revert to original user data)
  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original user data if needed
    setNewProfilePicture(null);
  };

  return (
    <div className="account-settings">
      {/* Profile Section with Image and Name */}
      <div className="profile-section">
        {/* Display Profile Picture */}
        <div className="profile-picture-wrapper">
          <img
            src={newProfilePicture || user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          {isEditing && (
            <div className="file-input-wrapper">
              <label htmlFor="file-input" className="file-input-label">
                Change Profile Picture
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="file-input"
              />
            </div>
          )}
        </div>

        {/* Name below the Profile Picture */}
        <div className="profile-name">
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          ) : (
            <p>{user.name}</p>
          )}
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="settings-section">

        <div className="settings-section">
  <h2>Account Settings</h2>

  {/* Employee Status */}
  <div className="settings-field">
    <label>Employee Status: </label>
    {isEditing ? (
      <input
        type="text"
        name="employeeStatus"
        value={user.employeeStatus}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.employeeStatus}</p>
    )}
  </div>

  {/* Gender */}
  <div className="settings-field">
    <label>Gender: </label>
    {isEditing ? (
      <select
        name="gender"
        value={user.gender}
        onChange={handleInputChange}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    ) : (
      <p>{user.gender}</p>
    )}
  </div>

  {/* Date of Birth */}
  <div className="settings-field">
    <label>Date of Birth: </label>
    {isEditing ? (
      <input
        type="date"
        name="dob"
        value={user.dob}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.dob}</p>
    )}
  </div>

  {/* Employee ID */}
  <div className="settings-field">
    <label>Employee ID: </label>
    {isEditing ? (
      <input
        type="text"
        name="employeeId"
        value={user.employeeId}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.employeeId}</p>
    )}
  </div>

  {/* Department */}
  <div className="settings-field">
    <label>Department: </label>
    {isEditing ? (
      <input
        type="text"
        name="department"
        value={user.department}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.department}</p>
    )}
  </div>

  {/* Designation */}
  <div className="settings-field">
    <label>Designation: </label>
    {isEditing ? (
      <input
        type="text"
        name="designation"
        value={user.designation}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.designation}</p>
    )}
  </div>

  {/* Phone */}
  <div className="settings-field">
    <label>Phone: </label>
    {isEditing ? (
      <input
        type="tel"
        name="phone"
        value={user.phone}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.phone}</p>
    )}
  </div>

  {/* Branch */}
  <div className="settings-field">
    <label>Branch: </label>
    {isEditing ? (
      <input
        type="text"
        name="branch"
        value={user.branch}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.branch}</p>
    )}
  </div>

  {/* Other fields you may want to add */}
  <div className="settings-field">
    <label>Personal Email: </label>
    {isEditing ? (
      <input
        type="email"
        name="personalEmail"
        value={user.personalEmail}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.personalEmail}</p>
    )}
  </div>

  <div className="settings-field">
    <label>Company Email: </label>
    {isEditing ? (
      <input
        type="email"
        name="companyEmail"
        value={user.companyEmail}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.companyEmail}</p>
    )}
  </div>

  <div className="settings-field">
    <label>Referred Email: </label>
    {isEditing ? (
      <input
        type="email"
        name="referredEmail"
        value={user.referredEmail}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.referredEmail}</p>
    )}
  </div>

  {/* Reports To */}
  <div className="settings-field">
    <label>Reports To: </label>
    {isEditing ? (
      <input
        type="text"
        name="reportsTo"
        value={user.reportsTo}
        onChange={handleInputChange}
      />
    ) : (
      <p>{user.reportsTo}</p>
    )}
  </div>
</div>


        {/* Add other fields as needed */}
      </div>

      {/* Edit/Save/Cancel Buttons */}
      <div className="buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Aseetings;
