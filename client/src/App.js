import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Імпорт стилів

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/convert', `"${input}"`, {
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
      <h1>Hexadecimal Converter</h1>
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
        <button type="submit">Convert</button>
      </form>
      {error && <div className="error">{error}</div>}
      {output && <div className="output">Output: <span>{output}</span></div>}
    </div>
  );
}

export default App;
