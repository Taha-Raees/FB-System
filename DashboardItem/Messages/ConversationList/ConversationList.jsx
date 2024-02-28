// ConversationList.jsx
import React from 'react';
import './ConversationList.scss';
import mockData from '../MockData';

const ConversationList = () => {
  const { conversations } = mockData;
  
  return (
    <div className="conversation-list">
      {conversations.map(convo => (
        <div key={convo.id} className="conversation">
          <div className="conversation-avatar">
            <img src="https://placehold.co/50" alt={`Conversation with ${convo.name}`} />
          </div>
          <div className="conversation-details">
            <h5 className="conversation-name">{convo.name}</h5>
            <p className="conversation-snippet">{convo.message}</p>
          </div>
          <div className="conversation-time">{convo.time}</div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
