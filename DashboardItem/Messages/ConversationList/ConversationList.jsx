// src/components/ConversationList.js
import React, { useState } from 'react';
import './ConversationList.scss';
import mockData from '../mockData';
import Button from '@mui/material/Button';
import { AddComment } from '@mui/icons-material';

const ConversationList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { conversations } = mockData;

  const filteredConversations = conversations.filter(convo =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="conversation-list">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredConversations.map(convo => (
  <div key={convo.id} className="conversation">
    <div className="conversation-avatar">
      <img 
        src={convo.gender === 'male' 
          ? 'https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256' 
          : 'https://cdn.iconscout.com/icon/free/png-512/free-avatar-369-456321.png?f=webp&w=256'} 
        alt={`Conversation with ${convo.name}`} 
      />
    </div>
    <div className="conversation-details">
      <h5 className="conversation-name">{convo.name}</h5>
      <p className="conversation-snippet">{convo.message}</p>
    </div>
    <div className="conversation-time">{convo.time}</div>
  </div>
  ))}
 <div className="newMessage">
 <  AddComment 
  className="add-comment-button"
        variant="contained"
        color="primary"
        style={{height:'40',width:'40' }}
      />
 </div>
        
    </div>
  );
};

export default ConversationList;

