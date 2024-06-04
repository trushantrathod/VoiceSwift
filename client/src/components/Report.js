import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Report.css';

function Report() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reports');
      setReports(response.data.reports.reverse()); // Reverse the order of reports
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div className="report">
      <h2 className="view-report-title">View Reports</h2>
      {reports.map(report => (
        <div key={report._id} className="report-item">
          <div className="report-container">
            <div className="sentiment">
              <h3>Sentiment:</h3>
              <p>{report.sentiment}</p>
            </div>
            <div className="transcript">
              <h3>Transcript:</h3>
              <p>{report.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Report;