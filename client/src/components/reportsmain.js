import React, { useEffect, useState } from "react";
import axios from "axios";

function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch reports from backend
    const fetchReports = async () => {
      try {
        const response = await axios.get("/api/reports");
        setReports(response.data.reports);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the fetchReports function when the component mounts
    fetchReports();
  }, []); // Run this effect only once on component mount

  return (
    <div>
      <h1>All Reports</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {reports.map((report) => (
          <li key={report._id}>
            <h2>{report.title}</h2>
            <p>{report.content}</p>
            <p>{report.sentiment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
