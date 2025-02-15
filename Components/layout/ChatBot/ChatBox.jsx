"use client";
import React, { useState } from 'react';
import './ChatBox.scss';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import Close from '@mui/icons-material/Close';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;
  
    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:5678/webhook-test/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
  
      if (!response.ok) throw new Error('n8n webhook request failed');
  
      const data = await response.json();
      const botResponse = data.reply;
  
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('n8n Webhook Error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="chat-container">
      <button onClick={toggleChat} className="chat-button">
        <ChatBubbleOutline style={{ color: 'white', marginRight: '8px' }} />
        <span style={{ 
          color: 'white', 
          fontSize: '14px',
          fontWeight: 500,
          verticalAlign: 'middle'
        }}>
          Ai Assistant
        </span>
      </button>
      
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <button onClick={toggleChat} className="close-button">
              <Close style={{ color: 'white', fontSize: '24px' }} />
            </button>
          </div>
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="message bot loading-dots">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;