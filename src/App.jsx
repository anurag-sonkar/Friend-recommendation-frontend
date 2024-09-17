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
  const { user,socket, setSocket, setOnlineUsers } = useUserState(); // user should be available after login/signup

  useEffect(() => {
    if(user){
      const socket = io("http://localhost:5000" , {
        query : {userId : user._id}
      })

      setSocket(socket)

      socket.on('getOnlineUsers' , (onlineUsers)=>{
        setOnlineUsers(onlineUsers)
      })

      return ()=>socket.close()
      
    }else{
      if(socket){
        socket.close()
        setSocket(null)
      }
    }





    // Only emit the 'register' event if the user is authenticated
    //  if(user){
    //    socket.on("connect", () => {

    //      socket.emit('register', user._id); 
        
    //       }
    //     ) // Emit user ID after authentication
    //     console.log("Socket connected, user registered:", user._id);
    //  }

    // socket.on("disconnect", () => {
    //   console.log("Socket disconnected");
    // });

    // socket.on('friend-request', (data) => {
    //   console.log('Notification received:', data);
    //   alert(data.message);
    // });

    // return () => {
    //   socket.disconnect(); // Cleanup on component unmount
    // };
  }, [user]); // Rerun when 'user' changes

  // const navigate = useNavigate()

  // useEffect(
  //   () => {
  //     if (userInfo !== null)
  //       navigate('/')
      
  //   }
  //   , [navigate]
  // )
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
