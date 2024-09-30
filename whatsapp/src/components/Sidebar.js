// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src="https://via.placeholder.com/150" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
