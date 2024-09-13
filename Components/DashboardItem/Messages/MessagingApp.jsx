import React from 'react'
import ConversationList from './ConversationList/ConversationList'
import ChatArea from './ChatArea/ChatArea'
import './MessagingApp.scss'

const MessagingApp = () => {
  return (
    <div className='messaging-app'>
        <ConversationList/>
       <ChatArea/> 
    </div>
  )
}

export default MessagingApp