import React, { useEffect } from 'react'
import Signup from './components/signup';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import { useUserState } from './Context/UserProvider';
import io from 'socket.io-client';
import ProtectedRoutes from './routing/ProtectedRoutes';
import { connection_url } from './utils/base_url';

function App() {
  const { user, socket, setSocket, setOnlineUsers, setNotifications } = useUserState(); 

  useEffect(() => {
    if(user){
      const socket = io(connection_url , {
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
    
  }, [user])


  return (
   
      
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
  );
}

export default App;
