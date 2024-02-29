import React from 'react';
import mockData from '../mockData'; // Ensure the path to mockData.js is correct
import './ChatArea.scss';
import { Send } from '@mui/icons-material';

function ChatArea() {
  const { currentChat } = mockData;

  return (
    <div className="chat-area">
      <div className="messages">
        {currentChat.messages.map((message) => (
          <div key={message.id} className={`message ${message.from === "You" ? "sent" : "received"}`}>
            <div className="message-content">{message.message}</div>
            <div className="message-time">{message.time}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input type="text" placeholder="Write a message..." />
        <button className='message-input-button'>
          <Send/>Send</button>
      </div>
    </div>
  );
}

export default ChatArea;
