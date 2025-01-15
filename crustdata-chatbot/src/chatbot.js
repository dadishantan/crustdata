import React, { useState, useRef, useEffect } from "react";
import "./chatbot.css";

const responses = {
  "how do i search for people given their current title, current company and location?":
    "You can use the `api.crustdata.com/screener/person/search` endpoint. Example: curl --location 'https://api.crustdata.com/screener/person/search' --header 'Content-Type: application/json' --header 'Authorization: Token $token --data '{...}'",
  "is there a standard you're using for the region values?":
    "Yes, there is a specific list of regions. Refer to https://crustdata-docs-region-json.s3.us-east-2.amazonaws.com/updated_regions.json.",
};

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const userMessage = input.trim();
    if (!userMessage) return; // Prevent sending empty messages

    const botResponse =
      responses[userMessage.toLowerCase()] ||
      "Sorry, I don't have an answer for that.";
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userMessage },
      { sender: "bot", text: botResponse },
    ]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me a question..."
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;
