const mockData = {
    conversations: [
      { id: 1, name: "Zack Fox", message: "Have you ever heard of...", time: "10:49 AM" },
      { id: 2, name: "Kathryn Cooper", message: "Thank you!", time: "6:34 PM" },
      // ... add other conversations
    ],
    currentChat: {
      id: 1,
      messages: [
        { id: 1, from: "Caesar", message: "loren ispsum", time: "4:38 AM" },
        { id: 2, from: "You", message: "Come on, what's her name?", time: "8:54 AM" },
        // ... add other messages in the conversation
      ],
    },
    userProfile: {
      username: "@Caesar",
      bio: "I like talk shows",
      notifications: true,
      // ... add other profile related information
    }
  };
  
  export default mockData;
  