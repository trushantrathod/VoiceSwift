import React from 'react';
import AudioRecorder from './AudioRecorder';
import Report from './Report';
import './Dashboard.css'; // Import CSS for styling

function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Welcome to Dashboard</h2>
      <div className="dashboard-options">
        <AudioRecorder />
        <Report />
      </div>
    </div>
  );
}

export default Dashboard;
