// src/components/SidebarChat.js
// src/components/SidebarChat.js
import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import './SidebarChat.css';
import { Link } from 'react-router-dom';
import { doc, collection, getDocs, query, orderBy, addDoc } from 'firebase/firestore'; // Add addDoc here
import { db } from '../firebase';

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      const messagesRef = collection(db, 'rooms', id, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'desc'));
      getDocs(q).then((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt('Please enter name for chat room');
    if (roomName) {
      // Add room to Firestore
      const roomsRef = collection(db, 'rooms');
      addDoc(roomsRef, { name: roomName });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
