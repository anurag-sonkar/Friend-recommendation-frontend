import React, { useEffect, useState } from 'react'
import Signup from './components/signup';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import { useUserState } from './Context/UserProvider';
import io from 'socket.io-client';
// const socket = io("http://localhost:5000");

function App() {
  const { user, socket, setSocket, setOnlineUsers, notifications, setNotifications } = useUserState(); // user should be available after login/signup
  console.log(notifications)

  useEffect(() => {
    if(user){
      const socket = io("http://localhost:5000" , {
        query : {userId : user?._id}
      })

      setSocket(socket)

      socket.on('getOnlineUsers' , (onlineUsers)=>{
        setOnlineUsers(onlineUsers)
      })

      socket.on('friend-request', ({ notification }) => {
        setNotifications(prevNotifications => [notification, ...prevNotifications]);
      });

      return ()=>socket.close()
    }else{
      if(socket){
        socket.close()
        setSocket(null)
      }
    }
    
  }, [user]); // Rerun when 'user' changes


  return (
   
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
  );
}

export default App;
