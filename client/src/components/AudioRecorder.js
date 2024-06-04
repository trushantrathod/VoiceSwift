import React, { useState, useEffect } from 'react';
import Sentiment from 'sentiment';
import { saveReport } from './reportService'; // Import saveReport function from reportService.js
import recordIcon from './images/record.png'; // Import PNG record icon
import stopIcon from './images/stop.png'; // Import PNG stop icon
import './AudioRecorder.css'; // Import CSS for styling

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [sentimentReport, setSentimentReport] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isRecording) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setTimer(0); // Reset timer when recording stops
    }

    return () => clearInterval(intervalId);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setTranscript('');
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      analyzeSentiment(speechToText);
    };
    recognition.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const analyzeSentiment = (text) => {
    const sentiment = new Sentiment();
    const analysis = sentiment.analyze(text);
    const report = analysis.score > 0 ? 'Positive' : analysis.score === 0 ? 'Neutral' : 'Negative';
    setSentimentReport(report);
  };

  const saveReportHandler = async () => {
    try {
      await saveReport({ title: 'Sentiment Analysis Report', content: transcript, sentiment: sentimentReport });
      alert('Sentiment analysis report saved successfully!');
    } catch (error) {
      console.error('Error saving sentiment analysis report:', error);
      alert('Error saving sentiment analysis report. Please try again.');
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-recorder">
      <h2 className="record-audio-title">Record Audio</h2>
      <div className="microphone-animation" style={{ display: isRecording ? 'block' : 'none' }}></div>
      <button onClick={startRecording} disabled={isRecording}>
        <img src={recordIcon} alt="Record" className="icon" />
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        <img src={stopIcon} alt="Stop" className="icon" />
      </button>
      <div>
        <h3 className="transcript-title">Transcript:</h3>
        <p>{transcript}</p>
      </div>
      <div>
        <h3 className="sentiment-title">Sentiment Analysis Report:</h3>
        <p>{sentimentReport}</p>
      </div>
      {isRecording && <div>Recording Time: {formatTime()}</div>}
      <button onClick={saveReportHandler} disabled={!sentimentReport} className="save-report-button">
  Save Report
</button>

    </div>
  );
}

export default AudioRecorder;
