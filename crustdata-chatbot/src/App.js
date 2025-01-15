import React from "react";
import "./App.css";
import ChatBot from "./chatbot"; // Import the ChatBot component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CrustData ChatBot</h1>
      </header>
      <ChatBot /> {/* Render the ChatBot component */}
    </div>
  );
}

export default App;
