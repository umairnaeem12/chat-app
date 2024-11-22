import React, { useEffect, useState } from 'react';
import Avatar from '../assets/react.svg';
import { useAuth } from '../context/AuthContext'

const Home = () => {

    const {user, getUserData } = useAuth();
    // State to track the list of messages and the current input value
    const [messages, setMessages] = useState([
        { text: "Hi there! How are you?", sender: "other" },
        { text: "I'm good, thanks! And you?", sender: "self" }
    ]);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (user) {
            getUserData(user.uid)
        }
    })

    // Handle message submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "other" }]);
            setInput(""); // Clear the input field
        }
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center justify-center p-4">
                <img
                    src={Avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4"
                />
                <div className="w-28 h-28 rounded-full bg-gray-600 flex items-center justify-center mb-4">
                    <span className="text-2xl">Umair Naeem</span>
                </div>
            </div>

            {/* Chat Window */}
            <div className="w-3/4 bg-white flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-scroll">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-center mb-4 ${message.sender === "self" ? "justify-end" : ""}`}
                        >
                            <div className={`p-2 rounded-lg ${message.sender === "self" ? "bg-gray-300 text-black" : "bg-blue-500 text-white"}`}>
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Field */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 flex items-center">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="ml-4 bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Home;
