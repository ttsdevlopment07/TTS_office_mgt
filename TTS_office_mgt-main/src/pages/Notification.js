import React from 'react';
import '../styles/App.css';

function Notification() {
  return (
    <div className="page">
      <div className="notification-title">
        <h1>NOTIFICATIONS</h1>
      </div>
      <div className="tabs">
        <button>EMPLOYEE</button>
        <button>SALES (Turnover)</button>
        <button>SERVICE (Turnover)</button>
        <button>PROJECTS (Turnover)</button>
        <button>CUSTOMERS</button>
      </div>
    </div>
  );
}

export default Notification;