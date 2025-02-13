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

    try {
      setIsLoading(true);
      setError('');
      
      // Store user message temporarily
      const userMessage = inputMessage;
      // Clear input immediately
      setInputMessage('');
      
      // Add user message to state
      setMessages(prev => [...prev, { text: userMessage, isBot: false }]);

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model:'deepseek/deepseek-r1:free',
            messages: [
                {
                  role: 'user',
                  content: userMessage
                }
              ]
        })
      });

      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('API Error:', err);
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