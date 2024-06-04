import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReportsPage() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('/api/reports');
      setReports(response.data.reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <div>
        {reports.map((report, index) => (
          <div key={index}>
            <h3>{report.title}</h3>
            <p>{report.content}</p>
            <p>Sentiment: {report.sentiment}</p>
            <p>Created At: {new Date(report.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsPage;
