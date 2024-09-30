// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, doc, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId);
      onSnapshot(roomRef, (snapshot) => setRoomName(snapshot.data().name));

      const messagesRef = collection(roomRef, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
      return () => unsubscribe();
    }
  }, [roomId]);

  // Send message function
  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.trim() !== '') {
      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        message: input,
        name: 'User', // Replace with user's display name
        timestamp: serverTimestamp(),
      });
    }

    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last message{' '}
            {messages.length > 0 && new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, index) => (
          <p key={index} className={`chat__message ${message.name === 'User' && 'chat__receiver'}`}>
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
