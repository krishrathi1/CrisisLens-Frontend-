import { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens
      setMessages([
        { 
          role: "bot", 
          content: "Hi there! 👋 How can I help you today?"
        }
      ]);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`,
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });

      const data = await response.json();
      const botResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't fetch a response.";
      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Error fetching response. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format message content with basic markdown-like formatting
  const formatMessage = (content) => {
    const formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold">$1</span>')
      .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  };

  return (
    <>
      {/* Chat toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-5 right-0 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        )}
      </button>

      {/* Chat window */}
      <div 
        className={`fixed bottom-20 right-5 w-80 md:w-70 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 z-40 ${
          isOpen ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-8 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-indigo-600 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h2 className="font-bold">AI Assistant</h2>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setMessages([])} 
              className="text-white opacity-80 hover:opacity-100"
              title="Clear conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white opacity-80 hover:opacity-100"
              title="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Messages container */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-300"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <p>Ask me anything...</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.role === "user" ? "ml-auto" : ""}`}>
                <div className={`inline-block rounded-lg p-3 max-w-xs md:max-w-md ${
                  msg.role === "user" 
                    ? "bg-indigo-600 text-white ml-auto" 
                    : "bg-white border border-gray-200"
                }`}>
                  {formatMessage(msg.content)}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="mb-4">
              <div className="inline-block bg-white border border-gray-200 rounded-lg p-3">
                <div className="flex space-x-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t p-3 bg-white">
          <div className="flex rounded-lg border border-gray-300 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 p-2 outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <button 
              className={`px-4 flex items-center justify-center ${
                input.trim() ? "text-indigo-600 hover:bg-indigo-50" : "text-gray-400"
              }`}
              onClick={sendMessage}
              disabled={!input.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            Powered by GPT-4
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;