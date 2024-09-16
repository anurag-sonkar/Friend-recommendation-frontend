import React, { useEffect } from 'react'
import Signup from './components/signup';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';

function App() {
  // const userInfo = JSON.parse(localStorage.getItem('user-info'))
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
