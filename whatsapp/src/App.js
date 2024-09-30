// src/App.js
import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="app">
      {/* Setting up the Router */}
      <Router>
        {/* Conditional Rendering Based on User Login */}
        {!localStorage.getItem('user') ? ( // Change this condition as per your authentication logic
          <Login />
        ) : (
          <div className="app__body">
            {/* Sidebar remains static */}
            <Sidebar />
            <Routes>
              {/* Default Route to a Blank Page */}
              <Route path="/" element={<div className="welcomeMessage">Please select a chat room to start messaging</div>} />
              
              {/* Dynamic Route for Chat Rooms */}
              <Route path="/rooms/:roomId" element={<Chat />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
