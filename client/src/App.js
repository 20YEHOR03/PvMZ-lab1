import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_URL}/convert?input=${input}`);
      setOutput(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    {output && <div className="output">Output: <span>{output}</span></div>}
  </div>
  );
}

export default App;
