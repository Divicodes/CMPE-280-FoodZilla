import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Home.css";
import NavComponent from "../SharedComponents/NavComponent";

const Home = () => {
  const [input, setInput] = useState("");
  let botMessage = {
    text: "Hi there, I'm your food assistant here at Foodzilla. You can ask me any questions related to food",
    sender: "bot",
  };
  const [messages, setMessages] = useState([botMessage]);

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((messages) => [...messages, userMessage]);
      setInput("");

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt:
            "Your name is Foodzilla. Answer only food related queries. If other queries are asked, tell the user Welcome to Foodzilla. Please ask food related question. You are a nutrional specialist and masterchef on all kinds of cuisine,answer the following queries descripteively without further questions \n " +
            input,
          // "give the calories, fat, protein etc. values per portion of " +
          // query +
          // "." +
          // "What is the benefit of eating " +
          // query +
          // "?",
          model: "text-davinci-002",
          max_tokens: 1000,
          temperature: 0.4,
          top_p: 1,
          n: 1,
          //   stop: "\n",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer OPENAI_API_KEY`, // Replace with your GPT-3 API key
          },
        }
      );

      const botResponseText = response.data.choices[0].text.trim();
      const botMessage = { text: botResponseText, sender: "bot" };
      setMessages((messages) => [...messages, botMessage]);
    }
  };

  return (
    <div>
      <NavComponent view="unknown"></NavComponent>
      <h1>Welcome to FoodZilla</h1>
      <div className="chatbot">
        <div className="chatbot-window">
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <form onSubmit={handleSend} className="chatbot-form">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
