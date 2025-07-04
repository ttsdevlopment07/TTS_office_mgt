import React from 'react';
import '../styles/Turnover.css';

function Turnover() {
  return (
    <div className="page">
      <div className="header">
        <h1>TURNOVER</h1>
      </div>
      <div className="tabs">
        <button>EMPLOYEE</button>
        <button>SALES (Turnover)</button>
        <button>SERVICE (Turnover)</button>
        <button>PROJECTS (Turnover)</button>
        <button>CUSTOMERS</button>
      </div>
      <div className="section-buttons">
        <button className="btn-sales">SALES</button>
        <button className="btn-services">SERVICES</button>
        <button className="btn-projects">PROJECTS</button>
      </div>
    </div>
  );
}

export default Turnover;