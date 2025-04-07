import React from 'react';
import './Office.css';


const Office = () => {
  return (
    <div className="office-container">
      <div className="card">
        <h3>Total Attendance</h3>
        <p>100</p>
      </div>
      <div className="card">
        <h3>Total Leave</h3>
        <p>10</p>
      </div>
      <div className="card">
        <h3>Total Holiday</h3>
        <p>5</p>
      </div>
    </div>
  );
};

export default Office;
