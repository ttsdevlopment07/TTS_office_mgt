import React, { useState } from 'react';
import '../styles/Employee.css';

function Employee() {
  const [showPunch, setShowPunch] = useState(false);

  return (
    <div className="page">
      <div className="header">
        <h1>EMPLOYEE</h1>
      </div>
      <div className="tabs">
        <button>EMPLOYEE</button>
        <button>SALES (Turnover)</button>
        <button>SERVICE (Turnover)</button>
        <button>PROJECTS (Turnover)</button>
        <button>CUSTOMERS</button>
      </div>
      {!showPunch ? (
        <div id="employeeContent">
          <div className="form-section">
            <div className="form-row">
              <label>Employee:</label>
              <input type="text" />
              <label>Password:</label>
              <input type="password" />
            </div>
            <div className="form-row">
              <label>Date:</label>
              <input type="date" className="date-input" />
              <button className="arrow-btn">➡</button>
            </div>
          </div>
          <div className="button-grid">
            <button className="btn-punch" onClick={() => setShowPunch(true)}>PUNCH</button>
            <button className="btn-report">REPORT</button>
            <button className="btn-task">TASK</button>
            <button className="btn-mail">MAIL</button>
          </div>
        </div>
      ) : (
        <div className="punch-options">
          <h3>Select Punch Option</h3>
          <div className="punch-options-grid">
            <button className="btn-back" onClick={() => setShowPunch(false)}>BACK</button>
            <button className="btn-leave">LEAVE</button>
            <button className="btn-dayin">DAY-IN</button>
            <button className="btn-dayout">DAY-OUT</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;