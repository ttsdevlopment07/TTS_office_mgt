import React, { useState } from 'react';
import '../styles/Pim.css';
import EmployeeTab from '../components/Pim/EmployeeTab';


function Pim() {
  const [activeTab, setActiveTab] = useState('employee');

  const renderTabButton = (id, label) => (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="full-header">HR SUPERVISOR</div>

      <div className="tabs">
        {renderTabButton('employee', '👥 EMPLOYEE DETAILS')}
        {renderTabButton('task', '📝 TASK')}
        {renderTabButton('mail', '📩 MAIL')}
        {renderTabButton('notification', '🔔 NOTIFICATION')}
      </div>

      <div className="tab-content-wrapper">
        {activeTab === 'employee' && <EmployeeTab />}
        {activeTab === 'task' && <TaskTab />}
        {activeTab === 'mail' && <MailTab />}
        {activeTab === 'notification' && <NotificationTab />}
      </div>
    </>
  );
}

export default Pim;
