import axios from 'axios';

const saveReport = async (reportData) => {
  try {
    const response = await axios.post('http://localhost:5000/api/reports', reportData);
    console.log('Report saved successfully:', response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error('Error saving report:', error);
    throw new Error('Error saving report:', error); // Throw an error to handle it in the component
  }
};

export { saveReport };
