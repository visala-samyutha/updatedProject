// client/src/Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    if (message.trim() !== '') {
      const res = await axios.post('http://localhost:5000/signup/message', { message });
      setResponse(res.data.reply);
    }
  };

  return (
    <div>
      <h1>Fashion Fusion Chatbot</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <p>{response}</p>
    </div>
  );
};

export default Chatbot;
