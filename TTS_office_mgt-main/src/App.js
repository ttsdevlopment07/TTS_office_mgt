import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import NotificationPanel from './components/NotificationPanel';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import Notification from './pages/Notification';
import Turnover from './pages/Turnover';
import EmployeeTab from './components/Pim/EmployeeTab';
import Pim from './pages/Pim';
import './styles/App.css'; // Optional - ensure it doesn't override layout

function App() {
  return (
    <Router>
      <div>
        <div className="topbar">
          <button id="menuToggle">☰</button>
          <span>TTS Employee MGT</span>
          <button id="mobileNotifToggle">🔔</button>
        </div>

        <Sidebar />

        <div className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/turnover" element={<Turnover />} />
            <Route path="/pim" element={<Pim />} />
          </Routes>

          {/* Mobile notifications are part of each page (e.g., in Dashboard) */}
        </div>

        <NotificationPanel />
      </div>
    </Router>
  );
}

export default App;
