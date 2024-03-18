import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Імпорт стилів

const ip = "http://localhost";
const port = 4832;

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ip}:${port}/mark_hex`, `"${input}"`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setOutput(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Hexadecimal Marker</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input">Input:</label>
          <input
            type="text"
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button type="submit">Mark</button>
      </form>
      {error && <div className="error">{error}</div>}
      {output && <div className="output">Output: <span>{output}</span></div>}
    </div>
  );
}

export default App;
