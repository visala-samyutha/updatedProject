import React, { useState } from 'react';
import axios from 'axios';
import '../ChatBot.css'; // Import the CSS file
import { Button } from 'react-bootstrap';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (message.trim() !== '') {
      const newMessage = { type: 'user', text: message };
      setMessages([...messages, newMessage]);
      const res = await axios.post('http://localhost:3002/signup/message', { message });
      const replyMessage = { type: 'bot', text: res.data.reply };
      setMessages([...messages, newMessage, replyMessage]);
      setMessage('');
    }
  };

  return (
    <>
    <h1>Fashion Fusion Chatbot</h1>
    <div className="chatbot-container">
      
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="none" className="button" onClick={handleSend} style={{ color: 'purple' }}>Send</Button>
        {/* <button onClick={handleSend}>Send</button> */}
      </div>
    </div>
    </>
  );
};

export default Chatbot;
