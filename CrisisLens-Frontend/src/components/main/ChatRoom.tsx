import { useState, useEffect, useRef } from 'react';

const ChatRoom = () => {
  const [currentTeam, setCurrentTeam] = useState<string>('Chat Room');
  const [messages, setMessages] = useState<Array<{
    text: string;
    isUser: boolean;
  }>>([
    { text: "Hello, how are you?", isUser: false },
    { text: "I'm good, thanks! What about you?", isUser: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const teams = ['Team 1', 'Team 2', 'Team 3'];

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const newMessage = { text: inputMessage, isUser: true };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(false);

    // Simulate reply after delay
    setTimeout(() => {
      let replyMessage = '';
      const msg = inputMessage.toLowerCase();
      
      if (msg.includes('what status')) {
        replyMessage = `Team ${currentTeam} is in process.`;
      } else if (msg.includes('status')) {
        replyMessage = `Team ${currentTeam} has completed.`;
      } else if (msg.includes('your status')) {
        replyMessage = `Team ${currentTeam} is heading to area.`;
      } else {
        replyMessage = "Hello! How can I help?";
      }

      setMessages(prev => [...prev, { text: replyMessage, isUser: false }]);
    }, 1000);
  };

  const openTeamChat = (teamName: string) => {
    setCurrentTeam(teamName);
    setMessages([{ text: `Welcome to ${teamName} chat!`, isUser: false }]);
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Hide typing indicator after delay
    const timer = setTimeout(() => setIsTyping(false), 1000);
    return () => clearTimeout(timer);
  }, [inputMessage]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full flex gap-4">
        {/* Sidebar */}
        <div className="w-48 bg-white rounded-lg shadow p-4 flex flex-col">
          <h4 className="font-bold text-lg mb-4">Teams Available</h4>
          <ul className="space-y-2">
            {teams.map(team => (
              <li key={team}>
                <button
                  onClick={() => openTeamChat(team)}
                  className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  {team}
                </button>
              </li>
            ))}
          </ul>
          <button class="px-3 py-2 absolute bottom-3 right-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
  </svg>
  <span>Emergency Meet</span>
</button>
        </div>

        {/* Chat Area */}
        <div className="flex-1">
          <h3 className="text-center text-xl font-semibold mb-4">
            {currentTeam === 'Chat Room' ? 'Chat Room' : `${currentTeam} Chat Room`}
          </h3>
          
          {/* Messages */}
          <div 
            ref={chatBoxRef}
            className="bg-white rounded-lg shadow p-4 h-96 overflow-y-auto mb-4"
          >
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex mb-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <img 
                    src="https://bootdey.com/img/Content/avatar/avatar1.png" 
                    alt="User" 
                    className="w-10 h-10 rounded-full mr-2"
                  />
                )}
                <div 
                  className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
                    message.isUser 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
                {message.isUser && (
                  <img 
                    src="https://bootdey.com/img/Content/avatar/avatar6.png" 
                    alt="User" 
                    className="w-10 h-10 rounded-full ml-2"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Typing indicator */}
          {isTyping && (
            <div className="italic text-sm text-gray-500 mb-2">
              User is typing...
            </div>
          )}

          {/* Input area */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                setIsTyping(true);
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;