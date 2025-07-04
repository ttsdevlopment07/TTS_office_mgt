import React, { useEffect, useState, useRef } from 'react';

const mockMessages = [
  '📈 Sales increased by 5%',
  '👨‍💼 New employee joined HR team',
  '🔧 Server maintenance scheduled at 11 PM',
  '📊 Monthly report ready for download',
  '✅ Attendance data synced',
  '🕒 Meeting scheduled at 3:00 PM',
  '⚠️ Storage usage at 85%',
  '🛠 Backup completed successfully',
  '🔐 New security policy implemented',
  '🚚 Delivery pending from warehouse'
];

function NotificationPanel() {
  const [notifications, setNotifications] = useState([
    '✔ System started successfully',
    '📢 Welcome to the notification panel'
  ]);

  const boxRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      setNotifications(prev => [...prev, msg]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [notifications]);

  return (
    <div className="notification-panel">
      <h3>NOTIFICATIONS</h3>
      <div className="notification-box" ref={boxRef}>
        {notifications.map((n, i) => (
          <div key={i} className="notification">{n}</div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;
