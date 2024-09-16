import React, { useEffect } from 'react'
import Signup from './components/signup';
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';

function App() {
  const userInfo = JSON.parse(localStorage.getItem('user-info'))
  const navigate = useNavigate()

  useEffect(
    () => {
      if (userInfo !== null)
        navigate('/')
      else navigate('/login')
    }
    , [navigate]
  )
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-100">
      <h1 className="text-4xl font-bold">Welcome to MERN Friend App!</h1>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/signup' Component={Signup} />
        <Route path='/login' Component={Login} />
      </Routes>
    </div>
  );
}

export default App;
